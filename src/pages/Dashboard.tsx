import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SyncStatusRing } from "@/components/SyncStatusRing";
import { DataSaverToggle } from "@/components/DataSaverToggle";
import { ContinueLearningCard } from "@/components/ContinueLearningCard";
import { StreakWidget } from "@/components/StreakWidget";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Brain, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dataSaverMode, setDataSaverMode] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">EduBridge</h1>
          <DataSaverToggle enabled={dataSaverMode} onToggle={setDataSaverMode} />
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* User Profile with Sync Ring */}
        <div className="flex flex-col items-center space-y-4 py-6">
          <SyncStatusRing status="synced" size={100} />
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-foreground">Welcome back, Priya!</h2>
            <p className="text-sm text-muted-foreground">Class 10, Mathematics</p>
          </div>
        </div>

        {/* Continue Learning */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Continue Learning</h3>
          <ContinueLearningCard
            title="Quadratic Equations - Chapter 4"
            progress={67}
            isOffline={dataSaverMode}
            onContinue={() => navigate("/learning")}
          />
        </section>

        {/* Streak Widget */}
        <section>
          <StreakWidget days={7} />
        </section>

        {/* Quick Actions */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className="p-4 flex flex-col items-center space-y-2 cursor-pointer hover:border-primary transition-colors active:scale-95"
              onClick={() => {
                navigate("/learning");
                toast({
                  title: "AI Doubt Solver",
                  description: "Open the learning page and tap the AI button to ask questions",
                });
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate("/learning");
                }
              }}
              aria-label="Open AI Doubt Solver"
            >
              <div className="p-3 rounded-full bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-center text-foreground">AI Doubt Solver</p>
            </Card>
            <Card 
              className="p-4 flex flex-col items-center space-y-2 cursor-pointer hover:border-primary transition-colors active:scale-95"
              onClick={() => {
                toast({
                  title: "Download Lessons",
                  description: dataSaverMode 
                    ? "Downloading lessons for offline access..." 
                    : "Enable Data Saver mode to download lessons for offline use",
                });
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toast({
                    title: "Download Lessons",
                    description: dataSaverMode 
                      ? "Downloading lessons for offline access..." 
                      : "Enable Data Saver mode to download lessons for offline use",
                  });
                }
              }}
              aria-label="Download lessons for offline access"
            >
              <div className="p-3 rounded-full bg-accent/10">
                <Download className="h-6 w-6 text-accent" />
              </div>
              <p className="text-sm font-medium text-center text-foreground">Download Lessons</p>
            </Card>
          </div>
        </section>

        {/* Leaderboard Preview */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Your Progress</h3>
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Week</span>
              <span className="text-sm font-semibold text-primary" role="status">Rank #12</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">Lessons Completed</span>
                <span className="font-semibold text-foreground">8/10</span>
              </div>
              <div 
                className="w-full bg-secondary rounded-full h-2" 
                role="progressbar" 
                aria-valuenow={80} 
                aria-valuemin={0} 
                aria-valuemax={100}
                aria-label="Lessons completed this week"
              >
                <div className="bg-primary h-2 rounded-full w-4/5 transition-all duration-500" />
              </div>
            </div>
          </Card>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
