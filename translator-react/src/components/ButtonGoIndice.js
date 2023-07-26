const ButtonGoIndice = ({setearIndice, y , indice}) => {
    
    const goIndice = () => {
        window.scrollTo({top: y})
        console.log("ESTAAAAAAAAAAA" + indice)
        setearIndice(false)
    }

    return (
      <button className="btn btn-danger button-go-indice" onClick={goIndice}>Go {indice}</button>
    );
  }
  
  export default ButtonGoIndice;