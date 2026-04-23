import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import './style.css'

interface MonedaData{
    id:string
    symbol:string
    name: string
    image:string
    current_price:number
    market_cap:number
    market_cap_rank:number
    total_volume:number
    total_supply:number
    ath:number
    atl:number
}
document.body.style.background = "";
function Moneda() {
const { id } = useParams<{ id: string }>()
 const [data, setData] = useState<MonedaData | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
 useEffect(() => {
     if (!id) return

       const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (favorites.includes(id)) {
    setIsFavorite(true);
  }

 const fetchData = async () => {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/Julian22077/apimoney/refs/heads/main/${id}.json`
      );
      const data = await res.json();
      setData(data[0]);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  fetchData();
 }, [id]);
 const toggleFavorite = () => {
  if (!id) return;

  let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  if (favorites.includes(id)) {
      favorites = favorites.filter((fav: string) => fav !== id);
      setIsFavorite(false);
    } else {
      favorites.push(id);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  if (!data) return <p>Cargando...</p>;

  return (
    <div className="moneda-container">
    <div className="moneda-card">
      <img src={data.image} alt={data.name} />

      <h2>{data.name}</h2>
      <span>Simbolo{data.symbol.toUpperCase()}</span>
      <p>ID: {data.id}</p>
      <p>Precio actual: {data.current_price}</p>
      <p>Capitalización de mercado: {data.market_cap}</p>
      <p> Ranking de Capitalización de mercado: {data.market_cap_rank}</p>
      <p>Volumen Total: {data.total_volume}</p>
      <p>Sunministro total: {data.total_supply}</p>
      <p>Maximo Histórico: {data.ath}</p>
      <p>Mínimo Histórico: {data.atl}</p>

      <button className="fav-btn" onClick={toggleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  </div>
  )
};

export default Moneda