import ReportGrid from "@/app/_components/ReportGrid";
import { auth } from "@/app/_lib/auth";
import { getAssetsReport } from "@/app/_lib/statistics";

async function ReportsList() {
  const session = await auth();

  const assetsData = await getAssetsReport();

  return (
    console.log("assetsData", assetsData),
    (
      <div>
        {assetsData.length === 0 ? (
          <h1 className="mb-5 text-3xl font-medium text-primary-500">
            You don&apos;t have any assets recorded yet. Start collecting your
            statistics.
          </h1>
        ) : (
          <>
            <div>
              <ReportGrid rowData={assetsData} />
            </div>
          </>
        )}
      </div>
    )
  );
}

export default ReportsList;
