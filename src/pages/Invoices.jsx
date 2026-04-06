import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, FileText, Printer } from "lucide-react";
import Pagination from "../components/ui/Pagination";
import { Link } from "react-router-dom";

export function Invoices() {
  const invoices = [
    { number: "455", desc: "Services used From 25 Feb 2026 To 26 Mar 2026", orders: 8, subtotal: 274, tax: 51, amount: 324 },
    { number: "366", desc: "Very satisfied with the product quality", orders: 1, subtotal: 150, tax: 27, amount: 177 },
    { number: "364", desc: "Services usedd for month feb", orders: 1, subtotal: 1320, tax: 237.6, amount: 1558 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Invoices</h1>
        <p className="text-sm text-primary mt-1 font-medium">
          <Link
            to="/"
            className="hover:underline cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-text-muted mx-1">&gt;&gt;</span> Invoices
        </p>
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border-subtle">
            <h2 className="text-lg font-semibold text-text-main">Invoices (Showing 4 Out Of 4)</h2>
            <Button className="bg-primary text-black h-9 px-4 text-xs font-bold rounded-md flex items-center gap-2">
              <Download size={14} /> Export
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dashboard-bg/50 text-text-muted text-[11px] font-bold uppercase border-b border-border-subtle">
                  <th className="px-6 py-4">Invoice #</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Orders</th>
                  <th className="px-6 py-4">Subtotal</th>
                  <th className="px-6 py-4">Tax</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {invoices.map((inv) => (
                  <tr key={inv.number} className="hover:bg-dashboard-bg/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-text-main">{inv.number}</td>
                    <td className="px-6 py-4 text-sm text-text-muted max-w-xs">{inv.desc}</td>
                    <td className="px-6 py-4 text-sm text-text-main">{inv.orders}</td>
                    <td className="px-6 py-4 text-sm text-text-main">₹{inv.subtotal}</td>
                    <td className="px-6 py-4 text-sm text-text-main">₹{inv.tax}</td>
                    <td className="px-6 py-4 text-sm font-bold text-text-main">₹{inv.amount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 border border-primary/40 text-primary hover:bg-primary/10 rounded-md transition-colors"><Download size={15} /></button>
                        <button className="p-1.5 border border-primary/40 text-primary hover:bg-primary/10 rounded-md transition-colors"><Printer size={15} /></button>
                        <button className="p-1.5 border border-primary/40 text-primary hover:bg-primary/10 rounded-md transition-colors"><FileText size={15} /></button>
                      </div>
                    </td>
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