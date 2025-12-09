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

import { useState, useEffect } from "react";
import Table from "../components/Table";
import CreateForm from "../components/CreateForm";
import UpdateForm from "../components/UpdateForm";

const storeProductSchema = [
  {
    label: "Store Product ID",
    name: "store_product_id",
    id: "store_product_id",
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
    label: "Product ID",
    name: "product_id",
    id: "product_id",
    type: "select_id",
    options: [],
  },
  {
    label: "Quantity",
    name: "quantity",
    id: "quantity",
    type: "text",
  },
];

const StoresProducts = () => {
  const [rows, setRows] = useState([]);

  const endpoint = `http://classwork.engr.oregonstate.edu:62812/storesproducts`;

  const getData = async () => {
    try {
      const response = await fetch(endpoint, { method: "GET" });
      const rows = await response.json();
      setRows(rows);
      // Add options for dropdown
      storeProductSchema.forEach((field) => {
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
      <h1>Stores Products</h1>
      <Table
        schema={storeProductSchema}
        rows={rows}
        endpoint={endpoint}
        getData={getData}
      />
      <h2>Add store product to a store</h2>
      <CreateForm
        schema={storeProductSchema.slice(1)}
        initialData={{
          store_id: "",
          product_id: "",
          quantity: "",
        }}
        getData={getData}
        endpoint={endpoint}
      />
      <h2>Update store product information</h2>
      <UpdateForm
        schema={storeProductSchema}
        initialData={{
          store_product_id: "",
          store_id: "",
          product_id: "",
          quantity: "",
        }}
        rows={rows}
        getData={getData}
        endpoint={endpoint}
      />
    </div>
  );
};
export default StoresProducts;
