import React from "react";
import { Link } from "react-router-dom"

const NotEnoughCards = ({deck}) => {
    
    return (
        <div>
        <h4 className="not-enough-cards-h2">Not enough cards.</h4>
        <p>You need at least 3 cards to study. There are 2 cards in this deck.</p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary mx-1">
              Add Cards
            </Link>
        </div>
    )
}

export default NotEnoughCards;