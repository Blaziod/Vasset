import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 min-h-screen">
      <div>
        <div
          className="pb-5 flex items-center gap-1"
          onClick={() => navigate("/profile")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="12"
            viewBox="0 0 7 12"
            fill="none"
          >
            <path
              d="M5.74956 10.6199L1.94625 6.81656C1.49708 6.36739 1.49708 5.63239 1.94625 5.18323L5.74956 1.37988"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1 className="text-[14px] text-[#000] lato-bold">
            Account Settings
          </h1>
        </div>
        <h1 className="text-[24px] text-[#036] lato-bold">Privacy Policy</h1>
      </div>
    </div>
  );
};
export default PrivacyPolicy;
