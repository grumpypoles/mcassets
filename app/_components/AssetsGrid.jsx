"use client";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";
import DeleteTow from "@/app/_components/DeleteTow";
import TowDetails from "@/app/_components/TowDetails";
import TowEdit from "@/app/_components/TowEdit";
import AssetsDetails from "@/app/_components/AssetsDetails";
import AssetsEdit from "@/app/_components/AssetsEdit";

const EditRow = ({ data }) => (
  <>
    <div className="flex flex-col w-[100px]">
      <AssetsDetails copiedRow={data} />
    </div>
  </>
);

const RowDetails = ({ data }) => (
  <>
    <div className="flex flex-col w-[100px]">
      <AssetsEdit copiedRow={data} />
    </div>
  </>
);

// const DeleteRow = ({ data }) => (
//   <>
//     <div className="flex flex-col w-[100px]">
//       <DeleteTow rowId={data.id} date={data.date} sport={data.sport}/>
//     </div>
//   </>
// );

const AssetsGrid = ({ rowData }) => {
  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      editable: false,
    }),
    []
  );
// console.log(rowData)
  // const activitiesList = activities.map((item) => item.activity);

  const [colDefs] = useState([
    { field: "selcode", headerName: "Code", filter: true, editable: false },
    { field: "card.description", headerName: "Description", minWidth: 200, filter: true, editable: false },
    { field: "card.model", headerName: "Model", minWidth: 200, filter: true, editable: false },
    { field: "technical.location", headerName: "Location", minWidth: 200, filter: true, editable: false },
    { field: "technical.category", headerName: "Category", filter: true, editable: false },
    
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
    }
  
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

export default AssetsGrid;
