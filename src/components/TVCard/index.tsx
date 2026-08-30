import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import { BaseTVDetailsProps } from "../../types/interfaces";

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
  
  return (
    <Card sx={styles.card}>
    

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
              {" Rating "} {series.vote_average?.toFixed(1)}
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
