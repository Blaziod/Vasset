import React, { useState } from "react";

const Dashboard = () => {
  return (
    <div className="h-full">
      <div>
        <div className="pl-5 pt-2">
          <h1 className="text-[15px] text-[#036] lato-regular">
            Current Balance
          </h1>
          <h1 className="text-[25px] text-[#000] lato-bold">0 USD</h1>
        </div>

        <div className="p-5">
          <div className="bg-white h-[360px] rounded-md p-3">
            <div className=" flex justify-between">
              <h1 className="text-[18px] text-[#036] lato-regular">
                My Portfolio
              </h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="25"
                viewBox="0 0 29 25"
                fill="none"
              >
                <ellipse
                  cx="6.61124"
                  cy="6.36236"
                  rx="6.61124"
                  ry="6.36236"
                  transform="matrix(0.952028 0.306012 -0.406852 0.913494 11.1768 5.41113)"
                  fill="#009999"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M26.5837 12.6314C26.5837 8.79379 26.5837 6.87498 25.6124 5.44576C24.976 4.50946 24.0608 3.73195 22.9587 3.19138C21.2763 2.36621 19.0177 2.36621 14.5003 2.36621C9.98302 2.36621 7.72435 2.36621 6.04199 3.19138C4.93985 3.73195 4.02463 4.50946 3.38831 5.44576C2.41699 6.87498 2.41699 8.79379 2.41699 12.6314C2.41699 16.469 2.41699 18.3878 3.38831 19.817C4.02463 20.7533 4.93985 21.5308 6.04199 22.0714C7.72435 22.8966 9.98302 22.8966 14.5003 22.8966C19.0177 22.8966 21.2763 22.8966 22.9587 22.0714C24.0608 21.5308 24.976 20.7533 25.6124 19.817C26.5837 18.3878 26.5837 16.469 26.5837 12.6314ZM12.6512 16.1931C12.2973 16.4938 12.2973 16.9811 12.6512 17.2818C13.0051 17.5825 13.5788 17.5825 13.9328 17.2818L17.0573 14.6274C18.355 13.5251 18.355 11.7377 17.0573 10.6353L13.9328 7.98092C13.5788 7.68026 13.0051 7.68026 12.6512 7.98092C12.2973 8.28158 12.2973 8.76905 12.6512 9.06971L15.7757 11.724C16.3655 12.2252 16.3655 13.0376 15.7757 13.5387L12.6512 16.1931Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex justify-center align-middle pl-10 pt-20 pr-10">
              <h1 className="text-[15px] text-[#007A86] lato-regular text-center">
                You do not yet have any asset/cryptocurrency in your Portfolio
              </h1>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="bg-white h-[360px] rounded-md p-3">
            <div className=" flex justify-center">
              <h1 className="text-[28px] text-[#036] lato-bold">Analytics</h1>
            </div>
            <div className="flex justify-center align-middle pl-10 pt-20 pr-10">
              <h1 className="text-[15px] text-[#007A86] lato-regular text-center">
                Analytics currently unavailable
              </h1>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="bg-white h-[360px] rounded-md p-3">
            <div className=" flex justify-between">
              <h1 className="text-[18px] text-[#036] lato-regular">
                My Portfolio
              </h1>
              <div className="flex gap-1">
                <h1 className="text-[12px] lato-regular text-[#036]">1hr</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5.09473 8.08236C4.76933 7.75696 4.24174 7.75695 3.91634 8.08236C3.59094 8.40776 3.59094 8.93534 3.91634 9.26074L6.69454 12.0389C8.52208 13.8665 11.482 13.8765 13.3218 12.0613L16.0755 9.34464C16.4031 9.02143 16.4067 8.49385 16.0835 8.16619C15.7603 7.83853 15.2327 7.83485 14.905 8.15799L12.7415 10.2914C11.2263 11.7855 8.78935 11.777 7.28466 10.2723L5.09473 8.08236Z"
                    fill="#333333"
                  />
                </svg>
              </div>
            </div>
            <div className="flex justify-center align-middle pl-10 pt-20 pr-10">
              <h1 className="text-[15px] text-[#007A86] lato-regular text-center">
                You do not yet have any asset/cryptocurrency in your Portfolio
              </h1>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="bg-white h-[360px] rounded-md p-3">
            <div className=" flex justify-between">
              <h1 className="text-[18px] text-[#036] lato-regular">
                Recent Transactions
              </h1>
              <div className="flex gap-1">
                <h1 className="text-[12px] lato-regular text-[#036]">
                  View All
                </h1>
              </div>
            </div>
            <div className="flex justify-center align-middle pl-10 pt-20 pr-10">
              <h1 className="text-[15px] text-[#007A86] lato-regular text-center">
                No transactions available yet, carry out a transaction to view
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
