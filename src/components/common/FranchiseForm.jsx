import React, { useState, useEffect } from "react";
import { Button } from "../ui/button"; // Updated path
import { Calendar, X, CloudUpload } from "lucide-react";
import { swalSuccess } from "../../lib/swal"; // Updated path

export default function FranchiseForm({ initialData, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", startDate: "", endDate: "", image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        image: initialData.image || null,
      });
      setPreview(initialData.image);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    swalSuccess("Success!", `Franchise has been ${initialData ? "updated" : "created"}.`);
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Logo Upload Section */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-border-subtle rounded-2xl py-6 px-4 bg-dashboard-bg/40 transition-all hover:bg-dashboard-bg/60 group">
        {preview ? (
          <div className="relative w-20 h-20 mb-3 border border-border-subtle rounded-lg overflow-hidden bg-white/5 p-1">
            <img src={preview} alt="Preview" className="w-full h-full object-contain" />
            <button 
              type="button"
              onClick={() => {setPreview(null); setFormData(p => ({...p, image: null}))}}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
            >
              <X size={10} />
            </button>
          </div>
        ) : (
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
            <CloudUpload size={24} />
          </div>
        )}
        <label className="px-4 py-1.5 bg-primary text-black text-[10px] font-black rounded cursor-pointer hover:bg-primary/90 transition-all uppercase tracking-widest">
          Choose Logo
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2 space-y-1">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Franchise Name</label>
          <input required name="name" value={formData.name} onChange={handleChange} placeholder="Legal Name" className="w-full bg-dashboard-bg border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-main focus:border-primary outline-none" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Email Address</label>
          <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="contact@domain.com" className="w-full bg-dashboard-bg border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-main focus:border-primary outline-none" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">Phone Number</label>
          <input required name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="+91..." className="w-full bg-dashboard-bg border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-main focus:border-primary outline-none" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
            <Calendar size={12} className="text-primary" /> Start Date
          </label>
          <input required name="startDate" value={formData.startDate} onChange={handleChange} type="date" className="w-full bg-dashboard-bg border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-main focus:border-primary outline-none [color-scheme:dark]" />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1 flex items-center gap-2">
            <Calendar size={12} className="text-primary" /> End Date
          </label>
          <input required name="endDate" value={formData.endDate} onChange={handleChange} type="date" className="w-full bg-dashboard-bg border border-border-subtle rounded-xl px-4 py-2.5 text-sm text-text-main focus:border-primary outline-none [color-scheme:dark]" />
        </div>
      </div>

      <Button type="submit" className="w-full bg-primary text-black font-black py-6 rounded-xl text-xs uppercase tracking-widest hover:bg-primary/90 transition-all">
        {initialData ? "Save Changes" : "Create Franchise"}
      </Button>
    </form>
  );
}