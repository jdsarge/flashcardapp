import React from "react";
import { Link, useHistory} from "react-router-dom";
import { deleteDeck } from "../../utils/api";


export const Deck = ({ deck }) => {
  const history = useHistory();
  
  const handleDelete = async (id) => {
    const result = window.confirm("Delete this card? You will not be able to recover it.");
    if (result) {
      await deleteDeck(id);
      history.push('/');
      window.location.reload(false)
    }
  };

  return (
   
     <div className="row">
      <div className="col-sm-6">
        <div className="card">
          <div className="card-body">
            <span className="card-top d-flex justify-content-between" >
            <h3 className="card-title">{deck.name}</h3>
            <p>{deck.cards.length} cards</p>
            </span>
            <p className="card-text">{deck.description}</p>
            <span className='card-buttons d-flex justify-content-between' >
            <Link to={`/decks/${deck.id}`}  className="btn btn-secondary mx-1 ">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mx-1">
              Study
            </Link>
            <button className="btn btn-danger ml-auto"  onClick={() => handleDelete(deck.id)}>Delete</button>
            </span>
          </div>
        </div>
      </div>
    </div> 
);
}

export default Deck;