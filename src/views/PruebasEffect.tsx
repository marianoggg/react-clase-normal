import React, { useEffect, useState } from "react";

type Props = {};

function PruebasEffect({}: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    //cuerpo callback
    console.log("Componente montado");

    const timer = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    //retorno del callback
    //funcion  de limpieza
    return () => {
      clearInterval(timer);
      console.log("Fcion de limpieza al desmontar");
    };
  }, []);

  return (
    <div>
      <h5>{count}</h5>
    </div>
  );
}

export default PruebasEffect;

/*

1- Al montarse el componente => Se ejecuta el efecto 

2- Al desmontarse => Se ejecuta fcion de limpieza

3- Si el effecto dependiera de alguna variable y se vuelve a ejecutar => 
    1ro. se ejecuta la fcion. de retorno
    2do. se ejecuta el nuevo efecto

*/

/*

    setCount(count+1) -> 1
    setCount(count+1) -> 1
    setCount(count+1) -> 3
    setCount(count+1) -> 3




*/
