import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';

import NotFound from './components/HomePage/NotFound';

const HomePage = lazy(() =>
  import('./components/HomePage/HomePage' /*webpackChunkName: "home-page"*/),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage' /*webpackChunkName: "movie-getails-page"*/
  ),
);
const MoviesPage = lazy(() =>
  import(
    './components/MoviesPage/MoviesPage' /*webpackChunkName: "movies-page"*/
  ),
);
export default function App() {
  return (
    <div>
      <Navigation />
      <hr></hr>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <MoviesPage />
          </Route>
          <Route path="/movies/:trendsId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
