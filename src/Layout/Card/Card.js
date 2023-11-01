import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Card({ deck }) {
  const [cardSide, setCardSide] = useState('front');
  const [index, setIndex] = useState(0);
  const history = useHistory();

  const handleNext = () => {
    if (index < deck.cards.length - 1) {
      setIndex(prevIndex => prevIndex + 1);
      setCardSide('front');
    } else {
      const result = window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      );
      if (result) {
        setIndex(0);
        setCardSide('front');
      } else {
        history.push("/");
      }
    }
  };

  const handleFlip = () => {
    setCardSide(prevSide => (prevSide === 'front' ? 'back' : 'front'));
  };

  const currentCard = deck?.cards?.[index];
  const cardContent = cardSide === 'front' ? currentCard?.front : currentCard?.back;

  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <h4 className="study-card-length">
              Card {index + 1} of {deck?.cards?.length}
            </h4>
            <p className="card-text my-1">
              {cardContent}
            </p>
            <button className="btn btn-secondary my-2 mr-2" onClick={handleFlip}>
              Flip
            </button>
            {cardSide === 'back' && (
              <button className="btn btn-primary" onClick={handleNext} disabled={index === deck?.cards?.length - 1}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
