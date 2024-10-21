import React, { useEffect } from "react";
import ItemBlog from "./ItemBlog";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getDataBlog, getProfile } from "@/redux/actions";
import { useUserContext } from "@/pages/_app";
import io from "socket.io-client";
const socket = io("http://localhost:4000");
interface BlogListProps {}

const BlogList: React.FC<BlogListProps> = ({}) => {
  const { userId } = useUserContext();

  const dispatch: AppDispatch = useDispatch();
  const { dataBlogs, dataProfile } = useSelector((state: any) => state);
  useEffect(() => {
    if (userId) {
      dispatch(getProfile({ userId }));
      dispatch(getDataBlog());
    }
  }, [dispatch]);

  useEffect(() => {
    socket.on("update_blogs", (newBlogs) => {
      // console.log(newBlogs);
      if (dataBlogs) {
        const hasDifferentLength = dataBlogs.length !== newBlogs.length;

        const hasCommentChanged = newBlogs.some((newBlog: any) => {
          const oldBlog = dataBlogs.find(
            (oldBlog: any) => oldBlog.id === newBlog.id
          );
          return (
            oldBlog &&
            JSON.stringify(oldBlog.comments) !==
              JSON.stringify(newBlog.comments)
          );
        });

        const hasReactionChanged = newBlogs.some((newBlog: any) => {
          const oldBlog = dataBlogs.find(
            (oldBlog: any) => oldBlog.id === newBlog.id
          );
          return (
            oldBlog &&
            JSON.stringify(oldBlog.reactions) !==
              JSON.stringify(newBlog.reactions)
          );
        });

        if (hasCommentChanged || hasDifferentLength || hasReactionChanged) {
          dispatch(getDataBlog());
        }
      }
    });

    return () => {
      socket.off("update_blogs"); // Xóa listener khi component unmount
    };
  }, [socket, dataBlogs]);
  return (
    <div className=" flex flex-col gap-[10px] items-center justify-center">
      {dataBlogs &&
        dataBlogs.map((blog: any) => (
          <ItemBlog user={dataProfile?.user} blog={blog} />
        ))}
    </div>
  );
};

export default BlogList;
