/*
Alexander Birrell and Eason Hamden
12/8/2025

Citations:
- AI Prompt: "I'm building a crud web app using React. Each page displays data from
  a database table and allows users to update, create, and delete the data in the 
  database from the frontened. Explain how to make React components (forms, HTML tables) 
  that can handle update create and delete operations without making separate 
  componentes for each database table?"
  AI Response: Provided a basic example of using a schema for forms/tables
  URL: chatgpt.com
*/

import DeleteButton from "./DeleteButton";

const Table = ({ schema, rows, endpoint, getData }) => {
  return (
    <table>
      <thead>
        <tr>
          {schema.map((field) => (
            <th key={field.name}>{field.label}</th>
          ))}
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {schema.map((field) => (
              <td key={field.name}>{row[field.name]}</td>
            ))}
            <DeleteButton
              id_name={schema[0].name}
              id={Object.values(row)[0]}
              endpoint={endpoint}
              getData={getData}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
