import './App.css';
import Options from './Options/Options';
import Feedback from './Feedback/Feedback';
import Description from './Description/Description';
import Notification from './Notification/Notification';
import { useState, useEffect } from 'react';

export default function App() {
  const [feedbackCount, setFeedbackCount] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  useEffect(() => {
    const savedFeedback = localStorage.getItem('feedbackCount');
    if (savedFeedback !== null) {
      return setFeedbackCount(JSON.parse(savedFeedback));
    }
    return 0;
  }, []);

  //ф-ція для збереження фідбеків у локал стор
  useEffect(() => {
    localStorage.setItem('feedbackCount', JSON.stringify(feedbackCount));
  }, [feedbackCount]);

  // ф-ція оновлення стану
  const updateFeedback = feedbackType => {
    setFeedbackCount(prevFeedback => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  //ф-ція для підрахунку загальної кількості відгуків
  const totalFeedback =
    feedbackCount.good + feedbackCount.neutral + feedbackCount.bad;

  //ф-ція для підрахунку відсотка позитивних відгуків
  const positiveFeedback = Math.round(
    ((feedbackCount.good + feedbackCount.neutral) / totalFeedback) * 100
  );
  // ф-ція скидання зібраних відгуків
  const resetFeedback = () => {
    setFeedbackCount({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <>
      <Description />

      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback ? (
        <Feedback
          feedback={feedbackCount}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}
