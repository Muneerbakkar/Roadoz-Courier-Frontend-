import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  Plus, Edit, Trash2, Search, RotateCcw, 
  Mail, Phone, Calendar as CalendarIcon, Image as ImageIcon, X 
} from "lucide-react";
import { swalConfirmDelete, swalSuccess } from "../lib/swal";
import { Link } from "react-router-dom";
import Pagination from "../components/ui/Pagination";
import Logo from "../assets/images/Global Logistics Ltd.png";

export function Franchise() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); 
  
  const [franchises, setFranchises] = useState([
    {
      id: 1,
      name: "Global Logistics Ltd",
      email: "contact@global.com",
      phone: "+91 9876543210",
      image: Logo,
      startDate: "2024-01-15",
      endDate: "2026-01-15",
      status: "Active"
    },
    {
      id: 2,
      name: "Express Way Franchise",
      email: "info@expressway.in",
      phone: "+91 8888877777",
      image: Logo,
      startDate: "2023-05-10",
      endDate: "2025-05-10",
      status: "Active"
    }
  ]);

  const handleAddClick = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleEditClick = (franchise) => {
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const result = await swalConfirmDelete("Remove Franchise?", "This action cannot be undone.");
    if (result.isConfirmed) {
      setFranchises(franchises.filter((f) => f.id !== id));
      swalSuccess("Deleted", "Franchise removed successfully.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    swalSuccess("Success", `Franchise ${modalMode === 'add' ? 'added' : 'updated'} successfully!`);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Franchise Management</h1>
          <p className="text-sm text-primary mt-1 font-medium">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <span className="text-text-muted mx-1">&gt;&gt;</span> Franchise List
          </p>
        </div>
        <Button 
          onClick={handleAddClick}
          className="bg-primary hover:bg-primary/90 text-black font-bold flex items-center justify-center gap-2 h-10 px-6 shadow-md"
        >
          <Plus size={18} /> Add Franchise
        </Button>
      </div>

      {/* Main Table Card */}
      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 bg-dashboard-bg/30 border-b border-border-subtle flex flex-wrap items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input
                type="text"
                placeholder="Search franchises..."
                className="w-full bg-card-bg border border-border-subtle rounded-lg pl-10 pr-4 py-2 text-sm text-text-main focus:border-primary focus:outline-none"
              />
            </div>
            <button className="text-xs font-bold text-primary flex items-center gap-1">
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-dashboard-bg/50 border-b border-border-subtle text-text-muted text-[11px] font-bold uppercase tracking-widest">
                  <th className="px-6 py-4">Franchise Details</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Contract Period</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {franchises.map((f) => (
                  <tr key={f.id} className="hover:bg-dashboard-bg/30 transition-colors">
                    <td className="px-6 py-6 font-bold text-sm text-text-main">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full border border-border-subtle overflow-hidden bg-white/10 flex items-center justify-center">
                            <img src={f.image} className="w-full h-full object-contain" alt={f.name} />
                         </div>
                         {f.name}
                      </div>
                    </td>
                    <td className="px-6 py-6 text-xs text-text-muted">
                      <div className="flex flex-col gap-1">
                         <span className="flex items-center gap-1 text-text-main"><Mail size={12} className="text-primary"/> {f.email}</span>
                         <span className="flex items-center gap-1"><Phone size={12} className="text-primary"/> {f.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-xs text-text-main">
                       <span className="text-text-muted font-normal">From:</span> {f.startDate} <br/>
                       <span className="text-text-muted font-normal">To:</span> {f.endDate}
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-2.5 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded uppercase border border-green-500/20">
                        {f.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleEditClick(f)} className="p-1.5 border border-primary/30 text-primary rounded-md hover:bg-primary/10 transition-colors">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => handleDelete(f.id)} className="p-1.5 border border-red-500/30 text-red-500 rounded-md hover:bg-red-500/10 transition-colors">
                          <Trash2 size={14} />
                        </button>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[9999]">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setIsModalOpen(false)} 
          />
          
          <div className="relative bg-card-bg border border-border-subtle w-full max-w-2xl rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-border-subtle rounded-xl py-6 px-4 bg-dashboard-bg/40">
                   <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2">
                      <ImageIcon size={24} />
                   </div>
                   <div className="text-center mb-3">
                     <p className="text-sm font-bold text-text-main leading-tight">Upload Franchise Logo</p>
                     <p className="text-[10px] text-text-muted mt-0.5">PNG, JPG (Max 5MB)</p>
                   </div>
                   <label className="px-5 py-1.5 bg-primary text-black text-[11px] font-extrabold rounded-lg cursor-pointer hover:bg-primary/90 transition-colors uppercase">
                      Choose File
                      <input type="file" className="hidden" />
                   </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Franchise Name</label>
                    <input required type="text" placeholder="e.g. Global Logistics" className="w-full bg-dashboard-bg border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-main focus:border-primary outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Email Address</label>
                    <input required type="email" placeholder="example@domain.com" className="w-full bg-dashboard-bg border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-main focus:border-primary outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Phone Number</label>
                    <input required type="text" placeholder="+91 00000 00000" className="w-full bg-dashboard-bg border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-main focus:border-primary outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Status</label>
                    <select className="w-full bg-dashboard-bg border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-main focus:border-primary outline-none cursor-pointer">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                      <CalendarIcon size={12} className="text-primary" /> Start Date
                    </label>
                    <input required type="date" className="w-full bg-dashboard-bg border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-main focus:border-primary outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                      <CalendarIcon size={12} className="text-primary" /> End Date
                    </label>
                    <input required type="date" className="w-full bg-dashboard-bg border border-border-subtle rounded-lg px-4 py-2 text-sm text-text-main focus:border-primary outline-none" />
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2.5 bg-transparent border border-border-subtle text-text-main rounded-xl text-sm font-bold hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 px-4 py-2.5 bg-primary text-black rounded-xl text-sm font-bold hover:bg-primary/90 shadow-md shadow-primary/10 transition-all"
                  >
                    {modalMode === "add" ? "Save Franchise" : "Update Franchise"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}