import axiosInstance from "@/lib/axios";
import { useUserContext } from "@/pages/_app";
import { commentBlogs, getDataBlog } from "@/redux/actions";
import { resetDataCommentBlogs } from "@/redux/reducers";
import { AppDispatch } from "@/redux/store";
import { Button, Popover, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { formatDate } from "@/hooks/fomatDate";
import ReactionButtons from "@/components/reaction";
import { renderReaction } from "@/hooks/renderRaction";
const cx = classNames.bind(styles);

interface Blog {
  blog: any;
  user: any;
}
const ItemBlog: React.FC<Blog> = ({ user, blog }) => {
  const { userId } = useUserContext();
  const dispatch: AppDispatch = useDispatch();
  const { dataCommentBlogs } = useSelector((state: any) => state);

  const [showCmt, setShowCmt] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [coutType, setCoutType] = useState<
    {
      type: string;
      count: number;
    }[]
  >([]);

  const handleComment = async () => {
    if (userId) {
      dispatch(commentBlogs({ content: comment, blogId: blog.id, userId }));
    }
  };

  useEffect(() => {
    if (dataCommentBlogs) {
      setComment("");
    }
  }, [dataCommentBlogs]);

  useEffect(() => {
    if (blog) {
      const typeCountArray = Object.entries(
        blog.reactions.reduce(
          (acc: Record<string, number>, item: { type: string }) => {
            acc[item.type] = (acc[item.type] || 0) + 1;
            return acc;
          },
          {}
        )
      ).map(([type, count]) => ({ type, count: count as number }));

      setCoutType(typeCountArray);
    }
  }, [blog]);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={cx("item")}>
      <div className={cx("user")}>
        <img
          className={cx("img")}
          src={`http://localhost:4000/uploads/${blog.author.avatar}`}
        />
        {blog.author.username}
      </div>
      <div className={cx("blog")}>
        <span className={cx("title")}>{blog.title}</span>
        <span>{blog.content}</span>
      </div>
      {blog.imageUrl && (
        <div className={cx("img-blog")}>
          <img
            className={cx("img")}
            src={`http://localhost:4000/uploads/${blog.imageUrl}`}
          />
        </div>
      )}

      <div className="flex justify-between border-b pb-[5px]">
        <button className="flex">
          {coutType &&
            coutType.map((item) => {
              return (
                <Tooltip title={item.count} placement="top-start">
                  <span className="cursor-pointer">
                    {renderReaction(item.type)}
                  </span>
                </Tooltip>
              );
            })}
          <span> ({blog.reactions.length})</span>
        </button>
        <button>Bình luận ({blog.comments.length})</button>
      </div>

      <div className="flex gap-[5px] justify-start">
        <button
          onClick={() => {
            setShowCmt(!showCmt);
          }}
        >
          Comment
        </button>
        <button onClick={handleClick}>Like</button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <ReactionButtons setAnchorEl={setAnchorEl} blogId={blog.id} userId={userId} />
        </Popover>
      </div>
      {showCmt && (
        <div className={cx("box-comment")}>
          <div className={cx("user")}>
            <img
              className={cx("avatar")}
              src={`http://localhost:4000/uploads/${user.avatar}`}
              alt="Avatar"
            />
            <input
              className={cx("input")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Bạn nghĩ gì ??"
            />
          </div>
          {blog.comments.length > 0 && (
            <div className={cx("list-comment")}>
              <div className={cx("list")}>
                {blog.comments.map((item: any) => {
                  return (
                    <div className={cx("comment")}>
                      <Tooltip
                        placement="top-start"
                        title={item.author.username}
                      >
                        <img
                          className={cx("img")}
                          src={`http://localhost:4000/uploads/${item.author.avatar}`}
                          alt="Avatar"
                        />
                      </Tooltip>

                      <span>{item.content}</span>
                      <span className="text-[11px] h-full flex items-center">
                        ({" "}
                        {formatDate(item.createdAt, "dd/MM/yyyy, hh:mm AM/PM")}{" "}
                        )
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <button className={cx("btn")} onClick={handleComment}>
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemBlog;
