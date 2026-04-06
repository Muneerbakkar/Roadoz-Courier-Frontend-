import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, Search, RotateCcw } from "lucide-react";
import Pagination from "../components/ui/Pagination";
import { Link } from "react-router-dom";

export function Wallet() {
  const transactions = [
    { id: "27950", amount: "Rs. 16.52", type: "Debit", opening: "Rs. 677", closing: "Rs. 660.48", desc: "Debited for order id 27807.", date: "19 Mar 26 02:17 PM" },
    { id: "27796", amount: "Rs. 16.52", type: "Debit", opening: "Rs. 694", closing: "Rs. 677.48", desc: "Debited for order id 27168.", date: "18 Mar 26 06:02 PM" },
    { id: "26917", amount: "Rs. 17", type: "Debit", opening: "Rs. 711", closing: "Rs. 694", desc: "Debited for order id 26344.", date: "14 Mar 26 02:10 PM" },
    { id: "26913", amount: "Rs. 13", type: "Debit", opening: "Rs. 724", closing: "Rs. 711", desc: "Debited for order id 26434.", date: "14 Mar 26 02:05 PM" },
    { id: "26127", amount: "Rs. 53", type: "Debit", opening: "Rs. 777", closing: "Rs. 724", desc: "Debited for order id 25732.", date: "12 Mar 26 02:16 PM" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Wallet Transactions</h1>
        <p className="text-sm text-primary mt-1 font-medium">
          <Link
            to="/"
            className="hover:underline cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-text-muted mx-1">&gt;&gt;</span> Wallet Transactions
        </p>
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border-subtle">
            <h2 className="text-lg font-semibold text-text-main">
              Wallet Transactions (Showing 25 Out Of 114)
            </h2>
            <Button className="bg-primary hover:bg-primary/90 text-black h-9 px-4 text-xs font-bold rounded-md flex items-center gap-2">
              <Download size={14} /> Export
            </Button>
          </div>

          <div className="p-6 bg-dashboard-bg/30 border-b border-border-subtle">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-muted">Date Range</label>
                <input type="text" placeholder="Select date range" className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5 lg:col-span-2">
                <label className="text-xs font-medium text-text-muted">Orders Ids</label>
                <input type="text" placeholder="Order Ids separated by comma" className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-muted">Type:</label>
                <select className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary appearance-none">
                  <option>All</option><option>Debit</option><option>Credit</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-muted">Limit:</label>
                <input type="number" defaultValue={25} className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary" />
              </div>
              <div className="flex items-end gap-2">
                <Button className="bg-primary text-black h-9 px-4 text-xs font-bold rounded-md flex-1">Search</Button>
              </div>
            </div>
            <button className="text-xs font-bold text-primary flex items-center gap-1 mt-4">
              <RotateCcw size={14} /> Clear Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dashboard-bg/50 text-text-muted text-[11px] font-bold uppercase border-b border-border-subtle">
                  <th className="px-6 py-4">Id</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Opening</th>
                  <th className="px-6 py-4">Closing</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {transactions.map((t) => (
                  <tr key={t.id} className="hover:bg-dashboard-bg/30 transition-colors">
                    <td className="px-6 py-4 text-sm text-text-main">{t.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-text-main">{t.amount}</td>
                    <td className="px-6 py-4 text-sm"><span className="text-red-500 font-bold">{t.type}</span></td>
                    <td className="px-6 py-4 text-sm text-text-muted">{t.opening}</td>
                    <td className="px-6 py-4 text-sm font-bold text-text-main">{t.closing}</td>
                    <td className="px-6 py-4 text-sm text-text-muted">{t.desc}</td>
                    <td className="px-6 py-4 text-sm text-text-muted">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </CardContent>
      </Card>
    </div>
  );
}