import { getLocations, getSport } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import LocationGrid from "@/app/_components/LocationGrid";

async function LocationList() {
  const session = await auth();
  const beaches = await getLocations(session.user.appUserId);
  const sports = await getSport();

  return (
    <div>
      {beaches.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
          You don&apos;t have any beach spots yet.
        </h1>
      ) : (
        <LocationGrid rowData={beaches} />
      )}
    </div>
  );
}

export default LocationList;
