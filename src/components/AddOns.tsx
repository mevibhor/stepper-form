import React from "react";
import { usePlans } from "../context/Plans";
import { cn } from "../lib/utils";

const AddOns: React.FC = () => {
  const { addOnValue, handleAddOnToggle, billingFrequency, getAddonPrice } =
    usePlans();

  const addOns = [
    {
      id: 1,
      title: "Online service",
      description: "Access to multiplayer games",
      price: getAddonPrice(1),
    },
    {
      id: 2,
      title: "Larger storage",
      description: "Extra 1TB of cloud save",
      price: getAddonPrice(2),
    },
    {
      id: 3,
      title: "Customizable profile",
      description: "Custom theme on your profile",
      price: getAddonPrice(3),
    },
  ];

  return (
    <div className="text-[#02295A]">
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">Pick add-ons</h1>
      <p className="mb-6 text-sm text-gray-400 md:text-base">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="flex flex-col gap-3">
        {addOns.map((addon) => (
          <label
            key={addon.id}
            className={cn(
              "border rounded-lg p-4 lg:p-6 cursor-pointer transition-all flex items-center justify-between gap-4",
              "hover:border-[#6A5BFF]",
              addOnValue.includes(addon.id)
                ? "bg-[#F0F6FF] border-[#6A5BFF]"
                : "bg-white border-gray-300",
            )}
          >
            <input
              type="checkbox"
              value={addon.id}
              checked={addOnValue.includes(addon.id)}
              onChange={() => handleAddOnToggle(addon.id)}
              className="w-5 h-5 accent-[#6A5BFF] cursor-pointer"
            />
            <div className="flex-1 cursor-pointer">
              <p className="text-sm font-bold md:text-base">{addon.title}</p>
              <p className="text-xs text-gray-400 md:text-sm">
                {addon.description}
              </p>
            </div>
            <span className="font-bold text-[#6A5BFF] text-sm md:text-base">
              +${addon.price}/{billingFrequency === "monthly" ? "mo" : "yr"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AddOns;
