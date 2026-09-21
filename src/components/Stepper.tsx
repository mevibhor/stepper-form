import { ComponentType } from "react";
import bgsidebar from "../assets/images/bg-sidebar-desktop.svg";
import bgsidebarMobile from "../assets/images/bg-sidebar-mobile.svg";
import { cn } from "../lib/utils";

interface StepsConfigType {
  name: string;
  Component: ComponentType;
}

// 1. Update props interface
interface StepperProps {
  stepsConfig: StepsConfigType[];
  currentStep: number;
  onStepClick: (step: number) => void;
  isComplete: boolean;
}

const Stepper: React.FC<StepperProps> = ({
  stepsConfig,
  currentStep,
  onStepClick,
  isComplete,
}) => {
  return (
    <>
      {/* Mobile Stepper */}
      <div className="md:hidden relative w-full h-[120px] bg-[#02295A] rounded-t-xl overflow-hidden">
        <img
          src={bgsidebarMobile}
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative z-10 flex items-center justify-center gap-4 pt-8">
          {stepsConfig.map((step, index) => {
            const isActive = !isComplete && currentStep === index + 1;
            const isClickable = !isComplete;

            return (
              <div
                key={step.name}
                className={cn(
                  "flex flex-col items-center transition-all",
                  isClickable
                    ? "cursor-pointer hover:opacity-80"
                    : "cursor-not-allowed opacity-50",
                )}
                onClick={() => isClickable && onStepClick(index + 1)}
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all",
                    isActive
                      ? "bg-[#F0F6FF] border-[#F0F6FF] text-[#02295A]"
                      : "bg-transparent border-white text-white",
                  )}
                >
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden md:block relative w-full h-full min-h-[500px] bg-[#02295A] rounded-l-xl overflow-hidden">
        <img
          src={bgsidebar}
          alt="Background Sidebar"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="relative z-10 flex flex-col gap-8 p-10 mt-12">
          {stepsConfig.map((step, index) => {
            const isActive = !isComplete && currentStep === index + 1;
            const isClickable = !isComplete;

            return (
              <div
                className={cn(
                  "flex items-center gap-4 transition-all",
                  isClickable
                    ? "cursor-pointer hover:opacity-80"
                    : "cursor-not-allowed opacity-50",
                )}
                key={step.name}
                onClick={() => isClickable && onStepClick(index + 1)}
              >
                <span
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all",
                    isActive
                      ? "bg-[#F0F6FF] border-[#F0F6FF] text-[#02295A]"
                      : "bg-transparent border-white text-white",
                  )}
                >
                  {index + 1}
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-blue-200 font-medium">
                    Step {index + 1}
                  </span>
                  <span className="text-base font-bold text-white uppercase">
                    {step.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Stepper;
