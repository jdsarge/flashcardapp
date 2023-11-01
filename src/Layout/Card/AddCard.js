import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

function AddCard({ deck, setDeck }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [card, setCard] = useState({ front: "", back: "", deckId: deckId });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDecks() {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (err) {
        console.error("Error loading deck:", err);
        setError("Failed to load deck. Please try again.");
      }
    }
    loadDecks();
  }, [deckId, setDeck]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCard(prev => ({ ...prev, [name]: value }));
  }

  const handleDone = () => {
    history.push(`/decks/${deck.id}`);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await createCard(deckId, card);
      setCard({ front: "", back: "", deckId: deckId });
    } catch (err) {
      console.error("Error creating card:", err);
      setError("Failed to create card. Please try again.");
    }
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        <h1>{deck.name}: Add Card</h1>
        <CardForm
          changeFront={handleInputChange}
          changeBack={handleInputChange}
          handleSave={handleSave}
          handleDoneCancel={handleDone}
          cardValueFront={card.front}
          cardValueBack={card.back}
        />
      </div>
    </div>
  );
}

export default AddCard;
