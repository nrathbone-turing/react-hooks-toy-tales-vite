import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  
  const [formData, setFormData] = useState({ name: "", image: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newToy = { ...formData, likes: 0 };
    
    onAddToy(newToy);
    setFormData({ name: "", image: "" }); // Reset form after submission
  }
 
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
