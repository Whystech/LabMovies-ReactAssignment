import React from "react";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { BaseTVDetailsProps, DiscoverSeries } from "../types/interfaces";
import TVSeriesListPageTemplate from "../components/templateTVSeriesListPage";
import { getTVSerieses } from "../api/tmdb-api";

const tvTitleFilter = (series: BaseTVDetailsProps, value: string): boolean => {
  return series.name.toLowerCase().includes(value.toLowerCase());
};

const tvGenreFilter = (series: BaseTVDetailsProps, value: string): boolean => {
  const genreId = Number(value);
  return genreId === 0 || Boolean(series.genre_ids?.includes(genreId));
};

const titleFiltering = {
  name: "title",
  value: "",
  condition: tvTitleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: tvGenreFilter,
};

const TVSeriesPageList: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverSeries, Error>("discover-tv", getTVSerieses);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const series = data ? data.results : [];
  const displayedTVSeries = filterFunction(series);

  return (
    <>
      <TVSeriesListPageTemplate
        title="Discover TV Series"
        series={displayedTVSeries}
        tvSeriesAction={(_series: BaseTVDetailsProps) => null}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default TVSeriesPageList;
