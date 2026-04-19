import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

interface MonedaData{
    id:string
    symbol:string
    name: string
    image:string

}
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
    <>
      <p>{data.id}</p>
      <p>{data.symbol}</p>
      <p>{data.name}</p>
      <img src={data.image}></img>
      <button onClick={toggleFavorite}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
      
    </>
  )
};

export default Moneda