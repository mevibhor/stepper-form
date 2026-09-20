import tick from "../assets/images/icon-thank-you.svg";
import { usePlans } from "../context/Plans";

const Confirmation = () => {
  const { personalData } = usePlans();

  return (
    <div className="flex flex-col items-center justify-center text-center text-[#02295A]">
      <img
        src={tick}
        alt="Thank you"
        className="w-16 h-16 mb-4 md:w-20 md:h-20"
      />
      <h1 className="mb-2 text-2xl font-bold md:text-3xl">Thank you!</h1>
      <p className="max-w-sm mx-auto text-sm text-gray-400 md:text-base">
        Hey,{" "}
        <span className="font-bold text-[#02295A]">{personalData.name}</span>.
        thanks for checking out the project. Visit vibhorcode.netlify.app for
        more such projects.
      </p>
    </div>
  );
};

export default Confirmation;
