import React, { useState } from "react";
import { Actor } from "../../types/interfaces";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import ActorView from "../actorView";

interface ActorListProps {
  actors: Actor[];
}

const ActorList: React.FC<ActorListProps> = ({ actors }) => {
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
 
// Used https://mui.com/material-ui/react-drawer/ as reference to make drawer open - more basic than action but it does the job
// Similar to reviews
  const handleActorClick = (actor: Actor) => {
    setSelectedActor(actor);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedActor(null);
  };

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Cast
      </Typography>
      <Grid container spacing={2}>
        {actors.map((actor: Actor) => (
          <Grid item xs={12} sm={6} md={4} key={actor.id}>
            <Card
              onClick={() => handleActorClick(actor)}
            >
              {actor.profile_path && (
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  as {actor.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Drawer for Actor Details */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
        <div style={{ width: 500, padding: "20px" }}>
          {selectedActor && <ActorView {...selectedActor} />}
        </div>
      </Drawer>
    </div>
  );
};

export default ActorList;