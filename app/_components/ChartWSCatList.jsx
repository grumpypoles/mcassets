
import { auth } from "@/app/_lib/auth";
import { getDisciplineStats } from "@/app/_lib/statistics";
import ChartWSBar from "@/app/_components/ChartWSBar";
import ChartWSBarTime from "@/app/_components/ChartWSBarTime";



async function ChartWSCatList() {
  const session = await auth()
  const sportsData = await getDisciplineStats(session.user.appUserId);
 
 
  return (
    <div>
      {getDisciplineStats.length === 0 ? (
        <h1 className="mb-5 text-3xl font-medium text-primary-500">
         You don&apos;t have any swims recorded yet. Start collecting your statistics.
        </h1>
      ) : (
        <>
        <div className="grid grid-cols-1 gap-4 pt-5">
        {/* <ChartWSBar rowData={sportsData} /> */}
        <ChartWSBarTime rowData={sportsData} />
 
        </div>
        <div className="grid grid-cols-1 gap-4 pt-5 mt-12">
        <ChartWSBar rowData={sportsData} />
        {/* <ChartWSBarTime rowData={sportsData} /> */}
 
        </div>
        </>
      )}
    </div>
  );


}

export default ChartWSCatList;
