import { useEffect, useState, useRef } from "react";

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  type: string;
  email: string;
  [key: string]: any;
};

function Nativo() {
  //Motor

  //#region Hooks
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(0);

  //#endregion

  //#region Functions
  async function getUsersPag(limit: number, last_seen_id: number | null) {
    console.log("aca tenes los datos");
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found!");
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/user/paginated", {
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
        setLoading(false);
        return;
      }

      if (!last_seen_id) setData(json.users);
      else setData((prev) => [...prev, ...json.users]);

      setNextCursor(json.next_cursor);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleScroll() {
    if (!scrollContainerRef.current || loading) return;

    const {
      scrollTop,
      scrollHeight,
      clientHeight,
    } = scrollContainerRef.current;

    if (scrollHeight - scrollTop - clientHeight < 100)
      getUsersPag(20, nextCursor);
  }

  //#endregion

  //#region Effects

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    getUsersPag(20, 0);
  }, []);

  //#endregion

  //carroceria
  return (
    <div
      ref={scrollContainerRef}
      style={{
        height: 400,
        border: "1px solid #ccc",
        marginTop: 10,
        overflowY: "auto",
      }}
      onScroll={handleScroll}
    >
      <h2>Infinite scroll simple</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Tipo</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            //motor

            //carroceria
            return (
              <tr>
                <td>{user.first_name}</td> <td>{user.last_name}</td>{" "}
                <td>{user.type}</td> <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Nativo;
