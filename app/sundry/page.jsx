import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Filter from "@/app/_components/Filter";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import SundryList from "@/app/_components/SundryList";

export const metadata = {
  title: "Sundry",
};

const Page = async props => {
  const searchParams = await props.searchParams;
  const filter = searchParams?.status ?? "all";

  return (
    <div className="flex flex-col">
      <h1 className="mb-5 text-4xl font-medium text-primary-500">
        Other Windsurfing Equipment
      </h1>
      <div className="mb-10 text-lg text-primary-200">
        <p>
          Wetsuits, windsurfing harnesses, and SUP paddles are essential but
          sometimes overlooked pieces of windsurfing/SUP equipment. A wetsuit&apos;s
          thickness, flexibility, and thermal properties are crucial for
          maintaining comfort and warmth in different water conditions.
          Similarly, a well-fitted harness is vital for transferring body weight
          to the sail, offering greater control and reducing strain during long
          sessions. SUP paddles, on the other hand, depend on blade size, shape,
          and material to influence efficiency and power with each stroke. Just
          like any other gear, these pieces require thoughtful selection to
          enhance performance and ensure an enjoyable experience on the water.
        </p>

        <div className="flex justify-between mt-6">
          <div>
            <Filter type={"Sundry"} />
          </div>
          <Link
            href={`/sundry/add`}
            className="flex items-center mb-4 text-2xl font-semibold text-primary-300"
          >
            <span className="flex flex-row justify-end w-full mt-2 text-xl font-medium gap-x-2">
              Add
              <ArrowRightIcon className="w-6 h-6 mr-2" />
            </span>
          </Link>
        </div>

        <Suspense fallback={<Spinner />} key={filter}>
          <SundryList filter={filter} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
