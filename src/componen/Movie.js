import axios from "axios";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Text } from "@nextui-org/react";

const Movie = () => {
  const paramMovie = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${paramMovie.id}`, {
        params: {
          api_key: "c4daa422c31e1fe695880097bdace9ca",
        },
      })
      .then((movie) => {
        setMovie(movie.data);
      });
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      {movie ? (
        <div>
          <h3>{movie.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt="Descripción de la imagen"
          />
          <Text>{movie.overview}</Text>
        </div>
      ) : null}
    </div>
  );
};
export default Movie;
