import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";

export function ServiceablePincode() {
  return (
    <div className="space-y-6">
      <div>
        <div>
          <h1 className="text-2xl font-bold text-text-main">Serviceable Pincode</h1>
          <p className="text-sm text-primary mt-1">
            <Link
              to="/"
              className="hover:underline cursor-pointer"
            >
              Dashboard
            </Link>
            <span className="text-text-muted mx-1">&gt;&gt;</span> Serviceable Pincode
          </p>
        </div>
      </div>

      <Card className="bg-card-bg border-border-subtle shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-text-main mb-6">Serviceable Pincode</h2>
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1 space-y-1.5 w-full">
              <label className="text-sm font-medium text-text-main">From Pincode</label>
              <input
                type="text"
                placeholder="From Pincode"
                className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex-1 space-y-1.5 w-full">
              <label className="text-sm font-medium text-text-main">To Pincode</label>
              <input
                type="text"
                placeholder="To Pincode"
                className="w-full bg-dashboard-bg border border-border-subtle rounded-md px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-black h-10 px-6 font-bold flex items-center gap-2">
              <Search size={18} />
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}