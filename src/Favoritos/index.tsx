import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import './style.css'

 document.body.style.background = "";
function Favoritos() {
  const [favorites, setFavorites] = useState<string[]>([]);


 
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