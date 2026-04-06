import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, MapPin, Package, Box, Phone, Mail, Hash } from "lucide-react";
import { cn } from "../../lib/utils";

export function OrderDetailsModal({ isOpen, onClose, orderData }) {
  if (!orderData) return null;

  const {
    id,
    customer = {},
    shipment = {},
    route = {},
    payment = {},
    weight = "0 kg",
    created = "",
    status = ""
  } = orderData;

  const DetailItem = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-3">
      {Icon && <Icon size={16} className="text-primary mt-0.5 shrink-0" />}
      <div className="space-y-0.5">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold text-text-main leading-tight">{value || "-"}</p>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-card-bg border border-border-subtle rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-dashboard-bg/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Package className="text-primary" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-main flex items-center gap-2">
                    Order Details <span className="text-primary">#{id}</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded uppercase border border-orange-500/20">
                      {status}
                    </span>
                    <span className="text-[10px] text-text-muted">Created: {created}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-dashboard-bg rounded-full transition-colors text-text-muted hover:text-primary"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="space-y-5 p-6 rounded-2xl border border-border-subtle bg-dashboard-bg/20">
                  <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-border-subtle pb-3 flex items-center gap-2">
                    <User size={14} /> Buyer Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <DetailItem label="Full Name" value={customer.name} icon={User} />
                    <DetailItem label="Contact No" value={customer.phone} icon={Phone} />
                    <DetailItem label="Delivery Address" value={`${route.to} (${route.toPin})`} icon={MapPin} />
                  </div>
                </div>

                <div className="space-y-5 p-6 rounded-2xl border border-border-subtle bg-dashboard-bg/20">
                  <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-b border-border-subtle pb-3 flex items-center gap-2">
                    <MapPin size={14} /> Pickup Information
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <DetailItem label="Warehouse ID" value={shipment.id} icon={Hash} />
                    <DetailItem label="Courier" value={shipment.courier} icon={Box} />
                    <DetailItem label="Origin" value={`${route.from} (${route.fromPin})`} icon={MapPin} />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border-subtle bg-dashboard-bg/20 grid grid-cols-1 md:grid-cols-3 gap-6">
                <DetailItem label="Payment Mode" value={payment.method} />
                <DetailItem label="Order Value" value={payment.total} />
                <DetailItem label="Weight Info" value={weight} />
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black text-text-muted uppercase tracking-[0.2em] px-1">Product Items</h4>
                <div className="overflow-hidden rounded-xl border border-border-subtle">
                   <table className="w-full text-left text-sm">
                      <thead className="bg-dashboard-bg/50 text-text-muted text-[10px] uppercase font-bold">
                        <tr>
                          <th className="px-4 py-3">Product Description</th>
                          <th className="px-4 py-3 text-right">Qty</th>
                          <th className="px-4 py-3 text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-subtle">
                        <tr>
                          <td className="px-4 py-4 text-text-main font-medium">Logistics Service Item</td>
                          <td className="px-4 py-4 text-right">1</td>
                          <td className="px-4 py-4 text-right font-bold text-primary">{payment.total}</td>
                        </tr>
                      </tbody>
                   </table>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-border-subtle bg-dashboard-bg/50">
              <Button 
                onClick={onClose}
                className="bg-primary text-black hover:bg-primary/90 px-10 font-bold h-10 shadow-lg"
              >
                Close View
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}