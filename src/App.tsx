import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import AddOns from "./components/AddOns";
import PersonalInfo from "./components/PersonalInfo";
import SelectPlan from "./components/SelectPlan";
import Stepper from "./components/Stepper";
import Summary from "./components/Summary";
import Confirmation from "./components/Confirmation";
import { usePlans } from "./context/Plans";
import { cn } from "./lib/utils";

interface PersonalFormData {
  name: string;
  email: string;
  number: string;
}

const stepsConfig = [
  { name: "Your Info", Component: PersonalInfo },
  { name: "Select Plan", Component: SelectPlan },
  { name: "Add-Ons", Component: AddOns },
  { name: "Summary", Component: Summary },
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const { personalData, setPersonalData } = usePlans();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<PersonalFormData>({
    defaultValues: {
      name: String(personalData.name || ""),
      email: String(personalData.email || ""),
      number: String(personalData.number || ""),
    },
  });

  const totalSteps = stepsConfig.length;
  const isLastStep = currentStep === totalSteps;

  const handleSubmit = () => {
    if (!personalData.name || !personalData.email || !personalData.number)
      return;
    setIsComplete(true);
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      const isValid = await trigger();
      if (!isValid) return;
      setPersonalData(getValues());
    }

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

  const handleStepClick = async (targetStep: number) => {
    if (targetStep === currentStep) return;

    if (targetStep > currentStep) {
      if (currentStep === 1) {
        const isValid = await trigger();
        if (!isValid) return;
        setPersonalData(getValues());
      }
    }
    setCurrentStep(targetStep);
  };

  const ActiveComponent = stepsConfig[currentStep - 1].Component;

  return (
    <div className="flex items-center justify-center bg-[#F0F6FF] w-full min-h-screen p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-[900px] min-h-[650px]">
        <div className="w-full md:w-[33%]">
          <Stepper
            stepsConfig={stepsConfig}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            isComplete={isComplete}
          />
        </div>

        <div className="flex flex-col flex-1 p-6 md:p-12 md:items-center md:justify-center">
          {isComplete ? (
            <Confirmation />
          ) : (
            <>
              <div className="flex-1 w-full">
                {currentStep === 1 ? (
                  <PersonalInfo register={register} errors={errors} />
                ) : (
                  <ActiveComponent />
                )}
              </div>

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
