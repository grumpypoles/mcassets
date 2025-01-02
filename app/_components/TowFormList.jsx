
import { getSessions } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import { getLocation } from "@/app/_lib/actions_tow";
import TowForm from "./TowForm";


async function TowFormList({equipment, edit}) {
  const session = await auth()
  const beaches = await getSessions(session.user.appUserId);

  const locations = await getLocation()
  
  


  return (
    <>    <div>
      {beaches.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
         You don&apos;t have any sessions yet.
        </h1>
      ) : (
      
        <TowForm equipment={null} edit={null} location={location}/>
        
      )}
    </div>
    </>

  );

  
}

export default TowFormList;
