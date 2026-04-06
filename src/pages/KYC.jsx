import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, Landmark, Building2, UserCircle, FileCheck, Clock } from "lucide-react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

export function KYC() {
    const [activeTab, setActiveTab] = useState("Domestic");

    const DisabledInput = ({ label, placeholder, subtext }) => (
        <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                disabled
                className="w-full bg-dashboard-bg/50 border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-main cursor-not-allowed opacity-80"
            />
            {subtext && <p className="text-[10px] text-text-muted italic">{subtext}</p>}
        </div>
    );

    const DisabledFileUpload = ({ label }) => (
        <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{label}</label>
            <div className="flex items-center border border-border-subtle rounded-md overflow-hidden bg-dashboard-bg/30">
                <div className="bg-dashboard-bg border-r border-border-subtle px-4 py-2.5 text-xs font-bold text-text-muted cursor-not-allowed">
                    No File
                </div>
                <span className="px-4 py-2.5 text-xs text-text-muted italic">Documents locked during review</span>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 pb-10">
            <div>
                <h1 className="text-2xl font-bold text-text-main">KYC Settings</h1>
                <p className="text-sm text-primary mt-1 font-medium">
                    <Link
                        to="/"
                        className="hover:underline cursor-pointer"
                    >
                        Dashboard
                    </Link>
                    <span className="text-text-muted mx-1">&gt;&gt;</span> KYC Settings
                </p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 flex items-start gap-4 shadow-sm">
                <div className="bg-orange-500 p-2 rounded-lg">
                    <Clock className="text-white" size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-orange-500">KYC Under Review</h4>
                    <p className="text-xs text-text-main mt-0.5 opacity-80">
                        Your verification documents are currently being processed by our compliance team. Editing is disabled until approval.
                    </p>
                </div>
            </div>

            <div className="flex bg-dashboard-bg p-1 rounded-xl border border-border-subtle w-fit">
                {["Domestic", "International"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-8 py-2.5 text-xs font-bold rounded-lg transition-all",
                            activeTab === tab
                                ? "bg-primary text-black shadow-lg"
                                : "text-text-muted hover:text-text-main"
                        )}
                    >
                        {tab} KYC
                    </button>
                ))}
            </div>

            <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
                <CardContent className="p-6 md:p-10">
                    <div className="mb-10 border-b border-border-subtle pb-6">
                        <h2 className="text-2xl font-bold text-text-main flex items-center gap-3">
                            <FileCheck className="text-primary" size={28} />
                            Verification Details — {activeTab}
                        </h2>
                        <p className="text-sm text-text-muted mt-1">Review your submitted business and personal identification.</p>
                    </div>

                    <div className="space-y-16">
                        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="lg:col-span-1 space-y-1">
                                <div className="flex items-center gap-2 text-primary">
                                    <Landmark size={18} />
                                    <h3 className="text-sm font-bold uppercase tracking-widest">Bank Details</h3>
                                </div>
                                <p className="text-xs text-text-muted">Settlement account info</p>
                            </div>
                            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DisabledInput label="Beneficiary Name" placeholder="Verified Name" />
                                <DisabledInput label="Account Type" placeholder="Current / Savings" />
                                <DisabledInput label="Bank Account Number" placeholder="XXXX XXXX XXXX" />
                                <DisabledInput label="IFSC Code" placeholder="BANK0001234" />
                                <div className="md:col-span-2">
                                    <DisabledFileUpload label="Cancelled Cheque Copy" />
                                </div>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="lg:col-span-1 space-y-1">
                                <div className="flex items-center gap-2 text-primary">
                                    <Building2 size={18} />
                                    <h3 className="text-sm font-bold uppercase tracking-widest">Business Info</h3>
                                </div>
                                <p className="text-xs text-text-muted">Legal entity registration</p>
                            </div>
                            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <DisabledInput label="Registered Company Name" placeholder="Legal Entity Name" />
                                </div>
                                <DisabledInput label="CIN / Registration No." placeholder="U12345AB2023..." />
                                <DisabledInput label="GST Number" placeholder="27AAAAA0000A1Z5" />
                                <DisabledInput label="City" placeholder="Business City" />
                                <DisabledInput label="State" placeholder="Business State" />
                                <DisabledInput label="Pincode" placeholder="XXXXXX" />
                                <div className="md:col-span-2">
                                    <DisabledFileUpload label="GST Certificate" />
                                </div>
                            </div>
                        </section>

                        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="lg:col-span-1 space-y-1">
                                <div className="flex items-center gap-2 text-primary">
                                    <UserCircle size={18} />
                                    <h3 className="text-sm font-bold uppercase tracking-widest">Personal Identification</h3>
                                </div>
                                <p className="text-xs text-text-muted">Owner/Director identity</p>
                            </div>
                            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <DisabledInput label="Authorized Person Full Name" placeholder="Full Name as per PAN" />
                                </div>
                                <div className="md:col-span-2">
                                    <DisabledInput label="Residential Address" placeholder="Permanent Address" />
                                </div>
                                <DisabledInput label="Aadhar Card Number" placeholder="XXXX XXXX XXXX" />
                                <DisabledInput label="PAN Card Number" placeholder="ABCDE1234F" />
                                <DisabledFileUpload label="Aadhar Card (Front)" />
                                <DisabledFileUpload label="Aadhar Card (Back)" />
                                <div className="md:col-span-2">
                                    <DisabledFileUpload label="PAN Card Photo" />
                                </div>
                            </div>
                        </section>

                        <div className="flex items-center justify-end pt-10 border-t border-border-subtle">
                            <button className="bg-orange-500/20 text-orange-500 border border-orange-500/30 h-11 px-6 text-sm font-bold rounded-lg shadow-sm cursor-not-allowed flex items-center gap-2 transition-opacity hover:opacity-80">
                                <Clock size={16} />
                                Status: Under Review
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}