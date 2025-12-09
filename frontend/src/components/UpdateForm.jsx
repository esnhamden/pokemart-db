/*
Alexander Birrell and Eason Hamden
12/8/2025

Citations:
- Based on React/NodeJS code from CS340 Exploration Implementing CUD operations in your app
  URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-cud-operations-in-your-app?

- AI Prompt: "I'm building a crud web app using React. Each page displays data from
  a database table and allows users to update, create, and delete the data in the 
  database from the frontened. Explain how to make React components (forms, HTML tables) 
  that can handle update create and delete operations without making separate 
  componentes for each database table?"
  AI Response: Provided a basic example of using a schema for forms/tables
  URL: chatgpt.com
*/

import { useState } from "react";

const UpdateForm = ({ schema, initialData, rows, getData, endpoint }) => {
  const [data, setData] = useState(initialData);

  // TODO: Change Object.values(row)[0] == id
  const handleIDChange = (e) => {
    const id = e.target.value;
    for (const row of rows) {
      if (Object.values(row)[0] == id) {
        setData(row);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input">
      {schema.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          {field.type === "select_id" ? (
            <select name={field.name} id={field.id} onChange={handleIDChange}>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "select" ? (
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

export default UpdateForm;
