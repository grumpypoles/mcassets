import Accordian, { AccordianItem } from "./Accordion";
import { CalculatorIcon, ForwardIcon } from "@heroicons/react/24/solid";
const EquipmentFinance = ({ type, eqData }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Accordian className="max-w-lg w-full">
        <AccordianItem value="1" trigger={
          <span>
            <CalculatorIcon /> Financial Data
          </span>
        }>
          <div className="text-sm">
            <ul>
                <li><ForwardIcon/> - {eqData[0].purchase_date} </li>
            </ul>
          </div>
        </AccordianItem>
      </Accordian>
    </div>
  );
};

export default EquipmentFinance;
