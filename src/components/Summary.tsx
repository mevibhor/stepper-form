import { usePlans } from "../context/Plans";

const Summary = () => {
  const plans = usePlans();

  const getPlanName = () => {
    if (plans.plansValue === 9 || plans.plansValue === 90) return "Arcade";
    if (plans.plansValue === 12 || plans.plansValue === 120) return "Advanced";
    if (plans.plansValue === 15 || plans.plansValue === 150) return "Pro";
    return "";
  };

  const getAddonPrice = (price: number) => {
    return plans.billingFrequency === "monthly" ? price : price * 10;
  };

  const showOnlineService = plans.addOnValue.includes(1);
  const showLocalStorage = plans.addOnValue.includes(2);
  const showCustomizableProfile = plans.addOnValue.includes(3);

  const total =
    plans.plansValue +
    (showOnlineService ? getAddonPrice(1) : 0) +
    (showLocalStorage ? getAddonPrice(2) : 0) +
    (showCustomizableProfile ? getAddonPrice(3) : 0);

  return (
    <div className="text-[#02295A]">
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">Finishing up</h1>
      <p className="mb-6 text-sm text-gray-400 md:text-base">
        Double-check everything looks OK before confirming.
      </p>

      {/* Summary Card */}
      <div className="bg-[#F0F6FF] rounded-lg p-4 md:p-6 mb-4">
        {/* Plan */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300">
          <div className="flex justify-between w-full">
            <p className="text-sm font-bold md:text-base">
              {getPlanName()} (
              {plans.billingFrequency === "monthly" ? "Monthly" : "Yearly"})
            </p>
            <p className="font-bold">
              ${plans.plansValue}/
              {plans.billingFrequency === "monthly" ? "mo" : "yr"}
            </p>
          </div>
        </div>

        {/* Add-ons */}
        {showOnlineService && (
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-400">Online Service</span>
            <span className="text-sm">
              +${getAddonPrice(1)}/
              {plans.billingFrequency === "monthly" ? "mo" : "yr"}
            </span>
          </div>
        )}
        {showLocalStorage && (
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-400">Larger Storage</span>
            <span className="text-sm">
              +${getAddonPrice(2)}/
              {plans.billingFrequency === "monthly" ? "mo" : "yr"}
            </span>
          </div>
        )}
        {showCustomizableProfile && (
          <div className="flex justify-between py-2">
            <span className="text-sm text-gray-400">Customizable Profile</span>
            <span className="text-sm">
              +${getAddonPrice(3)}/
              {plans.billingFrequency === "monthly" ? "mo" : "yr"}
            </span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between p-4">
        <span className="text-sm font-bold md:text-base">
          Total (
          {plans.billingFrequency === "monthly" ? "per month" : "per year"})
        </span>
        <span className="font-bold text-lg md:text-xl text-[#6A5BFF]">
          ${total}/{plans.billingFrequency === "monthly" ? "mo" : "yr"}
        </span>
      </div>
    </div>
  );
};

export default Summary;
