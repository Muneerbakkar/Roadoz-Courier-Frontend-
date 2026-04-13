import React from "react";
import { X, User, Briefcase, HardHat, IndianRupee, Map, FileText, CheckCircle, Printer, Download, ShieldCheck } from "lucide-react";
import CommonModal from "./CommonModal";

export default function FranchiseDetailsModal({ isOpen, onClose, data }) {
  if (!data) return null;

  const InfoField = ({ label, value }) => (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{label}</p>
      <p className="text-sm font-semibold text-text-main leading-tight">{value || "Not Provided"}</p>
    </div>
  );

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 pb-2 border-b border-border-subtle mb-4 mt-6 first:mt-0">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={16} />
      </div>
      <h3 className="text-xs font-bold text-text-main uppercase tracking-tighter">{title}</h3>
    </div>
  );

  return (
    <CommonModal isOpen={isOpen} onClose={onClose} title={`Profile: ${data.code}`}>
      <div className="space-y-6">
        
        {/* Header Branding */}
        <div className="bg-dashboard-bg p-6 rounded-2xl border border-border-subtle flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary text-black flex items-center justify-center rounded-xl text-xl font-black">
                 {data.applicantName?.charAt(0)}
              </div>
              <div>
                 <h2 className="text-lg font-bold text-text-main leading-none">{data.applicantName}</h2>
                 <p className="text-[10px] text-primary font-bold mt-1 uppercase">Unique ID: {data.code}</p>
              </div>
           </div>
           <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${data.status ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
              {data.status ? "Verified Active" : "Suspended"}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 px-2">
          <div className="md:col-span-2"><SectionHeader icon={User} title="1. Applicant Information" /></div>
          <InfoField label="Full Name" value={data.applicantName} />
          <InfoField label="Contact Number" value={data.mobile} />
          <InfoField label="Email Address" value={data.email} />
          <InfoField label="District/City" value={data.district} />
          
          <div className="md:col-span-2"><SectionHeader icon={Briefcase} title="2. Business & Strategy" /></div>
          <InfoField label="Ownership" value={data.ownershipType || "Individual"} />
          <InfoField label="Exp Years" value={data.expYears || "0"} />
          <div className="md:col-span-2"><InfoField label="Business Site" value={data.businessAddr} /></div>

          <div className="md:col-span-2"><SectionHeader icon={HardHat} title="3. Infrastructure" /></div>
          <InfoField label="Office Space" value={data.officeSqft + " sq.ft"} />
          <InfoField label="Ownership" value={data.infraOwnership || "Owned"} />
          <InfoField label="Manpower" value={data.manpower || "0 staff"} />

          <div className="md:col-span-2"><SectionHeader icon={IndianRupee} title="4. Financial Records" /></div>
          <InfoField label="Investment" value={data.investmentCapacity} />
          <InfoField label="Bank Name" value={data.bankName} />
          <InfoField label="Account No" value={data.accountNo} />
          
          <div className="md:col-span-2"><SectionHeader icon={FileText} title="5. Documents Checklist" /></div>
          <div className="md:col-span-2 flex flex-wrap gap-2">
            {['ID Proof', 'Address Proof', 'Photos', 'Registration', 'Bank Statement'].map((doc, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-dashboard-bg border border-border-subtle rounded-lg text-[10px] font-bold text-text-muted">
                <CheckCircle size={12} className="text-green-500" /> {doc}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-8 flex items-center justify-between border-t border-border-subtle">
           <div className="flex gap-2">
              <button className="p-2 border border-border-subtle rounded-lg hover:bg-dashboard-bg text-text-muted"><Printer size={16}/></button>
              <button className="p-2 border border-border-subtle rounded-lg hover:bg-dashboard-bg text-text-muted"><Download size={16}/></button>
           </div>
           <button onClick={onClose} className="px-8 py-2 bg-text-main text-card-bg rounded-xl text-xs font-bold uppercase transition-transform active:scale-95">
              Close
           </button>
        </div>
      </div>
    </CommonModal>
  );
}