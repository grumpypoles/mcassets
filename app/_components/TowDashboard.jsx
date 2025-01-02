'use client'

import TowEquipment from "./TowEquipment";
import TowWeather from "./TowWeather";

function TowDashboard({ sessionData }) {

  
 
  return (
    <div className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900">
      <div className="grid grid-cols-2 gap-6 px-12 py-8 text-lg bg-primary-900">
      <TowEquipment sessionData={sessionData}/>
      <TowWeather sessionData={sessionData}/>
      </div>
    </div>
  );
}
export default TowDashboard
