import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, Search, Eye, Edit, Trash2, MapPin, 
  Phone, Mail, ToggleRight, ToggleLeft, 
  Calendar, Filter, RotateCcw, Download,
  User, Hash, Clock
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

  // Filter Logic
  const filteredFranchises = useMemo(() => {
    return franchises.filter(f => {
      const matchesSearch = 
        f.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.pin.includes(searchTerm);
      
      const itemDate = new Date(f.createdAt);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      
      const matchesDate = (!start || itemDate >= start) && (!end || itemDate <= end);
      
      return matchesSearch && matchesDate;
    });
  }, [franchises, searchTerm, startDate, endDate]);

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

  const filterInputClass = "bg-transparent border border-border-subtle rounded-lg px-3 py-2 text-xs text-text-main focus:outline-none focus:border-primary transition-all w-full";

  return (
    <div className="space-y-6 pb-20 p-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-text-main uppercase tracking-tight">Franchise Registry</h1>
          <p className="text-xs md:text-sm text-primary mt-1 font-medium">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <span className="text-text-muted mx-2">&gt;&gt;</span> Registry Management
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" className="flex-1 sm:flex-none border-border-subtle h-10 text-text-main text-xs">
                <Download size={16} className="mr-2" /> Export
            </Button>
            <Button 
                onClick={() => navigate("/dashboard/franchise/add")} 
                className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-black font-bold h-10 px-4 rounded-xl shadow-lg transition-all text-xs"
            >
                <Plus size={18} className="mr-2" /> New Application
            </Button>
        </div>
      </div>

      {/* Filter Section */}
      <Card className="bg-card-bg border-border-subtle shadow-sm">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5 lg:col-span-1">
              <label className="text-[10px] font-bold uppercase text-text-muted ml-1">Search Record</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                <input 
                  type="text" 
                  placeholder="Code, Name or Pin..." 
                  className={cn(filterInputClass, "pl-10")}
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
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-black h-9 text-xs">
                    <Filter size={14} className="mr-2" /> Filter
                </Button>
                <Button variant="ghost" onClick={clearFilters} className="h-9 px-3 text-text-muted border border-border-subtle">
                    <RotateCcw size={16} />
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content - Desktop Table (Visible md+) */}
      <Card className="hidden md:block bg-card-bg border-border-subtle shadow-sm overflow-hidden rounded-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-dashboard-bg/50 text-text-muted text-[10px] font-bold uppercase tracking-widest border-b border-border-subtle">
                  <th className="px-6 py-4">Unique Code</th>
                  <th className="px-6 py-4">Applicant</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredFranchises.map(f => (
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
                       <button onClick={() => handleToggleStatus(f.id)}>
                          {f.status ? (
                            <ToggleRight className="text-green-500" size={28} /> 
                          ) : (
                            <ToggleLeft className="text-text-muted/50" size={28} />
                          )}
                       </button>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex justify-center items-center gap-2">
                          <button 
                            onClick={() => { setSelectedFranchise(f); setIsDetailsOpen(true); }} 
                            className="p-1.5 border border-primary/40 text-primary hover:bg-primary/10 rounded-md transition-colors"
                          >
                            <Eye size={16}/>
                          </button>
                          <button 
                            onClick={() => navigate(`/franchise/edit/${f.id}`)} 
                            className="w-8 h-8 flex items-center justify-center text-primary bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary hover:text-black transition-all"
                          >
                            <Edit size={16}/>
                          </button>
                          <button 
                            onClick={() => handleDelete(f.id)} 
                            className="w-8 h-8 flex items-center justify-center text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all"
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
        </CardContent>
      </Card>

      {/* Mobile View - Card List (Visible on small screens) */}
      <div className="md:hidden space-y-4">
        {filteredFranchises.map(f => (
          <Card key={f.id} className="bg-card-bg border-border-subtle overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-primary/10 text-primary px-2 py-1 rounded text-[10px] font-mono font-bold">
                  {f.code}
                </div>
                <button onClick={() => handleToggleStatus(f.id)}>
                  {f.status ? <ToggleRight className="text-green-500" size={28} /> : <ToggleLeft className="text-text-muted/50" size={28} />}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-dashboard-bg flex items-center justify-center text-primary border border-border-subtle">
                    <User size={14} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-main">{f.applicantName}</p>
                    <p className="text-[10px] text-text-muted uppercase tracking-wider">{f.district} • {f.pin}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 py-3 border-y border-border-subtle/50">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Phone size={12} className="text-primary" />
                    <span className="text-[11px] truncate">{f.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <Mail size={12} className="text-primary" />
                    <span className="text-[11px] truncate">{f.email}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-text-muted uppercase font-bold">Contract Ends</span>
                    <span className="text-[11px] font-mono text-text-main">{f.endDate}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setSelectedFranchise(f); setIsDetailsOpen(true); }} 
                      className="p-2 bg-dashboard-bg border border-border-subtle text-primary rounded-lg"
                    >
                      <Eye size={16}/>
                    </button>
                    <button 
                      onClick={() => navigate(`/franchise/edit/${f.id}`)}
                      className="p-2 bg-primary/10 border border-primary/20 text-primary rounded-lg"
                    >
                      <Edit size={16}/>
                    </button>
                    <button 
                      onClick={() => handleDelete(f.id)}
                      className="p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredFranchises.length === 0 && (
        <div className="py-20 text-center space-y-3 bg-card-bg rounded-2xl border border-dashed border-border-subtle">
            <div className="inline-flex p-4 rounded-full bg-dashboard-bg text-text-muted">
                <Search size={32} />
            </div>
            <p className="text-text-muted font-bold text-sm uppercase tracking-widest">No matching records found</p>
            <Button onClick={clearFilters} variant="link" className="text-primary text-xs">Clear all filters</Button>
        </div>
      )}

      {/* Details Modal */}
      <FranchiseDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)} 
        data={selectedFranchise} 
      />
    </div>
  );
}