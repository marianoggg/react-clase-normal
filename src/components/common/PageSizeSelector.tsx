type PropPageSizeSelector = {
  onChangePage: (newSize: number) => void;
  pageSize: number;
};

/** Selector de tamaño de página
 *
 * @param onChangePage
 * @param pageSize
 *
 * @returns void
 */
export function PageSizeSelector({
  onChangePage,
  pageSize,
}: PropPageSizeSelector) {
  return (
    <div className="d-flex gap-2">
      <span>Mostrar</span>
      <select
        onChange={(e) => onChangePage(Number(e.target.value))}
        value={pageSize}
      >
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="60">60</option>
        <option value="100">100</option>
      </select>
      <span> registros por página</span>
    </div>
  );
}
