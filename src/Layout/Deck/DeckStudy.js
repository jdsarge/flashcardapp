import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom";
import NotEnoughCards from "../Card/NotEnoughCards";
import Card from "../Card/Card";

function DeckStudy() {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  const breadcrumbs = [
    { label: "Home", path: "/" },
    { label: deck.name, path: `/decks/${deckId}` },
    { label: "Study", path: null }
  ];

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="deck-study">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <li key={idx} className={`breadcrumb-item ${crumb.path ? '' : 'active'}`} aria-current={crumb.path ? null : 'page'}>
              {crumb.path ? <Link to={crumb.path}>{crumb.label}</Link> : crumb.label}
            </li>
          ))}
        </ol>
      </nav>

      <h2>{deck.name}: Study</h2>
      {deck?.cards?.length >= 3 ? (
        <Card deck={deck} />
      ) : (
        <NotEnoughCards deck={deck} />
      )}
    </div>
  );
}

export default DeckStudy;
