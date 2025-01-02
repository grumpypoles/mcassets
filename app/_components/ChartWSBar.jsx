"use client";

import { infiniteScrollHandler } from "@syncfusion/ej2-react-grids";
import { AgCharts } from "ag-charts-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

function ChartWSBar({ rowData }) {

  const chartOptions = {
    seriesDefaults: {},
    data: rowData,
    title: {
      text: "Ocean Activities - Frequency",
      // color: ["#99B0C7"],
    },
    theme: "ag-vivid-dark",

    // subtitle:{
    //   text: "In meters"
    // },

    // series: [
    //   {
    //     type: "bar",
    //     xKey: "category",
    //     yKey: "counter",
    //     yName: "counter",
    //   },
    // ],
    // axes: [
    //   {
    //     type: "category",
    //     position: "bottom",
    //   },
    //   {
    //     type: "number",
    //     position: "left",
    //     keys: ["counter"],
    //     title: {
    //       text: "Occurrence",
    //     },
    //     interval: {step: 25},
    //     label: {
    //     formatter: (params) => {
    //       return params.value  + " times";
    //     },
    //   },
    //   },

    // ],
    series: [
      {
        type: "donut",
        calloutLabelKey: "category",
        angleKey: "counter",
        innerRadiusRatio: 0.7,
        showInLegend: false,
        // calloutLabel:false,
    }
    ],

    // legend: {
    //   position: "right"
    // }
  };

  return (
    <>
      <div className="ag-theme-quartz-dark">
        <AgCharts options={chartOptions} style={{ height: "600px" }} />
      </div>
    </>
  );
}

export default ChartWSBar;
