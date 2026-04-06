import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";

export function StatCard({ title, value, description, icon, iconBgColor }) {
  return (
    <Card className="bg-card-bg border-border-subtle transition-colors duration-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
              {title}
            </p>
            <h3 className="text-3xl font-bold text-text-main mb-2">{value}</h3>
            <p className="text-xs text-text-muted/60 leading-relaxed">
              {description}
            </p>
          </div>
          <div className={cn("p-3 rounded-lg flex items-center justify-center", iconBgColor)}>
            <div className="text-white">
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
