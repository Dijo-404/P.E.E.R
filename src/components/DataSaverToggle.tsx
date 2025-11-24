import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Wifi, WifiOff } from "lucide-react";

interface DataSaverToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const DataSaverToggle = ({ enabled, onToggle }: DataSaverToggleProps) => {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-card border border-border">
      {enabled ? (
        <WifiOff className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
      ) : (
        <Wifi className="h-5 w-5 text-primary" aria-hidden="true" />
      )}
      <div className="flex-1">
        <Label htmlFor="data-saver" className="text-sm font-medium text-foreground">
          Data Saver Mode
        </Label>
        <p className="text-xs text-muted-foreground" role="status" aria-live="polite">
          {enabled ? "Low bandwidth - text & audio only" : "Full HD media"}
        </p>
      </div>
      <Switch
        id="data-saver"
        checked={enabled}
        onCheckedChange={onToggle}
        aria-label={enabled ? "Disable data saver mode" : "Enable data saver mode"}
      />
    </div>
  );
};
