import { useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import Head from "next/head";
import DefaultLayout from "../../layout";
import { Button, TextField } from "@mui/material";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
interface Response {
  data: {
    status: boolean;
    message: string;
    user: {
      id: number;
      createdAt: string;
      updatedAt: string;
      email: string;
      password: string;
      username: string;
    };
  };
}
export default function Index() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      let newErrors = { email: "", username: "", password: "" };

      // Kiểm tra lỗi
      if (!email) {
        newErrors.email = "Email không được để trống";
      }
      if (!username) {
        newErrors.username = "Username không được để trống";
      }
      if (!password) {
        newErrors.password = "Password không được để trống";
      }

      setErrors(newErrors);
      const response: Response = await axiosInstance.post(
        "http://localhost:4000/users/create",
        {
          email,
          username,
          password,
        }
      );

      if (response.data) {
        toast("Tạo thành công", {
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
          <h2 className="font-bold text-[1.5rem] text-blue-600">
            Register Page
          </h2>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
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
            onClick={handleRegister}
            sx={{
              height: "50px",
            }}
            variant="contained"
          >
            Register
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
}
