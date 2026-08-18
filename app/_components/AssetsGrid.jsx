"use client";

import { AgGridReact } from "ag-grid-react";
import { themeQuartz, colorSchemeDarkBlue } from "ag-grid-community";
import "@/app/_components/agGridModules";
import { useMemo } from "react";
import Image from "next/image";
import AssetsDetails from "@/app/_components/AssetsDetails";
import AssetsEdit from "@/app/_components/AssetsEdit";

const DetailRowRenderer = (params) => <AssetsDetails copiedRow={params.data} />;
const EditRowRenderer   = (params) => <AssetsEdit copiedRow={params.data} />;

const ImageCellRenderer = (params) => {
  const imageUrl = Array.isArray(params.value) ? params.value[0] : null;
  return imageUrl ? (
    <Image
      src={imageUrl}
      alt="Asset"
      width={50}
      height={50}
      style={{ height: "auto", display: "block", margin: "0 auto" }}
    />
  ) : null;
};

const AssetsGrid = ({ rowData }) => {
  const defaultColDef = useMemo(() => ({ flex: 1, editable: false }), []);

  const colDefs = useMemo(
    () => [
      { field: "selcode",            headerName: "Code",        filter: true },
      { field: "card_description",   headerName: "Description", minWidth: 200, filter: true },
      { field: "card_model",         headerName: "Model",       minWidth: 200, filter: true },
      { field: "technical_location", headerName: "Location",    minWidth: 200, filter: true },
      { field: "technical_category", headerName: "Category",    filter: true },
      { field: "status",             headerName: "Status",      filter: true },
      {
        field: "card_image",
        headerName: "Image",
        maxWidth: 100,
        cellRenderer: ImageCellRenderer,
        autoHeight: true,
        valueFormatter: () => "",
      },
      {
        headerName: "Details",
        maxWidth: 125,
        cellRenderer: DetailRowRenderer,
      },
      {
        headerName: "Edit",
        maxWidth: 125,
        cellRenderer: EditRowRenderer,
      },
    ],
    []
  );

  return (
    <div style={{ height: 525 }}>
      <AgGridReact
        theme={themeQuartz.withPart(colorSchemeDarkBlue)}
        rowData={rowData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 30, 50, 100]}
      />
    </div>
  );
};

export default AssetsGrid;
