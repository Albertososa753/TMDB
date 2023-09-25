import axios from "axios";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Link as Elena } from "react-router-dom";

import { Grid, Link } from "@nextui-org/react";

const Search = () => {
  const [serchMovie, setSerchMovie] = useState("");

  const handleInput = (e) => {
    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: "c4daa422c31e1fe695880097bdace9ca",
          query: e.target.value,
          include_adult: false,
        },
      })
      .then((params) => {
        setSerchMovie(params.data);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          marginTop: "50px",
        }}
      >
        <Input onChange={handleInput} labelPlaceholder="Search" />
      </div>
      <Grid.Container gap={2} justify="center">
        {serchMovie.results
          ? serchMovie.results.map((movie) => (
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                xs={4}
                key={movie.id}
              >
                <Link
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  block
                  color={"primary"}
                >
                  <h3> {movie.title}</h3>
                  <Elena to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="Descripción de la imagen"
                    />
                  </Elena>
                </Link>
              </Grid>
            ))
          : null}
      </Grid.Container>
    </div>
  );
};

export default Search;
