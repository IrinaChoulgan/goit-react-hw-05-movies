export default function GoBackBtn({ onBack }) {
  return (
    <div>
      <button type="button" onClick={onBack}>
        &#x2190; Go back
      </button>
    </div>
  );
}
