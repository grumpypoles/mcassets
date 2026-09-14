import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";
import InsuranceList from "@/app/_components/InsuranceList";

export const metadata = {
  title: "Insurance Report",
};

export default function Page() {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <InsuranceList />
      </Suspense>
    </div>
  );
}
