'use client'

import EquipmentHeaderImage from "@/app/_components/EquipmentHeaderImage";
import EquipmentHeader from "@/app/_components/EquipmentHeader";
import EquipmentFinance from "@/app/_components/EquipmentFinance";
import EquipmentTechnical from "@/app/_components/EquipmentTechnical";
import EquipmentInvoice from "@/app/_components/EquipmentInvoice";

function SundryDashboard({ equipmentData }) {

  
  return (
    <div className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900">
      <EquipmentHeader type={'Sundry'} eqData={equipmentData}/>
      <EquipmentHeaderImage eqData={equipmentData}/>
      <div className="grid grid-cols-2 gap-6 px-12 py-8 text-lg bg-primary-900">
      <EquipmentFinance type={'Sundry'} eqData={equipmentData}/>
      <EquipmentTechnical type={'Sundry'} eqData={equipmentData}/>
      </div>
      <EquipmentInvoice eqData={equipmentData}/>
    </div>
  );
}
export default SundryDashboard
