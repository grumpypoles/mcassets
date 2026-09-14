import InsuranceReport from "@/app/_components/InsuranceReport";
import { getInsuranceReport } from "@/app/_lib/statistics";

async function InsuranceList() {
  const assetsData = await getInsuranceReport();

  return (
    <div>
      {assetsData.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
          No assets recorded yet.
        </h1>
      ) : (
        <InsuranceReport rowData={assetsData} />
      )}
    </div>
  );
}

export default InsuranceList;
