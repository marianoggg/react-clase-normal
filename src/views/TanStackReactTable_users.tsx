import { useState, useRef } from "react";
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

const defaultData: any[] = [
  { name: "juan", age: 22 },
  { name: "pedro", age: 23 },
  { name: "pedro", age: 23 },
  { name: "pedro", age: 23 },
  { name: "pedro", age: 23 },
  { name: "pedro", age: 23 },
  { name: "pedro", age: 23 },
  { name: "pedro", age: 23 },
  { name: "pedro", age: 23 },
  { name: "pedro", age: 23 },
];

const defaultColumns = [
  {
    header: "Nombres",
    accessorKey: "name",
  },
  {
    header: "Edades",
    accessorKey: "age",
  },
];

function TanStackReactTableUsers({}: Props) {
  //logica
  const [globalFilter, setGlobalFilter] = useState("");

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: defaultData,
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
    </div>
  );
}

export default TanStackReactTableUsers;
