import { useState, useEffect } from "react";
import Table from "../components/Table";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

const salesSchema = [
  {
    label: "Sale ID",
    name: "sale_id",
    id: "sale_id",
    type: "select_id",
    options: [],
  },
  {
    label: "Store ID",
    name: "store_id",
    id: "store_id",
    type: "select_id",
    options: [],
  },
  {
    label: "Customer ID",
    name: "customer_id",
    id: "customer_id",
    type: "select_id",
    options: [],
  },
  {
    label: "Discount Code ID",
    name: "discount_code_id",
    id: "discount_code_id",
    type: "discount_code_id",
    options: [],
  },
  {
    label: "Sale Date",
    name: "sale_date",
    id: "sale_date",
    type: "date",
    options: [],
  },
  {
    label: "Payment Method",
    name: "payment_method",
    id: "payment_method",
    type: "text",
    options: [],
  },
  {
    label: "Total Amount Paid",
    name: "total_amount_paid",
    id: "total_amount_paid",
    type: "text",
    options: [],
  },
];

const Sales = () => {
  const [rows, setRows] = useState([]);

  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/sales`;

  const getData = async () => {
    try {
      const response = await fetch(endpoint, { method: "GET" });
      const rows = await response.json();
      setRows(rows);
      // Add options for dropdown
      salesSchema.forEach((field) => {
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
      <h1>Sales</h1>
      <Table
        schema={salesSchema}
        rows={rows}
        endpoint={endpoint}
        getData={getData}
      />
      <h2>Add a new sale</h2>
      <CreateForm
        schema={salesSchema.slice(1)}
        initialData={{
          store_id: "",
          customer_id: "",
          discount_code_id: "",
          sale_date: "",
          payment_method: "",
          total_amount_paid: "",
        }}
        getData={getData}
        endpoint={endpoint}
      />
      <h2>Update sale information</h2>
      <UpdateForm
        schema={salesSchema}
        initialData={{
          sale_id: "",
          store_id: "",
          customer_id: "",
          discount_code_id: "",
          sale_date: "",
          payment_method: "",
          total_amount_paid: "",
        }}
        rows={rows}
        getData={getData}
        endpoint={endpoint}
      />
    </div>
  );
};
export default Sales;
