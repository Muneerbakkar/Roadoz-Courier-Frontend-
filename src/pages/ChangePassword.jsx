import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Eye, EyeOff, RotateCcw, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function ChangePassword() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRetype, setShowRetype] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-main">Change Password</h1>
        <p className="text-sm text-primary mt-1 font-medium">
          <Link
            to="/"
            className="hover:underline cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="text-text-muted mx-1">&gt;&gt;</span> Change Password
        </p>
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-lg font-semibold text-text-main mb-8 border-b border-border-subtle pb-4">
            Security Settings
          </h2>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Old Password</label>
                <div className="relative">
                  <input
                    type={showOld ? "text" : "password"}
                    placeholder="Enter current password"
                    className="w-full bg-dashboard-bg border border-border-subtle rounded-md pl-4 pr-10 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                  >
                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="hidden md:block"></div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    placeholder="Enter new password"
                    className="w-full bg-dashboard-bg border border-border-subtle rounded-md pl-4 pr-10 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                  >
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showRetype ? "text" : "password"}
                    placeholder="Retype new password"
                    className="w-full bg-dashboard-bg border border-border-subtle rounded-md pl-4 pr-10 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRetype(!showRetype)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                  >
                    {showRetype ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-border-subtle mt-4">
              <Button className="bg-primary hover:bg-primary/90 text-black h-10 px-10 font-bold rounded-md shadow-md active:scale-95 transition-all flex items-center gap-2">
                <Lock size={16} /> Update Password
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