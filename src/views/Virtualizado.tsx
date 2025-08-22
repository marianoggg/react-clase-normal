/** Renderiza una lista virtualizada con altura fija y filas de 35px.

Cuando el scroll llega cerca del final, se dispara la carga de más datos.

Solo se renderizan las filas visibles, aunque tengamos miles de usuarios en data.

Los encabezados son fijos arriba (están fuera del List).

El usuario ve una experiencia fluida y la app escala sin problemas. */

import { useEffect, useState, useRef, useCallback } from "react";
import { FixedSizeList as List, type ListChildComponentProps } from "react-window";

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  type: string;
  email: string;
  [key: string]: any;
};

function Notifications() {
  
  return (
    <div style={{ padding: 20 }}>
      <h2>Infinite Virtualizado</h2>

      </div>
  );
}

export default Notifications;
