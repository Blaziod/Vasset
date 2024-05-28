import Investing from "assets/Frame 427320223.png";

const Invest = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="justify-center items-center flex">
        <img src={Investing} />
      </div>
      <h1 className="text-[20px] text-[#036] lato-bold pt-10 text-center pl-20 pr-20">
        Let’s Help You Build The Portfolio You Want
      </h1>
      <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-[#036] text-[#fff]  h-[50px] rounded-[50px] w-[auto] mt-10 p-5 text-center flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              opacity="0.4"
              d="M6 12H18"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 18V6"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1 className="text-[16px] font-lato font-bold text-[#fff]">
            Create an Investment Plan
          </h1>
        </button>
      </div>
    </div>
  );
};
export default Invest;
