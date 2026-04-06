import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Upload, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function GeneralDetails() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">General Details</h1>
        <p className="text-sm text-primary mt-1 font-medium">
          <Link
            to="/"
            className="hover:underline cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-text-muted mx-1">&gt;&gt;</span> General Details
        </p>
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-lg font-semibold text-text-main mb-8 border-b border-border-subtle pb-4">
            Profile Settings
          </h2>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-32 h-32 bg-dashboard-bg/50 rounded-lg border border-border-subtle flex items-center justify-center overflow-hidden p-2">
                <img
                  src="https://picsum.photos/seed/logo/200/200"
                  alt="Logo"
                  className="max-w-full max-h-full object-contain rounded"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-3 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex items-center gap-3">
                  <Button className="bg-primary hover:bg-primary/90 text-black h-9 px-6 text-xs font-bold rounded-md shadow-sm flex items-center gap-2">
                    <Upload size={14} /> Upload New Logo
                  </Button>
                  <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 h-9 px-6 text-xs font-bold rounded-md">
                    Reset
                  </Button>
                </div>
                <p className="text-xs text-text-muted">Allowed JPG, GIF or PNG. Max size of 800kB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Business Name</label>
                <input
                  type="text"
                  defaultValue="Samshtech Technologies"
                  className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">E-mail Address</label>
                <input
                  type="email"
                  defaultValue="testuser@gmail.com"
                  className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Mobile Number</label>
                <input
                  type="text"
                  placeholder="Enter mobile no"
                  className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Order Report Email(s)</label>
                <input
                  type="text"
                  placeholder="Emails separated by comma"
                  className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-border-subtle mt-4">
              <Button className="bg-primary hover:bg-primary/90 text-black h-10 px-10 font-bold rounded-md shadow-md active:scale-95 transition-all">
                Save Changes
              </Button>
              <button className="text-sm font-bold text-primary flex items-center gap-1 px-4 hover:underline">
                <RotateCcw size={14} /> Cancel
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}