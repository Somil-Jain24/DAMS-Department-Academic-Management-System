import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "default" | "success" | "warning" | "info" | "accent";
  delay?: number;
}

const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = "default", delay = 0 }: StatCardProps) => {
  const colorStyles = {
    default: {
      icon: "bg-primary/10 text-primary",
      trend: "text-muted-foreground",
    },
    success: {
      icon: "bg-green-100 text-green-600",
      trend: "text-green-600",
    },
    warning: {
      icon: "bg-amber-100 text-amber-600",
      trend: "text-amber-600",
    },
    info: {
      icon: "bg-blue-100 text-blue-600",
      trend: "text-blue-600",
    },
    accent: {
      icon: "bg-amber-100 text-amber-600",
      trend: "text-amber-600",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card variant="stat" className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">{value}</p>
                {trend && (
                  <span className={cn("text-sm font-medium", colorStyles[color].trend)}>
                    {trend.isPositive ? "+" : ""}{trend.value}%
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className={cn("rounded-xl p-3", colorStyles[color].icon)}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
