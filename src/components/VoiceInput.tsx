import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language?: string;
  buttonVariant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
}

const getLanguageCode = (lang: string): string => {
  const languageMap: Record<string, string> = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'bn': 'bn-IN',
    'mr': 'mr-IN',
  };
  return languageMap[lang] || 'en-US';
};

export const VoiceInput = ({ 
  onTranscript, 
  language = "en-US",
  buttonVariant = "outline",
  size = "default"
}: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();
  const onTranscriptRef = useRef(onTranscript);
  
  // Keep callback ref up to date
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = getLanguageCode(language);

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscriptRef.current(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'no-speech') {
          toast({
            title: "No speech detected",
            description: "Please try again and speak clearly",
            variant: "destructive",
          });
        } else if (event.error === 'not-allowed') {
          toast({
            title: "Microphone access denied",
            description: "Please allow microphone access to use voice input",
            variant: "destructive",
          });
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognitionInstance;

      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    }
  }, [language, toast]);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.lang = getLanguageCode(language);
      recognitionRef.current.start();
    }
  }, [isListening, language, toast]);

  return (
    <Button
      type="button"
      variant={buttonVariant}
      size={size}
      onClick={toggleListening}
      className={isListening ? "bg-accent text-accent-foreground animate-pulse" : ""}
    >
      {isListening ? (
        <>
          <MicOff className="h-5 w-5 mr-2" />
          Listening...
        </>
      ) : (
        <>
          <Mic className="h-5 w-5 mr-2" />
          Voice Input
        </>
      )}
    </Button>
  );
};
