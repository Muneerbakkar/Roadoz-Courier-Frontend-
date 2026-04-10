import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { 
  ChevronRight, ChevronLeft, CheckCircle2, RotateCcw, 
  User, Briefcase, HardHat, IndianRupee, Map, FileText, ShieldCheck, Plus 
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { swalSuccess } from "../../lib/swal";
import { cn } from "../../lib/utils";

const STEPS = [
  { id: 1, label: "Applicant", icon: User },
  { id: 2, label: "Business", icon: Briefcase },
  { id: 3, label: "Infrastructure", icon: HardHat },
  { id: 4, label: "Financial", icon: IndianRupee },
  { id: 5, label: "Area", icon: Map },
  { id: 6, label: "Documents", icon: FileText },
  { id: 7, label: "Declaration", icon: ShieldCheck }
];

export default function FranchiseWizard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentStep, setCurrentStep] = useState(1);
  
  const [formData, setFormData] = useState({
    fullName: "", dob: "", gender: "", mobile: "", email: "", currAddr: "", permAddr: "",
    proposedCity: "", businessAddr: "", ownershipType: "", experience: "", expYears: "",
    officeSqft: "", infraOwnership: "Owned", internet: "No", computer: "No", manpower: "",
    investmentCapacity: "", source: "", bankName: "", accountNo: "", anyLoans: "No", loanDetails: "",
    preferredArea: "", landmark: "", pinCodes: "",
    docAadhar: false, docAddr: false, docPhoto: false, docReg: false, docBank: false,
    place: "", date: new Date().toISOString().split('T')[0], signature: false
  });

  const inputClass = "w-full bg-transparent border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary transition-all placeholder:text-text-muted/50";
  const labelClass = "text-xs font-medium text-text-muted mb-1.5 block";

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const isStepComplete = () => {
    switch(currentStep) {
      case 1: return formData.fullName && formData.dob && formData.gender && formData.mobile && formData.email && formData.currAddr;
      case 2: return formData.proposedCity && formData.businessAddr && formData.ownershipType;
      case 3: return formData.officeSqft && formData.manpower;
      case 4: return formData.investmentCapacity && formData.bankName && formData.accountNo;
      case 5: return formData.preferredArea && formData.pinCodes;
      case 6: return formData.docAadhar && formData.docAddr && formData.docPhoto;
      case 7: return formData.place && formData.signature;
      default: return false;
    }
  };

  const handleSubmit = () => {
    swalSuccess("Success", "Franchise Application has been successfully submitted.");
    navigate("/franchise");
  };

  return (
    <div className="space-y-6 pb-20 pt-4 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main uppercase tracking-tight">
            {id ? "Edit Franchise" : "New Franchise Application"}
          </h1>
          <p className="text-sm text-primary mt-1">
            <Link to="/franchise" className="hover:underline">Registry</Link>
            <span className="text-text-muted mx-2">&gt;&gt;</span>
            <span className="text-text-muted">Step {currentStep} of 7</span>
          </p>
        </div>
        <Button onClick={() => navigate("/franchise")} variant="outline" className="border-border-subtle text-text-main hover:bg-dashboard-bg">
           <RotateCcw size={16} className="mr-2" /> Discard
        </Button>
      </div>

      {/* Referral Style Stepper */}
      <div className="flex overflow-x-auto gap-2 p-2 bg-card-bg border border-border-subtle rounded-xl no-scrollbar shadow-sm">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isDone = currentStep > step.id;
          return (
            <div key={step.id} className={cn(
              "flex-1 min-w-[140px] flex items-center gap-3 p-3 rounded-lg transition-all",
              isActive ? "bg-primary/10 border border-primary/20" : "opacity-60"
            )}>
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center border",
                isActive ? "bg-primary text-black border-primary" : isDone ? "text-green-500 border-green-500" : "text-text-muted border-border-subtle"
              )}>
                {isDone ? <CheckCircle2 size={18} /> : <Icon size={18} />}
              </div>
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", isActive ? "text-primary" : "text-text-muted")}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-6 md:p-10">
          <form className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="md:col-span-2 lg:col-span-4 border-b border-border-subtle pb-2">
                  <h3 className="text-lg font-semibold text-text-main">1. Applicant Details</h3>
                </div>
                <div className="lg:col-span-2">
                   <label className={labelClass}>Full Name*</label>
                   <input type="text" className={inputClass} placeholder="Enter full name" value={formData.fullName} onChange={(e)=>setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div>
                   <label className={labelClass}>Date of Birth*</label>
                   <input type="date" className={inputClass} value={formData.dob} onChange={(e)=>setFormData({...formData, dob: e.target.value})} />
                </div>
                <div>
                   <label className={labelClass}>Gender*</label>
                   <select className={inputClass} value={formData.gender} onChange={(e)=>setFormData({...formData, gender: e.target.value})}>
                      <option value="">Select Gender</option><option>Male</option><option>Female</option><option>Other</option>
                   </select>
                </div>
                <div className="lg:col-span-2">
                   <label className={labelClass}>Mobile Number*</label>
                   <input type="text" className={inputClass} placeholder="+91" value={formData.mobile} onChange={(e)=>setFormData({...formData, mobile: e.target.value})} />
                </div>
                <div className="lg:col-span-2">
                   <label className={labelClass}>Email ID*</label>
                   <input type="email" className={inputClass} placeholder="example@mail.com" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="lg:col-span-2">
                   <label className={labelClass}>Current Address*</label>
                   <textarea className={inputClass} rows="2" value={formData.currAddr} onChange={(e)=>setFormData({...formData, currAddr: e.target.value})} />
                </div>
                <div className="lg:col-span-2">
                   <label className={labelClass}>Permanent Address</label>
                   <textarea className={inputClass} rows="2" value={formData.permAddr} onChange={(e)=>setFormData({...formData, permAddr: e.target.value})} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 border-b border-border-subtle pb-2">
                  <h3 className="text-lg font-semibold text-text-main">2. Business Details</h3>
                </div>
                <div>
                  <label className={labelClass}>Proposed Location (City/Town)*</label>
                  <input type="text" className={inputClass} value={formData.proposedCity} onChange={(e)=>setFormData({...formData, proposedCity: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Ownership Type*</label>
                  <select className={inputClass} value={formData.ownershipType} onChange={(e)=>setFormData({...formData, ownershipType: e.target.value})}>
                    <option value="">Select Type</option><option>Individual</option><option>Partnership</option><option>Company</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Detailed Business Address*</label>
                  <textarea className={inputClass} rows="2" value={formData.businessAddr} onChange={(e)=>setFormData({...formData, businessAddr: e.target.value})} />
                </div>
                <div><label className={labelClass}>Prior Experience</label><input type="text" className={inputClass} value={formData.experience} onChange={(e)=>setFormData({...formData, experience: e.target.value})} /></div>
                <div><label className={labelClass}>Years Active</label><input type="number" className={inputClass} value={formData.expYears} onChange={(e)=>setFormData({...formData, expYears: e.target.value})} /></div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3 border-b border-border-subtle pb-2">
                  <h3 className="text-lg font-semibold text-text-main">3. Infrastructure Details</h3>
                </div>
                <div><label className={labelClass}>Office Space (sq.ft)*</label><input type="number" className={inputClass} value={formData.officeSqft} onChange={(e)=>setFormData({...formData, officeSqft: e.target.value})} /></div>
                <div>
                  <label className={labelClass}>Ownership*</label>
                  <select className={inputClass} value={formData.infraOwnership} onChange={(e)=>setFormData({...formData, infraOwnership: e.target.value})}><option>Owned</option><option>Rented</option></select>
                </div>
                <div><label className={labelClass}>Staff Count*</label><input type="number" className={inputClass} value={formData.manpower} onChange={(e)=>setFormData({...formData, manpower: e.target.value})} /></div>
                <div className="flex items-center gap-8 bg-dashboard-bg/50 p-4 rounded-lg lg:col-span-3">
                  <label className="text-sm text-text-main">Internet Availability: 
                    <input type="checkbox" className="ml-2 accent-primary" checked={formData.internet === "Yes"} onChange={(e)=>setFormData({...formData, internet: e.target.checked ? "Yes" : "No"})} /> Yes
                  </label>
                  <label className="text-sm text-text-main">Computer/Laptop: 
                    <input type="checkbox" className="ml-2 accent-primary" checked={formData.computer === "Yes"} onChange={(e)=>setFormData({...formData, computer: e.target.checked ? "Yes" : "No"})} /> Yes
                  </label>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 border-b border-border-subtle pb-2">
                  <h3 className="text-lg font-semibold text-text-main">4. Financial Details</h3>
                </div>
                <div><label className={labelClass}>Investment Capacity*</label><input type="text" className={inputClass} value={formData.investmentCapacity} onChange={(e)=>setFormData({...formData, investmentCapacity: e.target.value})} /></div>
                <div><label className={labelClass}>Source of Funds</label><input type="text" className={inputClass} value={formData.source} onChange={(e)=>setFormData({...formData, source: e.target.value})} /></div>
                <div><label className={labelClass}>Bank Name*</label><input type="text" className={inputClass} value={formData.bankName} onChange={(e)=>setFormData({...formData, bankName: e.target.value})} /></div>
                <div><label className={labelClass}>Account Number*</label><input type="text" className={inputClass} value={formData.accountNo} onChange={(e)=>setFormData({...formData, accountNo: e.target.value})} /></div>
                <div className="md:col-span-2 space-y-4">
                  <label className="text-sm text-text-main">Any Existing Loans? 
                    <select className="ml-4 bg-transparent border border-border-subtle rounded px-2 py-1" value={formData.anyLoans} onChange={(e)=>setFormData({...formData, anyLoans: e.target.value})}><option>No</option><option>Yes</option></select>
                  </label>
                  {formData.anyLoans === "Yes" && <textarea className={inputClass} placeholder="Provide loan details" value={formData.loanDetails} onChange={(e)=>setFormData({...formData, loanDetails: e.target.value})} />}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 border-b border-border-subtle pb-2">
                  <h3 className="text-lg font-semibold text-text-main">5. Area Coverage</h3>
                </div>
                <div><label className={labelClass}>Preferred Service Area*</label><input type="text" className={inputClass} value={formData.preferredArea} onChange={(e)=>setFormData({...formData, preferredArea: e.target.value})} /></div>
                <div><label className={labelClass}>Nearby Landmark</label><input type="text" className={inputClass} value={formData.landmark} onChange={(e)=>setFormData({...formData, landmark: e.target.value})} /></div>
                <div className="md:col-span-2"><label className={labelClass}>Pin Codes Covered (Comma separated)*</label><textarea className={inputClass} rows="2" value={formData.pinCodes} onChange={(e)=>setFormData({...formData, pinCodes: e.target.value})} /></div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-4">
                <div className="border-b border-border-subtle pb-2"><h3 className="text-lg font-semibold text-text-main">6. Document Checklist</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {id: 'docAadhar', label: 'ID Proof (Aadhar/PAN)'},
                    {id: 'docAddr', label: 'Address Proof'},
                    {id: 'docPhoto', label: 'Photographs'},
                    {id: 'docReg', label: 'Business Registration'},
                    {id: 'docBank', label: 'Bank Statement'}
                  ].map(doc => (
                    <label key={doc.id} className="flex items-center justify-between p-4 bg-dashboard-bg/50 border border-border-subtle rounded-xl cursor-pointer hover:border-primary group transition-all">
                      <span className="text-sm font-medium text-text-main group-hover:text-primary">{doc.label}</span>
                      <input type="checkbox" className="w-5 h-5 accent-primary" checked={formData[doc.id]} onChange={(e)=>setFormData({...formData, [doc.id]: e.target.checked})} />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-8 max-w-2xl mx-auto text-center">
                <div className="p-8 bg-primary/5 border border-primary/20 rounded-3xl">
                   <ShieldCheck className="mx-auto text-primary mb-4" size={48} />
                   <h3 className="text-xl font-bold text-text-main mb-2">Legal Declaration</h3>
                   <p className="text-sm text-text-muted italic">"I hereby declare that all information provided is true and correct to the best of my knowledge."</p>
                   <div className="mt-6 flex items-center justify-center gap-2">
                     <input type="checkbox" id="sig" className="w-5 h-5 accent-primary" checked={formData.signature} onChange={(e)=>setFormData({...formData, signature: e.target.checked})} />
                     <label htmlFor="sig" className="text-sm font-bold text-text-main">I AGREE TO THE TERMS</label>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div><label className={labelClass}>Place of Submission</label><input type="text" className={inputClass} value={formData.place} onChange={(e)=>setFormData({...formData, place: e.target.value})} /></div>
                  <div><label className={labelClass}>Submission Date</label><input type="text" className={inputClass} value={formData.date} disabled /></div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border-subtle">
               <Button type="button" onClick={prevStep} disabled={currentStep === 1} variant="outline" className="w-full sm:w-auto px-10 h-12 rounded-xl border-border-subtle">
                 <ChevronLeft className="mr-2" size={20} /> Previous
               </Button>
               {currentStep < 7 ? (
                 <Button type="button" onClick={nextStep} disabled={!isStepComplete()} className={cn(
                   "w-full sm:w-auto px-12 h-12 rounded-xl font-bold shadow-lg transition-all",
                   isStepComplete() ? "bg-primary text-black hover:bg-primary/90" : "bg-border-subtle text-text-muted cursor-not-allowed"
                 )}>
                   Continue <ChevronRight className="ml-2" size={20} />
                 </Button>
               ) : (
                 <Button type="button" onClick={handleSubmit} disabled={!isStepComplete()} className="w-full sm:w-auto px-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold shadow-lg">
                   Submit Application
                 </Button>
               )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}