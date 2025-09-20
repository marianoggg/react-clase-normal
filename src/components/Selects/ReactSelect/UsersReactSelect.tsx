import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

type Props = {};

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  pepito: string;
};

function UsersReactSelect({}: Props) {
  const BACKEND_IP = "localhost";
  const BACKEND_PORT = "8000";
  const ENDPOINT = "user/paginated/filtered-sync";
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
        }),
      });
      const json = await res.json();

      if (json.message) {
        console.error("Error:", json.message);
        return { options: [], hasMore: false, additional: { cursor } };
      }

      // Filtrado local sobre first_name, last_name y email
      const filtered = json.users.filter((users: User) =>
        `${users.first_name} ${users.last_name} ${users.email}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
      return {
        options: filtered.map((user: User) => ({
          value: user.id,
          label: `${user.first_name} (${user.email})`,
        })),
        hasMore: Boolean(json.next_cursor),
        additional: { cursor: json.next_cursor ?? 0 },
      };
    } catch (error) {
      console.error("Fetch error", error);
      return { options: [], hasMore: false, additional: { cursor } };
    }
  }

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
      />
    </div>
  );
}

export default UsersReactSelect;
