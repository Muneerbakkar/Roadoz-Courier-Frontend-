import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Calendar, RotateCcw, Truck, Eye, Copy, Edit, Printer,
  Ship, MapPin, Download, Trash2, FileText, Tag, MoreVertical, Search, X
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import Pagination from "../components/ui/Pagination";
import { Link } from "react-router-dom";
import { downloadInvoiceExcel } from "../lib/invoiceExcel";
import { generateInvoicePDF } from "../lib/invoiceGenerator";

export function ProcessingOrders() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { name: "Processing", count: 28, path: "/processing-order" },
    { name: "All Orders", count: 109, path: "/all-orders" },
    { name: "Manifested", count: 108, path: "/manifested" },
    { name: "In Transit", count: 1, path: "/in-transit" },
    { name: "NDR", count: 12, path: "/pending" },
    { name: "OFD", count: 0, path: "/out-for-delivery" },
    { name: "Delivered", count: 0, path: "/delivered" },
    { name: "RTO In Transit", count: 0, path: "/rto-in-transit" },
    { name: "RTO Delivered", count: 0, path: "/rto-delivered" },
    { name: "Returned", count: 0, path: "/returned" },
    { name: "Cancelled", count: 0, path: "/cancelled" },
    { name: "Lost", count: 0, path: "/lost" },
  ];

  const statusList = [
    "All", "Manifested", "Picked", "Not Picked", "In Transit",
    "NDR", "OFD", "Delivered", "RTO In Transit", "RTO Delivered",
    "Returned", "Cancelled", "Lost"
  ];

  const currentTab = tabs.find(tab => tab.path === location.pathname);
  const activeTabName = currentTab ? currentTab.name : "Orders";

  const isProcessing = location.pathname === "/processing-order";

  const isStatusHighlighted = (status) => {
    if (activeTabName === "All Orders" && status === "All") return true;
    if (activeTabName === "Pending" && status === "NDR") return true;
    return status.toLowerCase() === activeTabName.toLowerCase();
  };

  const orders = [
    {
      transactionId: "TXN10001",
      id: "#274381",
      status: activeTabName.toUpperCase(),
      customer: { name: "Sakshi Jaiswal", phone: "9555995009", date: "18 Mar 2026, 06:03 PM" },
      shipment: { id: "10001360", courier: "CourierWa Air" },
      route: { from: "Patna", fromPin: "800001", to: "Gorakhpur", toPin: "273165" },
      payment: { method: "PREPAID", total: "₹16.52", type: "Prepaid", channel: "B2C" },
      order: { id: "#27438", channel: "XYD" },
      weight: "25 kg",
      dims: "10×10×10 cm",
      created: "18 Mar 2026, 06:02 PM"
    },
    {
      transactionId: "TXN10002",
      id: "#27439",
      status: activeTabName.toUpperCase(),
      customer: { name: "Jaiswal", phone: "9555995009", date: "18 Mar 2026, 06:03 PM" },
      shipment: { id: "10001361", courier: "CourierWa Air" },
      route: { from: "Patna", fromPin: "800001", to: "Gorakhpur", toPin: "273165" },
      payment: { method: "PREPAID", total: "₹16.52", type: "Prepaid", channel: "B2C" },
      order: { id: "#27439", channel: "XYD" },
      weight: "25 kg",
      dims: "10×10×10 cm",
      created: "18 Mar 2026, 06:02 PM"
    },
    {
      transactionId: "TXN10003",
      id: "#27440",
      status: activeTabName.toUpperCase(),
      customer: { name: "Amir", phone: "9555995009", date: "18 Mar 2026, 06:03 PM" },
      shipment: { id: "10001362", courier: "CourierWa Air" },
      route: { from: "Patna", fromPin: "800001", to: "Gorakhpur", toPin: "273165" },
      payment: { method: "PREPAID", total: "₹16.52", type: "Prepaid", channel: "B2C" },
      order: { id: "#27440", channel: "XYD" },
      weight: "25 kg",
      dims: "10×10×10 cm",
      created: "18 Mar 2026, 06:02 PM"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">{activeTabName} Orders</h1>
          <p className="text-sm text-primary mt-1 font-medium">
            <Link to="/" className="hover:underline cursor-pointer">Dashboard</Link>
            <span className="text-text-muted mx-1">&gt;&gt;</span> {activeTabName} Orders
          </p>
        </div>
      </div>

      <Card className="bg-card-bg border-border-subtle overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border-subtle">
            <h2 className="text-lg font-semibold text-text-main">
              {activeTabName} Orders (Showing {orders.length} entries)
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {isProcessing ? (
                <>
                  <Button className="bg-primary text-black hover:bg-primary/90 text-xs font-bold gap-2 h-9"><Ship size={16} /> Ship</Button>
                  <Button className="bg-primary text-black hover:bg-primary/90 text-xs font-bold gap-2 h-9"><MapPin size={16} /> Change Pickup Address</Button>
                  <Button className="bg-primary text-black hover:bg-primary/90 text-xs font-bold gap-2 h-9"><Download size={16} /> Export</Button>
                  <Button className="bg-red-500 text-white hover:bg-red-600 text-xs font-bold gap-2 h-9"><Trash2 size={16} /> Delete</Button>
                </>
              ) : (
                <>
                  <Button className="bg-primary text-black hover:bg-primary/90 text-xs font-bold gap-2 h-9"><Tag size={16} /> Labels</Button>
                  {activeTabName === "Manifested" && <Button className="bg-primary text-black text-xs font-bold h-9 px-4 gap-2"><FileText size={16} /> Manifests</Button>}
                  {activeTabName === "Manifested" && <Button className="bg-red-500 text-white text-xs font-bold h-9 px-4 gap-2"><X size={16} /> Cancel</Button>}
                  <Button className="bg-primary text-black hover:bg-primary/90 text-xs font-bold gap-2 h-9" onClick={() => downloadInvoiceExcel(orders[0])}><Download size={16} /> Export</Button>
                  <Button className="bg-primary text-black hover:bg-primary/90 text-xs font-bold gap-2 h-9" onClick={() => generateInvoicePDF(orders[0])}><FileText size={16} /> Invoices</Button>
                </>
              )}
            </div>
          </div>

          <div className="p-6 bg-dashboard-bg/30 border-b border-border-subtle">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-muted">Time Range</label>
                <div className="relative">
                  <input type="text" placeholder="YYYY-MM-DD to YYYY-MM" className="w-full bg-card-bg border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary" />
                  <Calendar size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-muted">Order ID</label>
                <input type="text" placeholder="Order Ids" className="w-full bg-card-bg border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary" />
              </div>
              {!isProcessing && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-muted">AWB NO</label>
                  <input type="text" placeholder="AWB No" className="w-full bg-card-bg border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary" />
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-muted">Buyer Name</label>
                <input type="text" placeholder="Buyer Name" className="w-full bg-card-bg border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-muted">Payment Method:</label>
                <select className="w-full bg-card-bg border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-main appearance-none focus:outline-none focus:border-primary"><option>All</option></select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-start gap-6">
              <div className="w-24 space-y-1.5">
                <label className="text-xs font-medium text-text-muted">Limit:</label>
                <input type="number" defaultValue={25} className="w-full bg-card-bg border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary" />
              </div>

              {!isProcessing && (
                <div className="w-48 space-y-1.5">
                  <label className="text-xs font-medium text-text-muted">Status:</label>
                  <div className="h-28 overflow-y-auto border border-border-subtle rounded-lg bg-card-bg p-1 text-[11px] custom-scrollbar">
                    {statusList.map(s => (
                      <div
                        key={s}
                        className={cn(
                          "px-2 py-1 rounded cursor-pointer transition-colors",
                          isStatusHighlighted(s) ? "bg-gray-200 font-bold text-black" : "text-text-muted hover:bg-gray-50"
                        )}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="self-end">
                <Button className="bg-primary text-black hover:bg-primary/90 h-[34px] px-8 text-xs font-bold shadow-sm">Search</Button>
                <button className="text-xs font-bold text-primary flex items-center gap-1 mt-2">
                  <RotateCcw size={14} /> Clear Filters
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 overflow-x-auto border-b border-border-subtle bg-card-bg">
            <div className="flex items-center gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => navigate(tab.path)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                    activeTabName === tab.name
                      ? "bg-primary text-black shadow-md scale-105"
                      : "bg-dashboard-bg text-text-muted hover:bg-gray-100"
                  )}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dashboard-bg/50 text-text-muted text-[11px] font-bold uppercase border-b border-border-subtle">
                  <th className="px-6 py-4 w-10 text-center"><input type="checkbox" className="w-4 h-4" /></th>
                  {isProcessing && <th className="px-6 py-4">Transaction ID</th>}
                  <th className="px-6 py-4">Customer</th>
                  {!isProcessing && <th className="px-6 py-4">Shipment</th>}
                  <th className="px-6 py-4">Route</th>
                  <th className="px-6 py-4">Payment</th>
                  {isProcessing ? <th className="px-6 py-4">Order Details</th> : <th className="px-6 py-4">Weight</th>}
                  {!isProcessing && <th className="px-6 py-4">Created</th>}
                  {isProcessing && <th className="px-6 py-4">Weight/Dims</th>}
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {orders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-dashboard-bg/30 transition-colors">
                    <td className="px-6 py-6 text-center"><input type="checkbox" className="w-4 h-4" /></td>
                    
                    {isProcessing && (
                      <td className="px-6 py-6">
                         <span className="text-xs font-bold text-text-main block">{order.transactionId}</span>
                         <span className="text-[10px] text-text-muted">ID: {order.id}</span>
                      </td>
                    )}

                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-text-main">{order.customer.name}</p>
                        <p className="text-xs text-text-muted">{order.customer.phone}</p>
                        <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase inline-block mt-1">
                          {order.status}
                        </span>
                        {isProcessing && <p className="text-[10px] text-text-muted mt-1">{order.customer.date}</p>}
                      </div>
                    </td>

                    {!isProcessing && (
                      <td className="px-6 py-6 text-xs font-bold text-text-main">
                        {order.shipment.id}<br /><span className="font-normal text-text-muted">{order.shipment.courier}</span>
                      </td>
                    )}

                    <td className="px-6 py-6">
                      <div className="text-xs font-bold text-text-main">{order.route.from} <span className="text-[10px] font-normal text-text-muted">({order.route.fromPin})</span></div>
                      <div className="flex items-center gap-1 my-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /><div className="w-4 h-px bg-gray-300" /><div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                      <div className="text-xs font-bold text-text-main">{order.route.to} <span className="text-[10px] font-normal text-text-muted">({order.route.toPin})</span></div>
                    </td>

                    <td className="px-6 py-6 text-xs">
                      <p className="font-bold text-red-500 uppercase tracking-tighter">Prepaid</p>
                      <p className="text-text-muted">{isProcessing ? order.payment.type : `Total: ${order.payment.total}`}</p>
                    </td>

                    {isProcessing ? (
                      <td className="px-6 py-6 text-xs font-bold text-text-main">
                        {order.order.id}<br />
                        <span className="font-normal text-text-muted">Channel: {order.order.channel}</span>
                      </td>
                    ) : (
                      <td className="px-6 py-6 text-[11px]">
                         <p className="font-medium text-text-main">Box: 1</p>
                         <p className="text-text-muted">Wt: {order.weight}</p>
                      </td>
                    )}

                    {isProcessing ? (
                      <td className="px-6 py-6 text-[11px]">
                        <p className="font-medium text-text-main">1 Box • {order.weight}</p>
                        <p className="text-text-muted">{order.dims}</p>
                      </td>
                    ) : (
                      <td className="px-6 py-6 text-xs font-bold text-text-main">
                        {order.id}<br /><span className="font-normal text-text-muted">{order.created}</span>
                      </td>
                    )}

                    <td className="px-6 py-6 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {isProcessing ? (
                          [Truck, Eye, Copy, Edit, Printer].map((Icon, i) => (
                            <button key={i} className="p-1.5 border border-primary/40 text-primary hover:bg-primary/10 rounded-md shadow-sm transition-colors"><Icon size={14} /></button>
                          ))
                        ) : (
                          <>
                            <button className="p-1.5 bg-primary text-black rounded-md shadow-sm transition-transform active:scale-95"><Download size={14} /></button>
                            <button className="p-1.5 border border-primary/40 text-primary hover:bg-primary/10 rounded-md shadow-sm transition-colors"><Eye size={14} /></button>
                            <button className="p-1.5 text-text-muted hover:text-text-main"><MoreVertical size={16} /></button>
                          </>
                        )}
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