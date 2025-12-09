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
