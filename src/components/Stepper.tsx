import { ComponentType } from "react";
import bgsidebar from "../assets/images/bg-sidebar-desktop.svg";
import bgsidebarMobile from "../assets/images/bg-sidebar-mobile.svg";
import { cn } from "../lib/utils";

interface StepsConfigType {
  name: string;
  Component: ComponentType;
}

const Stepper: React.FC<{
  stepsConfig: StepsConfigType[];
  currentStep: number;
}> = ({ stepsConfig, currentStep }) => {
  return (
    <>
      {/* Mobile Stepper - Horizontal at top */}
      <div className="md:hidden relative w-full h-[120px] bg-[#02295A] rounded-t-xl overflow-hidden">
        <img
          src={bgsidebarMobile}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex justify-center items-center gap-4 pt-8">
          {stepsConfig.map((step, index) => {
            const isActive = currentStep === index + 1;
            return (
              <div key={step.name} className="flex flex-col items-center">
                <span
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold",
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

      {/* Desktop Stepper - Vertical sidebar */}
      <div className="hidden md:block relative w-full h-full min-h-[500px] bg-[#02295A] rounded-l-xl overflow-hidden">
        <img
          src={bgsidebar}
          alt="Background Sidebar"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 p-10 flex flex-col gap-8 mt-12">
          {stepsConfig.map((step, index) => {
            const isActive = currentStep === index + 1;
            return (
              <div className="flex items-center gap-4" key={step.name}>
                <span
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold",
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
                  <span className="font-bold text-white text-base uppercase">
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
