import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames/bind";
import DefaultLayout from "../../layout";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/actions";
import { resetError, resetDataRegister } from "../../redux/reducers";

const cx = classNames.bind(styles);

export default function Index() {
  const dispatch: AppDispatch = useDispatch();
  const { dataRegister, error } = useSelector((state: any) => state);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = async () => {
    let newErrors = { email: "", username: "", password: "" };
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

    if (username && password && email) {
      dispatch(userRegister({ email, username, password }));
    }
  };

  useEffect(() => {
    if (error) {
      toast(error.message, {
        type: "error",
      });
      dispatch(resetError());
    }
    if (dataRegister) {
      toast(dataRegister.message, {
        type: "success",
      });
      setEmail("");
      setUsername("");
      setPassword("");
      dispatch(resetError());
      dispatch(resetDataRegister());
    }
  }, [error, dataRegister]);

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
