import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
// import { BackButton } from "../../components/ui/BackButton";
import { Plus, Edit, Trash2, Search, Settings, RotateCcw } from "lucide-react";
import { swalConfirmDelete, swalSuccess } from "../../lib/swal";
import { Link } from "react-router-dom";

export function Permissions() {
    const [modules, setModules] = useState([
        { id: 1, name: "User Management", description: "Manage system users and access levels", status: "Active" },
        { id: 2, name: "Franchise Management", description: "Manage franchise owners", status: "Active" },
        { id: 3, name: "Order Management", description: "Oversee order processing and fulfillment", status: "Active" },

    ]);

    const handleDelete = async (id) => {
        const result = await swalConfirmDelete("Delete Module?", "This will remove system access points.");
        if (result.isConfirmed) {
            setModules(modules.filter((m) => m.id !== id));
            swalSuccess("Deleted", "Module removed successfully.");
        }
    };

    return (
        <div className="space-y-6 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* <BackButton /> */}
                    <div>
                        <h1 className="text-2xl font-bold text-text-main">Module Management</h1>
                        <p className="text-sm text-primary mt-1 font-medium">
                            <Link
                                to="/"
                                className="hover:underline cursor-pointer"
                            >
                                Dashboard
                            </Link> <span className="text-text-muted mx-1">&gt;&gt;</span> Admin <span className="text-text-muted mx-1">&gt;&gt;</span> Modules
                        </p>
                    </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-black font-bold flex items-center gap-2 h-10 px-6">
                    <Plus size={18} /> Add Module
                </Button>
            </div>

            <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-6 bg-dashboard-bg/30 border-b border-border-subtle flex flex-wrap items-center gap-4">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                            <input
                                type="text"
                                placeholder="Search modules..."
                                className="w-full bg-card-bg border border-border-subtle rounded-lg pl-10 pr-4 py-2.5 text-sm text-text-main focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                        <button className="text-xs font-bold text-primary flex items-center gap-1"><RotateCcw size={14} /> Reset</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-dashboard-bg/50 border-b border-border-subtle text-text-muted text-[11px] font-bold uppercase tracking-widest">
                                    <th className="px-6 py-4">Module Details</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border-subtle">
                                {modules.map((module) => (
                                    <tr key={module.id} className="hover:bg-dashboard-bg/30 transition-colors">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-primary/10 rounded-xl text-primary"><Settings size={18} /></div>
                                                <span className="text-sm font-bold text-text-main">{module.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-sm text-text-muted max-w-md">{module.description}</td>
                                        <td className="px-6 py-6">
                                            <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-lg uppercase border border-green-500/20">
                                                {module.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center justify-center gap-1">
                                                <button className="p-1.5 border border-primary/30 text-primary rounded-md hover:bg-primary/10"><Edit size={14} /></button>
                                                <button onClick={() => handleDelete(module.id)} className="p-1.5 border border-red-500/30 text-red-500 rounded-md hover:bg-red-500/10"><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}