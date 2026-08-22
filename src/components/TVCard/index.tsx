import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import { PlaylistAdd } from "@mui/icons-material";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import React, { MouseEvent, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { BaseTVDetailsProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

interface TVCardProps {
  series: BaseTVDetailsProps;
  action: (s: BaseTVDetailsProps) => React.ReactNode;
}

const TVCard: React.FC<TVCardProps> = ({ series, action }) => {
  const { favourites, addToFavourites } = useContext(MoviesContext);
  const { playlist, addToPlaylist } = useContext(MoviesContext);

  const isFavourite = favourites.find((id) => id === series.id) ? true : false; //NEW
  const isPlaylist = playlist.find((id) => id === series.id) ? true : false; //NEW

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? ( //CHANGED
            <Avatar sx={styles.avatar}>
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {series.name}{" "}
          </Typography>
        }
      />

      <CardMedia
        sx={styles.media}
        image={
          series.poster_path
            ? `https://image.tmdb.org/t/p/w500/${series.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
            
              {"FirstAir Date"} {series.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              
              <StarRateIcon fontSize="small" />
              {" Rating "} {series.vote_average.toFixed(1)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(series)}
        <Link to={`/tv/${series.id}`}>
        </Link>
      </CardActions>
    </Card>
  );
};

export default TVCard;
