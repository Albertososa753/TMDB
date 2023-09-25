import axios from "axios";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import Navbar from "./componen/Navbar";
import Movies from "./componen/Movies";
import Home from "./componen/Home";
import Programs from "./componen/Programs";
import Register from "./componen/Register";
import Login from "./componen/Login";
import Search from "./componen/Search";
import Movie from "./componen/Movie";
import Program from "./componen/Program";
import { useDispatch } from "react-redux";
import { setUser } from "./state/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/me", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        dispatch(setUser(res.data));

        return res.data;
      })

      .catch(() => {
        console.log("not loging");
      });
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/movies" element={<Movies />} />
          <Route path="/Tv" element={<Programs />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/Tv/:id" element={<Program />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
