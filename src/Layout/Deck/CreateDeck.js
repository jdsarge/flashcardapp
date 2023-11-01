import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

const CreateDeck = () => {
  const history = useHistory();
  const [newDeck, setNewDeck] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeck(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createDeck(newDeck);
      history.push(`/decks/${res.id}`);
    } catch (err) {
      console.error("Error creating deck:", err);
      setError("Failed to create deck. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    history.push('/');
  }

  return (
    <div className="create-deck">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h2 className="create-card-title m-1">Create Deck</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deck-name" className="deck-name m-1">Name</label>
          <input
            className="form-control"
            id="deck-name"
            rows="1"
            name="name"
            type="text"
            required
            placeholder="Deck Name"
            aria-label="Deck Name"
            onChange={handleInputChange}
          />
          <label htmlFor="deck-description" className="deck-description m-1">Description</label>
          <textarea
            className="form-control"
            id="deck-description"
            name="description"
            type="text"
            required
            rows="3"
            aria-label="Deck Description"
            placeholder="Brief description of the deck"
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="btn btn-secondary mb-2 mx-1" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary mb-2 mx-1" disabled={loading}>
          {loading ? 'Creating...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateDeck;
