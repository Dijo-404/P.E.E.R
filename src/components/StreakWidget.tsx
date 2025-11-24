import { Card } from "@/components/ui/card";
import streakFlame from "@/assets/streak-flame.png";

interface StreakWidgetProps {
  days: number;
}

export const StreakWidget = ({ days }: StreakWidgetProps) => {
  return (
    <Card className="p-4 flex items-center space-x-4 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
      <div className="relative">
        <img src={streakFlame} alt="Learning streak flame" className="h-12 w-12 animate-pulse" />
        <div
          className="absolute -top-1 -right-1 bg-accent text-accent-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold"
          aria-label={`${days} day streak`}
        >
          {days}
        </div>
      </div>
      <div>
        <p className="font-bold text-lg text-foreground">
          <span aria-label={`${days} day streak`}>{days} Day Streak!</span>
        </p>
        <p className="text-sm text-muted-foreground">Keep it going</p>
      </div>
    </Card>
  );
};
