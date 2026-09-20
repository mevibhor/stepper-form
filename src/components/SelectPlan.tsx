import { usePlans } from "../context/Plans";
import advanced from "../assets/images/icon-advanced.svg";
import pro from "../assets/images/icon-pro.svg";
import arcade from "../assets/images/icon-arcade.svg";
import Toggle from "./Toggle";
import { cn } from "../lib/utils";

const SelectPlan = () => {
  const { handlePlanToggle, plansValue, billingFrequency } = usePlans();

  const plans = [
    {
      label: "Arcade",
      value: billingFrequency === "monthly" ? 9 : 90,
      image: arcade,
      description: "1 month free",
    },
    {
      label: "Advanced",
      value: billingFrequency === "monthly" ? 12 : 120,
      image: advanced,
      description: "1.5 months free",
    },
    {
      label: "Pro",
      value: billingFrequency === "monthly" ? 15 : 150,
      image: pro,
      description: "2 months free",
    },
  ];

  return (
    <div className="text-[#02295A]">
      <h1 className="text-2xl lg:text-3xl font-bold mb-2">Select your plan</h1>
      <p className="text-gray-400 text-sm lg:text-base mb-6">
        You have the option of monthly or yearly billing.
      </p>

      {/* Plan Cards - row on mobile, coloumn on desktop */}
      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 mb-6">
        {plans.map((plan, index) => (
          <label
            key={index}
            className={cn(
              "border rounded-lg p-4 cursor-pointer transition-all flex flex-row lg:flex-col gap-3 justify-between",
              "hover:border-[#6A5BFF]",
              plan.value === plansValue
                ? "bg-[#F0F6FF] border-[#6A5BFF]"
                : "bg-white border-gray-300",
              "flex-1",
            )}
          >
            <input
              type="radio"
              value={plan.value}
              checked={plan.value === plansValue}
              onChange={() => handlePlanToggle(plan.value)}
              className="hidden"
            />
            <div className="flex lg:items-start lg:justify-between lg:w-full gap-3 lg:gap-12 lg:flex-col">
              <img src={plan.image} alt={plan.label} className="h-10 w-10" />
              <div>
                <p className="font-bold text-sm lg:text-base">{plan.label}</p>
                <span className="text-gray-400 text-xs lg:text-sm">
                  ${plan.value}/{billingFrequency === "monthly" ? "mo" : "yr"}
                </span>
              </div>
            </div>
            {billingFrequency === "yearly" && (
              <span className="text-xs text-[#6A5BFF] font-medium">
                {plan.description}
              </span>
            )}
          </label>
        ))}
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center gap-5 py-4 bg-[#F0F6FF] rounded-lg">
        <span
          className={cn(
            "text-sm font-bold",
            billingFrequency === "monthly" ? "text-[#02295A]" : "text-gray-400",
          )}
        >
          Monthly
        </span>
        <Toggle />
        <span
          className={cn(
            "text-sm font-bold",
            billingFrequency === "yearly" ? "text-[#02295A]" : "text-gray-400",
          )}
        >
          Yearly
        </span>
      </div>
    </div>
  );
};

export default SelectPlan;
