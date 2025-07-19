import React, { useState } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import ToyCard from "./ToyCard";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys] = useState([]) 
  const [error, setError] = useState(null)
  
  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  
  const fetchToys = async () => {
    setError(null)
    
    try {
      const response = await fetch('http://localhost:3001/toys')
      if (!response.ok) throw new Error('Something went wrong')
      const toys = await response.json()
      setData(toys.message)
    } catch (err) {
      setError(err.message)
    }
  }
  
  useEffect(() => fetchToys(), [])

  return (
    <>
      <Header />
      {showForm ? <ToyForm /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </>
  );
}

export default App;
