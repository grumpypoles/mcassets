
import { getSessions } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import TowGrid from "@/app/_components/TowGrid";



async function TowList() {
  const session = await auth()
  const beaches = await getSessions(session.user.appUserId);

  
  


  return (
    <div>
      {beaches.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
         You don&apos;t have any sessions yet.
        </h1>
      ) : (
        <TowGrid rowData={beaches} />
      )}
    </div>
  );

  
}

export default TowList;
