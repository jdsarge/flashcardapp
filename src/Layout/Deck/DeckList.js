
import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../../utils/api";
import Deck from "../Deck/Deck";
import ErrorMessage from "../ErrorMessage";

export const DeckList = () => {
  const [error, setError] = useState(undefined);
  const [decks, setDecks] = useState([]);
 
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDecks).catch(setError);
    return () => abortController.abort();
  }, []);

  if (error) {
    return (
      <ErrorMessage error={error}>
        <p>
          <Link to="/">Return Home</Link>
        </p>
      </ErrorMessage>
    );
  }

  const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);

  return (
    <>
      {list}
    </>
  );
};

export default DeckList;