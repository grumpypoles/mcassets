"use client";

import {
  FieldList,
  Inject,
  PivotViewComponent,
  Toolbar
} from "@syncfusion/ej2-react-pivotview";

import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE_KEY);

const ReportGrid = ({ rowData }) => {
  let pivotObj = null;

  
  const setTarget = () => {
    if (pivotObj) {
      pivotObj.pivotFieldListModule.dialogRenderer.fieldListDialog.target =
        document.body;
    }
  };

  const handleFieldListToggle = () => {
    if (pivotObj) {
      pivotObj.toggleFieldList();
    }
  };

  const dataSourceSettings = {
    columns: [
      { name: "technical_category" },
      { name: "technical_location" },
      { name: "card_description" },
      // { name: "year", caption: "Year" },
      // { name: "month", caption: "Month" },
    ],
    values: [{ name: "finance_purchase_amount", caption: "Annual Purchase" }],
    rows: [
      { name: "year", caption: "Year" },
      { name: "status", caption: "Current Status" }

      // { name: "technical_category" },
      // { name: "technical_location" },
      // { name: "comments" },
      // { name: "duration" },
    ],
    filters: ["year", "technical_category", "technical_location"],
    filterSettings: [
  {
    name: "year",
    type: "Include",
    items: Array.from({ length: 15 }, (_, i) => (new Date().getFullYear() - i).toString())
  }
],
    expandAll: false,
    enableSorting: true,
    sortSettings: [
      {
        name: "year",
        order: "Descending",
      },
      {
        name: "technical_category",
        order: "Ascending",
      },
      {
        name: "technical_location",
        order: "Ascending",
      },
    ],
    formatSettings: [{ name: "finance_purchase_amount", format: "#,###.00" }],
    dataSource: rowData,
  };

  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-primary-500">
        Annual Purchases
      </h1>
      <PivotViewComponent
        ref={(d) => (pivotObj = d)}
        showFieldList={true}
        showToolbar={true}
        toolbar={["FieldList"]}
        allowDeferLayoutUpdate={true}
        // allowCalculatedField={true}
        dataBound={setTarget}
        showValuesButton={true}
        id="PivotView"
        height={600}
        dataSourceSettings={dataSourceSettings}
      >
        <Inject services={[FieldList, Toolbar]} />
      </PivotViewComponent>
    </div>
  );
};

export default ReportGrid;
