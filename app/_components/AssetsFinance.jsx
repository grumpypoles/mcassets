import { CalculatorIcon, KeyIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import Link from "next/link";
const AssetsFinance = ({ eqData }) => {
  // Check if invoice data exists
  let pdf_urls;
  if (
    eqData?.finance?.purchase?.invoice &&
    eqData.finance.purchase.invoice.length > 0
  ) {
    pdf_urls = `/invoices/${eqData.finance.purchase.invoice}`;
  } else {
    pdf_urls = `/invoices/0000 Missing Invoice.pdf`;
  }
 
  return (
    <div className="flex flex-col items-center justify-top text-primary-800 bg-primary-200">
      <span className="flex flex-row items-center w-full p-4 mb-4 text-2xl font-bold gap-x-2 bg-primary-400">
        <CalculatorIcon className="w-10 h-10" /> Financial Data
      </span>

      <div>
        <ul>
          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              <KeyIcon className="w-6 h-6" /> Purchase Date:{" "}
              {format(new Date(eqData.finance.purchase.date), "dd-MMM-yyyy")}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              <KeyIcon className="w-6 h-6" /> Merchant:{" "}
              {eqData.finance.purchase.location}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full text-lg font-medium gap-x-2">
              <KeyIcon className="w-6 h-6" /> Retail Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NZD",
              }).format(eqData.finance.purchase.amount)}
            </span>
          </li>
          {eqData.finance?.purchase?.note && (
            <li>
              <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
                <KeyIcon className="w-6 h-6" /> Purchase Note:{" "}
                {eqData.finance.purchase.note}
              </span>
            </li>
          )}

          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              {!eqData.status === "Active" && (
                <>
                  <KeyIcon className="w-6 h-6" /> Disposal Date:{" "}
                  {format(
                    new Date(eqData.finance.disposal.date),
                    "dd-MMM-yyyy"
                  )}
                </>
              )}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              {!eqData.status === "Active" && (
                <>
                  <KeyIcon className="w-6 h-6" />
                  Disposal Method: {eqData.finance.disposal.note}
                </>
              )}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
              {!eqData.status === "Active" && (
                <>
                  <KeyIcon className="w-6 h-6" />
                  Disposal Revenue:{" "}
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "NZD",
                  }).format(eqData.finance.disposal.amount)}
                </>
              )}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center w-full mb-10 text-xl font-medium gap-x-2">
              <a
                href={pdf_urls}
                className="flex flex-row items-center w-full text-xl font-medium gap-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <KeyIcon className="w-6 h-6" />
                Invoice: {eqData.finance.purchase.invoice}
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AssetsFinance;
