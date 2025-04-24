

import { auth } from "@/app/_lib/auth";
import ChartAssetsBarCategory from "@/app/_components/ChartAssetsBarCategory";
import { getAssetsByYear } from "@/app/_lib/statistics";



async function ChartAssetBar() {
  const session = await auth()
  const assetsData = await getAssetsByYear(session.user.appUserId);
 

 


  return (
    <div>
      {assetsData.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
         You don&apos;t have any walks recorded yet. Start collecting your statistics.
        </h1>
      ) : (
        <ChartAssetsBarCategory rowData={assetsData}/>
      )}
    </div>
  );


}

export default ChartAssetBar;
