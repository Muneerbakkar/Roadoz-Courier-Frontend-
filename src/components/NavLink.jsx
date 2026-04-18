import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "../lib/utils";

export function NavLink({
  to,
  children,
  icon,
  className,
  hideText,
  end = false,   
  ...props       
}) {
  return (
    <RouterNavLink
      to={to}
      end={end}   
      {...props} 
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-sm font-medium transition-all rounded-lg mx-2",
          hideText ? "justify-center gap-0" : "gap-3",
          isActive
            ? "bg-primary text-black"
            : "text-text-muted hover:bg-text-muted/5 hover:text-text-main",
          className
        )
      }
    >
      {icon && <span className="w-5 h-5 flex-shrink-0">{icon}</span>}
      {!hideText && (
        <span className="animate-in fade-in duration-300">
          {children}
        </span>
      )}
    </RouterNavLink>
  );
}
