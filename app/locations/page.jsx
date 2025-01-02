import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
import LocationList from "../_components/LocationList";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Spots",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-4xl font-medium text-primary-500">
        Sailing Locations
      </h1>
      <div className="mb-10 text-lg text-primary-200">
        <p>The sailing location table includes a list of beaches where ocean activities take place.</p>
        
        
      <div className="flex justify-end mt-6">
          
          <Link
            href={`/locations/add`}
            className="flex items-center mb-2 text-2xl font-semibold text-primary-300"
          >
            <span className="flex flex-row justify-end w-full mt-2 text-xl font-medium gap-x-2">
              Add
              <ArrowRightIcon className="w-6 h-6 mr-2" />
            </span>
          </Link>
        </div>
      </div>
      <Suspense fallback={<Spinner />}>
        <LocationList />
      </Suspense>
    </div>
  );
}
