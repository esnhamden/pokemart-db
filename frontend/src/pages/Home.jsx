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

const Home = () => {
  const handleClick = async () => {
    const endpoint = `${import.meta.env.VITE_BACKEND_URL}/reset`;
    await fetch(endpoint, { method: "POST" });
    alert("Database reset!");
  };
  return (
    <div>
      <h2>Welcome to PokeMartDB!</h2>
      <h3>
        PokeMart is a small retailer that operates only in the United States
        with 32 employees and 7 stores. Various products from the Pokemon
        franchise, such as cards, video games, and toys, are sold at PokeMart
        locations.
      </h3>
      <button onClick={handleClick}>Click here to reset the database</button>
    </div>
  );
};

export default Home;
