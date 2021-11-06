import s from '../Reviews/Reviews.module.css';

export default function Reviews({ reviews }) {
  return (
    <div>
      <ul className={s.reviewsList}>
        {reviews.results.length ? (
          reviews.results.map(review => (
            <li key={review.id}>
              <p>
                <b>Author:</b> {review.author}
              </p>

              <p> {review.content}</p>
            </li>
          ))
        ) : (
          <p>
            <b>We don't have any reviews for this movie</b>
          </p>
        )}
      </ul>
    </div>
  );
}
