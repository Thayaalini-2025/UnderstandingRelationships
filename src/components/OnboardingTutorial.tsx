import { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, ArrowUp, X, ChevronRight, Sparkles } from 'lucide-react';
import { useTranslation } from '../utils/translations';

interface OnboardingTutorialProps {
  onComplete: () => void;
  currentScreen: string;
}

interface TutorialStep {
  id: string;
  screen: string;
  targetSelector?: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  arrowDirection?: 'up' | 'down' | 'left' | 'right';
  titleKey: string;
  descriptionKey: string;
  highlightArea?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    width?: string;
    height?: string;
  };
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    screen: 'main',
    position: 'center',
    titleKey: 'tutorialWelcomeTitle',
    descriptionKey: 'tutorialWelcomeDesc',
  },
  {
    id: 'modules',
    screen: 'main',
    position: 'top',
    arrowDirection: 'down',
    titleKey: 'tutorialModulesTitle',
    descriptionKey: 'tutorialModulesDesc',
    highlightArea: {
      top: '35%',
      left: '5%',
      width: '90%',
      height: '40%',
    },
  },
  {
    id: 'module1',
    screen: 'main',
    position: 'bottom',
    arrowDirection: 'up',
    titleKey: 'tutorialModule1Title',
    descriptionKey: 'tutorialModule1Desc',
    highlightArea: {
      top: '35%',
      left: '5%',
      width: '30%',
      height: '40%',
    },
  },
  {
    id: 'settings',
    screen: 'main',
    position: 'left',
    arrowDirection: 'right',
    titleKey: 'tutorialSettingsTitle',
    descriptionKey: 'tutorialSettingsDesc',
    highlightArea: {
      top: '1rem',
      right: '1rem',
      width: '4rem',
      height: '4rem',
    },
  },
  {
    id: 'start',
    screen: 'main',
    position: 'center',
    titleKey: 'tutorialStartTitle',
    descriptionKey: 'tutorialStartDesc',
  },
];

export function OnboardingTutorial({ onComplete, currentScreen }: OnboardingTutorialProps) {
  const t = useTranslation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = tutorialSteps[currentStepIndex];
  const isLastStep = currentStepIndex === tutorialSteps.length - 1;

  // Reset to first step when component mounts (when tutorial is opened)
  useEffect(() => {
    setCurrentStepIndex(0);
  }, []);

  useEffect(() => {
    // If current step is not for this screen, find next step for this screen
    if (currentStep && currentStep.screen !== currentScreen) {
      const nextStepForScreen = tutorialSteps.findIndex(
        (step, idx) => idx > currentStepIndex && step.screen === currentScreen
      );
      if (nextStepForScreen !== -1) {
        setCurrentStepIndex(nextStepForScreen);
      }
    }
  }, [currentScreen, currentStep, currentStepIndex]);

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('tutorialComplete', 'true');
    onComplete();
  };

  if (!currentStep || currentStep.screen !== currentScreen) {
    return null;
  }

  const getPositionStyles = () => {
    switch (currentStep.position) {
      case 'center':
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
      case 'top':
        return {
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'bottom':
        return {
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
        };
      case 'left':
        return {
          top: '20%',
          left: '10%',
        };
      case 'right':
        return {
          top: '20%',
          right: '10%',
        };
      default:
        return {};
    }
  };

  const ArrowIcon = () => {
    if (!currentStep.arrowDirection) return null;
    
    const arrowClass = "w-12 h-12 text-yellow-400 animate-bounce";
    
    switch (currentStep.arrowDirection) {
      case 'up':
        return <ArrowUp className={arrowClass} />;
      case 'down':
        return <ArrowDown className={arrowClass} />;
      case 'left':
        return <ArrowRight className={`${arrowClass} rotate-180`} />;
      case 'right':
        return <ArrowRight className={arrowClass} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Overlay with cutout for highlighted area */}
      <div className="absolute inset-0 bg-black/60 pointer-events-auto" onClick={handleNext} />
      
      {/* Highlight area */}
      {currentStep.highlightArea && (
        <div
          className="absolute bg-transparent ring-4 ring-yellow-400 ring-offset-4 ring-offset-transparent rounded-3xl animate-pulse pointer-events-none"
          style={{
            ...currentStep.highlightArea,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.5)',
          }}
        />
      )}

      {/* Tutorial Card */}
      <div
        className="absolute pointer-events-auto"
        style={getPositionStyles()}
      >
        {/* Arrow pointing to target */}
        {currentStep.arrowDirection && (
          <div className={`flex justify-center mb-2 ${
            currentStep.arrowDirection === 'up' ? 'order-last mt-2 mb-0' : ''
          } ${
            currentStep.arrowDirection === 'right' ? 'absolute -right-14 top-1/2 -translate-y-1/2' : ''
          } ${
            currentStep.arrowDirection === 'left' ? 'absolute -left-14 top-1/2 -translate-y-1/2' : ''
          }`}>
            <ArrowIcon />
          </div>
        )}

        {/* Card Content */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 max-w-sm mx-4 relative">
          {/* Skip button */}
          <button
            onClick={handleSkip}
            className="absolute -top-3 -right-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          {/* Sparkle decoration */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <Sparkles className="w-10 h-10 text-yellow-400" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center mb-3 text-purple-700 mt-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            {(t as any)[currentStep.titleKey] || currentStep.titleKey}
          </h3>

          {/* Description */}
          <p className="text-center text-gray-700 mb-6 text-lg">
            {(t as any)[currentStep.descriptionKey] || currentStep.descriptionKey}
          </p>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-4">
            {tutorialSteps.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'bg-yellow-400 scale-125'
                    : idx < currentStepIndex
                    ? 'bg-green-400'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl hover:from-yellow-500 hover:to-orange-500 transition-all hover:scale-105 flex items-center justify-center gap-2 text-xl font-bold shadow-lg"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            {isLastStep ? (t as any).tutorialLetsGo || "Let's Go!" : (t as any).tutorialNext || 'Next'}
            {!isLastStep && <ChevronRight className="w-6 h-6" />}
            {isLastStep && <span className="text-2xl">🎉</span>}
          </button>

          {/* Skip text */}
          <button
            onClick={handleSkip}
            className="w-full text-center text-gray-500 hover:text-gray-700 mt-3 text-sm"
          >
            {(t as any).tutorialSkip || 'Skip tutorial'}
          </button>
        </div>
      </div>

      {/* Floating helper character */}
      <div className="fixed bottom-4 left-4 pointer-events-none animate-bounce">
        <div className="text-6xl">🧸</div>
      </div>
    </div>
  );
}
