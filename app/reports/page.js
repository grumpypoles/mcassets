import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
import ReportsList from "@/app/_components/ReportsList";

export const metadata = {
  title: "Pivots",
};

export default function Page() {
  return (
    <div>
      {/* <h1 className="mb-5 text-4xl font-medium text-primary-500">
        Reporting
      </h1> */}

      <Suspense fallback={<Spinner />}>
        <ReportsList />
      </Suspense>
    </div>
  );
}
