import { auth } from "@/app/_lib/auth";
import { getCategories } from "@/app/_lib/data-service";
import CategoryGrid from "@/app/_components/CategoryGrid";

async function CategoryList() {
  const session = await auth();
  const ws_categories = await getCategories();
  const { id, selcode, description } = ws_categories

  return (
    <div>
      {ws_categories.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
          You don&apos;t have any windsurfing categories recorded yet.
        </h1>
      ) : (
        <CategoryGrid rowData={ws_categories} />
      )}
    </div>
  );
}

export default CategoryList;
