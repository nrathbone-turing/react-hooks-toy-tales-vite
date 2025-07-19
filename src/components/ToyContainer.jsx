import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onLikeToy, onDeleteToy }) {
  return (
    <div id="toy-collection">
      {toys.map(toy => (
        <ToyCard 
          id={toys.id}
          name={toys.name}
          image={toys.image}
          likes={toys.likes}
        />
      ))}
    </div>
  );
}

export default ToyContainer;
