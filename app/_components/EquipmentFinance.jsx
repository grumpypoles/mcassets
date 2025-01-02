import {
    CalculatorIcon, KeyIcon
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
const EquipmentFinance = ({ type, eqData }) => {
  return (
    <div className="flex flex-col items-center justify-top  text-primary-800 bg-primary-200">
      <span className="flex flex-row items-center gap-x-2 mb-4 w-full p-4 text-2xl font-bold  bg-primary-400">
        <CalculatorIcon className="h-10 w-10" /> Financial Data
      </span>

      <div>
        <ul>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <KeyIcon className="h-6 w-6" /> Purchase Date:{" "}
              {format(new Date(eqData[0].purchase_date), "dd-MMM-yyyy")}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <KeyIcon className="h-6 w-6" /> Merchant: {eqData[0].merchant}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-lg font-medium">
              <KeyIcon className="h-6 w-6" /> Retail Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NZD",
              }).format(eqData[0].retail_price)}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-lg font-medium">
              <KeyIcon className="h-6 w-6" /> Paid Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NZD",
              }).format(eqData[0].paid_price)}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <KeyIcon className="h-6 w-6" /> Comments: {eqData[0].comments}
            </span>
          </li>

          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              {!eqData[0].is_active && (
                <>
                  <KeyIcon className="h-6 w-6" /> Disposal Date:{" "}
                  {format(new Date(eqData[0].disposal_date), "dd-MMM-yyyy")}
                </>
              )}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
            {!eqData[0].is_active && (
                <>
                  <KeyIcon className="h-6 w-6" />
                  Disposal Method:{" "}
                  {eqData[0].disposal}
                </>
              )}
             
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
            {!eqData[0].is_active && (
                <>
                  <KeyIcon className="h-6 w-6" />
                  Disposal Revenue:{" "}
                  {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "NZD",
              }).format(eqData[0].disposal_price)}
                </>
              )}
            
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EquipmentFinance;
