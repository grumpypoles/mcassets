import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

function SundryCard({ equipment }) {
  const urlsString = equipment.image;
  const urls = JSON.parse(urlsString);

  return (
    <div className="flex flex-col gap-6 px-12 py-8 text-lg bg-primary-800">
      <div className="flex items-center justify-center">
      <Link href={`/sundry/${equipment.id}`}>
        <Image
          src={urls[0]}
          alt=""
          height={0}
          width={0}
          sizes="100vw"
          className="w-full rounded-t-xl object-contain h-[300px] w-[300px]"
        />
      </Link>
      </div>
      <div className="p-4 min-h-32">
        <div className="mb-6 text-left md:text-center lg:text-left">
          <div className="w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400">
            {equipment.type} {equipment.year} {equipment.make} {equipment.model}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between mb-2">
        <Link
          href={`/sundry/${equipment.id}/edit`}
          className="flex text-2xl font-semibold items-centermb-4 text-primary-300"
        >
          {" "}
          <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
            <ArrowLeftIcon className="w-6 h-6 mr-2" /> Update
          </span>
        </Link>
        <Link
          href={`/sundry/${equipment.id}`}
          className="flex text-2xl font-semibold items-centermb-4 text-primary-300"
        >
          <span className="flex flex-row items-center w-full text-xl font-medium gap-x-2">
            Details
            <ArrowRightIcon className="w-6 h-6 mr-2" />
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SundryCard;
