import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck, readCard, updateCard } from "../../utils/api";

function EditCard({ deck, setDeck, card, setCard }) {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const [loadedDeck, cardRead] = await Promise.all([
        readDeck(deckId),
        readCard(cardId)
      ]);

      setDeck(loadedDeck);
      setCard(cardRead);
    }
    loadData();
  }, [deckId, cardId, setDeck, setCard]);

  const handleFrontChange = ({ target: { value } }) => {
    setCard(prev => ({ ...prev, front: value }));
  };

  const handleBackChange = ({ target: { value } }) => {
    setCard(prev => ({ ...prev, back: value }));
  };

  const handleSave = event => {
    event.preventDefault();
    updateCard(card).then(() => history.push(`/decks/${deck.id}`));
  };

  const handleDone = () => {
    history.push(`/decks/${deck.id}`);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deck.id}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h1>Edit Card</h1>
      <CardForm
        changeFront={handleFrontChange}
        changeBack={handleBackChange}
        handleSave={handleSave}
        handleDoneCancel={handleDone}
        cardValueFront={card.front}
        cardValueBack={card.back}
      />
    </>
  );
}

export default EditCard;
