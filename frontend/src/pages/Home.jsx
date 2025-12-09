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
