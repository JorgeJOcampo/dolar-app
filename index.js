import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

function Componente(){
  const [pesos, setPesos] = useState(0);
  const [dolar, setDolar] = useState(0);
  const [cotizacion, setCotizacion] = useState(0);

  const handleSetPesos = (pesos) => {
    setPesos(pesos);
  };

  useEffect(() => {
    fetch('https://s3.amazonaws.com/dolartoday/data.json')
      .then(response => response.json())
      .then(json => console.log(json) || setCotizacion(json.USD.efectivo));
  }, [])
  
  useEffect(() =>{
    setDolar(pesos*cotizacion);
  });

  return <div>
      <p>Pesos: <input value={pesos} onChange={(event) => handleSetPesos(event.target.value)}></input></p>
      <p>Dolares: <label>{dolar}</label></p>
    </div>
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <Componente/>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
