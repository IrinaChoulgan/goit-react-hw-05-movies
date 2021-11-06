import shortid from 'shortid';
import defaultImages from '../Cast/defaultImages.png';
import s from '../Cast/Cast.module.css';

export default function Cast({ cast }) {
  console.log(cast);
  return (
    <>
      <div className={s.wrapper}>
        <ul className={s.castList}>
          {cast.cast.length ? (
            cast.cast.map(cast => (
              <li key={shortid.generate()}>
                {cast.profile_path ? (
                  <img
                    key={shortid.generate()}
                    width="150px"
                    src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                    alt={cast.original_name}
                  />
                ) : (
                  <img
                    key={shortid.generate()}
                    width="150px"
                    src={defaultImages}
                    alt={cast.original_name}
                  />
                )}

                <p key={cast.id}>
                  {cast.name}
                  <br />
                  <b>Character:</b> {cast.character}
                </p>
              </li>
            ))
          ) : (
            <p>We don't have any information about cast</p>
          )}
        </ul>
      </div>
    </>
  );
}
