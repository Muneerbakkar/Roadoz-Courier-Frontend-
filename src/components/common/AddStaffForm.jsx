import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  X, CheckSquare, ShieldCheck, User, 
  Mail, Phone, Lock, Save, RotateCcw, 
  ChevronRight, BadgeCheck, ClipboardList, CheckCircle2, Square
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { swalSuccess } from "../../lib/swal";

const MODULE_PERMISSIONS = [
  {
    name: "User Management",
    id: "user_mgmt",
    actions: ["List Users", "Create User", "Update User", "Delete User"]
  },
  {
    name: "Franchise Controls",
    id: "fran_ctrl",
    actions: ["View Franchise", "Edit Franchise", "Update Contract"]
  },
  {
    name: "Billing & Reports",
    id: "bill_rpt",
    actions: ["Generate Invoice", "View Reports", "Download Ledger"]
  }
];

export default function AddStaffForm({ initialData, onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    fCode: "",
    roleName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    status: true
  });

  const [selectedPerms, setSelectedPerms] = useState([]);

  // Flatten all available actions for the "Select All" logic
  const allAvailableActions = useMemo(() => {
    return MODULE_PERMISSIONS.flatMap(module => module.actions);
  }, []);

  // Determine if every single action is currently selected
  const isEverythingSelected = selectedPerms.length === allAvailableActions.length && allAvailableActions.length > 0;

  useEffect(() => {
    if (initialData) {
      setFormData({ 
        fCode: initialData.fCode || "",
        roleName: initialData.role || initialData.roleName || "",
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        password: "••••••••", 
        status: initialData.status ?? true 
      });
      setSelectedPerms(initialData.permissions || []);
    }
  }, [initialData]);

  const togglePermission = (action) => {
    setSelectedPerms(prev => 
      prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action]
    );
  };

  const toggleModule = (actions) => {
    const isAllSelected = actions.every(a => selectedPerms.includes(a));
    if (isAllSelected) {
      setSelectedPerms(prev => prev.filter(a => !actions.includes(a)));
    } else {
      setSelectedPerms(prev => [...new Set([...prev, ...actions])]);
    }
  };

  // Master Toggle logic
  const handleSelectAll = () => {
    if (isEverythingSelected) {
      setSelectedPerms([]); // Deselect all
    } else {
      setSelectedPerms(allAvailableActions); // Select every possible action
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    swalSuccess("Success", `Staff ${initialData ? "Updated" : "Created"} Successfully`);
    onSuccess();
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-400">
      
      {/* Breadcrumbs Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* <div>
          <h1 className="text-2xl font-bold text-text-main">
            {initialData ? "Edit Staff Account" : "Staff Registration"}
          </h1>
          <p className="text-sm text-primary mt-1 flex items-center gap-1 font-medium">
            <Link to="/" className="hover:underline cursor-pointer">Dashboard</Link>
            <ChevronRight size={14} className="text-text-muted" /> 
            <span className="text-text-muted">Transaction Manager</span>
            <ChevronRight size={14} className="text-text-muted" />
            <span>{initialData ? "Edit Staff" : "Add New Staff"}</span>
          </p>
        </div> */}
        {/* <Button onClick={onCancel} variant="outline" className="border-border-subtle text-text-muted h-10 px-4">
          <RotateCcw size={16} className="mr-2" /> Discard
        </Button> */}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Card 1: Identity & Scope */}
        <Card className="bg-card-bg border-border-subtle shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
               <ShieldCheck size={20} className="text-primary" />
               <h2 className="text-lg font-semibold text-text-main">Franchise & Role Identity</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Select Franchise Scope *</label>
                <select 
                  required
                  value={formData.fCode}
                  onChange={(e) => setFormData({...formData, fCode: e.target.value})}
                  className="w-full bg-transparent border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  <option value="" className="bg-card-bg">Choose Unique Code</option>
                  <option value="FRN-2024-001" className="bg-card-bg">FRN-2024-001 (Global Logistics)</option>
                  <option value="FRN-2024-002" className="bg-card-bg">FRN-2024-002 (Express Way)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Create Custom Role Name *</label>
                <div className="relative">
                    <ClipboardList size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Operations Manager"
                      value={formData.roleName}
                      onChange={(e) => setFormData({...formData, roleName: e.target.value})}
                      className="w-full bg-transparent border border-border-subtle rounded-lg pl-10 pr-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary"
                    />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Personal Details (Simplified for code length) ... Same as before */}
        <Card className="bg-card-bg border-border-subtle shadow-sm">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
               <User size={20} className="text-primary" />
               <h2 className="text-lg font-semibold text-text-main">Staff Personal Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-1.5 lg:col-span-2">
                    <label className="text-xs font-bold text-text-muted uppercase">Full Name *</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary" />
                </div>
                <div className="space-y-1.5 lg:col-span-2">
                    <label className="text-xs font-bold text-text-muted uppercase">Email Address *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary" />
                </div>
                {/* ... other fields remain the same */}
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Permissions Matrix with SELECT ALL */}
        <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-border-subtle pb-4">
               <div className="flex items-center gap-2">
                  <BadgeCheck size={20} className="text-primary" />
                  <h2 className="text-lg font-semibold text-text-main">Functionality Permissions</h2>
               </div>

               {/* SELECT ALL FUNCTIONALITY */}
               <label className="flex items-center gap-3 cursor-pointer group bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 hover:bg-primary/20 transition-all">
                  <span className="text-xs font-black text-primary uppercase tracking-tighter">
                    {isEverythingSelected ? "Deselect All Permissions" : "Select All Functionalities"}
                  </span>
                  <div onClick={handleSelectAll} className="relative flex items-center">
                      <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                          isEverythingSelected ? 'border-primary bg-primary text-black' : 'border-primary/40 text-transparent'
                      }`}>
                          {isEverythingSelected ? <CheckCircle2 size={14} strokeWidth={3} /> : <Square size={14} />}
                      </div>
                  </div>
               </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULE_PERMISSIONS.map((mod) => (
                <div key={mod.id} className="bg-dashboard-bg/20 border border-border-subtle rounded-2xl overflow-hidden hover:border-primary/30 transition-all group/mod">
                  <div className="bg-dashboard-bg/50 px-5 py-3 flex justify-between items-center border-b border-border-subtle">
                    <span className="text-[11px] font-black text-text-main uppercase tracking-tighter italic">{mod.name}</span>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-primary cursor-pointer scale-110"
                      checked={mod.actions.every(a => selectedPerms.includes(a))}
                      onChange={() => toggleModule(mod.actions)}
                    />
                  </div>
                  <div className="p-5 space-y-4">
                    {mod.actions.map((action) => (
                      <label key={action} className="flex items-center justify-between group cursor-pointer">
                        <span className={`text-xs transition-colors font-medium ${selectedPerms.includes(action) ? 'text-text-main' : 'text-text-muted group-hover:text-text-main'}`}>
                            {action}
                        </span>
                        <div className="relative flex items-center">
                            <input 
                            type="checkbox" 
                            className="sr-only"
                            checked={selectedPerms.includes(action)}
                            onChange={() => togglePermission(action)}
                            />
                            <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                                selectedPerms.includes(action) ? 'border-primary bg-primary text-black shadow-[0_0_10px_rgba(var(--primary),0.2)]' : 'border-text-muted/30 group-hover:border-text-muted/50'
                            }`}>
                                {selectedPerms.includes(action) && <CheckSquare size={14} strokeWidth={4} />}
                            </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Section ... remains same as before */}
        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" onClick={onCancel} className="px-8 bg-transparent text-text-muted border border-border-subtle rounded-xl">Discard</Button>
          <Button type="submit" className="px-10 bg-primary text-black font-bold h-12 rounded-xl shadow-lg">
            <Save size={18} className="mr-2"/> {initialData ? "UPDATE ACCOUNT" : "REGISTER STAFF"}
          </Button>
        </div>
      </form>
    </div>
  );
}