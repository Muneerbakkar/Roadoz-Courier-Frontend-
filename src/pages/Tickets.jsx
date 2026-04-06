import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, X, RotateCcw, Paperclip, Filter } from "lucide-react";
import Pagination from "../components/ui/Pagination";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export function Tickets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);

  const stats = [
    { title: "Opened", value: 0 },
    { title: "Answered", value: 0 },
    { title: "Not Answered", value: 0 },
    { title: "Closed", value: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Tickets</h1>
          <p className="text-sm text-primary mt-1 font-medium">
            <Link
              to="/"
              className="hover:underline cursor-pointer"
            >
              Dashboard
            </Link>
            <span className="text-text-muted mx-1">&gt;&gt;</span> Tickets
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-black h-10 px-6 font-bold flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> New Ticket
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-text-main">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 bg-dashboard-bg/30 border-b border-border-subtle flex flex-wrap items-center gap-4">
            <div className="w-full md:w-64">
              <select className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary appearance-none">
                <option>All Status</option>
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>
            <div className="w-full md:w-64">
              <select className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary appearance-none">
                <option>All Reply Status</option>
                <option>Answered</option>
                <option>Not Answered</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary/90 text-black h-9 px-6 text-xs font-bold rounded-md flex items-center gap-2">
                <Filter size={14} /> Filter
              </Button>
              <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dashboard-bg/50 text-text-muted text-[11px] font-bold uppercase border-b border-border-subtle">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Reply</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-text-muted italic">
                      No tickets found.
                    </td>
                  </tr>
                ) : (
                  tickets.map((ticket, idx) => (
                    <tr key={idx} className="hover:bg-dashboard-bg/30 transition-colors">
                    </tr>
                  ))
                )}
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card-bg rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden border border-border-subtle"
            >
              <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                <h3 className="text-xl font-bold text-text-main">Create Ticket</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-dashboard-bg rounded-full transition-colors text-text-muted"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar bg-card-bg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase">Priority</label>
                    <select className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary appearance-none">
                      <option>Select</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase">Notify by Email</label>
                    <select className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary appearance-none">
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-muted uppercase">Order ID</label>
                    <input type="text" placeholder="Order ID" className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase">Subject</label>
                  <input type="text" placeholder="Subject" className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your issue..."
                    className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:border-primary resize-none"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-muted uppercase">Attachment</label>
                  <div className="flex items-center">
                    <label className="cursor-pointer bg-dashboard-bg hover:bg-dashboard-bg/80 text-text-main px-4 py-2 text-sm font-medium rounded-l-md border border-border-subtle border-r-0 transition-colors">
                      Choose File
                      <input type="file" className="hidden" />
                    </label>
                    <div className="flex-1 bg-dashboard-bg/20 border border-border-subtle rounded-r-md px-4 py-2 text-sm text-text-muted truncate">
                      No file chosen
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t border-border-subtle bg-dashboard-bg/50">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-sm font-bold text-text-muted hover:text-text-main transition-colors"
                >
                  Cancel
                </button>
                <button className="px-10 py-2 text-sm font-bold text-black bg-primary hover:bg-primary/90 rounded-md transition-colors shadow-md">
                  Create Ticket
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}