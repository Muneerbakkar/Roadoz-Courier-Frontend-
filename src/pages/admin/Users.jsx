import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
// import { BackButton } from "../../components/ui/BackButton";
import { Plus, Edit, Trash2, Search, Mail, Shield, X, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export function Users() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const users = [
        { id: 1, name: "John Doe", email: "john@roadoz.com", role: "Super Admin", branch: "Head Office", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@roadoz.com", role: "Accounts Manager", branch: "New York", status: "Active" }

    ];

    return (
        <div className="space-y-6 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* <BackButton /> */}
                    <div>
                        <h1 className="text-2xl font-bold text-text-main">Staff Management</h1>
                        <p className="text-sm text-primary mt-1 font-medium">
                            <Link
                                to="/"
                                className="hover:underline cursor-pointer"
                            >
                                Dashboard
                            </Link> <span className="text-text-muted mx-1">&gt;&gt;</span> Admin <span className="text-text-muted mx-1">&gt;&gt;</span> Staff
                        </p>
                    </div>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-black font-bold h-10 px-8">
                    <Plus size={18} /> Add Staff Member
                </Button>
            </div>

            <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-6 bg-dashboard-bg/30 border-b border-border-subtle">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                            <input type="text" placeholder="Search by name, email or branch..." className="w-full bg-card-bg border border-border-subtle rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-main focus:border-primary focus:outline-none" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-dashboard-bg/50 border-b border-border-subtle text-text-muted text-[11px] font-bold uppercase tracking-widest">
                                    <th className="px-6 py-4">Employee</th>
                                    <th className="px-6 py-4">Designation & Location</th>
                                    <th className="px-6 py-4">Account Status</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-dashboard-bg/30 transition-colors">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">{user.name.charAt(0)}</div>
                                                <div>
                                                    <p className="text-sm font-bold text-text-main">{user.name}</p>
                                                    <p className="text-xs text-text-muted flex items-center gap-1"><Mail size={10} /> {user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-sm">
                                            <p className="font-bold text-text-main flex items-center gap-1.5"><Shield size={14} className="text-primary" /> {user.role}</p>
                                            <p className="text-[10px] text-text-muted uppercase font-bold mt-1 tracking-wider">{user.branch}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-lg border border-green-500/20 uppercase">Active</span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center justify-center gap-1">
                                                <button className="p-2 border border-primary/30 text-primary rounded-md"><Edit size={14} /></button>
                                                <button className="p-2 border border-red-500/30 text-red-500 rounded-md"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* MODAL - FIXED FOR DARK MODE */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border-subtle">
                            <div className="p-6 border-b border-border-subtle bg-dashboard-bg/20 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/20 rounded-lg text-primary"><User size={20} /></div>
                                    <h3 className="text-lg font-bold text-text-main">Add New Staff Member</h3>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="text-text-muted hover:text-primary"><X size={24} /></button>
                            </div>

                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-card-bg">
                                {[
                                    { label: "Full Name *", placeholder: "Staff Name" },
                                    { label: "Email Address *", placeholder: "staff@roadoz.com" },
                                    { label: "Branch *", placeholder: "Select Branch" },
                                    { label: "Password *", placeholder: "••••••••" },
                                ].map((f, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{f.label}</label>
                                        <input type="text" placeholder={f.placeholder} className="w-full bg-dashboard-bg border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-main focus:border-primary focus:outline-none placeholder:text-text-muted" />
                                    </div>
                                ))}
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Assign Role</label>
                                    <select className="w-full bg-dashboard-bg border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-main focus:border-primary focus:outline-none appearance-none">
                                        <option>Select Role</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-6 border-t border-border-subtle bg-dashboard-bg/50 flex justify-end gap-3">
                                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-xs font-bold text-text-muted">Cancel</button>
                                <Button className="bg-primary text-black px-10 h-10 font-bold shadow-lg">Save Staff Member</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}