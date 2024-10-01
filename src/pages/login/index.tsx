import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import Head from "next/head";
import DefaultLayout from "../../layout";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

export default function Index() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      let newErrors = { email: "", username: "", password: "" };

      if (!username) {
        newErrors.username = "Username không được để trống";
      }
      if (!password) {
        newErrors.password = "Password không được để trống";
      }

      setErrors(newErrors);
      const response = await axiosInstance.post("http://localhost:4000/login", {
        username,
        password,
      });

      if (response.data) {
        localStorage.setItem("userId", response.data.user.id);
        toast("Đăng nhập thành công", {
          type: "success",
        });
      }
    } catch (err: any) {
      toast(err.response.data.message, {
        type: "error",
      });
    }
  };
  return (
    <DefaultLayout>
      <div className="w-[400px] rounded-[10px] border border-[lightgray]">
        <div className="flex flex-col gap-[25px] py-[15px] px-[10px]">
          <h2 className="font-bold text-[1.5rem] text-blue-600">Login Page</h2>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            onClick={handleLogin}
            sx={{
              height: "50px",
            }}
            variant="contained"
          >
            Login
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
}
