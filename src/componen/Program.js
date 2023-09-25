import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text } from "@nextui-org/react";

const Program = () => {
  const prog = useParams();
  const [tv, setTv] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/${prog.id}`, {
        params: {
          api_key: "c4daa422c31e1fe695880097bdace9ca",
        },
      })
      .then((movie) => {
        setTv(movie.data);
      });
  }, []);

  return (
    <div>
      {tv ? (
        <div>
          <h3>{tv.name}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
            alt="Descripción de la imagen"
          />
          <Text>{tv.overview}</Text>
        </div>
      ) : null}
    </div>
  );
};

export default Program;
