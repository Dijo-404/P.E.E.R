import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { FileText, Volume2, Video } from "lucide-react";

type ContentMode = "text" | "audio" | "video";

interface ContentSliderProps {
  onModeChange: (mode: ContentMode) => void;
}

export const ContentSlider = ({ onModeChange }: ContentSliderProps) => {
  const [value, setValue] = useState([1]);

  const modes: ContentMode[] = ["text", "audio", "video"];
  const icons = [
    <FileText key="text" className="h-5 w-5" />,
    <Volume2 key="audio" className="h-5 w-5" />,
    <Video key="video" className="h-5 w-5" />,
  ];

  const labels = [
    { name: "Text Only", data: "Lowest data" },
    { name: "Audio + Slides", data: "Medium data" },
    { name: "Full Video", data: "High data" },
  ];

  const handleChange = (newValue: number[]) => {
    setValue(newValue);
    onModeChange(modes[newValue[0]]);
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border border-border" role="group" aria-label="Content mode selector">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">Smart Content</span>
        <span className="text-muted-foreground" aria-live="polite">{labels[value[0]].data}</span>
      </div>

      <div className="space-y-2">
        <Slider
          value={value}
          onValueChange={handleChange}
          max={2}
          step={1}
          className="w-full"
          aria-label="Content mode"
          aria-valuemin={0}
          aria-valuemax={2}
          aria-valuenow={value[0]}
          aria-valuetext={labels[value[0]].name}
        />

        <div className="flex justify-between px-1">
          {icons.map((icon, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                value[0] === idx ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {icon}
              <span className="text-xs font-medium">{labels[idx].name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
