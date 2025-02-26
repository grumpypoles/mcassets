import AssetsGrid from "@/app/_components/AssetsGrid";
import connectDB from "@/app/_config/database";
import { auth } from "@/app/_lib/auth";
import McAssets from "@/app/_models/HI_Assets";
import { getAssets } from "@/app/_lib/data-service";

async function AssetsList() {
  // await connectDB();
  // const json_assets_Data = await McAssets.find({}).sort({ selcode: -1 }).lean();
  // const assets_Data = json_assets_Data.map((asset) => ({
  //   ...asset,
  //   _id: asset._id.toString(),
  // }));

  const session = await auth();
  const assetData = await getAssets();

  return (
    <div>
      {assetData.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
          You don&apos;t have any assets yet.
        </h1>
      ) : (
        <AssetsGrid rowData={assetData} />
      )}
    </div>
  );
}

export default AssetsList;
