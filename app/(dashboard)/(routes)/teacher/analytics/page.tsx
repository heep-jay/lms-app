import { getAnalytics } from "@/actions/get-analytic";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DataCard from "./_components/DataCard";
import Chart from "./_components/Chart";
import { string } from "zod";

const Analytics = async () => {
  const { userId } = auth();
  if (!userId) redirect("/");

  const { data, totalRevenue, totalSales } = await getAnalytics(userId);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 mb-4 gap-4">
        <DataCard value={totalRevenue} label="Total Sales" shouldFormat />
        <DataCard value={totalSales} label="Total Sales" />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default Analytics;
