const HomePage = () => {
  const reset = async () => {
    await fetch(import.meta.env.VITE_BACKEND_URL + "/reset", {
      method: "POST",
    });
  };

  return (
    <div>
      <h1>Welcome to PokeMartDB!</h1>
      <button onClick={reset}>RESET</button>
    </div>
  );
};

export default HomePage;
