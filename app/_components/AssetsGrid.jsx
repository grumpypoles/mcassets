"use client";

import AssetsDetails from "@/app/_components/AssetsDetails";
import AssetsEdit from "@/app/_components/AssetsEdit";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";

const DetailRowRenderer = (params) => <AssetsDetails copiedRow={params.data} />;
const EditRowRenderer = (params) => <AssetsEdit copiedRow={params.data} />;



const AssetsGrid = ({ rowData }) => {
  const defaultColDef = useMemo(() => ({ flex: 1, editable: false }), []);

  const [colDefs] = useState([
    { field: "selcode", headerName: "Code", filter: true },
    { field: "card.description", headerName: "Description", minWidth: 200, filter: true },
    { field: "card.model", headerName: "Model", minWidth: 200, filter: true },
    { field: "technical.location", headerName: "Location", minWidth: 200, filter: true },
    { field: "technical.category", headerName: "Category", filter: true },
    { field: "status", headerName: "Status", filter: true },
    {
      field: "custom",
      headerName: "Details",
      maxWidth: 125,
      cellRenderer: DetailRowRenderer,
    },
    {
      field: "custom",
      headerName: "Edit",
      maxWidth: 125,
      cellRenderer: EditRowRenderer,
    },
  ]);

  return (
    <div className="ag-theme-quartz-dark" style={{ height: 525 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 30, 50, 100, 200]}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default AssetsGrid;
