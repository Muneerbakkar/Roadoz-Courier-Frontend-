import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, Search, Eye, Edit, Trash2, MapPin, 
  Phone, Mail, ToggleRight, ToggleLeft, 
  Calendar, Filter, RotateCcw, Download 
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { swalConfirmDelete, swalSuccess } from "../lib/swal";
import FranchiseDetailsModal from "../components/common/FranchiseDetailsModal";
import { cn } from "../lib/utils";

export function Franchise() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Mock Data
  const [franchises, setFranchises] = useState([
    { 
      id: 1, 
      code: "FRN-9901", 
      applicantName: "Akshay Kumar", 
      mobile: "+91 9876543210", 
      email: "akshay@example.com", 
      district: "Hyderabad", 
      pin: "500001", 
      createdAt: "2023-10-25",
      status: true ,
      startDate: "2023-11-01",
      endDate: "2025-11-01"
    },
    { 
      id: 2, 
      code: "FRN-8842", 
      applicantName: "Sneha Reddy", 
      mobile: "+91 8877665544", 
      email: "sneha@logistics.com", 
      district: "Bangalore", 
      pin: "560001", 
      createdAt: "2023-11-02",
      status: false ,
      startDate: "2023-12-01",
      endDate: "2025-12-01"
    }
  ]);

  const handleDelete = async (id) => {
    const res = await swalConfirmDelete("Remove Franchise?", "All records will be permanently deleted.");
    if (res.isConfirmed) {
      setFranchises(prev => prev.filter(f => f.id !== id));
      swalSuccess("Deleted", "Franchise removed.");
    }
  };

  const handleToggleStatus = (id) => {
    setFranchises(prev => prev.map(f => f.id === id ? { ...f, status: !f.status } : f));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  // Input styling based on ProcessingOrders/NewOrder
  const filterInputClass = "bg-transparent border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary transition-all w-full md:w-40";

  return (
    <div className="space-y-6 pb-20 p-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main uppercase tracking-tight">Franchise Registry</h1>
          <p className="text-sm text-primary mt-1 font-medium">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <span className="text-text-muted mx-2">&gt;&gt;</span> Registry Management
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="border-border-subtle h-11 text-text-main">
                <Download size={18} className="mr-2" /> Export
            </Button>
            <Button onClick={() => navigate("/franchise/add")} className="bg-primary hover:bg-primary/90 text-black font-bold h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all">
                <Plus size={20} className="mr-2" /> New Application
            </Button>
        </div>
      </div>

      {/* Filter Section - Based on ProcessingOrders.jsx */}
      <Card className="bg-card-bg border-border-subtle shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row items-end gap-4">
            <div className="w-full lg:flex-1 space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-text-muted ml-1">Search Record</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="text" 
                  placeholder="Search by Code, Name or Pin..." 
                  className={cn(filterInputClass, "w-full pl-10 md:w-full")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-text-muted ml-1">Starting Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                <input 
                  type="date" 
                  className={cn(filterInputClass, "pl-9")}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-text-muted ml-1">Ending Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={14} />
                <input 
                  type="date" 
                  className={cn(filterInputClass, "pl-9")}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
                <Button className="bg-primary hover:bg-primary/90 text-black h-9 px-4">
                    <Filter size={16} className="mr-2" /> Filter
                </Button>
                <Button variant="ghost" onClick={clearFilters} className="h-9 px-4 text-text-muted">
                    <RotateCcw size={16} />
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Table Content */}
      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden rounded-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-dashboard-bg/50 text-text-muted text-[10px] font-bold uppercase tracking-widest border-b border-border-subtle">
                  <th className="px-6 py-4">Unique Code</th>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-center">Contract Period</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {franchises.map(f => (
                  <tr key={f.id} className="hover:bg-dashboard-bg/20 transition-colors group">
                    <td className="px-6 py-4">
                        <div className="font-mono font-bold text-primary text-xs">{f.code}</div>
                        <div className="text-[9px] text-text-muted mt-0.5">{f.createdAt}</div>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm text-text-main">{f.applicantName}</td>
                    <td className="px-6 py-4 space-y-1">
                       <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                         <Mail size={12} className="text-primary/70"/> {f.email}
                       </div>
                       <div className="flex items-center gap-1.5 text-[11px] text-text-muted">
                         <Phone size={12} className="text-primary/70"/> {f.mobile}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-1 text-xs font-bold text-text-main uppercase">
                         <MapPin size={12} className="text-primary"/> {f.district}
                       </div>
                       <div className="text-[10px] text-text-muted ml-4 font-mono">PIN: {f.pin}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-1 text-xs font-bold text-text-main uppercase">
                         <MapPin size={12} className="text-primary"/> {f.startDate} - {f.endDate}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <button 
                        onClick={() => handleToggleStatus(f.id)} 
                        className="transition-all active:scale-90"
                        title={f.status ? "Active" : "Inactive"}
                       >
                          {f.status ? (
                            <ToggleRight className="text-green-500" size={32} /> 
                          ) : (
                            <ToggleLeft className="text-text-muted/50" size={32} />
                          )}
                       </button>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex justify-center items-center gap-2">
                          {/* Styled Action Buttons like ProcessingOrders */}
                          <button 
                            onClick={() => { setSelectedFranchise(f); setIsDetailsOpen(true); }} 
                            className="p-1.5 border border-primary/40 text-primary hover:bg-primary/10 rounded-md shadow-sm transition-colors"
                            title="View Profile"
                          >
                            <Eye size={16}/>
                          </button>
                          
                          <button 
                            onClick={() => navigate(`/franchise/edit/${f.id}`)} 
                            className="w-8 h-8 flex items-center justify-center text-primary bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary hover:text-black transition-all"
                            title="Edit Record"
                          >
                            <Edit size={16}/>
                          </button>
                          
                          <button 
                            onClick={() => handleDelete(f.id)} 
                            className="w-8 h-8 flex items-center justify-center text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Record"
                          >
                            <Trash2 size={16}/>
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State Logic */}
          {franchises.length === 0 && (
            <div className="py-20 text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-dashboard-bg border border-border-subtle text-text-muted">
                    <Filter size={32} />
                </div>
                <p className="text-text-muted font-bold text-sm uppercase tracking-widest">No matching records found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <FranchiseDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        data={selectedFranchise} 
      />
    </div>
  );
}