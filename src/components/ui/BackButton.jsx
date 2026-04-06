import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";

export function BackButton({ className = "" }) {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 
        text-text-muted hover:text-text-main 
        hover:bg-dashboard-bg 
        border border-transparent hover:border-border-subtle
        px-3 py-1.5 h-auto font-medium rounded-lg 
        transition-all ${className}`}
    >
      <ArrowLeft size={16} />
      <span>Back</span>
    </Button>
  );
}