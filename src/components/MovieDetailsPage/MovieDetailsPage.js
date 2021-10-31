import { useEffect, useState } from 'react';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import * as fetchFilmsAPI from '../Services/themoviedb';
import GoBackBtn from '../GoBackBtn/GoBackBtn';
import { Route, useLocation, useHistory } from 'react-router-dom';
import Cast from '../Cast/Cast';

export default function MovieDetailsPage() {
  const location = useLocation();
  //   console.log(location.state);
  const history = useHistory();
  const { trendsId } = useParams();
  const { url } = useRouteMatch();
  const [trends, setTrends] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchFilmsAPI.fetchTrendsById(trendsId).then(setTrends);
  }, [trendsId]);
  //   console.log(trends);

  useEffect(() => {
    fetchFilmsAPI.fetchCast(trendsId).then(setCast);
  }, [trendsId]);
  //   console.log(cast);

  const handleGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };
  return (
    <div>
      <GoBackBtn onBack={handleGoBack} />
      {trends && (
        <>
          {trends.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${trends.poster_path}`}
              alt={trends.title}
            />
          )}
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
              trends.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
          </ul>
          <hr />
          <ul>
            Additional information
            <li>
              <Link
                to={{
                  pathname: `${url}/cast`,
                }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link to="/movies/${:trendsId}/reviews">Reviews</Link>
            </li>
          </ul>
          <hr />
          <Route path="/movies/:trendsId/cast">
            <Cast />
          </Route>
        </>
      )}
    </div>
  );
}
