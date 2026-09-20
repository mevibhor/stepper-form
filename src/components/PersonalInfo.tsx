import { usePlans } from "../context/Plans";

const PersonalInfo = () => {
  const { handleInputChange, personalData } = usePlans();

  return (
    <div className="text-[#02295A]">
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">Personal info</h1>
      <p className="mb-6 text-sm text-gray-400 md:text-base md:mb-8">
        Please provide your name, email address, and phone number.
      </p>

      <form className="flex flex-col gap-4 md:gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="Name" className="text-sm font-bold">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="name"
            value={personalData.name}
            onChange={handleInputChange}
            placeholder="e.g. Stephen King"
            className="p-3 rounded-lg border border-gray-300 outline-none focus:border-[#6A5BFF] transition-all text-sm md:text-base"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="Email" className="text-sm font-bold">
            Email Address
          </label>
          <input
            type="email"
            id="Email"
            name="email"
            value={personalData.email}
            onChange={handleInputChange}
            placeholder="e.g. stephenking@lorem.com"
            className="p-3 rounded-lg border border-gray-300 outline-none focus:border-[#6A5BFF] transition-all text-sm md:text-base"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumber" className="text-sm font-bold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="number"
            value={personalData.number}
            onChange={handleInputChange}
            placeholder="e.g. +1 234 567 890"
            className="p-3 rounded-lg border border-gray-300 outline-none focus:border-[#6A5BFF] transition-all text-sm md:text-base"
            required
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
