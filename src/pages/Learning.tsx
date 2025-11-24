import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ContentSlider } from "@/components/ContentSlider";
import { BottomNav } from "@/components/BottomNav";
import { VoiceInputIcon } from "@/components/VoiceInputIcon";
import { Brain, ChevronLeft, Bookmark, Share2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type ContentMode = "text" | "audio" | "video";

const Learning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contentMode, setContentMode] = useState<ContentMode>("audio");
  const [showDoubtBox, setShowDoubtBox] = useState(false);
  const [doubtText, setDoubtText] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">Chapter 4: Quadratic Equations</h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => toast({
                title: "Bookmarked",
                description: "Chapter saved to your bookmarks",
              })}
              aria-label="Bookmark chapter"
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Chapter 4: Quadratic Equations",
                    text: "Check out this chapter on EduBridge",
                    url: window.location.href,
                  }).catch(() => {
                    toast({
                      title: "Share cancelled",
                      description: "The share was cancelled",
                    });
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link copied",
                    description: "Chapter link copied to clipboard",
                  });
                }
              }}
              aria-label="Share chapter"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Lesson 3 of 5</span>
            <span className="text-primary font-semibold" role="status" aria-live="polite">67% Complete</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2" role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100} aria-label="Lesson progress">
            <div className="bg-primary h-2 rounded-full w-2/3 transition-all duration-500" />
          </div>
        </div>

        {/* Content Area */}
        <Card className="p-6 space-y-4">
          {contentMode === "text" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Solving by Factorization</h2>
              <p className="text-foreground leading-relaxed">
                A quadratic equation can be solved by factorizing the left-hand side into two linear factors.
                Let's understand this with an example:
              </p>
              <div className="bg-secondary/30 p-4 rounded-lg font-mono text-sm">
                x² - 5x + 6 = 0<br />
                (x - 2)(x - 3) = 0<br />
                Therefore, x = 2 or x = 3
              </div>
              <p className="text-foreground leading-relaxed">
                This method works when the quadratic expression can be easily factored. The key is to find
                two numbers that multiply to give the constant term and add up to give the coefficient of x.
              </p>
            </div>
          )}

          {contentMode === "audio" && (
            <div className="space-y-4">
              <div className="bg-primary/5 p-6 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex justify-center items-end space-x-2 h-16">
                    {[1, 2, 3, 4, 5].map((i) => {
                      const heights = [24, 32, 40, 32, 24];
                      return (
                        <div
                          key={i}
                          className="w-2 bg-primary rounded-full animate-pulse"
                          style={{
                            height: `${heights[i - 1]}px`,
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: "1.5s",
                          }}
                        />
                      );
                    })}
                  </div>
                  <p className="text-lg font-semibold text-foreground">Audio Playing...</p>
                  <p className="text-sm text-muted-foreground" role="timer" aria-live="polite">2:34 / 8:15</p>
                </div>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg">
                <p className="text-sm text-foreground italic">
                  "Let's look at how we can solve quadratic equations using factorization method..."
                </p>
              </div>
            </div>
          )}

          {contentMode === "video" && (
            <div className="space-y-4">
              <div className="bg-primary/5 aspect-video rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto">
                    <span className="text-3xl">▶</span>
                  </div>
                  <p className="text-lg font-semibold text-foreground">Video: Factorization Method</p>
                  <p className="text-sm text-muted-foreground">HD Quality • 8:15</p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Content Mode Slider */}
        <ContentSlider onModeChange={setContentMode} />

        {/* AI Doubt Button (FAB) */}
        <Button
          size="lg"
          className="fixed bottom-24 right-4 rounded-full h-14 w-14 shadow-lg bg-accent hover:bg-accent/90 z-50"
          onClick={() => setShowDoubtBox(!showDoubtBox)}
        >
          <Brain className="h-6 w-6" />
        </Button>

        {/* Doubt Box Overlay */}
        {showDoubtBox && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end">
            <Card className="w-full max-w-lg mx-auto mb-20 p-6 space-y-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-foreground">AI Doubt Solver</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowDoubtBox(false)}
                  aria-label="Close doubt solver"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Paused at: Factorization Method (2:34)
              </p>
              <div className="space-y-2">
                <div className="relative">
                  <textarea
                    value={doubtText}
                    onChange={(e) => setDoubtText(e.target.value)}
                    className="w-full min-h-[100px] p-3 pr-12 rounded-lg border border-border bg-background text-foreground resize-none"
                    placeholder="Type your doubt here or use voice..."
                  />
                  <div className="absolute bottom-2 right-2">
                    <VoiceInputIcon 
                      onTranscript={(text) => setDoubtText(prev => prev + " " + text)}
                      language="en"
                    />
                  </div>
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    if (!doubtText.trim()) {
                      toast({
                        title: "Empty question",
                        description: "Please enter your doubt before asking",
                        variant: "destructive",
                      });
                      return;
                    }
                    toast({
                      title: "Processing your question",
                      description: "AI is analyzing your doubt...",
                    });
                    // TODO: Implement actual AI doubt solver integration
                  }}
                  disabled={!doubtText.trim()}
                >
                  Ask AI
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Learning;
