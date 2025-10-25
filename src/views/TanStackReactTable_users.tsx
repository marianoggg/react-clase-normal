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
import { useFetchUsers, useSearch } from "../hooks/users.hook";
import { PageSizeSelector } from "../components/common/PageSizeSelector";
import DetallesBtnStateModal from "../components/Tables/modals/detallesBtnStateModal";

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

  //#region States
  const [globalFilter, setGlobalFilter] = useState("");
  const [previousCursors, setPreviousCursors] = useState<number[]>([]);
  const [pageSize, setPageSize] = useState(20);
  const [btnState, setBtnState] = useState("btn-danger");
  const [show, setShow] = useState(false);

  //#endregion States

  //#region Hooks
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { search, setSearch } = useSearch(() => fetchUsers(0));
  const { isLoading, data, nextCursor, fetchUsers } = useFetchUsers({
    url: URL,
    search: search,
    pageSize: pageSize,
    setPreviousCursors: setPreviousCursors,
  });
  const table = useReactTable({
    data: data, //<---- entran los datos
    columns: defaultColumns, // <--- columnas
    state: {
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
  });
  //#endregion Hooks

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 60,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0)
      : 0;

  //#region Functions

  const handleNext = () => {
    if (nextCursor !== null) {
      fetchUsers(nextCursor);
    }
  };

  const handlePrev = () => {
    if (previousCursors.length > 0) {
      const prevCur = previousCursors[previousCursors.length - 1]; //ultimo elem. del array
      const newPreviousCursors = previousCursors.slice(0, -1);
      setPreviousCursors(newPreviousCursors);
      console.log("prevCur", prevCur, previousCursors, newPreviousCursors);
      fetchUsers(prevCur, true);
    }
  };

  const handleChangePageSize = (newSize: number) => {
    setPageSize(newSize);
  };

  const handleBtnState = () => {
    setTimeout(() => {
      setBtnState((prev) => {
        console.log("prev", prev);
        if (prev == "btn-danger") return "btn-success";
        else return "btn-danger";
      });
      setShow(true);
    }, 100);
  };
  //#endregion Functions

  useEffect(() => {
    console.log("pageSize", pageSize);
    fetchUsers(0);
  }, [pageSize]);

  useEffect(() => {
    console.log("data.length", data.length);
  }, [data]);

  useEffect(() => {
    fetchUsers(0);
  }, []);

  //ui
  return (
    <div className="m-4 ms-5" style={{ padding: 20, maxWidth: 1200 }}>
      <h2>Usuarios - TanStack Table con Virtualización</h2>
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          name="inputSearch"
          placeholder="Buscar por nombre, apellaido o email..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Tabla con vistualización */}
      <div
        ref={tableContainerRef}
        style={{
          height: "600px",
          overflow: "auto",
          border: "1px solid #ddd",
          borderRadius: "4px",
          marginBottom: "20px",
          position: "relative",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {virtualRows.map((virtualRow: VirtualItem) => {
              //logica
              const row = rows[virtualRow.index] as Row<any>;

              //ui
              return (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: "1px solid #eee",
                    backgroundColor: "white",
                    height: "60px",
                  }}
                >
                  {row.getVisibleCells().map((cell: any) => {
                    return (
                      <td
                        key={cell.id}
                        style={{
                          padding: "12px",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de paginacion */}
      <div className="d-flex justify-content-between mt-4">
        <div>
          <button onClick={handlePrev} disabled={isLoading}>
            Anterior
          </button>
          <button onClick={handleNext} disabled={isLoading}>
            Siguiente
          </button>
          <button className={`btn ${btnState}`} onClick={handleBtnState}>
            {btnState == "btn-success" ? "Soy verde" : "Cambiame a verde"}
          </button>
        </div>

        <div>
          {/* Control de paginacion */}
          <PageSizeSelector
            onChangePage={handleChangePageSize}
            pageSize={pageSize}
          />
        </div>
      </div>
      <DetallesBtnStateModal show={show} setShow={setShow} />
    </div>
  );
}

export default TanStackReactTableUsers;
