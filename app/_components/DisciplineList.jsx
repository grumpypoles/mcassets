import { auth } from "@/app/_lib/auth";
import { getDisciplines } from "@/app/_lib/data-service";
import DisciplineGrid from "@/app/_components/DisciplineGrid";

async function DisciplineList() {
  const session = await auth();
  const ws_disciplines = await getDisciplines();
  // const { id, selcode, description } = ws_disciplines

  return (
    <div>
      {ws_disciplines.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
          You don&apos;t have any disciplines recorded yet.
        </h1>
      ) : (
        <DisciplineGrid rowData={ws_disciplines} />
      )}
    </div>
  );
}

export default DisciplineList;
