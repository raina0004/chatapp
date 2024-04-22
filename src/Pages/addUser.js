import React from 'react';
import { useParams } from 'react-router-dom';

const AddUser = () => {
  // Get the 'name' parameter from the URL
  const { name } = useParams();

  console.log(name,"this is the name is called")
  // Render content based on the 'name'
  return (
    <div>
      <h2>{name} Route</h2>
      <p>This is the content for {name}.This is the content for {name}</p>
    </div>
  );
}

export default AddUser;
