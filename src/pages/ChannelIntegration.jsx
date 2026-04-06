import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Edit, Trash2, RefreshCw, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { swalConfirmDelete, swalSuccess } from "../lib/swal";

export function ChannelIntegration() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    const result = await swalConfirmDelete();
    if (result.isConfirmed) {
      swalSuccess('Deleted!', 'Item has been removed.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Channel Integration</h1>
          <p className="text-sm text-primary mt-1">
            <Link
              to="/"
              className="hover:underline cursor-pointer"
            >
              Dashboard
            </Link>
            <span className="text-text-muted mx-1">&gt;&gt;</span> Channel Integration
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 text-black h-10 px-6 font-bold flex items-center gap-2">
          Add Channel Manually
        </Button>
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-text-main mb-6">Channel Integration</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dashboard-bg/50 text-text-main text-sm font-semibold border-y border-border-subtle">
                  {["ID", "Store Name/Channel ID", "Channel", "API Key", "API Secret Key", "Status", "Action"].map(h => (
                    <th key={h} className="px-6 py-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                <tr className="hover:bg-dashboard-bg/30 transition-colors">
                  <td className="px-6 py-4 text-sm">72</td>
                  <td className="px-6 py-4 text-sm">asdsd</td>
                  <td className="px-6 py-4 text-sm">Shopify</td>
                  <td className="px-6 py-4 text-sm">sdsd</td>
                  <td className="px-6 py-4 text-sm">-</td>
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-dashboard-bg border border-border-subtle peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border-subtle after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-text-muted hover:text-primary transition-colors"><Edit size={16} /></button>
                      <button className="px-3 py-1 text-xs font-bold text-primary border border-primary rounded-md hover:bg-primary hover:text-black transition-all flex items-center gap-1">
                        <RefreshCw size={12} /> Sync
                      </button>
                      <button className="p-2 text-text-muted hover:text-red-500 transition-colors" onClick={() => handleDelete(72)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="border border-border-subtle rounded-xl p-8 flex flex-col items-center text-center space-y-4 shadow-sm bg-dashboard-bg/20 hover:shadow-md transition-shadow">
              <div className="w-20 h-20 flex items-center justify-center p-2 bg-white rounded-lg">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/WooCommerce_logo.svg/1200px-WooCommerce_logo.svg.png" alt="WooCommerce" className="w-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <h3 className="text-xl font-bold text-text-main">WooCommerce</h3>
              <p className="text-sm text-text-muted">WooCommerce</p>
              <Button className="bg-primary hover:bg-primary/90 text-black h-10 px-8 font-bold">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-4xl bg-card-bg rounded-xl shadow-2xl overflow-hidden border border-border-subtle">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle">
                <h3 className="text-lg font-bold text-text-main">Add New Channel</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-dashboard-bg/50 rounded-full transition-colors"><X size={20} className="text-text-muted" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {["Channel :", "Store Name :", "API Key :", "API Secret Key :"].map((label) => (
                    <div key={label} className="space-y-1.5">
                      <label className="text-sm font-medium text-text-main">{label}</label>
                      {label === "Channel :" ? (
                        <select className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
                          <option>Select</option><option>Shopify</option><option>WooCommerce</option>
                        </select>
                      ) : (
                        <input type="text" className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-main block">Status :</label>
                  <label className="flex items-center gap-2 cursor-pointer w-fit">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
                    <span className="text-sm text-text-main">Active</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-dashboard-bg/50 border-t border-border-subtle">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-sm font-medium text-text-muted hover:text-text-main transition-colors">Close</button>
                <Button className="bg-primary hover:bg-primary/90 text-black h-10 px-8 font-bold">Save</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}