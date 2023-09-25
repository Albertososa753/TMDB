import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link as A } from "react-router-dom";
import { Grid, Link } from "@nextui-org/react";

const Movies = () => {
  const [movies, setMovies] = useState({});

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular", {
        params: {
          api_key: "c4daa422c31e1fe695880097bdace9ca",
        },
      })
      .then((result) => {
        setMovies(result.data);
      });
  }, []);

  return (
    <div>
      <Grid.Container gap={2} justify="center">
        {movies.results
          ? movies.results.map((movie) => (
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
                  <A to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt="Descripción de la imagen"
                    />
                  </A>
                </Link>
              </Grid>
            ))
          : null}
      </Grid.Container>
    </div>
  );
};
export default Movies;
