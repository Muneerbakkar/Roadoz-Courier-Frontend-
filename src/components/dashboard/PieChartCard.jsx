import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function PieChartCard({ title, data, colors, isDonut = false, centerLabel }) {
  return (
    <Card className="bg-card-bg border-border-subtle h-full transition-colors duration-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-text-main">{title}</CardTitle>
        <div className="h-px bg-border-subtle w-full mt-2"></div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center min-h-[300px] relative">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={isDonut ? 60 : 0}
              outerRadius={100}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-main)' }}
              itemStyle={{ color: 'var(--text-main)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {isDonut && centerLabel && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-xl font-bold text-text-main">{centerLabel}</span>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-text-muted">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }}></div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
