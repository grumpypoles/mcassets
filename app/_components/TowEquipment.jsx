import {
  WrenchScrewdriverIcon
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
const TowEquipment = ({ sessionData}) => {
  return (
    <div className="flex flex-col items-center justify-top  text-primary-800 bg-primary-200">
      <span className="flex flex-row items-center gap-x-2 mb-4 w-full p-4 text-2xl font-bold  bg-primary-400">
        <WrenchScrewdriverIcon className="h-10 w-10" />Equipment Information
      </span>

      <div>
        <ul>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <WrenchScrewdriverIcon className="h-6 w-6" /> Sail:{" "}
              {sessionData.sail}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <WrenchScrewdriverIcon className="h-6 w-6" /> Board: {sessionData.board}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-lg font-medium">
              <WrenchScrewdriverIcon className="h-6 w-6" /> Distance:{" "}
              {sessionData.distance}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-lg font-medium">
              <WrenchScrewdriverIcon className="h-6 w-6" /> Rating:{" "}
              {sessionData.rating}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TowEquipment;
