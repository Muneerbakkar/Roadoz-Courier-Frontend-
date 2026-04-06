import React, { useState, useRef,useEffect } from "react";
import { Link } from "react-router-dom";
import {
    User, Mail, Phone, MapPin, Camera,
    CheckCircle, Shield, Lock, ChevronRight,
    X, RotateCcw, Save
} from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { BackButton } from "../components/ui/BackButton";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "../components/ui/Loader";

export function Profile() {
    const [isLoading, setIsLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

     useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(timer);
    }, []);

     if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader /> 
        </div>
      );
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.startsWith("image/")) return;

            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };


    return (
        <div className="space-y-6 pb-10">
            <BackButton />
            <div className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-2xl font-bold text-text-main">Profile</h1>

                <p className="text-sm text-primary mt-1 font-medium">
                    <Link
                        to="/"
                        className="hover:underline cursor-pointer"
                    >
                        Dashboard
                    </Link>

                    <span className="text-text-muted mx-1">&gt;&gt;</span>
                    Profile
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 xl:col-span-3">
                    <Card className="bg-card-bg border-none shadow-sm overflow-hidden sticky top-24">
                        <CardContent className="p-8 flex flex-col items-center text-center">
                            <div className="relative mb-6">

                                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <User size={64} className="text-primary opacity-40" />
                                    )}
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-black rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-4 border-card-bg"
                                >
                                    <Camera size={18} />
                                </button>

                            </div>

                            <h2 className="text-xl font-bold text-text-main mb-1">Roadoz</h2>
                            <p className="text-sm text-text-muted font-medium mb-6 uppercase tracking-wider">Administrator</p>

                            <div className="w-full h-px bg-border-subtle mb-6"></div>

                            <div className="w-full space-y-4">
                                <div className="flex items-center justify-center gap-3 text-sm text-text-muted">
                                    <Mail size={16} className="text-primary" />
                                    <span>roadoz@example.com</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-sm font-bold text-green-500 bg-green-500/10 py-2 rounded-lg">
                                    <CheckCircle size={16} />
                                    <span>Account Verified</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                    <Card className="bg-card-bg border-none shadow-sm">
                        <div className="p-6 border-b border-border-subtle flex items-center justify-between">
                            <h3 className="text-lg font-bold text-text-main">Profile Information</h3>
                            <Button className="bg-primary text-black hover:bg-primary/90 font-bold h-9 px-6 text-xs uppercase tracking-wider" onClick={() => setIsEditModalOpen(true)}>
                                Edit Profile
                            </Button>
                        </div>
                        <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-50">
                                            <User size={18} />
                                        </div>
                                        <div className="w-full bg-dashboard-bg border border-border-subtle rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-text-main/80">
                                            Roadoz
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-50">
                                            <Mail size={18} />
                                        </div>
                                        <div className="w-full bg-dashboard-bg border border-border-subtle rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-text-main/80">
                                            samshtech@example.com
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Contact Number</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-50">
                                            <Phone size={18} />
                                        </div>
                                        <div className="w-full bg-dashboard-bg border border-border-subtle rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-text-main/80">
                                            +91 98765 43210
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Location</label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-50">
                                            <MapPin size={18} />
                                        </div>
                                        <div className="w-full bg-dashboard-bg border border-border-subtle rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-text-main/80">
                                            Mumbai, India
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                                    <Shield size={14} className="text-primary" />
                                    Account Security
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-2xl border border-border-subtle bg-dashboard-bg group hover:border-primary/30 transition-colors">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                                <Lock size={20} />
                                            </div>
                                        </div>
                                        <h5 className="font-bold text-text-main mb-1">Change Password</h5>
                                        <p className="text-xs text-text-muted mb-4">Last changed 3 months ago</p>
                                        <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                            Manage Security Settings <ChevronRight size={12} />
                                        </button>
                                    </div>

                                    <div className="p-6 rounded-2xl border border-border-subtle bg-dashboard-bg group hover:border-primary/30 transition-colors">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                                                <Shield size={20} />
                                            </div>
                                            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md uppercase tracking-wider">Enabled</span>
                                        </div>
                                        <h5 className="font-bold text-text-main mb-1">Two-Factor Auth</h5>
                                        <p className="text-xs text-text-muted mb-4">Status: <span className="text-green-500 font-bold">Enabled</span></p>
                                        <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                            Update Preferences <ChevronRight size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card-bg rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-border-subtle flex flex-col max-h-[90vh]"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-border-subtle bg-dashboard-bg/20">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/20 rounded-lg">
                                        <User className="text-primary" size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-text-main">Edit Profile Details</h3>
                                </div>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-dashboard-bg rounded-full transition-colors text-text-muted">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar bg-card-bg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { label: "Full Name *", placeholder: "Roadoz Logistics", icon: User },
                                        { label: "Email Address *", placeholder: "samshtech@example.com", icon: Mail },
                                        { label: "Contact Number *", placeholder: "+91 98765 43210", icon: Phone },
                                        { label: "Location", placeholder: "Mumbai, India", icon: MapPin },
                                    ].map((field, i) => (
                                        <div key={i} className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-text-muted uppercase tracking-widest ml-1">{field.label}</label>
                                            <div className="relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted opacity-50">
                                                    <field.icon size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder={field.placeholder}
                                                    className="w-full bg-dashboard-bg border border-border-subtle rounded-xl pl-12 pr-4 py-3 text-sm text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-3 p-6 border-t border-border-subtle bg-dashboard-bg/50">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-2 text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                >
                                    <RotateCcw size={14} /> Cancel
                                </button>
                                <Button className="bg-primary text-black h-11 px-10 font-bold rounded-xl shadow-lg active:scale-95 transition-all flex items-center gap-2">
                                    <Save size={18} /> Save Changes
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
