import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, Plus, X, RotateCcw } from "lucide-react";
import Pagination from "../components/ui/Pagination";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";


export function Consignees() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [consignees, setConsignees] = useState([
        {
            id: 60,
            name: "Sakshi Jaiswal",
            mobile: "9555995009",
            email: "jais.akshat2008@gmail.com",
            address1: "Jaiswal bhawan",
            address2: "Badhya chowk",
            pincode: "273165",
            city: "Gorakhpur",
            state: "Uttar Pradesh",
            status: true,
        },
        {
            id: 59,
            name: "Sakshi Jaiswal",
            mobile: "9555995009",
            email: "jais.akshat2008@gmail.com",
            address1: "Jaiswal bhawan",
            address2: "Badhya chowk",
            pincode: "273165",
            city: "Gorakhpur",
            state: "Uttar Pradesh",
            status: true,
        },
        {
            id: 58,
            name: "Sakshi Jaiswal",
            mobile: "9555995009",
            email: "jais.akshat2008@gmail.com",
            address1: "Jaiswal bhawan",
            address2: "Badhya chowk",
            pincode: "273165",
            city: "Gorakhpur",
            state: "Uttar Pradesh",
            status: false,
        },
    ]);

    const toggleStatus = (id) => {
        setConsignees(consignees.map(c =>
            c.id === id ? { ...c, status: !c.status } : c
        ));
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-main">Consignee</h1>
                <p className="text-sm text-primary mt-1 font-medium">
                    <Link
                        to="/"
                        className="hover:underline cursor-pointer"
                    >
                        Dashboard
                    </Link>
                    <span className="text-text-muted mx-1">&gt;&gt;</span> Consignee
                </p>
            </div>

            <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border-subtle">
                        <h2 className="text-lg font-semibold text-text-main">Consignee List</h2>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-primary hover:bg-primary/90 text-black h-9 px-4 text-xs font-bold rounded-md flex items-center gap-2"
                            >
                                <Plus size={14} /> Add New
                            </Button>
                            <Button className="bg-primary hover:bg-primary/90 text-black h-9 px-4 text-xs font-bold rounded-md flex items-center gap-2">
                                <Download size={14} /> Export
                            </Button>
                        </div>
                    </div>

                    <div className="p-6 bg-dashboard-bg/30 border-b border-border-subtle">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {[
                                { label: "Date Range", placeholder: "Date Range" },
                                { label: "Name", placeholder: "Name" },
                                { label: "Mobile No", placeholder: "Mobile No" },
                                { label: "Email", placeholder: "Email" },
                                { label: "Pincode", placeholder: "Pincode" },
                            ].map((field) => (
                                <div key={field.label} className="space-y-1.5">
                                    <label className="text-xs font-medium text-text-muted">{field.label}</label>
                                    <input
                                        type="text"
                                        placeholder={field.placeholder}
                                        className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary"
                                    />
                                </div>
                            ))}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-text-muted">Status:</label>
                                <select className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary appearance-none">
                                    <option>All</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-end gap-4">
                            <div className="w-24 space-y-1.5">
                                <label className="text-xs font-medium text-text-muted">Limit:</label>
                                <select className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-xs text-text-main appearance-none focus:outline-none focus:border-primary">
                                    <option>25</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <Button className="bg-primary hover:bg-primary/90 text-black h-9 px-8 text-xs font-bold rounded-md">
                                    Search
                                </Button>
                                <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                                    <RotateCcw size={14} /> Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-dashboard-bg/50 border-y border-border-subtle">
                                <tr className="text-text-muted text-[11px] font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4 w-16">Id</th>
                                    <th className="px-6 py-4 min-w-[150px]">Name</th>
                                    <th className="px-6 py-4 min-w-[150px]">Mobile No</th>
                                    <th className="px-6 py-4 min-w-[200px]">Email</th>
                                    <th className="px-6 py-4 min-w-[250px]">Address 1</th>
                                    <th className="px-6 py-4 min-w-[250px]">Address 2</th>
                                    <th className="px-6 py-4 w-24">Pincode</th>
                                    <th className="px-6 py-4 min-w-[120px]">City</th>
                                    <th className="px-6 py-4 min-w-[150px]">State</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {consignees.map((c) => (
                                    <tr key={c.id} className="hover:bg-dashboard-bg/30 transition-colors">
                                        <td className="px-6 py-4 text-sm text-text-main">{c.id}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-text-main">{c.name}</td>
                                        <td className="px-6 py-4 text-sm text-text-main">{c.mobile}</td>
                                        <td className="px-6 py-4 text-sm text-text-muted">{c.email}</td>
                                        <td className="px-6 py-4 text-sm text-text-muted">{c.address1}</td>
                                        <td className="px-6 py-4 text-sm text-text-muted">{c.address2}</td>
                                        <td className="px-6 py-4 text-sm text-text-main">{c.pincode}</td>
                                        <td className="px-6 py-4 text-sm text-text-main">{c.city}</td>
                                        <td className="px-6 py-4 text-sm text-text-main">{c.state}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col items-center gap-1">
                                                <button
                                                    onClick={() => toggleStatus(c.id)}
                                                    className={cn(
                                                        "relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none",
                                                        c.status ? "bg-green-500" : "bg-dashboard-bg border border-border-subtle"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                                                            c.status ? "translate-x-5" : "translate-x-1"
                                                        )}
                                                    />
                                                </button>
                                                <span className={cn("text-[10px] font-bold uppercase", c.status ? "text-green-500" : "text-text-muted")}>
                                                    {c.status ? "Active" : "Inactive"}
                                                </span>
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

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card-bg rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border-subtle"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-border-subtle">
                                <h3 className="text-lg font-bold text-text-main">Add New Consignee</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-dashboard-bg rounded-full transition-colors text-text-muted"><X size={20} /></button>
                            </div>

                            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar bg-card-bg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {[
                                        { label: "Name *", placeholder: "Full Name" },
                                        { label: "Mobile No *", placeholder: "Mobile No" },
                                        { label: "Email Address", placeholder: "Email", full: true },
                                        { label: "Address Line 1 *", placeholder: "Address 1" },
                                        { label: "Address Line 2", placeholder: "Address 2" },
                                        { label: "Pincode *", placeholder: "Pincode" },
                                        { label: "City", placeholder: "City" },
                                        { label: "State", placeholder: "State" },
                                    ].map((field) => (
                                        <div key={field.label} className={cn("space-y-1.5", field.full && "md:col-span-2")}>
                                            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">{field.label}</label>
                                            <input
                                                type="text"
                                                placeholder={field.placeholder}
                                                className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-4 py-2 text-sm text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" id="status" className="w-4 h-4 accent-primary rounded cursor-pointer" defaultChecked />
                                    <label htmlFor="status" className="text-sm font-bold text-text-main cursor-pointer">Active Consignee</label>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 p-5 border-t border-border-subtle bg-dashboard-bg/50">
                                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-sm font-bold text-text-muted hover:text-text-main transition-colors">Cancel</button>
                                <Button className="bg-primary text-black h-10 px-10 font-bold shadow-md">Save Consignee</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}