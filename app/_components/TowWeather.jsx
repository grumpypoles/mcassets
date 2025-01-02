import {
    CloudIcon
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
const TowWeather = ({ sessionData }) => {
  return (
    <div className="flex flex-col items-center justify-top  text-primary-800 bg-primary-200">
      <span className="flex flex-row items-center gap-x-2 mb-4 w-full p-4 text-2xl font-bold  bg-primary-400">
        <CloudIcon className="h-10 w-10" /> Weather Information
      </span>

      <div>
        <ul>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <CloudIcon className="h-6 w-6" /> Wind Strength:{" "}
              {sessionData.wind_strength}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <CloudIcon className="h-6 w-6" /> Wind Direction: {sessionData.wind_direction}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-lg font-medium">
              <CloudIcon className="h-6 w-6" /> Tide Hight:{" "}
              {sessionData.tide_hight}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-lg font-medium">
              <CloudIcon className="h-6 w-6" /> Tide Direction:{" "}
              {sessionData.tide_direction}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <CloudIcon className="h-6 w-6" /> Swell Size: {sessionData.swell_size}
            </span>
          </li>
          <li>
            <span className="flex flex-row items-center gap-x-2 w-full text-xl font-medium">
              <CloudIcon className="h-6 w-6" /> Swell Direction: {sessionData.swell_direction}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TowWeather;
