import './style.css'
function Informativa() {
  document.body.style.background= " rgb(116, 94, 3)"
 document.body.style.backgroundImage = "url(https://www.image2url.com/r2/default/images/1776990944884-2da655d9-e747-4c54-914a-79b8e2e04a64.png)";
  return (
    <>
    
    <section className="c-informativa">
      
      <h1><a href="https://api.coingecko.com/api/v3/coins/list">COINGECKO API</a></h1>
    <h2>Julián Camilo Lozano Hernández</h2>
   <img src="https://www.image2url.com/r2/default/images/1776977243669-4eaa32c7-3d59-44b4-89e3-ec036501e565.png" alt="image" />
    <p>Api con información de mas de 18.000 cryptomonedas </p>
    </section>
    </>
  )
}

export default Informativa