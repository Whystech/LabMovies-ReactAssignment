import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PlaylistMoviePage from "./pages/playlistPage";
import TopMoviesPage from "./pages/topMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import TVSeriesPageList from "./pages/TVSeriesPage";
import PersonalMoviePageCreator from "./pages/personalMoviePageCreator";
import PersonalMoviePage from "./pages/personalMoviePage";  
import AuthContextProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import ProtectedRoute from "./components/protectedRoute";
import SignupPage from "./pages/signupPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SiteHeader />
          <MoviesContextProvider>
            <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/movies/favourites" element={<ProtectedRoute><FavouriteMoviesPage /></ProtectedRoute>} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/reviews/form" element={<ProtectedRoute><AddMovieReviewPage /></ProtectedRoute>} />
            <Route path="/movies/playlist" element={<ProtectedRoute><PlaylistMoviePage /></ProtectedRoute>} />
            <Route path="/topmovies" element={<TopMoviesPage />} />
            <Route path="/actors/:id" element={<ActorDetailsPage />} />
            <Route path="/tvseries" element={<TVSeriesPageList />} />
            <Route path="/my-movie" element={<ProtectedRoute><PersonalMoviePageCreator /></ProtectedRoute>} />
            <Route path="/my-movie-page" element={<ProtectedRoute><PersonalMoviePage /></ProtectedRoute>} />
            </Routes>
          </MoviesContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

