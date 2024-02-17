import css from './Options.module.css';

export default function Options({
  updateFeedback,
  resetFeedback,
  totalFeedback,
}) {
  return (
    <div>
      <ul className={css.optionsList}>
        <button
          className={css.optionsButton}
          onClick={() => updateFeedback('good')}
        >
          Good
        </button>
        <button
          className={css.optionsButton}
          onClick={() => updateFeedback('neutral')}
        >
          Neutral
        </button>
        <button
          className={css.optionsButton}
          onClick={() => updateFeedback('bad')}
        >
          Bad
        </button>
        {totalFeedback !== 0 && (
          <button className={css.optionsButton} onClick={resetFeedback}>
            Reset
          </button>
        )}
      </ul>
    </div>
  );
}
