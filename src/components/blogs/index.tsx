import "../../app/globals.css";

import React, { useEffect, useState } from "react";
import BlogForm from "./blog-form";
import axiosInstance from "@/lib/axios";
import BlogList from "./blog-list";
import Header from "@/layout/header";
import { Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataBlog, getProfile } from "../../redux/actions";
import { AppDispatch } from "../../redux/store";
import { useUserContext } from "@/pages/_app";
import { toast } from "react-toastify";
import { resetDataCommentBlogs, resetDataCreateBlogs } from "@/redux/reducers";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  p: 4,
};

export interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl?: string; // optional
  userId: number; // ID của người dùng đã tạo bài viết
  createdAt: Date; // Ngày tạo bài viết
  updatedAt: Date; // Ngày cập nhật bài viết
}
const Blogs = () => {
  const { userId } = useUserContext();
  const [open, setOpen] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { dataCommentBlogs, dataCreateBlogs } = useSelector(
    (state: any) => state
  );

  useEffect(() => {
    dispatch(getDataBlog());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getProfile({ userId }));
    }
  }, [userId]);

  useEffect(() => {
    if (dataCommentBlogs) {
      toast(dataCommentBlogs.message, {
        type: "success",
      });
      dispatch(getDataBlog());
      dispatch(resetDataCommentBlogs());
    }
  }, [dataCommentBlogs]);

  useEffect(() => {
    if (dataCreateBlogs) {
      toast(dataCreateBlogs.message, {
        type: "success",
      });

      dispatch(resetDataCreateBlogs());
      dispatch(getDataBlog());
      setOpen(false);
    }
  }, [dataCreateBlogs]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fff] text-[black]">
      <Header />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BlogForm setOpen={setOpen} />
        </Box>
      </Modal>
      <div className="w-full flex items-center justify-center py-[10px]">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="hover:bg-[#f0f0f3] duration-150 border w-[400px] h-[60px] rounded-[10px]"
        >
          Bạn đang nghĩ gì vậy ??
        </button>
      </div>

      <BlogList />
    </div>
  );
};

export default Blogs;
