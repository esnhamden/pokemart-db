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
