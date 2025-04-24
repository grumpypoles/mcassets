"use client";

import { AgCharts } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function ChartAssetPieValue({ rowData }) {
  const chartOptions = {
    legend: {
      enabled: true,
      position: "right",
    },
    data: rowData,
    title: {
      text: "Assets - Volume by Category",
    },
    theme: "ag-vivid-dark",
    // subtitle:{
    //   text: "In meters"
    // },
    series: [
      {
        type: "pie",
        angleKey: "assets_value",
        sectorLabelKey: "assets_value",
        legendItemKey: "technical_category",
        sectorLabel: {
          color: "white",
          fontWeight: "bold",
          formatter: (params) => {
            return `${parseFloat(params.value).toLocaleString()}`;
          },
        },
      },
    ],
    
  };

  return (
    <>
      <div className="ag-theme-quartz-dark">
        <AgCharts options={chartOptions} />
      </div>
    </>
  );
}

export default ChartAssetPieValue;
