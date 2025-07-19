import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer(toys) {
  
  toys.map(toy => 
    <ToyCard 
      id={toys.id}
      name={toys.name}
      image={toys.image}
      likes={toys.likes}
    />)
  
  return (
    <div id="toy-collection">{toys/* Render the collection of ToyCards */}</div>
  );
}

export default ToyContainer;
