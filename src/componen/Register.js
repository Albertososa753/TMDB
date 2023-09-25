import axios from "axios";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const name = useInput();
  const password = useInput();
  const email = useInput();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/user/register", {
        name: name.value,
        password: password.value,
        email: email.value,
      })
      .then((ress) => {
        const newUser = ress.data;
        return newUser;
      })
      .then(() => {
        navigate("/user/login");
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
      <h1 style={{ fontFamily: "Ysabeau SC" }}>REGISTER</h1>
      <form
        style={{
          width: "25rem",
          height: "25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          borderRadius: "2rem",
        }}
        onSubmit={handleSubmit}
      >
        <Input
          labelPlaceholder="NextUI"
          label="Name"
          type="text"
          status="default"
          {...name}
        />

        <Input
          labelPlaceholder="NextUI"
          label="Paswword"
          type="password"
          status="default"
          {...password}
        />

        <Input
          labelPlaceholder="NextUI"
          label="Email"
          type="email"
          status="default"
          {...email}
        />

        <Button type="submit" shadow color="gradient" auto>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Register;
