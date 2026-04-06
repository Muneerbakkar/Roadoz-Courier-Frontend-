import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, X, MapPin, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import Pagination from "../components/ui/Pagination";
import { Link } from "react-router-dom";

export function PickupAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrimary, setSelectedPrimary] = useState("301");

  const addresses = [
    { id: "301", contact: "Djdjjd\n8886663456\nraju.cdm22@gmail.com", pincode: "500049, Secunderabad, Telangana", status: true, warehouse: "1772027177", address: "Sghehdbd, Hdhdfbbc" },
    { id: "289", contact: "rohit\n9889999999\ntestuser@gmail.com", pincode: "110052, Delhi, Delhi", status: true, warehouse: "1771585013", address: "ashok vihar, delhi" },
    { id: "286", contact: "daniel\n8524022552", pincode: "641668, Tirupur, Tamil Nadu", status: true, warehouse: "1771488466", address: "coimbatore," },
    { id: "277", contact: "Tester\n9999999999\ncompany@gmail.com", pincode: "700001, Kolkata, West Bengal", status: true, warehouse: "1771095422", address: "62 BM Banerjee Lane Belghoria" },
    { id: "248", contact: "Roadoz\n33333333\nadmin@gmail.com", pincode: "800001, Patna, Bihar", status: true, warehouse: "1769855849", address: "A24 Mouryalok Complex Dakbunglow" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Pickup Address</h1>
          <p className="text-sm text-primary mt-1 font-medium">
            <Link
              to="/"
              className="hover:underline cursor-pointer"
            >
              Dashboard
            </Link>
            <span className="text-text-muted mx-1">&gt;&gt;</span> Pickup Address
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-black h-10 px-6 font-bold rounded-md shadow-md flex items-center gap-2"
        >
          <Plus size={18} /> New Pickup Address
        </Button>
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dashboard-bg/50 border-b border-border-subtle">
                  <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Pincode</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Primary</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Warehouse</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-muted uppercase tracking-wider">Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {addresses.map((addr) => (
                  <tr key={addr.id} className="hover:bg-dashboard-bg/30 transition-colors">
                    <td className="px-6 py-6 text-sm text-text-main font-bold">{addr.id}</td>
                    <td className="px-6 py-6 text-xs text-text-main whitespace-pre-line leading-relaxed">{addr.contact}</td>
                    <td className="px-6 py-6 text-xs text-text-main font-medium">{addr.pincode}</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <button className={cn(
                          "relative inline-flex h-5 w-10 items-center rounded-full transition-colors",
                          addr.status ? "bg-green-500" : "bg-dashboard-bg border border-border-subtle"
                        )}>
                          <span className={cn(
                            "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                            addr.status ? "translate-x-5.5" : "translate-x-1"
                          )} />
                        </button>
                        <span className="text-[10px] text-green-500 font-bold uppercase">Active</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="radio"
                            name="primary_addr"
                            checked={selectedPrimary === addr.id}
                            onChange={() => setSelectedPrimary(addr.id)}
                            className="sr-only"
                          />
                          <div className={cn(
                            "w-5 h-5 rounded-full border-2 transition-all",
                            selectedPrimary === addr.id ? "border-primary bg-primary/10" : "border-border-subtle"
                          )} />
                          {selectedPrimary === addr.id && <div className="absolute w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                        <span className={cn("text-[10px] font-bold uppercase", selectedPrimary === addr.id ? "text-primary" : "text-text-muted")}>Default</span>
                      </label>
                    </td>
                    <td className="px-6 py-6 text-xs text-text-main">{addr.warehouse}</td>
                    <td className="px-6 py-6 text-xs text-text-muted max-w-xs">{addr.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </CardContent>
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-card-bg rounded-xl shadow-2xl overflow-hidden border border-border-subtle"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-dashboard-bg/20">
                <div className="flex items-center gap-2">
                  <MapPin className="text-primary" size={20} />
                  <h3 className="text-lg font-bold text-text-main">Add Pickup Address</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-text-main transition-colors p-1">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 max-h-[75vh] overflow-y-auto custom-scrollbar bg-card-bg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    { label: "Address Nickname*", placeholder: "e.g. Warehouse 1" },
                    { label: "Contact Name*", placeholder: "Contact Person" },
                    { label: "Phone Number*", placeholder: "10-digit Mobile No" },
                    { label: "Email Address", placeholder: "Contact Email" },
                    { label: "Address Line 1*", placeholder: "Street, House No" },
                    { label: "Address Line 2", placeholder: "Area, Landmark" },
                  ].map((field, i) => (
                    <div key={i} className="space-y-1.5">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">{field.label}</label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Pincode*</label>
                      <input type="text" placeholder="6-digit" className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">City*</label>
                      <input type="text" placeholder="City" className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">State*</label>
                      <input type="text" placeholder="State" className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Country*</label>
                      <input type="text" defaultValue="India" disabled className="w-full bg-dashboard-bg/50 border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-muted cursor-not-allowed" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border-subtle flex items-center gap-3">
                  <input type="checkbox" id="set_primary" className="w-4 h-4 accent-primary rounded cursor-pointer" />
                  <label htmlFor="set_primary" className="text-sm font-bold text-text-main cursor-pointer">Set as Primary Pickup Address</label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 px-8 py-6 border-t border-border-subtle bg-dashboard-bg/50">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <RotateCcw size={14} /> Cancel
                </button>
                <Button className="bg-primary hover:bg-primary/90 text-black h-11 px-12 font-bold rounded-md shadow-lg active:scale-95 transition-all">
                  Save Address
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}