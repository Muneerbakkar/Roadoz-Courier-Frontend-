import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { RotateCcw, Image as ImageIcon, Check } from "lucide-react";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

export function LabelSetting() {
  const [options, setOptions] = useState({
    orderValue: true,
    codAmount: true,
    buyerMobile: true,
    shipperMobile: true,
    shipperAddress: true,
    productName: true,
    servicesTC: true,
  });

  const [labelType, setLabelType] = useState("Thermal");

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const displayOptions = [
    { id: "orderValue", label: "Order value on labels", desc: "Shows order value in COD & Prepaid orders." },
    { id: "codAmount", label: "COD amount on label", desc: "Displays COD amount on the label." },
    { id: "buyerMobile", label: "Buyer mobile number", desc: "Shows buyer phone number on the label." },
    { id: "shipperMobile", label: "Shipper mobile numbers", desc: "Shows shipper mobile & alternate mobile numbers." },
    { id: "shipperAddress", label: "Shipper address", desc: "Displays shipper address on the label." },
    { id: "productName", label: "Product name", desc: "Shows product name on the label." },
    { id: "servicesTC", label: "Services T&C", desc: "Shows services T&C on the label." },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Label Setting</h1>
        <p className="text-sm text-primary mt-1 font-medium">
          <Link
            to="/"
            className="hover:underline cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-text-muted mx-1">&gt;&gt;</span> Label Setting
        </p>
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-8 border-b border-border-subtle pb-4">
            <h2 className="text-lg font-semibold text-text-main">Configuration</h2>
            <span className="text-xs text-text-muted hidden sm:block">Customize what appears on your shipping labels</span>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">Branding</h3>
              <div className="flex flex-col md:flex-row items-center gap-8 p-6 border border-border-subtle rounded-xl bg-dashboard-bg/30">
                <div className="flex-1 space-y-4 w-full">
                  <div>
                    <label className="text-sm font-bold text-text-main block mb-1">Label Logo</label>
                    <p className="text-xs text-text-muted mb-4">Recommended: PNG/WebP with transparent background (Max 800kB)</p>
                    <div className="flex items-center border border-border-subtle rounded-lg overflow-hidden bg-dashboard-bg">
                      <label className="bg-primary px-4 py-2 text-xs font-bold text-black cursor-pointer hover:bg-primary/90 transition-colors border-r border-border-subtle">
                        Choose File
                        <input type="file" className="hidden" />
                      </label>
                      <span className="px-4 py-2 text-xs text-text-muted italic">No file selected</span>
                    </div>
                  </div>
                </div>
                <div className="w-40 h-28 bg-dashboard-bg border border-dashed border-border-subtle rounded-xl flex flex-col items-center justify-center text-text-muted gap-2">
                  <ImageIcon size={24} className="opacity-20" />
                  <span className="text-[10px] font-bold uppercase tracking-tighter opacity-40">Preview Area</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">Display Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayOptions.map((option) => (
                  <div key={option.id} className="flex items-center justify-between p-4 border border-border-subtle rounded-xl bg-dashboard-bg/20 hover:border-primary/30 transition-all group">
                    <div className="pr-4">
                      <h4 className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">{option.label}</h4>
                      <p className="text-[11px] text-text-muted leading-tight mt-1">{option.desc}</p>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                      <button
                        onClick={() => toggleOption(option.id)}
                        className={cn(
                          "relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none",
                          options[option.id] ? "bg-green-500" : "bg-dashboard-bg border border-border-subtle"
                        )}
                      >
                        <span className={cn(
                          "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-md",
                          options[option.id] ? "translate-x-5.5" : "translate-x-1"
                        )} />
                      </button>
                      <span className={cn("text-[9px] font-bold uppercase", options[option.id] ? "text-green-500" : "text-text-muted")}>
                        {options[option.id] ? "Active" : "Hidden"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest">Printer Type</h3>
              <div className="p-6 border border-border-subtle rounded-xl bg-dashboard-bg/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-text-main">Label Format</h4>
                    <p className="text-xs text-text-muted mt-1">Choose A4 for standard desktop printers or Thermal for 4x6 rolls.</p>
                  </div>
                  <div className="flex bg-dashboard-bg p-1 rounded-xl border border-border-subtle w-fit">
                    {["A4", "Thermal"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setLabelType(type)}
                        className={cn(
                          "px-8 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2",
                          labelType === type
                            ? "bg-primary text-black shadow-lg"
                            : "text-text-muted hover:text-text-main"
                        )}
                      >
                        {labelType === type && <Check size={14} />}
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-8 border-t border-border-subtle mt-6">
              <button className="text-sm font-bold text-primary flex items-center gap-1 px-6 hover:underline">
                <RotateCcw size={14} /> Reset to Defaults
              </button>
              <Button className="bg-primary hover:bg-primary/90 text-black h-11 px-12 font-bold rounded-md shadow-lg active:scale-95 transition-all">
                Save Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}