import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, Calendar, RotateCcw } from "lucide-react";
import Pagination from "../components/ui/Pagination";
import { Link } from "react-router-dom";

export function CODRemittance() {
  const summary = [
    { title: "Remitted Till Date", value: "₹ 0", sub: "0 Orders" },
    { title: "Remitted For", value: "0 Orders", sub: "" },
    { title: "Total Remittance Due", value: "₹ 0", sub: "" },
    { title: "Remittance Due For", value: "0 Orders", sub: "" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Remittance Transactions</h1>
        <p className="text-sm text-primary mt-1 font-medium">
          <Link
            to="/"
            className="hover:underline cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-text-muted mx-1">&gt;&gt;</span> Remittance Transactions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item, idx) => (
          <Card key={idx} className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-base font-bold text-text-muted mb-2 uppercase tracking-wider">{item.title}</h3>
              <p className="text-2xl font-bold text-text-main">{item.value}</p>
              {item.sub && <p className="text-xs text-primary font-bold mt-1">{item.sub}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border-subtle">
            <h2 className="text-lg font-semibold text-text-main">Remittance Transactions (Showing 0 Out Of 0)</h2>
            <Button className="bg-primary text-black h-9 px-4 text-xs font-bold rounded-md flex items-center gap-2"><Download size={14} /> Export</Button>
          </div>

          <div className="p-6 bg-dashboard-bg/30 border-b border-border-subtle">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="space-y-1.5 lg:col-span-2">
                <label className="text-xs font-medium text-text-muted">Time Range</label>
                <div className="relative">
                  <input type="text" placeholder="Select range" className="w-full bg-card-bg border border-border-subtle rounded-md pl-3 pr-10 py-2 text-xs text-text-main focus:outline-none" />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>
              <div className="space-y-1.5 lg:col-span-2">
                <label className="text-xs font-medium text-text-muted">Orders Ids</label>
                <input type="text" placeholder="Order IDs separated by comma" className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-xs text-text-main focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-muted">Limit:</label>
                <select className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-xs text-text-main appearance-none"><option>25</option></select>
              </div>
              <div className="flex items-end">
                <Button className="bg-primary text-black h-9 px-6 text-xs font-bold rounded-md w-full">Search</Button>
              </div>
            </div>
            <button className="text-xs font-bold text-primary flex items-center gap-1 mt-4"><RotateCcw size={14} /> Clear Filters</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dashboard-bg/50 text-text-muted text-[11px] font-bold uppercase border-b border-border-subtle">
                  <th className="px-6 py-4">Order Id</th><th className="px-6 py-4">Buyer</th><th className="px-6 py-4">AWB No</th><th className="px-6 py-4">COD Amount</th><th className="px-6 py-4">Delivered</th><th className="px-6 py-4">Remit. Status</th><th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                <tr><td colSpan={7} className="px-6 py-12 text-center text-text-muted italic">No remittance transactions found.</td></tr>
              </tbody>
            </table>
          </div>
          <Pagination />
        </CardContent>
      </Card>
    </div>
  );
}