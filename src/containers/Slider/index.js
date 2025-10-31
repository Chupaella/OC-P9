import { useEffect, useMemo, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const SLIDE_DELAY = 5000;

const Slider = () => {
  const { focus = [], loading } = useData();
  const [index, setIndex] = useState(0);

  const slides = useMemo(
    () => [...focus].sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)),
    [focus]
  );

  useEffect(() => {
    setIndex(0);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DELAY);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return <div className="SlideCardList">loading</div>;
  }

  if (!slides.length) {
    return <div className="SlideCardList">Aucun contenu disponible.</div>;
  }

  return (
    <div className="SlideCardList">
      {slides.map((event, idx) => (
        <div
          key={`${event.title}-${event.date}`}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {slides.map((event, idx) => {
            const key = `${event.title}-${event.date}`;
            return (
              <input
                key={key}
                type="radio"
                name="slider-pagination"
                checked={index === idx}
                onChange={() => setIndex(idx)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;

