import { useState } from "react";
import "./App.css";
import AddOns from "./components/AddOns";
import PersonalInfo from "./components/PersonalInfo";
import SelectPlan from "./components/SelectPlan";
import Stepper from "./components/Stepper";
import Summary from "./components/Summary";
import Confirmation from "./components/Confirmation";
import { usePlans } from "./context/Plans";
import { Toaster, toast } from "sonner";
import { cn } from "./lib/utils";

const stepsConfig = [
  { name: "Your Info", Component: PersonalInfo },
  { name: "Select Plan", Component: SelectPlan },
  { name: "Add-Ons", Component: AddOns },
  { name: "Summary", Component: Summary },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const { personalData } = usePlans();

  const totalSteps = stepsConfig.length;
  const isLastStep = currentStep === totalSteps;

  const handleSubmit = () => {
    if (!personalData.name || !personalData.email || !personalData.number) {
      toast.error("Please fill out all fields");
      return;
    }
    setIsComplete(true);
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    setIsComplete(false);
  };

  const ActiveComponent = stepsConfig[currentStep - 1].Component;

  return (
    <div className="flex items-center justify-center bg-[#F0F6FF] w-full min-h-screen p-4 md:p-6">
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-[900px] min-h-[650px]">
        {/* Left Side - Stepper */}
        <div className="w-full md:w-[33%]">
          <Stepper
            stepsConfig={stepsConfig}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col flex-1 p-6 md:p-12 md:items-center md:justify-center">
          {isComplete ? (
            <Confirmation />
          ) : (
            <>
              <div className="flex-1 w-full">
                <ActiveComponent />
              </div>

              <Toaster position="top-right" richColors />

              {/* Footer Buttons */}
              <div className="flex flex-col-reverse justify-between w-full gap-4 mt-6 md:mt-8 md:flex-row">
                {currentStep > 1 ? (
                  <button
                    onClick={handleBack}
                    className="font-medium text-gray-500 transition-colors hover:text-gray-800"
                  >
                    Go Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNext}
                  className={cn(
                    "px-6 py-3 rounded-lg text-white font-medium transition-colors w-full md:w-auto",
                    isLastStep
                      ? "bg-[#483EFF] hover:bg-[#3a31cc]"
                      : "bg-[#02295A] hover:bg-[#011e42]",
                  )}
                >
                  {isLastStep ? "Confirm" : "Next Step"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
