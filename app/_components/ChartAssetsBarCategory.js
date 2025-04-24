"use client";

import { AgCharts } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function ChartAssetsBarCategory({ rowData }) {
 
  const chartOptions = {
    seriesDefaults: {},
    data: rowData,
    title: {
      text: "Assets Purchased per Year",
      // color: ["#99B0C7"],
    },
    theme: "ag-vivid-dark",
    // subtitle:{
    //   text: "In meters"
    // },
    series: [
      {
        type: "bar",
        xKey: "year",
        yKey: "assets_value",
        yName: "Value",
      },
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
      },
      {
        type: "number",
        position: "left",
        keys: ["assets_value"],
        title: {
          text: "Value $",
        },
        interval: {step: 1000},
        label: {
        formatter: (params) => {
          return `${parseFloat(params.value).toLocaleString()}`; ;
        },
      },
      },
      
    ],

    // legend: {
    //   position: "right"
    // }
  };

  return (
    <>
      <div className="ag-theme-quartz-dark">
        <AgCharts options={chartOptions} />
      </div>
    </>
  );
}

export default ChartAssetsBarCategory;
