import { Calendar, CheckCircle2, RotateCcw, IndianRupee } from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { PieChartCard } from "../components/dashboard/PieChartCard";

export function Dashboard() {
  const walletData = [
    { name: "Completed", value: 60 },
    { name: "Pending", value: 25 },
    { name: "Cancelled", value: 15 },
  ];
  const walletColors = ["#c084fc", "#f472b6", "#7dd3fc"];

  const courierData = [
    { name: "CourierWa Air", value: 40 },
    { name: "SkeCourierWa Surface", value: 60 },
  ];
  const courierColors = ["#a78bfa", "#f472b6"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-main">Dashboard</h1>
        <p className="text-sm text-primary mt-1">
          Dashboard <span className="text-text-muted mx-1">&gt;&gt;</span> Dashboard
        </p>  
      </div>

      <div className="bg-card-bg border border-border-subtle rounded-lg p-3 inline-flex items-center gap-3 text-sm text-text-muted transition-colors duration-300">
        <Calendar size={18} className="text-text-muted" />
        <span>2026-03-07 to 2026-03-13</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value="4"
          description="From 2026-03- to 2026-03-13"
          icon={<Calendar size={24} />}
          iconBgColor="bg-blue-500/80"
        />
        <StatCard
          title="Delivered Orders"
          value="0"
          description="With selected period"
          icon={<CheckCircle2 size={24} />}
          iconBgColor="bg-green-500/80"
        />
        <StatCard
          title="RTO Orders"
          value="0"
          description="in selected date range"
          icon={<RotateCcw size={24} />}
          iconBgColor="bg-sky-500/80"
        />
        <StatCard
          title="Total Revenue"
          value="0"
          description="From 2026-03- to 2026-03-13"
          icon={<IndianRupee size={24} />}
          iconBgColor="bg-red-500/80"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PieChartCard
          title="Wallet Transaction"
          data={walletData}
          colors={walletColors}
        />
        <PieChartCard
          title="COD Vs Prepaidn"
          data={courierData}
          colors={courierColors}
          isDonut={true}
          centerLabel="229.46"
        />
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PieChartCard
          title="Order Statuses"
          data={walletData}
          colors={walletColors}
        />
        <PieChartCard
          title="Courier Wise Load"
          data={courierData}
          colors={courierColors}
          isDonut={true}
          centerLabel="229.46"
        />
      </div>
    </div>
  );
}
