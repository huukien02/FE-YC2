import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import Head from "next/head";
import DefaultLayout from "../../layout";
import { Box, Button, Modal, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile, uploadAvatar } from "../../redux/actions";
import { resetDataUploadAvatar } from "../../redux/reducers";
import { useUserContext } from "../_app";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export default function Index() {
  const { userId } = useUserContext();

  const dispatch: AppDispatch = useDispatch();
  const { dataProfile, dataEditProfile, dataUploadAvatar, error } = useSelector(
    (state: any) => state
  );

  const [avatar, setAvatar] = useState<File | null>(null); // state để lưu avatar
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(getProfile({ userId }));
    }
  }, [userId]);

  useEffect(() => {
    if (dataProfile) {
      setUsername(dataProfile?.user.username);
      setEmail(dataProfile?.user.email);
    }
  }, [dataProfile]);

  useEffect(() => {
    if (dataEditProfile) {
      toast(dataEditProfile.message, { type: "success" });
    }

    if (dataUploadAvatar && userId) {
      toast(dataUploadAvatar.message, { type: "success" });
      dispatch(getProfile({ userId }));
      dispatch(resetDataUploadAvatar());
    }
  }, [dataEditProfile, dataUploadAvatar, userId]);

  // Hàm xử lý upload
  const handleUpload = async () => {
    if (dataProfile && avatar) {
      dispatch(uploadAvatar({ userId: dataProfile?.user.id, avatar: avatar }));
      setAvatar(null);
    }
  };

  const handleUpdate = async () => {
    try {
      dispatch(
        updateProfile({ email, username, userId: dataProfile?.user.id })
      );
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
              src={`http://localhost:4000/uploads/${dataProfile?.user?.avatar}`}
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
