import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import TowList from "@/app/_components/TowList";

export const metadata = {
  title: "TOW",
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-4xl font-medium text-primary-500">
        Time on Water
      </h1>
      <div className="mb-10 text-lg text-primary-200">
        <p>
          Time on Water (TOW) is a critical factor in Windsurfing and Stand-Up
          Paddleboarding (SUP) as it directly influences skill development,
          performance, and overall enjoyment of the sport. The more time spent
          on the water, the greater the opportunity to refine techniques, adapt
          to varying conditions, and build confidence in handling equipment. For
          windsurfing, TOW allows individuals to master the interplay between
          wind, waves, and gear, leading to improved speed, balance, and
          maneuverability. In SUP, regular TOW enhances paddling efficiency,
          core strength, and endurance. Ultimately, consistent water time is key
          to progression, making it essential for both beginners and seasoned
          enthusiasts aiming to elevate their capabilities..
        </p>

        <div className="flex justify-end mt-6">
          <Link
            href={`/tow/add`}
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
        <TowList />
      </Suspense>
    </div>
  );
}
