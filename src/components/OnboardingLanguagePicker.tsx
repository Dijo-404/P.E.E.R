import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VoiceInputIcon } from "@/components/VoiceInputIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
];

interface OnboardingLanguagePickerProps {
  onLanguageSelect: (language: string) => void;
}

export const OnboardingLanguagePicker = ({ onLanguageSelect }: OnboardingLanguagePickerProps) => {
  const [selected, setSelected] = useState<string>("");
  const [showNameForm, setShowNameForm] = useState(false);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");

  const handleSelect = (code: string) => {
    setSelected(code);
    setShowNameForm(true);
  };

  const handleContinue = () => {
    if (name && grade) {
      onLanguageSelect(selected);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Choose Your Language</h2>
        <p className="text-muted-foreground">भाषा चुनें | Select your preferred language</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {languages.map((lang) => (
          <Card
            key={lang.code}
            className={`p-6 cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              selected === lang.code
                ? "border-primary bg-primary/10 shadow-lg"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => handleSelect(lang.code)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(lang.code);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Select ${lang.name} language`}
            aria-pressed={selected === lang.code}
            lang={lang.code}
          >
            <div className="text-center space-y-2">
              <div className="text-5xl">{lang.flag}</div>
              <p className="font-semibold text-lg text-foreground min-h-[1.5rem] flex items-center justify-center">
                {lang.name}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {showNameForm && (
        <Card className="p-6 space-y-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <h3 className="text-xl font-semibold text-foreground text-center">Tell us about yourself</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">Your Name</Label>
              <div className="flex gap-2">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="flex-1"
                  aria-label="Enter your name"
                />
                <VoiceInputIcon 
                  onTranscript={(text) => setName(text)}
                  language={selected}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade" className="text-foreground font-medium">Your Grade/Class</Label>
              <div className="flex gap-2">
                <Input
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="e.g., Class 10"
                  className="flex-1"
                  aria-label="Enter your grade or class"
                />
                <VoiceInputIcon 
                  onTranscript={(text) => setGrade(text)}
                  language={selected}
                />
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-colors"
            onClick={handleContinue}
            disabled={!name || !grade}
            aria-label="Continue to dashboard"
          >
            Continue
          </Button>
        </Card>
      )}
    </div>
  );
};
