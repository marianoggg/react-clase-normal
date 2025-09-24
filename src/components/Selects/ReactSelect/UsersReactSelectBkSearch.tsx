import { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

type Props = {};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  pepito: string;
};

function UsersReactSelectBkSearch({}: Props) {
  const BACKEND_IP = "localhost";
  const BACKEND_PORT = "8000";
  const ENDPOINT = "user/paginated/filtered-search-sync";
  const URL = `http://${BACKEND_IP}:${BACKEND_PORT}/${ENDPOINT}`;

  const [value, setValue] = useState<any>(null);

  async function loadOptions(
    search: string,
    loadedOptions: readonly any[],
    additional?: { cursor: number }
  ) {
    const cursor = additional?.cursor ?? 0;
    const token = localStorage.getItem("token");
    if (!token)
      return { options: [], hasMore: false, additional: { cursor: 0 } };

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 50,
          last_seen_id: cursor,
          search,
        }),
      });
      const obj = await res.json();

      if (obj.message) {
        console.error("Error:", obj.message);
        return { options: [], hasMore: false, additional: { cursor } };
      }

      return {
        options: obj.users.map((user: User) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name} (${user.email})`,
        })),
        hasMore: Boolean(obj.next_cursor),
        additional: { cursor: obj.next_cursor ?? 0 },
      };
    } catch (error) {
      console.error("Fetch error", error);
      return { options: [], hasMore: false, additional: { cursor } };
    }
  }

  useEffect(() => {
    console.log("value", value);
  }, [value]);
  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>Usuarios</h2>

      <AsyncPaginate
        loadOptions={loadOptions}
        value={value}
        onChange={setValue}
        additional={{ cursor: 0 }}
        placeholder="Buscar usuario..."
        debounceTimeout={300}
        isClearable
      />
    </div>
  );
}

export default UsersReactSelectBkSearch;
