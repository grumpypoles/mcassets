import { getSundries } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import SundryCard from "@/app/_components/SundryCard";



async function SundryList({filter}) {
  const session = await auth();
  const eqData = await getSundries(session.user.appUserId);

  if (!eqData || !eqData.length) return null; // Check if eqData is null or empty

  let displayedEq;

 
  if (filter === "all") {
    displayedEq = eqData;
  } else if (filter === "active") {
    displayedEq = eqData.filter((equipment) => equipment.is_active === true);
  } else if (filter === "inactive") {
    displayedEq = eqData.filter((equipment) => equipment.is_active === false);
  }
  return (
    
    <div className="flex justify-end mt-10 text-2xl text-primary-200">
      {eqData.length === 0 ? (
        <p>Current user does not own any equipment.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayedEq.map((equipment) => (
            <SundryCard key={equipment.id} equipment={equipment} />
          ))}
        </div>
      )}
    </div>
  );


}

export default SundryList;
