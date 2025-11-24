import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download } from "lucide-react";

interface ContinueLearningCardProps {
  title: string;
  progress: number;
  isOffline?: boolean;
  onContinue?: () => void;
}

export const ContinueLearningCard = ({ 
  title, 
  progress, 
  isOffline = false,
  onContinue
}: ContinueLearningCardProps) => {
  return (
    <Card className="p-6 space-y-4 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {progress}% Complete {isOffline && "• Downloaded"}
          </p>
        </div>
        {isOffline && (
          <div className="p-2 rounded-full bg-primary/10">
            <Download className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>

      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Button 
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        size="lg"
        onClick={onContinue}
        aria-label={`Continue learning ${title}`}
      >
        <Play className="h-5 w-5 mr-2" />
        Continue Learning
      </Button>
    </Card>
  );
};
