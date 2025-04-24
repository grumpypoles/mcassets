import { auth } from "@/app/_lib/auth";

import { getAssetsStatistics} from "@/app/_lib/statistics";
import ChartAssetPieValue from "@/app/_components/ChartAssetPieValue";
import ChartAssetPieVolume from "@/app/_components/ChartAssetPieVolume";



async function ChartAssetsPies() {
  const session = await auth()
  const assetData = await getAssetsStatistics(session.user.appUserId);
  
 


  return (
    <div>
      {assetData.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
         You don&apos;t have any assets recorded yet. Start collecting your data.
        </h1>
      ) : (
        <>
        <div className="grid grid-cols-2 gap-4">
        <ChartAssetPieValue rowData={assetData} />
        <ChartAssetPieVolume rowData={assetData}  />
        </div>
        </>
      )}
    </div>
  );


}

export default ChartAssetsPies;
