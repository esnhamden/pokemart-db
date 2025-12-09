/*
Alexander Birrell and Eason Hamden
12/8/2025

Citations:
- Based on React/NodeJS code from CS340 Exploration Implementing CUD operations in your app
  URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-cud-operations-in-your-app?
*/

import { Trash } from "lucide-react";

const DeleteButton = ({ id_name, id, endpoint, getData }) => {
  const data = {};
  data[id_name] = id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Row deleted.");
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <td>
      <button onClick={handleSubmit}>
        <Trash />
      </button>
    </td>
  );
};

export default DeleteButton;
