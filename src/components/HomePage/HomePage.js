import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as fetchFilmsAPI from '../Services/themoviedb';
import s from './HomePage.module.css';

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
    <div className={s.wrapper}>
      <h1 className={s.pageTitle}>Trends</h1>
      <ul className={s.pageList}>
        {trendsAll &&
          trendsAll.map(trend => (
            <li key={trend.id} className={s.pageItem}>
              <Link
                className={s.link}
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
