import React from "react";
import { useQuery } from "react-query";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { ActorDetails } from "../types/interfaces";
import { useParams } from "react-router-dom"; // fixed import for userParams

const ActorDetailsPage: React.FC = () => {
const { id } =useParams<{ id: string }>();
  const { data: actor, error, isLoading, isError } = useQuery<ActorDetails, Error>(
    ["actor", id],
    () => getActor(id || "")
  );

  //follows same structure as other pages to handle loading, error, and data display states 
  if (isLoading) return <Spinner />;
  if (isError) return <Alert severity="error">{error.message}</Alert>;
  if (!actor) return <Alert severity="warning">Actor details are unavailable.</Alert>;

  return (
    <Box >
      <Paper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>    
            {actor.profile_path ? (
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                sx={{ width: "100%" }}
              />
            ) : (
              <Box sx={{ height: 420, bgcolor: "grey.300", display: "grid", placeItems: "center" }}>
                <Typography color="text.secondary">No image available</Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" sx={{ whiteSpace: "pre-line", lineHeight: 2 }}>{actor.name}</Typography>
            <Typography variant="subtitle1" sx={{ whiteSpace: "pre-line", lineHeight: 3 }}>{actor.known_for_department}</Typography>
            <Typography variant="h5" component="h2" sx={{ whiteSpace: "pre-line", lineHeight: 3 }}>Biography</Typography>
            <Typography sx={{ whiteSpace: "pre-line" }}>{actor.biography || "No biography is available for this actor."}
            </Typography>
            <Box sx={{ mt: 3 }}>
              {actor.birthday && <Typography>Born: {actor.birthday}</Typography>}
              {actor.place_of_birth && <Typography>Birthplace: {actor.place_of_birth}</Typography>}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ActorDetailsPage;