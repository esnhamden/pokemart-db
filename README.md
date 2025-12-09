1. Create a .env file in the backend directory:

   ```
   # backend/.env
   DB_HOST=classmysql.engr.oregonstate.edu
   DB_NAME=cs340_[YOUR_ONID]
   DB_USER=cs340_[YOUR_ONID]
   DB_PASSWORD=[OSU CLASS DB PASSWORD]
   BACKEND_PORT=62581
   ```

2. Create a .env file in the frontend directory:

   ```
   # frontend/.env
   VITE_BACKEND_URL=http://classwork.engr.oregonstate.edu:62581
   VITE_FRONTEND_PORT=62582
   ```

3. Run the command `npm install` in both backend/ and frontend/

4. Run the command `npm run dev` in both backend/ and frontend/ to start a local dev server

Citations:

- All code is adapted from code from CS340 explorations and assignments
- Referenced for building backend routes (backend/routes/)

  URL: https://www.youtube.com/watch?v=l8WPWK9mS5M

  URL: https://www.geeksforgeeks.org/node-js/rest-api-using-the-express-to-perform-crud-create-read-update-delete/

- db-connector.js is based on db-connector.js code from

  URL: https://canvas.oregonstate.edu/courses/2017561/assignments/10111722?

- Referenced and adapted the following from CS340 explorations and assignments for PL/SQL and SQL code
  URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-pl-slash-sql-part-1-sp-view-and-function?module_item_id=25645140

  URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-pl-slash-sql-part-2-stored-procedures-for-cud?module_item_id=25645141

  URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-database-application-design?

  URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25645149

- Used the ideas suggested by ChatGPT for designing React pages/components
  AI Prompt "I'm building a crud web app using React. Each page displays data from
  a database table and allows users to update, create, and delete the data in the
  database from the frontened. Explain how to make React components (forms, HTML tables)
  that can handle update create and delete operations without making separate
  componentes for each database table?"
  AI Response: Provided a basic example of using a schema for forms/tables
  URL: chatgpt.com
