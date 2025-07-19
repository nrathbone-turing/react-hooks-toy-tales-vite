import React from "react";

function ToyCard({ id, name, image, likes, onLikeToy, onDeleteToy }) {
  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <div className="buttons">
        <button className="like-btn" onClick={() => onLikeToy(id, likes)}>Like {"<3"}</button>
        <button className="del-btn" onClick={() => onDeleteToy(id)}>Donate to GoodWill</button>
      </div>
    </div>
  );
}

export default ToyCard;
