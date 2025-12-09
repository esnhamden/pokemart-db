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
