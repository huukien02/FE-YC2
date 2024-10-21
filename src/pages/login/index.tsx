import styles from "./index.module.scss";
import classNames from "classnames/bind";
import DefaultLayout from "../../layout";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions";
import { resetError, resetDataLogin } from "../../redux/reducers";

const cx = classNames.bind(styles);

export default function Index() {
  const dispatch: AppDispatch = useDispatch();
  const { dataLogin, error } = useSelector((state: any) => state);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    let newErrors = { email: "", username: "", password: "" };

    if (!username) {
      newErrors.username = "Username không được để trống";
    }
    if (!password) {
      newErrors.password = "Password không được để trống";
    }
    setErrors(newErrors);

    if (username && password) {
      dispatch(userLogin({ username, password }));
    }
  };

  useEffect(() => {
    if (error) {
      toast(error.message, {
        type: "error",
      });
      dispatch(resetError());
    }
    if (dataLogin) {
      toast(dataLogin.message, {
        type: "success",
      });
      localStorage.setItem("userId", dataLogin.user.id);
      dispatch(resetError());
      dispatch(resetDataLogin());
    }
  }, [error, dataLogin]);

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
