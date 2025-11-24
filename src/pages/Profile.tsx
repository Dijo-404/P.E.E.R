import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SyncStatusRing } from "@/components/SyncStatusRing";
import { StreakWidget } from "@/components/StreakWidget";
import { DataSaverToggle } from "@/components/DataSaverToggle";
import { 
  Settings, 
  BookOpen, 
  Award, 
  Download, 
  LogOut, 
  Bell,
  Globe
} from "lucide-react";

const Profile = () => {
  const [dataSaverMode, setDataSaverMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const stats = [
    { label: "Lessons Completed", value: "24", icon: BookOpen },
    { label: "Achievements", value: "8", icon: Award },
    { label: "Downloaded", value: "12", icon: Download },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center space-y-4 py-6">
          <SyncStatusRing status="synced" size={100} />
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-foreground">Priya M.</h2>
            <p className="text-sm text-muted-foreground">Class 10, Mathematics</p>
            <p className="text-xs text-muted-foreground">priya@example.com</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-4 text-center space-y-2">
              <stat.icon className="h-6 w-6 mx-auto text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Streak Widget */}
        <StreakWidget days={7} />

        {/* Settings */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Settings</h3>
          
          <Card className="p-4 space-y-4">
            <DataSaverToggle enabled={dataSaverMode} onToggle={setDataSaverMode} />
            
            <div className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium text-foreground">Notifications</Label>
                  <p className="text-xs text-muted-foreground">Daily reminders and updates</p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                aria-label="Toggle notifications"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border cursor-pointer hover:bg-secondary/50 transition-colors">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Language</p>
                  <p className="text-xs text-muted-foreground">English</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Change
              </Button>
            </div>
          </Card>
        </section>

        {/* Account Actions */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Account</h3>
          <Card className="p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                // TODO: Implement settings page
              }}
            >
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                if (confirm("Are you sure you want to log out?")) {
                  // TODO: Implement logout
                  console.log("Logout");
                }
              }}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Log Out
            </Button>
          </Card>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;

