# Movies App

A React and TypeScript single-page application built around The Movie Database (TMDB) API.
It extends the original Movies app with top-rated movies, TV series, actor details, personal movies, and Supabase authentication.

## Features

- Browse discovered, upcoming, and top-rated movies
- Browse TV series
- Filter movie and TV results
- View movie details, images, reviews, and cast
- Open actor details from cast cards
- Add movies to favourites and playlists
- Create and view personal fantasy movies
- Sign up and sign in with Supabase
- Protect user-specific routes
- Cache TMDB server state with React Query
- Explore reusable components in Storybook

## Setup

### Requirements

- Node.js
- A TMDB API key
- A Supabase project with email authentication enabled

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_TMDB_KEY=your_tmdb_api_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY==publishable_key
```

API keys can be obtained from the [TMDB developer portal](https://developer.themoviedb.org/docs/authentication-1) and the Supabase project API settings.

Start the development server:

```bash
npm run dev
```
## Routes

### Public routes

- `/` - Discover movies
- `/movies/upcoming` - Upcoming movies
- `/topmovies` - Top-rated movies
- `/movies/:id` - Movie details
- `/actors/:id` - Actor details
- `/tvseries` - TV series
- `/reviews/:id` - Review details
- `/login` - Sign in
- `/signup` - Create an account

### Protected routes

These routes require an authenticated Supabase user:

- `/movies/favourites` - Favourite movies
- `/movies/playlist` - Playlist
- `/reviews/form` - Add a movie review
- `/my-movie` - Create a personal fantasy movie
- `/my-movie-page` - View saved personal movies

Unauthenticated users are redirected to `/login` by `ProtectedRoute`.

## Data and Storage

- TMDB data is fetched through the functions in `src/api/tmdb-api.ts`.
- React Query caches API responses in the browser as client-side server-state caching.
- Personal movies are stored in browser `localStorage` under `personalMovies`.
- Favourites and playlists currently use React context state and browser storage in parts of the application.

## Technologies

- React 18 and TypeScript
- Vite
- Material UI
- React Router
- React Query
- Supabase Auth
- Storybook

## References

- [TMDB API documentation](https://developer.themoviedb.org/docs)
- [TMDB authentication](https://developer.themoviedb.org/docs/authentication-1)
- [TMDB top-rated movies endpoint](https://developer.themoviedb.org/reference/movie-top-rated-list)
- [TMDB TV discover endpoint](https://developer.themoviedb.org/reference/discover-tv)
- [TMDB actor details endpoint](https://developer.themoviedb.org/reference/person-details)
- [React documentation](https://react.dev/)
- [React Router documentation](https://reactrouter.com/)
- [Material UI documentation](https://mui.com/)
- [React Query documentation](https://tanstack.com/query/v3/)
- [Supabase Auth documentation](https://supabase.com/docs/guides/auth)
- [Material UI Drawer documentation](https://mui.com/material-ui/react-drawer/)

## Notes

- Main (personal) objective I aimed during this assignment was to put in-place a modern authenitcation method that could serve in the future as a learning cornerstone for future projects.
- This came with the challenge of understanding routes and protected routes.
- I still do find React complex and there are multiple other places where I could have tried to make a deeper dive in terms of functionality.
- Had to use CI = false in Vercel as there were some unused imports and as I did not want to break additional stuff, I just sent it
