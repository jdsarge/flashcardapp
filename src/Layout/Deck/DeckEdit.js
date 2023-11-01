import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from "../../utils/api";

function DeckEdit() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeck(prevDeck => ({ ...prevDeck, [name]: value }));
  };

  const saveHandler = (event) => {
    event.preventDefault();
    updateDeck(deck).then(() => history.push(`/decks/${deck.id}`));
  };

  const handleCancel = () => {
    history.push(`/decks/${deck.id}`);
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>

      <form>
        <h1>Edit Deck</h1>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="deck-name"
            name="name"
            value={deck.name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="deck-description"
            name="description"
            value={deck.description || ''}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary mx-1" onClick={saveHandler}>Save</button>
      </form>
    </>
  );
}

export default DeckEdit;
