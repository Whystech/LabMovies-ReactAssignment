import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { getMovieActors } from "../api/tmdb-api";



const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
// not worth to try to put the cast here as all templates and current architecture is rigid and one-way
  const { data: movie, error, isLoading, isError } =
    useQuery(["movie", id], async () => {
      const movie = await getMovie(id || "");
      const credits = await getMovieActors(id || "");
      console.log("CREDITS:", credits);
      return { ...movie, cast: credits };
    });

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{(error as Error).message}</h1>;

  return movie ? (
    <PageTemplate movie={movie}>
      <>
        <MovieDetails {...movie} />
      </>
    </PageTemplate>
  ) : (
    <p>Waiting for movie details</p>
  );
};


export default MovieDetailsPage;
