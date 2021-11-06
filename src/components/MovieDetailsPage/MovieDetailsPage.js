import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import * as fetchFilmsAPI from '../Services/themoviedb';
import GoBackBtn from '../GoBackBtn/GoBackBtn';
import { Route, useLocation, useHistory } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast' /*webpackChunkName: "casts"*/));
const Reviews = lazy(() =>
  import('../Reviews/Reviews' /*webpackChunkName: "reviews"*/),
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { trendsId } = useParams();
  const { url } = useRouteMatch();
  const [trends, setTrends] = useState([]);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchFilmsAPI.fetchTrendsById(trendsId).then(setTrends);
  }, [trendsId]);

  useEffect(() => {
    fetchFilmsAPI.fetchCast(trendsId).then(setCast);
  }, [trendsId]);
  console.log(cast);

  useEffect(() => {
    fetchFilmsAPI.fetchReviews(trendsId).then(setReviews);
  }, [trendsId]);
  console.log(reviews);

  const handleGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };
  return (
    <div>
      <GoBackBtn onBack={handleGoBack} />
      {trends && (
        <>
          <div className={s.wrapper}>
            <div>
              {trends.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${trends.poster_path}`}
                  alt={trends.title}
                  className={s.img}
                />
              )}
            </div>
            <div className={s.info}>
              <h1>
                {trends.title}(
                {trends.release_date && trends.release_date.slice(0, 4)})
              </h1>
              <p>User Score: {trends.vote_average * 10}%</p>
              <h2>Overvies</h2>
              <p>{trends.overview}</p>
              <h2>Genres</h2>
              <ul>
                {trends.genres &&
                  trends.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
              </ul>
            </div>
          </div>
          <hr />
          <ul className={s.additional}>
            <h3>Additional information</h3>
            <li>
              <Link
                to={{
                  pathname: `${url}/cast`,
                  state: { from: location.state.from },
                }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: `${url}/reviews`,
                  state: { from: location.state.from },
                }}
              >
                Reviews
              </Link>
            </li>
          </ul>
          <hr />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Route path="/movies/:trendsId/cast">
              <Cast cast={cast} />
            </Route>
            <Route path="/movies/:trendsId/reviews">
              {reviews.results && <Reviews reviews={reviews} />}
            </Route>
          </Suspense>
        </>
      )}
    </div>
  );
}
