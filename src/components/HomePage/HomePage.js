import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as fetchFilmsAPI from '../Services/themoviedb';

export default function HomePage() {
  const location = useLocation();
  console.log('HomePage', location);
  const { url } = useRouteMatch();
  const [trends, setTrends] = useState([]);
  //   console.log(match);
  useEffect(() => {
    fetchFilmsAPI.fetchTrends().then(setTrends);
  }, []);

  console.log(trends);
  let trendsAll = trends.results;
  //   console.log(trendsAll);
  return (
    <div>
      <h1>Trends</h1>
      <ul>
        {trendsAll &&
          trendsAll.map(trend => (
            <li key={trend.id}>
              <Link
                to={{
                  pathname: `movies/${trend.id}`,
                  state: { from: location },
                }}
              >
                {trend.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
