import { useState, useRef, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  type Row,
  type ColumnDef,
} from "@tanstack/react-table";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";

type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  type: string;
  email: string;
};

type Props = {};

const defaultColumns = [
  {
    header: "Nombre",
    accessorKey: "first_name",
  },
  {
    header: "Apellido",
    accessorKey: "last_name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Type",
    accessorKey: "type",
    cell: (info: any) => (
      <span style={{ color: info.getValue() === "admin" ? "red" : "black" }}>
        {info.getValue()}
      </span>
    ),
  },
];

function TanStackReactTableUsers({}: Props) {
  //logica

  const BACKEND_IP = "localhost";
  const BACKEND_PORT = "8000";
  const ENDPOINT = "user/paginated/filtered-sync";
  const URL = `http://${BACKEND_IP}:${BACKEND_PORT}/${ENDPOINT}`;

  const [globalFilter, setGlobalFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<User[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [cursor, setCursor] = useState<number>(0);
  const [previousCursors, setPreviousCursors] = useState<number[]>([]);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: data,
    columns: defaultColumns,
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });

  const { rows } = table.getRowModel();

  const rowVirtualized = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 60,
    overscan: 10,
  });

  const virtualRows = rowVirtualized.getVirtualItems();

  const fetchUsers = async (
    cursorId: number = 0,
    isGoingBack: boolean = false
  ) => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 20,
          last_seen_id: cursorId,
        }),
      });

      const obj = await res.json();

      if (obj.message) {
        console.log(
          "Error obj traido del backend (trayendo usuarios) -->",
          obj.message
        );
        return;
      }

      setData(obj.users);
      setNextCursor(obj.next_cursor ?? null);

      if (!isGoingBack && cursorId !== 0) {
        setPreviousCursors((prev) => [...prev, cursor]);
      }

      setCursor(cursorId);
    } catch (error) {
      console.error("Fetch error al traer usuarios -> ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (nextCursor !== null) {
      fetchUsers(nextCursor);
    }
  };
  const handlePrev = () => {
    if (previousCursors.length > 0) {
      const prevCur = previousCursors[previousCursors.length - 1];
      const newPreviousCursors = previousCursors.slice(0, -1);
      setPreviousCursors(newPreviousCursors);
      console.log("prevCur", prevCur, previousCursors, newPreviousCursors);
      fetchUsers(prevCur, true);
    }
  };

  /*  previousCursor -> [0,20,40,60,80]

  previousCursors -> [0,20,40,60] */

  useEffect(() => {
    fetchUsers(0);
  }, []);

  //ui
  return (
    <div>
      <h2>Usuarios - TanStack Table con Virtualización</h2>

      {/* Tabla con vistualización */}
      <div ref={tableContainerRef}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.column.columnDef.header as string}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {virtualRows.map((virtualRow: VirtualItem) => {
              //logica
              const row = rows[virtualRow.index] as Row<any>;

              //ui
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Controles de paginacion */}
      <div>
        <button onClick={handlePrev}>Anterior</button>
        <button onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
}

export default TanStackReactTableUsers;
