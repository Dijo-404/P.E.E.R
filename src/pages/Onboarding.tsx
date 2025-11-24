import { useNavigate } from "react-router-dom";
import { OnboardingLanguagePicker } from "@/components/OnboardingLanguagePicker";
import heroLearning from "@/assets/hero-learning.jpg";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleLanguageSelect = (language: string) => {
    console.log("Selected language:", language);
    // Store selected language in localStorage for future use
    localStorage.setItem("selectedLanguage", language);
    // Navigate to dashboard after selection
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img
          src={heroLearning}
          alt="Students learning together"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" aria-hidden="true" />
      </div>

      {/* Content */}
      <main className="relative -mt-16 px-4 pb-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-foreground">EduBridge</h1>
            <p className="text-lg text-muted-foreground">
              Connecting every learner, everywhere
            </p>
          </div>

          <OnboardingLanguagePicker onLanguageSelect={handleLanguageSelect} />

          <div className="text-center text-sm text-muted-foreground">
            <p aria-label="Features: Works offline, Saves data, Available in your language">
              Works offline • Saves data • Available in your language
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
