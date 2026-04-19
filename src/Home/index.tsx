import { useState,useEffect } from "react";
import {Link } from 'react-router';
import  './style.css'

interface Monedas{
  id:String
    market_cap_rank:number
    name:String
}

interface Estadistica{
   id:String
    market_cap_rank:number
    name:String
    market_cap:number
    total_volume:number
}
type FiltroTipo = 'monedas'|'mercado-bajo' | 'volumen-alto' | 'volumen-bajo'
function Home(){
    const [monedas,setMonedas]=useState<Monedas[]>([]);
      const [filtro, setFiltro] = useState<FiltroTipo>('monedas')
      const [estadisticas, setEstadisticas] = useState<Estadistica[]>([])
      const filtros: FiltroTipo[] = ['monedas','mercado-bajo' , 'volumen-alto' , 'volumen-bajo'];

  const [busqueda, setBusqueda] = useState('')
    
     useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://raw.githubusercontent.com/Julian22077/apimoney/refs/heads/main/${filtro}.json`)
        const data = await res.json()
        if(filtro==='monedas'){
          setMonedas(data)
        }else{
        setEstadisticas(data)
        }
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }

    fetchData()
  }, [filtro])

  const MonedasFiltrado = monedas.filter((moneda) =>
    busqueda.length < 3
      ? true  
      : moneda.name.toLowerCase().includes(busqueda.toLowerCase())
  )
  const estadisticasFiltradas = estadisticas.filter((rank) =>
    busqueda.length < 3
      ? true  
      : rank.name.toLowerCase().includes(busqueda.toLowerCase()) ||
        rank.id.toLowerCase().includes(busqueda.toLowerCase())
  )

   return (
    <>
      <div className="filtros">
        {filtros.map((onestat) => (
          <button
            key={onestat}
            onClick={() => setFiltro(onestat)}
            className={filtro === onestat ? 'activo' : ''}
          >
            {onestat}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="tabla-container">
        <h2>CryptoMonedas</h2>
        {filtro === 'monedas' ? (
          <table className="tabla-posiciones">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {MonedasFiltrado.map((moneda) => (
                <tr key={moneda.market_cap_rank}
                    className={
                      busqueda.length >= 3 &&
                      moneda.name.toLowerCase().includes(busqueda.toLowerCase())
                        ? 'resaltado'
                        : ''
                    }
                >
                  <td data-label="#">{moneda.market_cap_rank}</td>
                  <td data-label="Nombre">
                        <Link to={`/moneda/${moneda.id}`}>
                        {moneda.name}
                      </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="tabla-estadisticas">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Market Cap</th>
                <th>Total Volume</th>
              </tr>
            </thead>
            <tbody>
              {estadisticasFiltradas.map((rank, index) => (
                <tr key={index}
                    className={
                      busqueda.length >= 3 &&
                      (rank.name.toLowerCase().includes(busqueda.toLowerCase()) ||
                      rank.id.toLowerCase().includes(busqueda.toLowerCase()))
                        ? 'resaltado'
                        : ''
                    }
                >
                  <td>{rank.market_cap_rank}</td>
                  <td>{rank.name}</td>
                  <td>{rank.market_cap}</td>
                  <td>{rank.total_volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

export default Home
