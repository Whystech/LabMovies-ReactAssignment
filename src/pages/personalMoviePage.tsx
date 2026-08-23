import React from "react";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "../types/interfaces";

const getSavedMovie = (): MovieDetailsProps | null => {
  const savedMovie = localStorage.getItem("personalMovie");
  return savedMovie ? (JSON.parse(savedMovie) as MovieDetailsProps) : null;
};

const PersonalMoviePage: React.FC = () => {
  const movie = getSavedMovie();

  if (!movie) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="info">No personal movie has been created yet.</Alert>
        <Button component={Link} to="/my-movie" sx={{ mt: 2 }} variant="contained">
          Create a movie
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: "auto" }}>
      <Paper sx={{ p: { xs: 2, md: 4 } }}>
        {/* It just points back to the create page */}
        <Button component={Link} to="/my-movie" > 
          Edit movie
        </Button>
        <Typography variant="h3" component="h1" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mt: 3 }} gutterBottom>
          Overview
        </Typography>
        <Typography >{movie.overview}</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          {movie.genres.map((genre) => (
            <Chip key={genre.id} label={genre.name} color="primary" />
          ))}
        </Stack>
        <Typography>Release date: {movie.release_date}</Typography>
        <Typography>Runtime: {movie.runtime} minutes</Typography>
        <Typography>
          Production company: {movie.production_companies[0]?.name || "Not specified"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default PersonalMoviePage;
