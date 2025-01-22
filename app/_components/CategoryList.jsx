import CategoryGrid from "@/app/_components/CategoryGrid";
import connectDB from "@/app/_config/database";
import AssetCategories from "@/app/_models/HI_Categories";

async function CategoryList() {
  await connectDB();
  const categories = await AssetCategories.find({}).sort({ code: 1 }).lean();

  const categoriesData = categories.map((category) => ({
    ...category,
    _id: category._id.toString(),
  }));

  return (
    <div>
      {categoriesData.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
          You don&apos;t have any asset categories recorded yet.
        </h1>
      ) : (
        <CategoryGrid rowData={categoriesData} />
      )}
    </div>
  );
}

export default CategoryList;
