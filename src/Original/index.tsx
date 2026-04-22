import { useState, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";
import './style.css'

interface Datos{
  id:string
  name:string
  current_price:number
  high_24h:number
  low_24h:number
  ath:number
  atl:number
}
function Original(){
  const coins = [
  "bitcoin",
  "ethereum",
  "tether",
  "ripple",
  "binancecoin",
  "usd-coin",
  "solana",
  "tron",
  "figure-heloc",
  "dogecoin",
  "whitebit",
  "usds",
  "hyperliquid",
  "leo-token",
  "cardano",
  "bitcoin-cash",
  "chainlink",
  "monero",
  "memecore",
  "ethena-usde",
  "stellar",
  "canton-network",
  "zcash",
  "dai",
  "litecoin",
  "usd1-wlfi",
  "paypal-usd",
  "avalanche-2",
  "hedera-hashgraph",
  "sui",
  "rain",
  "shiba-inu",
  "the-open-network",
  "crypto-com-chain",
  "hashnote-usyc",
  "tether-gold",
  "blackrock-usd-institutional-digital-liquidity-fund",
  "world-liberty-financial",
  "pax-gold",
  "bittensor",
  "global-dollar",
  "mantle",
  "polkadot",
  "uniswap",
  "falcon-finance",
  "pi-network",
  "okb",
  "sky",
  "near",
  "aster-2",
  "htx-dao",
  "pepe",
  "janus-henderson-anemoy-treasury-fund",
  "aave",
  "usdd",
  "ripple-usd",
  "internet-computer",
  "ondo-us-dollar-yield",
  "bfusd",
  "ethereum-classic",
   "bitget-token",
  "ondo-finance",
  "kucoin-shares",
  "gatechain-token",
  "pump-fun",
  "quant-network",
  "morpho",
  "ethena",
  "eutbl",
  "united-stables",
  "polygon-ecosystem-token",
  "algorand",
  "kaspa",
  "render-token",
  "nexo",
  "cosmos",
  "usdtb",
  "superstate-short-duration-us-government-securities-fund-ustb",
  "worldcoin-wld",
  "arbitrum",
  "blockchain-capital",
  "aptos",
  "filecoin",
  "flare-networks",
  "dexe",
  "hash-2",
  "official-trump",
  "jupiter-exchange-solana",
  "midnight-3",
  "beldex",
  "ravedao",
  "vechain",
  "ousg",
  "xdce-crowd-sale",
  "just",
  "ylds",
  "gho",
  "stable-2",
  "usual-usd",
  "siren"
];
 document.body.style.background = "";
const [id, setId] = useState(
  coins[Math.floor(Math.random() * coins.length)]
);
const Nueva = () => {
  const nuevoId = coins[Math.floor(Math.random() * coins.length)];
  setId(nuevoId);
};

 const [data, setData]=useState<Datos |null>(null);
 const [dinero, setDinero]=useState(100);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://raw.githubusercontent.com/Julian22077/apimoney/refs/heads/main/${id}.json`)
        const data = await res.json()
        setData(data[0]);
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    }
    fetchData()
  }, [id])

  const Chartdata={
    labels:["precio actual","maximo en 24h", "minimo en 24"],
    datasets: [
      {
        label: "precio en USD",
        data: data?[data.current_price, data.high_24h,data.low_24h]:[]
      }
    ]
  }
  const Chartdata1={
    labels:["precio actual","maximo Historico", "minimo Historico"],
    datasets: [
      {
        label: "precio en USD",
        data: data?[data.current_price, data.ath,data.atl]:[]
      }
    ]
  }
 
  if(!data){
    return <p>Cargando...</p>
  }
   const cantidad=dinero / data.current_price;
   const bajo= cantidad * data.low_24h;
   const alto = cantidad * data.high_24h;
   const ganancia= alto-dinero;
   const perdida = bajo-dinero;
  return(
 <div className="original-container">
    <h2 className="original-title">{data.name}</h2>

    <div className="dashboard">
      <div className="card">
        <h3>Comparación 24h</h3>
        <div className="chart-container">
          <Bar data={Chartdata} />
        </div>
      </div>

      <div className="card">
        <h3>Comparación histórica</h3>
        <div className="chart-container">
          <Doughnut data={Chartdata1} />
        </div>
      </div>
    </div>
    <br></br>
    <div className="boton-container">
  <button className="boton-cambiar" onClick={Nueva}>
     Cambiar criptomoneda
  </button>
</div>
    <div className="simulador">
      <h3>Simulador de inversión</h3>

      <input
        type="number"
        value={dinero}
        onChange={(e) => setDinero(Number(e.target.value))}
      />

      <div className="resultados">
        <p>Monedas compradas: {cantidad.toFixed(2)}</p>

        <p>
          Si baja: {bajo.toFixed(2)} →{" "}
          <span className="perdida">
            {perdida.toFixed(2)}
          </span>
        </p>

        <p>
          Si sube: {alto.toFixed(2)} →{" "}
          <span className="ganancia">
            {ganancia.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  </div>
  )
}
export default Original;