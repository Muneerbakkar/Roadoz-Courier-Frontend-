import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
// import { BackButton } from "../../components/ui/BackButton";
import { Plus, Edit, Trash2, Search, Shield, Info, Check, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export function Roles() {
    const [roles, setRoles] = useState([
        { id: 1, name: "Super Admin", level: "System owner", scope: "Full system", status: "Active" },
        { id: 2, name: "Accounts Manager", level: "Finance controller", scope: "Financial data", status: "Active" },
        { id: 3, name: "Support Agent", level: "Customer support", scope: "Customer interactions", status: "Active" },
        { id: 4, name: "Franchise Owner", level: "Franchise management", scope: "Own franchise data", status: "Active" },

    ]);

    const [selectedRole, setSelectedRole] = useState(roles[0]);
    const [activeTab, setActiveTab] = useState("Permissions");

    const modules = ["User Management", "Franchise Management", "Billing & Accounts", "System Settings"];

    return (
        <div className="space-y-6 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    {/* <BackButton /> */}
                    <div>
                        <h1 className="text-2xl font-bold text-text-main">Role Permissions</h1>
                        <p className="text-sm text-primary mt-1 font-medium">
                            <Link
                                to="/"
                                className="hover:underline cursor-pointer"
                            >
                                Dashboard
                            </Link> <span className="text-text-muted mx-1">&gt;&gt;</span> Admin <span className="text-text-muted mx-1">&gt;&gt;</span> Roles
                        </p>
                    </div>
                </div>
                <Button className="bg-primary text-black font-bold h-10 px-6 flex items-center gap-2 shadow-lg shadow-primary/10">
                    <Plus size={18} /> New Role
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Role List */}
                <div className="lg:col-span-4">
                    <Card className="bg-card-bg border-border-subtle shadow-sm h-full overflow-hidden">
                        <div className="p-4 bg-dashboard-bg/50 border-b border-border-subtle">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                                <input type="text" placeholder="Search roles..." className="w-full bg-card-bg border border-border-subtle rounded-xl pl-9 pr-4 py-2 text-xs text-text-main focus:border-primary focus:outline-none" />
                            </div>
                        </div>
                        <div className="divide-y divide-border-subtle max-h-[600px] overflow-y-auto custom-scrollbar">
                            {roles.map((role) => (
                                <div key={role.id} onClick={() => setSelectedRole(role)} className={cn(
                                    "p-5 cursor-pointer transition-all border-l-4",
                                    selectedRole.id === role.id ? "bg-primary/10 border-primary" : "hover:bg-dashboard-bg/50 border-transparent"
                                )}>
                                    <p className={cn("text-sm font-bold", selectedRole.id === role.id ? "text-primary" : "text-text-main")}>{role.name}</p>
                                    <p className="text-[10px] text-text-muted uppercase tracking-wider mt-1">{role.level}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right: Details */}
                <div className="lg:col-span-8">
                    <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-border-subtle bg-dashboard-bg/20">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/20 rounded-2xl text-primary"><Shield size={28} /></div>
                                    <div>
                                        <h2 className="text-xl font-bold text-text-main">{selectedRole.name}</h2>
                                        <span className="text-[10px] text-primary font-bold uppercase tracking-widest">{selectedRole.scope}</span>
                                    </div>
                                </div>
                                <Button className="bg-primary text-black h-9 px-8 font-bold shadow-md">Update Matrix</Button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6 bg-card-bg">
                            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-start gap-3">
                                <Info className="text-primary shrink-0" size={18} />
                                <p className="text-xs text-text-muted leading-relaxed">Changes to this matrix will reflect immediately for all users assigned to the <span className="text-text-main font-bold">"{selectedRole.name}"</span> role.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {modules.map(module => (
                                    <div key={module} className="p-4 border border-border-subtle rounded-2xl flex items-center justify-between bg-dashboard-bg/20">
                                        <span className="text-sm font-bold text-text-main">{module}</span>
                                        <div className="flex bg-card-bg p-1 rounded-lg border border-border-subtle">
                                            {["None", "Full"].map(lvl => (
                                                <button key={lvl} className={cn(
                                                    "px-4 py-1 text-[10px] font-bold rounded-md transition-all",
                                                    lvl === "Full" ? "bg-primary text-black" : "text-text-muted"
                                                )}>{lvl}</button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}