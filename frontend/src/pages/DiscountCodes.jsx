/*
Alexander Birrell and Eason Hamden
12/8/2025

Citations:
- AI Prompt: "I'm building a crud web app using React. Each page displays data from
 a database table and allows users to update, create, and delete the data in the 
 database from the frontened. Explain how to make React components (forms, HTML tables) 
 that can handle update create and delete operations without making separate 
 componentes for each database table?"
 URL: chatgpt.com
*/

import { useState, useEffect } from "react";
import Table from "../components/Table";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

const discountCodesSchema = [
  {
    label: "Discount Code ID",
    name: "discount_code_id",
    id: "discount_code_id",
    type: "select_id",
    options: [],
  },
  { label: "Code", name: "code", id: "code", type: "text" },
  {
    label: "Discount Amount",
    name: "discount_amount",
    id: "discount_amount",
    type: "text",
  },
  {
    label: "Description",
    name: "description",
    id: "description",
    type: "text",
  },
  {
    label: "Expiration Date",
    name: "expiration_date",
    id: "expiration_date",
    type: "date",
  },
];

const DiscountCodes = () => {
  const [rows, setRows] = useState([]);

  const endpoint = `${import.meta.env.VITE_BACKEND_URL}/discountcodes`;

  const getData = async () => {
    try {
      const response = await fetch(endpoint, { method: "GET" });
      const rows = await response.json();
      setRows(rows);
      // Add options for dropdown
      discountCodesSchema.forEach((field) => {
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
      <h1>Discount Codes</h1>
      <Table
        schema={discountCodesSchema}
        rows={rows}
        endpoint={endpoint}
        getData={getData}
      />
      <h2>Add a new discount code</h2>
      <CreateForm
        schema={discountCodesSchema.slice(1)}
        initialData={{
          code: "",
          discount_amount: "",
          description: "",
          expiration_date: "",
        }}
        getData={getData}
        endpoint={endpoint}
      />
      <h2>Update discount code information</h2>
      <UpdateForm
        schema={discountCodesSchema}
        initialData={{
          discount_code_id: "",
          code: "",
          discount_amount: "",
          description: "",
          expiration_date: "",
        }}
        rows={rows}
        getData={getData}
        endpoint={endpoint}
      />
    </div>
  );
};
export default DiscountCodes;
