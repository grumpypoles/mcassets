import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Filter from "@/app/_components/Filter";
import { Suspense } from "react";
import SailsList from "@/app/_components/SailsList";
import Spinner from "@/app/_components/Spinner";

export const metadata = {
  title: "Sails",
};

const Page = async props => {
  const searchParams = await props.searchParams;


  const filter = searchParams?.status ?? "active";

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-4xl font-medium text-primary-500">
        Windsurfing Sails
      </h1>
      <div className="mb-10 text-lg text-primary-200">
        <p>
          Windsurfing sails play a pivotal role in the sport, serving as the
          primary source of propulsion and control. Over the years, sail design
          has evolved significantly, transitioning from simple, heavy materials
          like dacron to lightweight, high-performance fabrics such as monofilm,
          Kevlar, and carbon fiber. Early sails were often bulky and less
          efficient, but advances in technology have revolutionized their shape
          and construction. Modern sails are optimized for aerodynamics, with
          precise shaping and tension control, making them faster, more
          responsive, and easier to handle in various wind conditions. These
          innovations have enhanced speed, maneuverability, and overall
          performance, making windsurfing a more exhilarating and accessible
          sport.
        </p>
        
        <div className="flex justify-between mt-6">
        <div>
          <Filter type={'Sails'}/>
        </div>
          <Link
            href={`/sails/add`}
            className="flex text-2xl font-semibold items-centermb-4 text-primary-300"
          >
            <span className="flex flex-row justify-end w-full mt-2 text-xl font-medium gap-x-2">
              Add
              <ArrowRightIcon className="w-6 h-6 mr-2" />
            </span>
          </Link>
        </div>
        
        
        <Suspense fallback={<Spinner />} key={filter}>
          <SailsList filter={filter} />
        </Suspense>
      </div>
     {/* <Pagination/> */}
    </div>
  );
};

export default Page;
