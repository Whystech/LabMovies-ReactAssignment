# Movies App

A React and TypeScript movie application using data from The Movie Database (TMDB).
The project extends the original Movies app with actor details, top-rated movies,
TV series, and a personal fantasy movie creator.

## Features

- Browse discovered, upcoming, and top-rated movies
- Browse TV series
- Filter movies by title and genre
- View movie details, images, reviews, and cast
- Open actor details from the cast view
- Create and view a personal fantasy movie
- Add movies to favourites or a playlist
- Write and view movie reviews
- Explore reusable components in Storybook

## Getting Started

### Requirements

- Node.js
- A TMDB API key

### Installation

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_TMDB_KEY=your_tmdb_api_key
```

Get an API key from the [TMDB developer portal](https://developer.themoviedb.org/docs/authentication-1).
Do not commit the `.env` file or your API key to the repository.

Start the development server:

```bash
npm run dev
```

The application will be available at the local URL shown in the terminal.

## Useful Scripts

```bash
npm run dev             # Start the Vite development server
npm run build           # Type-check and build the application
npm run lint            # Run ESLint
npm run storybook       # Start Storybook
npm run build-storybook # Build Storybook
```

## Main Routes

- `/` - Discover movies
- `/movies/upcoming` - Upcoming movies
- `/topmovies` - Top-rated movies
- `/movies/favourites` - Favourite movies
- `/movies/playlist` - Playlist
- `/movies/:id` - Movie details
- `/actors/:id` - Actor details
- `/tvseries` - TV series
- `/my-movie` - Create a personal fantasy movie
- `/my-movie-page` - View the saved personal movie
- `/reviews/:id` - Movie reviews
- `/reviews/form` - Add a review

## Technologies

- React and TypeScript
- Vite
- Material UI
- React Router
- React Query
- Storybook

## References

- [TMDB API documentation](https://developer.themoviedb.org/docs)
- [TMDB top-rated movies endpoint](https://developer.themoviedb.org/reference/movie-top-rated-list)
- [TMDB TV discover endpoint](https://developer.themoviedb.org/reference/discover-tv)
- [TMDB actor details endpoint](https://developer.themoviedb.org/reference/person-details)
- [React documentation](https://react.dev/)
- [React Router documentation](https://reactrouter.com/)
- [Material UI documentation](https://mui.com/)
- [Vite documentation](https://vitejs.dev/guide/)
- [React Query documentation](https://tanstack.com/query/v3/)
- [Storybook documentation](https://storybook.js.org/docs)
- [Drawer Documentation](https://mui.com/material-ui/react-drawer/)

This product uses the TMDB API but is not endorsed or certified by TMDB.


