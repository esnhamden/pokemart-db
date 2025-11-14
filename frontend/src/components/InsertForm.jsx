const InsertForm = ({ rows }) => {
  return (
    <div>
      <h1>Insert Data</h1>
      <form>
        {rows.length > 0 &&
          Object.keys(rows[0]).map((header, index) => (
            <div key={index}>
              <label for={header}>{header}</label>
              <input type="text" name={header} id={header}></input>
            </div>
          ))}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default InsertForm;
