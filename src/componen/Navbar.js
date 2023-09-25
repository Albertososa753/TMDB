import React from "react";
import axios from "axios";

import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Layout } from "../utils/Layout.js";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../state/user.js";
import { Text as A } from "@nextui-org/react";

export default function Naavbar() {
  const variant = "floating";
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });
  const handleLogout = () => {
    axios
      .get("http://localhost:3001/api/user/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      .then(() => {
        dispatch(setUser(false));
      });
  };
  return (
    <div>
      {user ? (
        <Layout>
          <Navbar isBordered variant={variant}>
            <Navbar.Brand>
              <Text b color="inherit" hideIn="xs"></Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
              <Navbar.Link isActive href="/">
                HOME
              </Navbar.Link>
              <Navbar.Link href="/movies">MOVIES</Navbar.Link>
              <Navbar.Link href="/Tv">TV SERIES</Navbar.Link>
              <Navbar.Link href="/search">SEARCH</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
              <Navbar.Item>
                <A color="primary" size="$3xl">
                  {" "}
                  {`Welcom to TMDB ${user.name}!`}
                </A>
              </Navbar.Item>
              <Navbar.Item>
                <Button auto flat as={Link} onClick={handleLogout}>
                  LOGOUT
                </Button>
              </Navbar.Item>
            </Navbar.Content>
          </Navbar>
        </Layout>
      ) : (
        <Layout>
          <Navbar isBordered variant={variant}>
            <Navbar.Brand>
              <Text b color="inherit" hideIn="xs"></Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
              <Navbar.Link isActive href="/">
                HOME
              </Navbar.Link>
              <Navbar.Link href="/movies">MOVIES</Navbar.Link>
              <Navbar.Link href="/Tv">TV SERIES</Navbar.Link>
              <Navbar.Link href="/search">SEARCH</Navbar.Link>
            </Navbar.Content>

            <Navbar.Content>
              <Navbar.Item>
                <Button auto flat as={Link} href="/user/login">
                  LOGIN
                </Button>
              </Navbar.Item>
              <Navbar.Item>
                <Button auto flat as={Link} href="/user/register">
                  REGISTER
                </Button>
              </Navbar.Item>
            </Navbar.Content>
          </Navbar>
        </Layout>
      )}
    </div>
  );
}
