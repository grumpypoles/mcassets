
import AssetsGrid from "@/app/_components/AssetsGrid";
import connectDB from "@/app/_config/database";
import McAssets from "@/app/_models/HI_Assets";



async function AssetsList() {
  await connectDB();
  const json_assets_Data = await McAssets.find({}).sort({ _id: -1 }).lean();
  const assets_Data = json_assets_Data.map((asset) => ({
    ...asset,
    _id: asset._id.toString(),
  }));
  


  
  


  return (
    <div>
      {assets_Data.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
         You don&apos;t have any assets yet.
        </h1>
      ) : (
        <AssetsGrid rowData={assets_Data} />
      )}
    </div>
  );

  
}

export default AssetsList;
