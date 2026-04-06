import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Plus, Trash2 } from "lucide-react";

export function RateCalculator() {
    const [activeTab, setActiveTab] = useState("B2C");
    const [selectedMode, setSelectedMode] = useState("Cash On Delivery");
    const [boxes, setBoxes] = useState([{ id: 1, count: 1, length: "", breadth: "", height: "", volWeight: "", physicalWeight: "" }]);

    const addBox = () => {
        setBoxes([...boxes, { id: Date.now(), count: 1, length: "", breadth: "", height: "", volWeight: "", physicalWeight: "" }]);
    };

    const removeBox = (id) => {
        if (boxes.length > 1) {
            setBoxes(boxes.filter(box => box.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-text-main">Rate Calculator</h1>
                <p className="text-sm text-primary mt-1">
                    <Link
                        to="/"
                        className="hover:underline cursor-pointer"
                    >
                        Dashboard
                    </Link>
                    <span className="text-text-muted mx-1">&gt;&gt;</span> Rate Calculator
                </p>
            </div>

            <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex bg-dashboard-bg/50 rounded-md p-1 mb-6 border border-border-subtle">
                        <button
                            onClick={() => setActiveTab("B2C")}
                            className={cn(
                                "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                                activeTab === "B2C" ? "bg-card-bg text-primary shadow-sm" : "text-text-muted hover:text-text-main"
                            )}
                        >
                            B2C Rate Calculator
                        </button>
                        <button
                            onClick={() => setActiveTab("B2B")}
                            className={cn(
                                "flex-1 py-2 text-sm font-medium rounded-md transition-all",
                                activeTab === "B2B" ? "bg-card-bg text-primary shadow-sm" : "text-text-muted hover:text-text-main"
                            )}
                        >
                            B2B Rate Calculator
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Pickup Pincode:", placeholder: "Pickup Pincode" },
                            { label: "Delivery Pincode:", placeholder: "Delivery Pincode" },
                            { label: "Declared Value in INR:", placeholder: "Amount", prefix: "₹" },
                            { label: "Shipment Type:", type: "select", options: ["Forward", "Reverse"] }
                        ].map((field, i) => (
                            <div key={i} className="space-y-1.5">
                                <label className="text-sm font-medium text-text-main">{field.label}</label>
                                <div className="relative">
                                    {field.prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">{field.prefix}</span>}
                                    {field.type === "select" ? (
                                        <select className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
                                            {field.options.map(opt => <option key={opt}>{opt}</option>)}
                                        </select>
                                    ) : (
                                        <input type="text" placeholder={field.placeholder} className={cn("w-full bg-dashboard-bg border border-border-subtle rounded-md py-2 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted", field.prefix ? "pl-7 pr-3" : "px-3")} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-text-main mb-4">Mode:</h3>
                        <div className="flex flex-wrap items-center gap-8">
                            {["Cash On Delivery", "Prepaid", "To Pay"].map((mode) => (
                                <label key={mode} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="radio"
                                            name="mode"
                                            value={mode}
                                            checked={selectedMode === mode}
                                            onChange={(e) => setSelectedMode(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 transition-all duration-200",
                                            selectedMode === mode
                                                ? "border-primary bg-primary/10"
                                                : "border-border-subtle bg-dashboard-bg group-hover:border-primary/50"
                                        )} />
                                        {selectedMode === mode && (
                                            <div className="absolute w-2.5 h-2.5 rounded-full bg-primary animate-in fade-in zoom-in duration-200" />
                                        )}
                                    </div>
                                    <span className={cn(
                                        "text-sm transition-colors",
                                        selectedMode === mode ? "text-text-main font-semibold" : "text-text-muted group-hover:text-text-main"
                                    )}>
                                        {mode}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {activeTab === "B2C" ? (
                        <div className="mt-8 space-y-6">
                            <div className="flex items-center gap-3 cursor-pointer group w-fit">
                                <div className="relative flex items-center justify-center">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-5 h-5 border-2 border-border-subtle rounded bg-dashboard-bg peer-checked:bg-primary peer-checked:border-primary transition-all" />
                                    <svg className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <label className="text-sm font-medium text-text-main">Dimension:</label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-end">
                                {["Length", "Breadth", "Height"].map(p => (
                                    <input key={p} type="text" placeholder={p} className="bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary" />
                                ))}
                                <div className="bg-dashboard-bg/50 border border-border-subtle rounded-md px-3 py-2 text-sm text-text-muted flex items-center justify-center h-[38px]">Cm</div>
                                {["Weight", "Volumetric Weight"].map((label) => (
                                    <div key={label} className="space-y-1.5">
                                        <label className="text-xs text-text-muted block">
                                            {label}:
                                        </label>

                                        <div className="flex">
                                            <input
                                                type="text"
                                                className="w-full bg-dashboard-bg border border-border-subtle rounded-l-md px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
                                            />
                                            <span className="bg-dashboard-bg/50 border border-l-0 border-border-subtle rounded-r-md px-3 py-2 text-sm text-text-muted">
                                                Kg
                                            </span>
                                        </div>

                                        {label === "Volumetric Weight" && (
                                            <p className="text-[10px] text-text-muted mt-1">
                                                B2C Vol. Dividend (cm): 5000
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {[
                                    { label: "No Of Boxes *", type: "number", val: 1 },
                                    { label: "Total Weight", placeholder: "Total Weight" },
                                    { label: "Total Vol.Weight", placeholder: "Total Vol.Weight" },
                                    { label: "Chargeable Weight *", placeholder: "Chargeable Weight" },
                                    { label: "ROV", type: "select", options: ["Owner Risk", "Carrier Risk"] }
                                ].map((field, i) => (
                                    <div key={i} className="space-y-1.5">
                                        <label className="text-sm font-medium text-text-main">{field.label}</label>
                                        {field.type === "select" ? (
                                            <select className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
                                                {field.options.map(opt => <option key={opt}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <input type={field.type || "text"} placeholder={field.placeholder} defaultValue={field.val} className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-1.5 w-full md:w-1/4">
                                <label className="text-sm font-medium text-text-main">Appointment Delivery</label>
                                <select className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
                                    <option>No</option>
                                    <option>Yes</option>
                                </select>
                            </div>

                            <div className="space-y-4">
                                {boxes.map((box) => (
                                    <div key={box.id} className="flex flex-wrap items-end gap-4 p-4 border border-border-subtle rounded-lg bg-dashboard-bg/20">
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-text-muted">Count</label>
                                            <input type="number" defaultValue={1} className="w-20 bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main" />
                                        </div>
                                        {["Length (cm)*", "Breadth (cm)*", "Height (cm)*", "Vol. Weight(Kg)*", "Physical Weight(Kg)*"].map(label => (
                                            <div key={label} className="space-y-1.5 flex-1 min-w-[120px]">
                                                <label className="text-xs text-text-muted">{label}</label>
                                                <input type="text" className="w-full bg-card-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main placeholder:text-text-muted" />
                                            </div>
                                        ))}
                                        <Button onClick={() => removeBox(box.id)} className="bg-red-500 hover:bg-red-600 text-white h-10 px-4 rounded-md shadow-sm">
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                ))}
                                <Button onClick={addBox} className="bg-primary hover:bg-primary/90 text-black h-10 px-6 font-bold flex items-center gap-2 shadow-sm">
                                    <Plus size={16} /> Add New
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 border-t border-border-subtle pt-8">
                        <Button className="bg-primary hover:bg-primary/90 text-black h-11 px-12 font-bold text-base shadow-md">
                            Calculate Rates
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}