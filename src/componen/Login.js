import React from "react";
import useInput from "../hooks/useInput";
import axios from "axios";
import { Button, Input, Grid } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";
const Login = () => {
  const dispatch = useDispatch();
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:3001/api/user/login",
        {
          password: password.value,
          email: email.value,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((ress) => {
        dispatch(setUser(ress.data));
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontFamily: "Ysabeau SC" }}>LOGIN</h1>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
        <Grid.Container gap={4}>
          <Grid>
            <Input
              labelPlaceholder="Primary"
              label="Email"
              type="email"
              {...email}
            />
          </Grid>
        </Grid.Container>
        <Grid.Container gap={4}>
          <Grid>
            <Input
              labelPlaceholder="Primary"
              label="Password"
              type="password"
              {...password}
            />
          </Grid>
        </Grid.Container>
        <Grid>
          <Button type="submit" shadow color="gradient" auto>
            Send
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
