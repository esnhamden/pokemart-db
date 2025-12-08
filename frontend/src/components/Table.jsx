const Table = ({ schema, rows }) => {
  return (
    <table>
      <thead>
        <tr>
          {schema.map((field) => (
            <th key={field.name}>{field.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {schema.map((field) => (
              <td key={field.name}>{row[field.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
