import { UseFormRegister, FieldErrors } from "react-hook-form";
import { cn } from "../lib/utils";

interface PersonalFormData {
  name: string;
  email: string;
  number: string;
}

interface PersonalInfoProps {
  register?: UseFormRegister<PersonalFormData>;
  errors?: FieldErrors<PersonalFormData>;
}

const PersonalInfo = ({ register, errors }: PersonalInfoProps) => {
  return (
    <div className="text-[#02295A]">
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">Personal info</h1>
      <p className="mb-6 text-sm text-gray-400 md:text-base md:mb-8">
        Please provide your name, email address, and phone number.
      </p>

      <form
        className="flex flex-col gap-4 md:gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="Name" className="text-sm font-bold">
            Name
          </label>
          <input
            type="text"
            id="Name"
            {...(register &&
              register("name", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Invalid name format",
                },
              }))}
            placeholder="e.g. Stephen King"
            className={cn(
              "p-3 rounded-lg border outline-none transition-all text-sm md:text-base",
              errors?.name
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-[#6A5BFF]",
            )}
          />
          {errors?.name && (
            <span className="text-xs italic text-red-500">
              {String(errors.name.message)}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="Email" className="text-sm font-bold">
            Email Address
          </label>
          <input
            type="email"
            id="Email"
            {...(register &&
              register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              }))}
            placeholder="e.g. stephenking@lorem.com"
            className={cn(
              "p-3 rounded-lg border outline-none transition-all text-sm md:text-base",
              errors?.email
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-[#6A5BFF]",
            )}
          />
          {errors?.email && (
            <span className="text-xs italic text-red-500">
              {String(errors.email.message)}
            </span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber" className="text-sm font-bold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...(register &&
              register("number", {
                required: "This field is required",
                pattern: {
                  value: /^[+]?[\d\s-]{10,}$/,
                  message: "Invalid phone number",
                },
              }))}
            placeholder="e.g. +1 234 567 890"
            className={cn(
              "p-3 rounded-lg border outline-none transition-all text-sm md:text-base",
              errors?.number
                ? "border-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-[#6A5BFF]",
            )}
          />
          {errors?.number && (
            <span className="text-xs italic text-red-500">
              {String(errors.number.message)}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
