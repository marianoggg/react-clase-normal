import React, { useEffect, useState, useRef } from "react";

type Props = {};

type User = {};

function Dashboard({}: Props) {
  const BACKEND_IP = "localhost";
  const BACKEND_PORT = "8000";
  const ENDPOINT = "user/paginated";
  const URL = `http://${BACKEND_IP}:${BACKEND_PORT}/${ENDPOINT}`;

  const [data, setData] = useState<User[]>([]);
  const [nextCursor, setNextCursor] = useState(0);

  async function traeme_datos(
    limit: number | null,
    last_seen_id: number | null
  ) {
    const token = localStorage.getItem("token");

    console.log("token", token, limit, last_seen_id, nextCursor);

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
        return;
      }

      if (!last_seen_id) {
        setData(json.users);
      } else {
        setData((pepito) => [...pepito, ...json.users]);
      }

      setNextCursor(json.next_cursor);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    traeme_datos(20, 0);
  }, []);

  function Mostrar_datos() {
    //motor
    //carroseria
    return data.map((el: any) => {
      return <div>{el.first_name}</div>;
    });
  }

  return <div>{data && <Mostrar_datos />}</div>;
}

export default Dashboard;
