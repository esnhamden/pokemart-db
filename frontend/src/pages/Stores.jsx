import { useState, useEffect } from "react";
import Table from "../components/Table";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

const storesSchema = [
  {
    label: "Store ID",
    name: "store_id",
    id: "store_id",
    type: "select_id",
    options: [],
  },
  { label: "Store Name", name: "name", id: "name", type: "text" },
  { label: "Street", name: "street", id: "street", type: "text" },
  { label: "City", name: "city", id: "city", type: "text" },
  { label: "State", name: "state", id: "state", type: "text" },
  { label: "Zip Code", name: "zip_code", id: "zip_code", type: "text" },
  {
    label: "Phone Number",
    name: "phone_number",
    id: "phone_number",
    type: "text",
  },
  {
    label: "Employee Count",
    name: "employee_count",
    id: "employee_count",
    type: "text",
  },
];

const Stores = () => {
  const [rows, setRows] = useState([]);

  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/stores`;

  const getData = async () => {
    try {
      const response = await fetch(endpoint, { method: "GET" });
      const rows = await response.json();
      setRows(rows);
      // Add options for dropdown
      storesSchema.forEach((field) => {
        if (field.type === "select" || field.type === "select_id") {
          for (const row of rows) {
            if (!field.options.includes(row[field.name])) {
              field.options.push(row[field.name]);
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Stores</h1>
      <Table schema={storesSchema} rows={rows} />
      <h2>Add a new store</h2>
      <CreateForm
        schema={storesSchema.slice(1)}
        initialData={{
          name: "",
          street: "",
          city: "",
          state: "",
          zip_code: "",
          phone_number: "",
          employee_count: "",
        }}
        getData={getData}
        endpoint={endpoint}
      />
      <h2>Update store information</h2>
      <UpdateForm
        schema={storesSchema}
        initialData={{
          store_id: "",
          name: "",
          street: "",
          city: "",
          state: "",
          zip_code: "",
          phone_number: "",
          employee_count: "",
        }}
        rows={rows}
        getData={getData}
        endpoint={endpoint}
      />
    </div>
  );
};
export default Stores;
