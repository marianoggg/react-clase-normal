import { useState, useRef, useEffect } from "react";
import {
  FixedSizeList as List,
  type ListChildComponentProps,
} from "react-window";

type Props = {};

function Virtualizado({}: Props) {
  //logica
  //#region Constants
  const BACKEND_IP = "localhost";
  const BACKEND_PORT = "8000";
  const ENDPOINT = "user/paginated";
  const URL = `HTTP://${BACKEND_IP}:${BACKEND_PORT}/${ENDPOINT}`;
  //#endregion

  //#region Hooks
  const loadingRef = useRef<boolean>(false);
  const listRef = useRef<any>(null);

  const [data, setData] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);

  //#endregion

  async function getUserPag(limit: number, last_seen_id: number | null) {
    //logica para obtener usuarios paginados
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("Error!!! No hay token");
      return;
    }
    if (loadingRef.current) return;

    loadingRef.current = true;

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit, last_seen_id }),
      });
      const json = await res.json();
      if (json.message) {
        console.error("Error:", json.message);
        loadingRef.current = false;
        return;
      }

      if (!last_seen_id) {
        setData(json.users);
      } else {
        setData((prev) => [...prev, ...json.users]);
      }

      setNextCursor(json.next_cursor);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      loadingRef.current = false;
    }
  }

  // funcion usando el evento onScroll de JS
  function handleScroll({ scrollOffset }: any) {
    if (loadingRef.current || !nextCursor) return;

    if (!listRef.current) return;

    const visibleHeight = Number(listRef.current.props.height);
    const totalHeight = listRef.current.props.itemSize * data.length;

    if (scrollOffset + visibleHeight + 150 >= totalHeight) {
      getUserPag(20, nextCursor);
      console.log("Cargando mas datos...");
    }
  }

  //funcion usando el evento onItemsRendered de react-window
  function handleScrollLib({ visibleStopIndex }: any) {
    if (
      !loadingRef.current &&
      nextCursor &&
      visibleStopIndex >= data.length - 5
    ) {
      getUserPag(20, nextCursor);
    }
  }

  // esto es lo que devuelve el evento onItemsRendered;
  /* {
    "overscanStartIndex": 0,
    "overscanStopIndex": 18,
    "visibleStartIndex": 2,
    "visibleStopIndex": 16
} */

  //componente Row
  const Row = ({ index, style }: ListChildComponentProps) => {
    //logica
    const user = data[index];
    //ui
    return (
      <div style={{ backgroundColor: "white", color: "blue", ...style }}>
        <span>{user.id}</span> -<span>{user.first_name}</span> -
        <span>{user.last_name}</span>
      </div>
    );
  };

  useEffect(() => {
    getUserPag(20, 0);
  }, []);

  useEffect(() => {
    //console.log("data", data);
  }, [data]);

  //ui
  return (
    <div className="m-5">
      <h2>Virtualizado</h2>
      <div>
        <List
          itemSize={35}
          height={500}
          width={300}
          itemCount={data.length}
          onItemsRendered={handleScrollLib}
          ref={listRef}
        >
          {Row}
        </List>
      </div>
    </div>
  );
}

export default Virtualizado;
