import { useState } from "react";

const CreateForm = ({ schema, initialData, getData, endpoint }) => {
  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          {field.type === "select" ? (
            <select name={field.name} id={field.id} onChange={handleChange}>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.name}
              id={field.id}
              type={field.type}
              value={data[field.name]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateForm;
