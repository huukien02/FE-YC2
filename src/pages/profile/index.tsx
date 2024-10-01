import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import Head from "next/head";
import DefaultLayout from "../../layout";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

export default function Index() {
  const [avatar, setAvatar] = useState<File | null>(null); // state để lưu avatar
  const [user, setUser] = useState({
    id: null,
    avatar: "",
    username: "",
    email: "",
  });
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Gọi API để lấy thông tin người dùng
      const fetchUserData = async () => {
        try {
          const response = await axiosInstance.get(
            `http://localhost:4000/users/${userId}`
          );
          setUser(response.data.user);
        } catch (err) {}
      };

      fetchUserData();
    } else {
    }
  }, [preview]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  // Hàm xử lý upload
  const handleUpload = async () => {
    // Tạo FormData để gửi file
    const formData = new FormData();
    if (user && avatar) {
      formData.append("userId", `${user.id}`); // Thêm ID người dùng
      formData.append("avatar", avatar); // Thêm file avatar
    }

    try {
      const response = await axiosInstance.put(
        "http://localhost:4000/users/upload-avatar",
        formData, // Gửi formData thay vì object
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt Content-Type cho multipart
          },
        }
      );
      if (response.data) {
        setAvatar(null);
        setPreview(null);
        toast("Cập nhật thành công", {
          type: "success",
        });
      }
    } catch (error) {
      console.error("Lỗi khi upload:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(
        "http://localhost:4000/users/update",
        {
          username,
          email,
          userId: user.id,
        }
      );

      if (response.data) {
        console.log(response.data);
        setUser(response.data.user);
        toast("Cập nhật thành công", {
          type: "success",
        });
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <DefaultLayout>
      <div className="w-[400px] rounded-[10px] border border-[lightgray]">
        <div className="flex flex-col gap-[25px] py-[15px] px-[10px]">
          <h2 className="font-bold text-[1.5rem] text-blue-600">Profile</h2>

          <label>
            <img
              className="rounded-full h-[80px] w-[80px] border border-[#dbd2d2] shadow-lg cursor-pointer"
              src={`http://localhost:4000/uploads/${user.avatar}`}
              alt="Avatar"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAvatar(e.target.files[0]); // Cập nhật file avatar
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="hidden"
            />
          </label>

          <Modal
            open={avatar ? true : false}
            onClose={() => {
              setAvatar(null);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex flex-col gap-[10px] justify-center items-center">
                <span>Xem trước Avatar</span>
                <img
                  src={preview ? preview : ""}
                  alt="Avatar Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "100%",
                  }}
                />
                <Button
                  onClick={handleUpload}
                  sx={{
                    height: "50px",
                    marginTop: "16px", // Thêm khoảng cách giữa các thành phần
                  }}
                  variant="contained"
                >
                  Upload
                </Button>
              </div>
            </Box>
          </Modal>

          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            disabled={
              !email ||
              !username ||
              (email === user.email && username === user.username)
            }
            onClick={handleUpdate}
            sx={{
              height: "50px",
              marginTop: "16px",
            }}
            variant="contained"
          >
            Update
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
}
