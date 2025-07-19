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
    .then((newToyFromServer) => setToys([...toys, newToyFromServer]))
    .catch(err => setError(err.message));

  }

  const fetchToys = async () => {
    setError(null)
    
    try {
      const response = await fetch('http://localhost:3001/toys')
      if (!response.ok) throw new Error('Something went wrong')
      const data = await response.json()
      setToys(data)
    } catch (err) {
      setError(err.message)
    }
  }
  
  useEffect(() => fetchToys(), []) // starting state of an empty dependency array

  // placeholder variables for now
  const handleDeleteToy = () => {};
  const handleLikeToy = () => {};

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
