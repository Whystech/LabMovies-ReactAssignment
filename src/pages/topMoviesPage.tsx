import PageTemplate from '../components/templateMovieListPage';
import { BaseMovieProps } from "../types/interfaces";
import { getTopRatedMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import { titleFilter } from "../components/movieFilterUI";
import { genreFilter } from "../components/movieFilterUI";
import Spinner from "../components/spinner";
import { TopMovies } from '../types/interfaces';
import { useQuery} from "react-query";
import MovieFilterUI from "../components/movieFilterUI";
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';


///Followed same structures as upcomingMoviesPage.tsx to create a new page for top movies.

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const TopMoviePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<TopMovies, Error>("topmovies", getTopRatedMovies);
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

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToPlaylistIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default TopMoviePage; 
