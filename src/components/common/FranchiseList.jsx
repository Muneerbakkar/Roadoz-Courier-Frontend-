import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { 
  Mail, Phone, Edit, Trash2, Search, RotateCcw, 
  ToggleRight, ToggleLeft 
} from "lucide-react";
import { swalConfirmDelete, swalSuccess } from "../../lib/swal";
import Pagination from "../ui/Pagination";
import Logo from "../../assets/images/Global Logistics Ltd.png";
export default function FranchiseList({ onEdit }) {
  // Mock Data - In a real app, this would come from an API
  const [franchises, setFranchises] = useState([
    {
      id: 1,
      code: "FRN-2024-001",
      name: "Global Logistics Ltd",
      email: "contact@global.com",
      phone: "+91 9876543210",
      image: Logo,
      startDate: "2024-01-15",
      endDate: "2026-01-15",
      status: true
    },
    {
      id: 2,
      code: "FRN-2024-002",
      name: "Express Way Franchise",
      email: "info@expressway.in",
      phone: "+91 8888877777",
      image: Logo,
      startDate: "2023-05-10",
      endDate: "2025-05-10",
      status: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleStatus = (id) => {
    setFranchises(prev => prev.map(f => 
      f.id === id ? { ...f, status: !f.status } : f
    ));
    swalSuccess("Status Updated", "Franchise master status has been changed.");
  };

  const handleDelete = async (id) => {
    const result = await swalConfirmDelete(
      "Remove Franchise?", 
      "This will lock all associated staff and roles."
    );
    if (result.isConfirmed) {
      setFranchises(prev => prev.filter(f => f.id !== id));
      swalSuccess("Deleted", "Franchise record removed.");
    }
  };

  const filteredData = franchises.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Search & Filter Bar */}
        <div className="p-6 bg-dashboard-bg/30 border-b border-border-subtle flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input
              type="text"
              placeholder="Search by Code or Name..."
              className="w-full bg-card-bg border border-border-subtle rounded-lg pl-10 pr-4 py-2 text-sm text-text-main focus:border-primary focus:outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setSearchTerm("")}
            className="text-xs font-bold text-primary flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <RotateCcw size={14} /> Reset Filters
          </button>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-dashboard-bg/50 border-b border-border-subtle text-text-muted text-[11px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Unique Code</th>
                <th className="px-6 py-4">Franchise Details</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Contract Period</th>
                <th className="px-6 py-4">Master Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredData.length > 0 ? (
                filteredData.map((f) => (
                  <tr 
                    key={f.id} 
                    className={`hover:bg-dashboard-bg/30 transition-colors ${!f.status ? 'bg-black/10' : ''}`}
                  >
                    {/* Unique Code Column */}
                    <td className="px-6 py-6">
                      <div className="flex items-center">
                        <span className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg font-mono font-extrabold text-xs tracking-tighter shadow-sm">
                          {f.code}
                        </span>
                      </div>
                    </td>

                    {/* Franchise Details Column */}
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-border-subtle overflow-hidden bg-white/5 flex-shrink-0 flex items-center justify-center p-1">
                          <img src={f.image} className="w-full h-full object-contain" alt={f.name} />
                        </div>
                        <span className="font-bold text-sm text-text-main leading-tight">{f.name}</span>
                      </div>
                    </td>

                    {/* Contact Info Column */}
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1.5">
                        <span className="flex items-center gap-2 text-xs text-text-main">
                          <Mail size={12} className="text-primary opacity-80" /> {f.email}
                        </span>
                        <span className="flex items-center gap-2 text-xs text-text-muted">
                          <Phone size={12} className="text-primary opacity-80" /> {f.phone}
                        </span>
                      </div>
                    </td>

                    {/* Contract Period Column */}
                    <td className="px-6 py-6">
                      <div className="text-[11px] leading-relaxed">
                        <div className="flex items-center gap-1">
                          <span className="text-text-muted font-bold uppercase text-[9px]">Start:</span>
                          <span className="text-text-main font-medium">{f.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-text-muted font-bold uppercase text-[9px]">End:</span>
                          <span className="text-text-main font-medium">{f.endDate}</span>
                        </div>
                      </div>
                    </td>

                    {/* Master Status Toggle */}
                    <td className="px-6 py-6">
                      <button 
                        onClick={() => handleToggleStatus(f.id)}
                        className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all duration-300 border ${
                          f.status 
                            ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20' 
                            : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'
                        }`}
                      >
                        {f.status ? <ToggleRight size={18} className="transition-transform group-hover:scale-110" /> : <ToggleLeft size={18} className="transition-transform group-hover:scale-110" />}
                        {f.status ? "Active" : "Locked"}
                      </button>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-6">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => onEdit(f)}
                          className="p-2 border border-primary/20 text-primary rounded-md hover:bg-primary hover:text-black transition-all"
                          title="Edit Franchise"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(f.id)}
                          className="p-2 border border-red-500/20 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all"
                          title="Delete Franchise"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-text-muted">
                      <Search size={40} className="opacity-20" />
                      <p className="text-sm font-medium">No franchises found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Integration */}
        <div className="p-4 border-t border-border-subtle bg-dashboard-bg/20">
            <Pagination />
        </div>
      </CardContent>
    </Card>
  );
}