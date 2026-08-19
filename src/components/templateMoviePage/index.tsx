import MovieHeader from "../movieHeader";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages, getMovieActors } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps, Actor } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import ActorList from "../actorList";

const styles = {
    gridListRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    gridListTile: {
        width: 450,
        height: '100vh',
    },
};

interface TemplateMoviePageProps {
    movie: MovieDetailsProps;
    children: React.ReactElement;
}


const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({ movie, children }) => {
    const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
        ["images", movie.id],
        () => getMovieImages(movie.id)
    );

    const { data: actorData, isLoading: actorsLoading, isError: actorsError, error: actorError } = useQuery<Actor[], Error>( 
        ["actors", movie.id],
        () => getMovieActors(movie.id)
    );

    // Show loading for both images and actors
    if (isLoading || actorsLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{(error as Error).message}</h1>;
    }

    if (actorsError) {
        return <h1>{(actorError as Error).message}</h1>;
    }

    const images = data as MovieImage[];
    const actors = actorData || [];

    return (
        <>
            <MovieHeader {...movie} />
            
            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid item xs={3}>
                    <div>
                        <ImageList cols={1}>
                            {images.map((image: MovieImage) => (
                                <ImageListItem
                                    key={image.file_path}
                                    sx={styles.gridListTile}
                                    cols={1}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                                        alt={'Image alternative'}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </Grid>
                <Grid item xs={9}>

                    {children}
                    {/* Introduced Cast in template page */}
                         <div>
                          <ActorList actors={actors} />
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;
