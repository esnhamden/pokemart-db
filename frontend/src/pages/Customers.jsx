import { useState, useEffect } from "react";
import Table from "../components/Table";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

const customersSchema = [
  {
    label: "Customer ID",
    name: "customer_id",
    id: "customer_id",
    type: "select_id",
    options: [],
  },
  { label: "First Name", name: "first_name", id: "first_name", type: "text" },
  { label: "Last Name", name: "last_name", id: "last_name", type: "text" },
  { label: "Email", name: "email", id: "email", type: "text" },
  {
    label: "Phone Number",
    name: "phone_number",
    id: "phone_number",
    type: "text",
  },
  {
    label: "Registration Date",
    name: "registration_date",
    id: "registration_date",
    type: "date",
  },
];

const Customers = () => {
  const [rows, setRows] = useState([]);

  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/customers`;

  const getData = async () => {
    try {
      const response = await fetch(endpoint, { method: "GET" });
      const rows = await response.json();
      setRows(rows);
      // Add options for dropdown
      customersSchema.forEach((field) => {
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
      <h1>Customers</h1>
      <Table schema={customersSchema} rows={rows} />
      <h2>Add a new customer</h2>
      <CreateForm
        schema={customersSchema.slice(1)}
        initialData={{
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          registration_date: "",
        }}
        getData={getData}
      />
      <h2>Update customer information</h2>
      <UpdateForm
        schema={customersSchema}
        initialData={{
          customer_id: "",
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          registration_date: "",
        }}
        rows={rows}
        getData={getData}
      />
    </div>
  );
};
export default Customers;
