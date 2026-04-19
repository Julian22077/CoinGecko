import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";


function Favoritos() {
  const [favorites, setFavorites] = useState<string[]>([]);


  // 🔁 cargar favoritos desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

 

  return (
    <div>
      <h1>Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes equipos favoritos</p>
      ) : (
        <ul>
          {favorites.map((moneda) => (
            <li key={moneda}>
              <Link to={`/moneda/${moneda}`}>
              {moneda}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;