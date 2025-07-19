import React, { useEffect, useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]) 
  const [error, setError] = useState(null)
  
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  
  function handleAddToy(newToy) {
    // Just used the standard format for any REST API expecting a JSON input
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    // Extract the JSON body from the response which now includes the unique id for the toy object
    .then(response => response.json())
    // Using spread operator to append new toy object to the end of the previous `toys` array
    // Doing it this way instead of calling `.push()` to make sure the state is updated immutably
    .then((newToyFromServer) => 
      setToys((prevToys) => [...prevToys, newToyFromServer])
    )
    .catch(err => setError(err.message));

  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method:"DELETE"
    })
    .then(() => {
      // Remove from DOM with `.filter()` to not mess with the remaining toys
      setToys(toys => 
        toys.filter(toy => toy.id !== id)
      ),
      console.log("Toy donated")
    })
    .catch(err => setError(err.message));
  };
  
  // Pass both the `id` and `likes` value up via the `onLikeToy` prop in the button
  function handleLikeToy(id, currentLikes) {
    // Incrementing the existing value by +=1 when event is handled
    const updatedLikes = currentLikes + 1
    
    // PATCH api call to re-render the toys with new values
    fetch(`http://localhost:3001/toys/${id}`, {
      method:"PATCH",
      headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ likes: updatedLikes })
    })
    .then(response => response.json())
    .then(updatedToy => {
      setToys(toys =>
        // Update the toy that was liked using .map() instead of re-fetching all toys
        toys.map(toy =>
          toy.id === updatedToy.id ? updatedToy : toy
        )
      )
    })   
    .catch(err => setError(err.message));
  };

  useEffect(() => {
    // moved the async function to be defined inside useEffect
    async function fetchToys() {
      setError(null);
      
      try {
        const response = await fetch('http://localhost:3001/toys');
        if (!response.ok) throw new Error('Something went wrong');
        const data = await response.json();
        setToys(data);
      } catch (err) {
        setError(err.message);
      }
    }
    
    fetchToys(); // call the function here but not as a return value
  }, []); // starting state of an empty dependency array

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </>
  );
}

export default App;
