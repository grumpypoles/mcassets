"use client";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import DeleteTow from "@/app/_components/DeleteTow";
import TowDetails from "@/app/_components/TowDetails";
import TowEdit from "@/app/_components/TowEdit";

const EditRow = ({ data }) => (
  <>
    <div className="flex flex-col w-[100px]">
      <TowDetails copiedRow={data} />
    </div>
  </>
);

const RowDetails = ({ data }) => (
  <>
    <div className="flex flex-col w-[100px]">
      <TowEdit copiedRow={data} />
    </div>
  </>
);

const DeleteRow = ({ data }) => (
  <>
    <div className="flex flex-col w-[100px]">
      <DeleteTow rowId={data.id} date={data.date} sport={data.sport}/>
    </div>
  </>
);

const TowGrid = ({ rowData }) => {
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      editable: false,
    }),
    []
  );

  // const activitiesList = activities.map((item) => item.activity);

  const [colDefs] = useState([
    { field: "date", filter: true, editable: false },
    { field: "spot", minWidth: 200, filter: true, editable: false },
    { field: "sport", minWidth: 200, filter: true, editable: false },
    { field: "discipline", minWidth: 200, filter: true, editable: false },
    { field: "rating", filter: true, editable: true },

    {
      field: "custom",
      headerName: "Details",
      maxWidth: 125,
      cellRenderer: (params) => <EditRow data={params.data} />,
    },
    {
      field: "custom",
      headerName: "Edit",
      maxWidth: 125,
      cellRenderer: (params) => <RowDetails data={params.data} />,
    },
    {
      field: "custom",
      headerName: "Delete",
      maxWidth: 125,
      cellRenderer: (params) => <DeleteRow data={params.data} />,
    },
  ]);

  return (
    <div className="ag-theme-quartz-dark" style={{ height: 525 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20]}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default TowGrid;
