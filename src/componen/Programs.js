import axios from "axios";

import React from "react";
import { useEffect, useState } from "react";
import { Link as A } from "react-router-dom";

import { Grid, Link } from "@nextui-org/react";
const Programs = () => {
  const [programs, setPrograms] = useState({});

  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/tv/popular", {
        params: {
          api_key: "c4daa422c31e1fe695880097bdace9ca",
        },
      })
      .then((prog) => {
        setPrograms(prog.data);
      });
  }, []);
  console.log("prograaaam", programs.results);
  return (
    <div>
      <Grid.Container gap={2} justify="center">
        {programs.results
          ? programs.results.map((program) => (
              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                xs={4}
                key={program.id}
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
                  <h3> {program.name}</h3>
                  <A to={`/Tv/${program.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${program.poster_path}`}
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

export default Programs;
