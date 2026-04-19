import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import './style.css'


function Favoritos() {
  const [favorites, setFavorites] = useState<string[]>([]);


  // 🔁 cargar favoritos desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

 

  return (
    <div className="favoritos-container">
    <h1>Favoritos</h1>

    {favorites.length === 0 ? (
      <p className="empty">No tienes monedas favoritas</p>
    ) : (
      <ul className="lista-favoritos">
        {favorites.map((moneda) => (
          <li className="item-favorito" key={moneda}>
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