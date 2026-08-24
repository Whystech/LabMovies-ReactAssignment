import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "../types/interfaces";

const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Science Fiction"];

// Returns saved personal movies from local storage.
const getSavedMovies = (): MovieDetailsProps[] => {
  const savedMovies = localStorage.getItem("personalMovies");
  if (!savedMovies) return [];
  try {
    return JSON.parse(savedMovies) as MovieDetailsProps[];
  } catch {
    localStorage.removeItem("personalMovies");
    return [];
  }
};

// follows same structures as MovieDetailsProps for the movie properties
const PersonalMoviePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [releaseDate, setReleaseDate] = useState("");
  const [runtime, setRuntime] = useState(90);
  const [productionCompany, setProductionCompany] = useState("");
  const [createdMovies, setCreatedMovies] = useState<MovieDetailsProps[]>(getSavedMovies);

  // similar to genres functionality in lab 
  const handleGenreChange = (genre: string) => {
    setSelectedGenres((currentGenres) =>
      currentGenres.includes(genre)
        ? currentGenres.filter((currentGenre) => currentGenre !== genre)
        : [...currentGenres, genre]
    );
  };

  // Set data for personal movie
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const personalMovie: MovieDetailsProps = {
      id: Date.now(),
      title,
      overview,
      release_date: releaseDate,
      runtime,
      genres: selectedGenres.map((name, index) => ({ id: index + 1, name })),
      production_companies: [{ id: 1, name: productionCompany }],
      production_countries: [],
      homepage: undefined,
      imdb_id: "",
      original_language: "en",
      popularity: 0,
      poster_path: undefined,
      tagline: "",
      budget: 0,
      revenue: 0,
      vote_average: 0,
      vote_count: 0,
    };
    const updatedMovies = [...createdMovies, personalMovie];
    setCreatedMovies(updatedMovies);
    localStorage.setItem("personalMovies", JSON.stringify(updatedMovies));
  };

  return (
    <Box sx={{maxWidth: 900, margin: "0 auto" }}>
      <Paper>
        <Typography variant="h3" component="h1" gutterBottom>
          Create My Fantasy Movie
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Design a movie using your own details.
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              required
              label="Movie title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <TextField
              required
              multiline
              minRows={5}
              label="Overview"
              value={overview}
              onChange={(event) => setOverview(event.target.value)}
            />
            <Box>
              <Typography component="h2" variant="h6">Genres</Typography>
              <FormGroup row>
                {genres.map((genre) => (
                  <FormControlLabel
                    key={genre}
                    label={genre}
                    control={
                      <Checkbox
                        checked={selectedGenres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      />
                    }
                  />
                ))}
              </FormGroup>
            </Box>
            <TextField
              required
              type="date"
              label="Release date"
              value={releaseDate}
              onChange={(event) => setReleaseDate(event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              type="number"
              label="Runtime (minutes)"
              value={runtime}
              onChange={(event) => setRuntime(Number(event.target.value))}
              inputProps={{ min: 1, max: 600 }}
            />
            <TextField
              required
              label="Production company"
              value={productionCompany}
              onChange={(event) => setProductionCompany(event.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <Button type="submit">Create movie</Button>

            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default PersonalMoviePage;