"use client";

import { AgGridReact } from "ag-grid-react";
import { themeQuartz, colorSchemeDarkBlue } from "ag-grid-community";
import "@/app/_components/agGridModules";
import { useMemo, useState, useCallback, useRef } from "react";
import { updateCategory } from "@/app/_lib/data-service";
import DuplicateCategory from "@/app/_components/DuplicateCategory";

const CopyRow = ({ data }) => (
  <div className="flex flex-col w-[100px]">
    <DuplicateCategory copiedRow={data} />
  </div>
);

const CategoryGrid = ({ rowData }) => {
  const [error, setError]   = useState(null);
  const pendingRef          = useRef(new Set());

  const defaultColDef = useMemo(() => ({ flex: 1, editable: true }), []);

  const handleCellValueChanged = useCallback(async (params) => {
    const rowId = params.data.id;
    if (pendingRef.current.has(rowId)) return;
    pendingRef.current.add(rowId);
    try {
      await updateCategory(params.data);
      setError(null);
    } catch (err) {
      params.node.setDataValue(params.column.colId, params.oldValue);
      setError(err.message);
    } finally {
      pendingRef.current.delete(rowId);
    }
  }, []);

  const [colDefs] = useState([
    {
      field: "description",
      headerName: "Description",
      filter: true,
      maxWidth: 500,
    },
    {
      field: "custom",
      headerName: "Copy",
      maxWidth: 80,
      tooltipValueGetter: () => "Copy Row",
      cellRenderer: (params) => <CopyRow data={params.data} />,
    },
  ]);

  return (
    <div className="flex flex-col gap-2">
      {error && <p className="text-xs text-red-400">{error}</p>}
      <div style={{ height: 405 }}>
        <AgGridReact
          theme={themeQuartz.withPart(colorSchemeDarkBlue)}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          tooltipShowDelay={500}
          pagination={true}
          paginationPageSize={7}
          paginationPageSizeSelector={[7, 14, 21]}
          onCellValueChanged={handleCellValueChanged}
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
