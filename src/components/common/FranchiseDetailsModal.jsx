import React from "react";
import {
  X,
  User,
  Briefcase,
  HardHat,
  IndianRupee,
  Map,
  FileText,
  CheckCircle,
  Printer,
  Download,
  ShieldCheck,
} from "lucide-react";
import CommonModal from "./CommonModal";

export default function FranchiseDetailsModal({ isOpen, onClose, data }) {
  if (!data) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `
      FRANCHISE PROFILE: ${data.franchise_code}
      -----------------------------------------
      Full Name: ${data.full_name}
      Mobile: ${data.mobile_number}
      Email: ${data.email_id}
      Proposed Location: ${data.proposed_location}
      Office Space: ${data.office_space_sqft} sq.ft
      Ownership: ${data.ownership_type}
      Bank: ${data.bank_name}
      Account: ${data.account_number}
    `;
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${data.franchise_code}_profile.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const InfoField = ({ label, value }) => {
    let displayValue;

    if (typeof value === "boolean") {
      displayValue = value ? "Yes" : "No";
    } else {
      displayValue = value || "Not Provided";
    }

    return (
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-semibold text-text-main leading-tight">
          {displayValue}
        </p>
      </div>
    );
  };

  const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 pb-2 border-b border-border-subtle mb-4 mt-6 first:mt-0">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={16} />
      </div>
      <h3 className="text-xs font-bold text-text-main uppercase tracking-tighter">
        {title}
      </h3>
    </div>
  );

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Profile: ${data.franchise_code}`}
    >
      <div className="space-y-6 print:p-0" id="printable-area">
        <div className="bg-dashboard-bg p-6 rounded-2xl border border-border-subtle flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary text-black flex items-center justify-center rounded-xl text-xl font-black">
              {data.full_name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-main leading-none">
                {data.full_name}
              </h2>
              <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-wider">
                FRANCHISE CODE: {data.franchise_code}
              </p>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${data.is_active ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}
          >
            {data.is_active ? "Verified Active" : "Suspended"}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 px-2">
          <div className="md:col-span-2">
            <SectionHeader icon={User} title="1. Applicant Information" />
          </div>
          <InfoField label="Full Name" value={data.full_name} />
          <InfoField label="Contact Number" value={data.mobile_number} />
          <InfoField label="Email Address" value={data.email_id} />
          <InfoField label="Date of Birth" value={data.date_of_birth} />
          <div className="md:col-span-2">
            <InfoField label="Current Address" value={data.current_address} />
          </div>

          <div className="md:col-span-2">
            <SectionHeader icon={Briefcase} title="2. Business & Strategy" />
          </div>
          <InfoField label="Proposed Location" value={data.proposed_location} />
          <InfoField label="Ownership Type" value={data.ownership_type} />
          <InfoField label="Experience" value={data.prior_experience} />
          <InfoField
            label="Years Active"
            value={data.years_active + " Years"}
          />
          <div className="md:col-span-2">
            <InfoField
              label="Detailed Business Address"
              value={data.detailed_business_address}
            />
          </div>

          <div className="md:col-span-2">
            <SectionHeader icon={HardHat} title="3. Infrastructure" />
          </div>
          <InfoField
            label="Office Space"
            value={data.office_space_sqft + " sq.ft"}
          />
          <InfoField label="Office Ownership" value={data.office_ownership} />
          <InfoField
            label="Staff Count"
            value={data.staff_count + " members"}
          />
          <InfoField
            label="Internet/Systems"
            value={`${data.internet_availability ? "Internet Ready" : "No Internet"} | ${data.computer_laptop ? "PC Available" : "No PC"}`}
          />

          <div className="md:col-span-2">
            <SectionHeader icon={IndianRupee} title="4. Financial Records" />
          </div>
          <InfoField
            label="Investment Capacity"
            value={data.investment_capacity}
          />
          <InfoField label="Source of Funds" value={data.source_of_funds} />
          <InfoField label="Bank Name" value={data.bank_name} />
          <InfoField label="Account Number" value={data.account_number} />
          <InfoField
            label="Existing Loans"
            value={data.existing_loans ? "Yes" : "No"}
          />

          {data.existing_loans && (
            <InfoField
              label="Existing Loan Details"
              value={data.existing_loan_details}
            />
          )}

          <div className="md:col-span-2">
            <SectionHeader icon={Map} title="5. Territory & Docs" />
          </div>
          <InfoField
            label="Preferred Service Area"
            value={data.preferred_service_area}
          />
          <InfoField label="Landmark" value={data.nearby_landmark} />
          <div className="md:col-span-2 flex flex-wrap gap-2 mt-2">
            {[
              "ID Proof",
              "Address Proof",
              "Photos",
              "Business Reg",
              "Bank Statement",
            ].map((doc, i) => {
              const docKeys = [
                "doc_id_proof",
                "doc_address_proof",
                "doc_photographs",
                "doc_business_registration",
                "doc_bank_statement",
              ];
              const isDone = data[docKeys[i]];
              return (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg text-[10px] font-bold ${isDone ? "bg-dashboard-bg border-border-subtle text-text-muted" : "bg-red-500/5 border-red-500/10 text-red-500/50"}`}
                >
                  <CheckCircle
                    size={12}
                    className={isDone ? "text-green-500" : "text-text-muted/20"}
                  />{" "}
                  {doc}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-8 flex items-center justify-between border-t border-border-subtle print:hidden">
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="p-2 border border-border-subtle rounded-lg hover:bg-dashboard-bg text-text-muted transition-colors"
              title="Print Profile"
            >
              <Printer size={16} />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 border border-border-subtle rounded-lg hover:bg-dashboard-bg text-text-muted transition-colors"
              title="Download Summary"
            >
              <Download size={16} />
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-8 py-2 bg-text-main text-card-bg rounded-xl text-xs font-bold uppercase transition-transform active:scale-95"
          >
            Close Detail
          </button>
        </div>
      </div>
    </CommonModal>
  );
}
