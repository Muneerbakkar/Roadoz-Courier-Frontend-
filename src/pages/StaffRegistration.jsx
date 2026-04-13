import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import AddStaffForm from "../components/common/AddStaffForm";

// Using default export to ensure easy loading
export default function StaffRegistration() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER FOR STAFF REGISTRATION ONLY */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Staff Registration</h1>
          <p className="text-sm font-medium mt-1 flex items-center gap-1">
            <Link to="/" className="text-primary hover:underline">Dashboard</Link>
            <ChevronRight size={14} className="text-text-muted" />
            <span className="text-text-muted cursor-pointer" onClick={() => navigate("/franchise")}>Transaction Manager</span>
            <ChevronRight size={14} className="text-text-muted" />
            <span className="text-primary font-bold">Add New Staff</span>
          </p>
        </div>
        
        {/* <Button 
          variant="outline" 
          onClick={() => navigate("/franchise")}
          className="border-border-subtle text-text-main hover:bg-white/5 h-10 px-4"
        >
          <RotateCcw size={16} className="mr-2" /> Discard
        </Button> */}
      </div>

      {/* THE ACTUAL FORM */}
      <div className="mt-8">
        <AddStaffForm 
          onCancel={() => navigate("/franchise")} 
          onSuccess={() => navigate("/franchise")} 
        />
      </div>
    </div>
  );
}