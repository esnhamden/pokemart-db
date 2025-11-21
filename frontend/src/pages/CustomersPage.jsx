import { useState, useEffect } from "react";

import Table from "../components/Table.jsx";
import InsertForm from "../components/InsertForm.jsx";
import UpdateForm from "../components/UpdateForm.jsx";

const CustomersPage = () => {
  const [rows, setRows] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const getData = async () => {
    const response = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/customers"
    );
    const rows = await response.json();
    setRows(rows);
  };

  const testDelete = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + "/testdelete", {
      method: "POST",
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Customers</h1>
      <button onClick={testDelete}>TEST DELETE</button>
      <Table
        rows={rows}
        showUpdateForm={showUpdateForm}
        setShowUpdateForm={setShowUpdateForm}
      />
      <InsertForm rows={rows} />
      {showUpdateForm && <UpdateForm rows={rows} />}
    </div>
  );
};

export default CustomersPage;
