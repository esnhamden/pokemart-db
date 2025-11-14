import { Pencil, Trash } from "lucide-react";

const Table = ({ rows, showUpdateForm, setShowUpdateForm }) => {
  return (
    <table>
      <thead>
        <tr>
          {rows.length > 0 &&
            Object.keys(rows[0]).map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((rowItem, index) => (
              <td key={index}>{rowItem}</td>
            ))}
            <td>
              <button
                onClick={() => {
                  setShowUpdateForm(!showUpdateForm);
                }}
              >
                <Pencil color="blue" />
              </button>
            </td>
            <td>
              <button>
                <Trash color="red" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
