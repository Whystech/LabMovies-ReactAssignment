import React from "react";
import { Actor } from "../../types/interfaces";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

interface ActorViewProps extends Actor { }

const styles = {
  container: {
    padding: 2,
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 2,
  },
  profileImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: 1,
  },
  details: {
    padding: 2,
  },
};

const ActorView: React.FC<ActorViewProps> = ({ id, name, character, profile_path, order }) => {
  return (
    <Paper sx={styles.container}>
      {/* Followed same structure as movie list */}
      <Grid container spacing={3}>
        {/* Actor Profile Image */}
        <Grid item xs={12} sm={6} md={4}>
          {profile_path ? (
            <Box sx={styles.imageContainer}>
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={name}
                style={styles.profileImage as React.CSSProperties}
              />
            </Box>
          ) : (
            <Box sx={{ ...styles.imageContainer, height: 300, bgcolor: "grey.300" }}>
              <Typography variant="body2" color="textSecondary">
                No image available
              </Typography>
            </Box>
          )}
        </Grid>

        {/* Actor Details */}
        <Grid item xs={12} sm={6} md={8}>
          <Box sx={styles.details}>
            <Typography variant="h4" component="h1" gutterBottom>
              <Link to={`/actors/${id}`}>
                {name}
              </Link>
            </Typography>

            <Typography variant="h6" color="textSecondary" gutterBottom>
              Character: <strong>{character}</strong>
            </Typography>

            <Typography variant="body2" color="textSecondary">
              Cast Order: {order}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ActorView;