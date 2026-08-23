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

// as it is right now, it just creates one fantasy movie and saves it to local storage and then displays it
// there is no permanence to it 
// the movie will be listed as most recently added movie 

//returns latest saved movie from local storage if available, otherwise null
const getSavedMovie = (): MovieDetailsProps | null => {
  const savedMovie = localStorage.getItem("personalMovie");
  if (!savedMovie) return null;
  try {
    return JSON.parse(savedMovie) as MovieDetailsProps;
  } catch {
    localStorage.removeItem("personalMovie");
    return null;
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
  const [createdMovie, setCreatedMovie] = useState<MovieDetailsProps | null>(getSavedMovie);

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
    setCreatedMovie(personalMovie);
   localStorage.setItem("personalMovie", JSON.stringify(personalMovie));
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

        {createdMovie && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Your movie, {createdMovie.title}, has been created.
          </Alert>
        )}

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
              <Button type="submit" variant="contained">Create movie</Button>
              <Button component={Link} to="/" variant="outlined">Cancel</Button>
            </Stack>
          </Stack>
        </Box>
                
        {createdMovie && (
            // Created movie from local storage is displayed below the form
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" component="h2" gutterBottom>
            Most Recently added movie
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
              {createdMovie.title}
            </Typography>
            <Typography sx={{ mb: 2 }}>{createdMovie.overview}</Typography>
            <Typography>Genres: {createdMovie.genres.map((genre) => genre.name + " ") || "None"}</Typography>
            <Typography>Release date: {createdMovie.release_date}</Typography>
            <Typography>Runtime: {createdMovie.runtime} minutes</Typography>
            <Typography>
              Production company: {createdMovie.production_companies[0].name}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PersonalMoviePage;