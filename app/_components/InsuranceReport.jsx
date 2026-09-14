"use client";

import { AgGridReact } from "ag-grid-react";
import { themeQuartz, colorSchemeDarkBlue } from "ag-grid-community";
import "@/app/_components/agGridModules";
import { useMemo, useState, useRef, useCallback } from "react";
//import { formatCurrency, formatDate } from "@/app/_lib/helpers";

const STATUS_OPTIONS = ["All", "Active", "Inactive"];

const InsuranceReport = ({ rowData }) => {
  const gridRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState("Active");

  const filteredData = useMemo(() => {
    if (selectedStatus === "All") return rowData;
    return rowData.filter(
      (row) => row.status?.toLowerCase() === selectedStatus.toLowerCase(),
    );
  }, [rowData, selectedStatus]);

  const totalValue = useMemo(
    () =>
      filteredData.reduce(
        (sum, row) => sum + (row.finance_purchase_amount || 0),
        0,
      ),
    [filteredData],
  );

  const colDefs = useMemo(
    () => [
      {
        field: "card_description",
        headerName: "Description",
        minWidth: 200,
        filter: true,
        sort: "asc",
      },
      {
        field: "technical_maker_name",
        headerName: "Maker",
        minWidth: 150,
        filter: true,
      },
      {
        field: "card_model",
        headerName: "Model",
        minWidth: 150,
        filter: true,
      },
      {
        field: "technical_model_number",
        headerName: "Model No",
        minWidth: 130,
        filter: true,
      },
      {
        field: "technical_serial_number",
        headerName: "Serial No",
        minWidth: 130,
        filter: true,
      },
      {
        field: "finance_purchase_date",
        headerName: "Purchase Date",
        minWidth: 140,
        filter: true,
        valueFormatter: (p) =>
          p.value ? new Date(p.value).toLocaleDateString("en-NZ") : "",
      },
      {
        field: "finance_purchase_amount",
        headerName: "Purchase Price",
        minWidth: 140,
        filter: true,
        valueFormatter: (p) =>
          p.value != null
            ? new Intl.NumberFormat("en-NZ", {
                style: "currency",
                currency: "NZD",
              }).format(p.value)
            : "",
      },
      {
        field: "finance_purchase_location",
        headerName: "Merchant",
        minWidth: 160,
        filter: true,
      },
      // {
      //   field: "status",
      //   headerName: "Status",
      //   maxWidth: 110,
      //   filter: true,
      // },
    ],
    [],
  );

  const defaultColDef = useMemo(() => ({ flex: 1, resizable: true }), []);

  // --- Export handlers ---

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleExportCSV = useCallback(() => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: `insurance-report-${selectedStatus.toLowerCase()}.csv`,
      columnKeys: [
        "card_description",
        "technical_maker_name",
        "card_model",
        "technical_model_number",
        "technical_serial_number",
        "finance_purchase_date",
        "finance_purchase_amount",
        "finance_purchase_location",
        "status",
      ],
    });
  }, [selectedStatus]);

  const handleExportTXT = useCallback(() => {
    const headers = [
      "Description",
      "Maker",
      "Model",
      "Model No",
      "Serial No",
      "Purchase Date",
      "Purchase Price",
      "Merchant",
      "Status",
    ];

    const rows = filteredData.map((row) =>
      [
        row.card_description ?? "",
        row.technical_maker_name ?? "",
        row.card_model ?? "",
        row.technical_model_number ?? "",
        row.technical_serial_number ?? "",
        row.finance_purchase_date ?? "",
        row.finance_purchase_amount ?? "",
        row.finance_purchase_location ?? "",
        row.status ?? "",
      ].join("\t"),
    );

    const content = [headers.join("\t"), ...rows].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `insurance-report-${selectedStatus.toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filteredData, selectedStatus]);

  const handleExportPDF = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-3xl font-medium text-primary-500">
            Insurance Report
          </h1>
          <p className="mt-1 text-sm text-primary-300">
            {filteredData.length} item{filteredData.length !== 1 ? "s" : ""}{" "}
            &nbsp;·&nbsp; Total value:{" "}
            {new Intl.NumberFormat("en-NZ", {
              style: "currency",
              currency: "NZD",
            }).format(totalValue)}
          </p>
        </div>

        {/* Export buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-sm transition-colors border border-primary-500 text-primary-400 hover:bg-primary-700"
          >
            Print
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 text-sm transition-colors border border-primary-500 text-primary-400 hover:bg-primary-700"
          >
            PDF
          </button>
          <button
            onClick={handleExportTXT}
            className="px-4 py-2 text-sm transition-colors border border-primary-500 text-primary-400 hover:bg-primary-700"
          >
            TXT
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 text-sm transition-colors border border-primary-500 text-primary-400 hover:bg-primary-700"
          >
            CSV
          </button>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 print:hidden">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-1.5 text-sm transition-colors border ${
              selectedStatus === status
                ? "bg-primary-600 border-primary-500 text-primary-100"
                : "border-primary-700 text-primary-400 hover:bg-primary-800"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Print header — only visible when printing */}
      <div className="hidden mb-4 print:block">
        <h1 className="text-2xl font-semibold">McAssets — Insurance Report</h1>
        <p className="text-sm text-gray-600">
          Status: {selectedStatus} &nbsp;·&nbsp; {filteredData.length} items
          &nbsp;·&nbsp; Total:{" "}
          {new Intl.NumberFormat("en-NZ", {
            style: "currency",
            currency: "NZD",
          }).format(totalValue)}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Generated{" "}
          {new Date().toLocaleDateString("en-NZ", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Grid */}
      <div style={{ height: 550 }} className="print:hidden">
        <AgGridReact
          ref={gridRef}
          theme={themeQuartz.withPart(colorSchemeDarkBlue)}
          rowData={filteredData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={20}
          paginationPageSizeSelector={[10, 20, 50, 100]}
        />
      </div>

      {/* Print table — only visible when printing */}
      <table className="hidden w-full text-xs border-collapse print:table">
        <thead>
          <tr className="text-left border-b border-gray-300">
            <th className="py-1 pr-3">Description</th>
            <th className="py-1 pr-3">Maker</th>
            <th className="py-1 pr-3">Model</th>
            <th className="py-1 pr-3">Model No</th>
            <th className="py-1 pr-3">Serial No</th>
            <th className="py-1 pr-3">Purchase Date</th>
            <th className="py-1 pr-3 text-right">Price</th>
            <th className="py-1 pr-3">Merchant</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, i) => (
            <tr key={row.id ?? i} className="border-b border-gray-100">
              <td className="py-1 pr-3">{row.card_description}</td>
              <td className="py-1 pr-3">{row.technical_maker_name}</td>
              <td className="py-1 pr-3">{row.card_model}</td>
              <td className="py-1 pr-3">{row.technical_model_number}</td>
              <td className="py-1 pr-3">{row.technical_serial_number}</td>
              <td className="py-1 pr-3">{row.finance_purchase_date}</td>
              <td className="py-1 pr-3 text-right">
                {row.finance_purchase_amount != null
                  ? new Intl.NumberFormat("en-NZ", {
                      style: "currency",
                      currency: "NZD",
                    }).format(row.finance_purchase_amount)
                  : ""}
              </td>
              <td className="py-1 pr-3">{row.finance_purchase_location}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold border-t-2 border-gray-400">
            <td colSpan={6} className="py-2">
              Total
            </td>
            <td className="py-2 text-right">
              {new Intl.NumberFormat("en-NZ", {
                style: "currency",
                currency: "NZD",
              }).format(totalValue)}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InsuranceReport;
