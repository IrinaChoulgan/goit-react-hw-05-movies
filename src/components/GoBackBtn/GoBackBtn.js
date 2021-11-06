import s from '../MoviesPage/MoviesPage.module.css';

export default function GoBackBtn({ onBack }) {
  return (
    <div>
      <button type="button" onClick={onBack} className={s.btnBack}>
        &#x2190; Go back
      </button>
    </div>
  );
}
