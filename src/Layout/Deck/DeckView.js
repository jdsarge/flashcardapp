import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../../utils/api";

function DeckView() {
  const [deck, setDeck] = useState();
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getDeck() {
      const currentDeck = await readDeck(deckId);
      setDeck(currentDeck);
    }
    getDeck();
  }, [deckId]);

  if (!deck) {
    return <h1>Loading...</h1>;
  }

  const handleDeleteDeck = (deckId) => {
    const deleted = window.confirm(
      "Are you sure you want to delete this deck?"
    );
    if (deleted) {
      deleteDeck(deckId);
      history.push("/");
    }
  };

  const handleDeleteCard = (cardId) => {
    const deleted = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (deleted) {
      deleteCard(cardId);
      window.location.reload(false);
    }
  };

  console.log(deck);

  const list = deck.cards.map((card) => {
    return (
      <div className="card w-50" key={card.id}>
        <div className="row">
          <div className="col" >
            <div className="float-left">
              <p className="card-body m-1">{card.front}</p>
            </div>
          </div>
          <div className="col">
            <p className="card-body m-1">{card.back}</p>
            <div className="buttons float-right">
              <Link to={`${deckId}/cards/${card.id}/edit`}>
                <button className="btn btn-secondary m-1" type="button">
                  Edit
                </button>
              </Link>
              <button
                className="btn btn-danger mx-1"
                type="button"
                onClick={() => handleDeleteCard(card.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
      </div>
        <div className="w-50">
          <div className="card-body">
            <h5 className="deck-view-name">{deck.name}</h5>
            <p className="deck-view-description">{deck.description}</p>
            <span className="d-flex">
              <Link
                to={`/decks/${deck.id}/edit`}
                className="btn btn-secondary"
                type="button"
              >
                Edit
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mx-2"
                type="button"
              >
                Study
              </Link>
              <Link
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary"
                type="button"
              >
                Add Cards
              </Link>
              <button
                className="btn btn-danger ml-auto"
                type="button"
                onClick={() => handleDeleteDeck(deck.id)}
              >
                Delete
              </button>
            </span>
          </div>
        </div>
      </div>
      <div>
        <h3>Cards</h3>
        <div>{list}</div>
      </div>
    </>
  );
}

export default DeckView;