import React, { useState } from "react";
import { BaseTVDetailsProps } from "../../types/interfaces";
import TVCard from "../TVCard";
import Grid from "@mui/material/Grid";

const TVList: React.FC<{ series: BaseTVDetailsProps[]; action: (s: BaseTVDetailsProps) => React.ReactNode }> = ({ series, action }) => {
  const seriesCards = series.map((s) => (
    <Grid key={s.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
             <TVCard key={s.id} series={s} action={action}/>
    </Grid>
  ));
  return seriesCards;
}

  export default TVList;
