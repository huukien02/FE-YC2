import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import axios from "axios";
import { useUserContext } from "@/pages/_app";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { createBlogs, getDataBlog } from "@/redux/actions";
import { resetDataCreateBlogs } from "@/redux/reducers";
import { toast } from "react-toastify";

interface BlogFormProps {
  setOpen: any;
}

const BlogForm: React.FC<BlogFormProps> = ({ setOpen }) => {
  const { userId } = useUserContext();
  const dispatch: AppDispatch = useDispatch();
  const { dataCreateBlogs } = useSelector((state: any) => state);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (userId) {
      dispatch(createBlogs({ title, content, userId, image }));
    }
  };

  useEffect(() => {
    if (dataCreateBlogs) {
      setOpen(false);
      setPreview(null);
    }
  }, [dataCreateBlogs]);

  return (
    <Container maxWidth="sm">
      <div className="text-blue-600 text-xl font-bold py-[10px]">
        Tạo Bài Viết Mới
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tiêu đề"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nội dung"
              variant="outlined"
              multiline
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
              style={{ display: "none" }} // Ẩn input file
              id="upload-image"
            />
            {preview ? (
              <div className="border flex py-[5px] justify-center">
                <img
                  onClick={() => {
                    setPreview(null);
                  }}
                  className="cursor-pointer"
                  src={preview ? preview : ""}
                  alt="Avatar Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : (
              <label htmlFor="upload-image">
                <Button variant="contained" component="span">
                  Tải lên Ảnh
                </Button>
              </label>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Tạo bài viết
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default BlogForm;
