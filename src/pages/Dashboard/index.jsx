import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";
import { BeatLoader } from "react-spinners";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const navigate = useNavigate();
  const { authToken, logout } = useAuth();
  const [assets, setAssets] = useState({
    businesses: [],
    cryptos: [],
    nfts: [],
    real_estates: [],
    social_media: [],
    stocks: [],
    youtube: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const assetResponse = await axios.get(
          "https://api.vassetglobal.com/api/users/assets",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const transactionResponse = await axios.get(
          `https://api.vassetglobal.com/api/user/${userId}/transactions`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (assetResponse.status === 200) {
          toast.success("Assets fetched successfully");
          setAssets(assetResponse.data.message || {});
          setIsLoading(false);
        } else if (assetResponse.status === 401) {
          toast.error("Unauthorized access, please login");
          setIsLoading(false);
          logout();
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          navigate("/login");
        } else {
          toast.error(assetResponse.data.message);
          setIsLoading(false);
        }

        if (transactionResponse.status === 200) {
          setTransactions(
            Array.isArray(transactionResponse.data)
              ? transactionResponse.data
              : []
          );
        } else {
          toast.error(transactionResponse.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(errorMessage(error));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authToken, logout, navigate, userId]);

  const hasAssets = Object.values(assets).some(
    (assetArray) => Array.isArray(assetArray) && assetArray.length > 0
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "verified":
        return "bg-green-200 text-green-800";
      case "failed":
        return "bg-red-200 text-red-800";
      default:
        return "";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getAssetDataForChart = () => {
    const assetTypes = Object.keys(assets);
    const assetCounts = assetTypes.map((type) => assets[type].length);

    return {
      labels: assetTypes.filter((type, index) => assetCounts[index] > 0),
      datasets: [
        {
          data: assetCounts.filter((count) => count > 0),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FF6384",
          ],
        },
      ],
    };
  };

  return (
    <div className="h-full">
      <div>
        <div className="pl-5 pt-2 flex justify-between items-center pr-5">
          <div>
            <h1 className="text-[15px] text-[#036] lato-regular">
              Current Balance
            </h1>
            <h1 className="text-[25px] text-[#000] lato-bold">0 USD</h1>
          </div>
          <div>
            <button
              className="bg-[#036] text-white rounded-md p-2 mt-2"
              onClick={() => navigate("/deposit")}
            >
              Deposit
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="bg-white rounded-md p-3">
            <div className="flex justify-between">
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
                  fillRule="evenodd"
                  clipRule="evenodd"
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
          <div className="bg-white rounded-md p-3 h-auto">
            <div className="flex justify-center">
              <h1 className="text-[28px] text-[#036] lato-bold">Analytics</h1>
            </div>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <BeatLoader color={"#036"} size={50} />
              </div>
            ) : hasAssets ? (
              <div className="flex items-center justify-center h-[300px]">
                <Pie data={getAssetDataForChart()} />
              </div>
            ) : (
              <div className="flex justify-center align-middle pl-10 pt-20 pr-10">
                <h1 className="text-[15px] text-[#007A86] lato-regular text-center">
                  No analytics available, add assets to view analytics.
                </h1>
              </div>
            )}
          </div>
        </div>

        <div className="p-5">
          <div className="bg-white h-[auto] rounded-md p-3">
            <div className=" flex justify-between">
              <h1 className="text-[18px] text-[#036] lato-regular">
                My Assets
              </h1>
            </div>
            <div className="pt-5">
              <div>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <BeatLoader color={"#036"} size={50} />
                  </div>
                ) : (
                  <>
                    {hasAssets ? (
                      <>
                        <div>
                          <div className="bg-white rounded-lg h-[auto] p-5 border-2 border-[#000]">
                            {assets.social_media?.length > 0 && (
                              <div className="flex justify-between pt-5">
                                <h2 className="text-[20px] text-[#036] lato-bold">
                                  Social Media Accounts
                                </h2>
                                <div
                                  style={{
                                    backgroundColor: "rgba(0, 51, 102, 0.14)",
                                  }}
                                  className="rounded-[20px] p-4 h-[35px] flex justify-center items-center text-[#036]"
                                >
                                  <h1 className="text-[#036]">Active</h1>
                                </div>
                              </div>
                            )}
                            {assets.cryptos?.length > 0 && (
                              <div className="flex justify-between pt-5">
                                <h2 className="text-[20px] text-[#036] lato-bold">
                                  Crypto Currency
                                </h2>
                                <div
                                  style={{
                                    backgroundColor: "rgba(0, 51, 102, 0.14)",
                                  }}
                                  className="rounded-[20px] p-4 h-[35px] flex justify-center items-center text-[#036]"
                                >
                                  <h1 className="text-[#036]">Active</h1>
                                </div>
                              </div>
                            )}
                            {assets.nfts?.length > 0 && (
                              <div className="flex justify-between pt-5">
                                <h2 className="text-[20px] text-[#036] lato-bold">
                                  NFTs
                                </h2>
                                <div
                                  style={{
                                    backgroundColor: "rgba(0, 51, 102, 0.14)",
                                  }}
                                  className="rounded-[20px] p-4 h-[35px] flex justify-center items-center text-[#036]"
                                >
                                  <h1 className="text-[#036]">Active</h1>
                                </div>
                              </div>
                            )}
                            {assets.youtube?.length > 0 && (
                              <div className="flex justify-between pt-5">
                                <h2 className="text-[20px] text-[#036] lato-bold">
                                  Youtube
                                </h2>
                                <div
                                  style={{
                                    backgroundColor: "rgba(0, 51, 102, 0.14)",
                                  }}
                                  className="rounded-[20px] p-4 h-[35px] flex justify-center items-center text-[#036]"
                                >
                                  <h1 className="text-[#036]">Active</h1>
                                </div>
                              </div>
                            )}
                            {assets.businesses?.length > 0 && (
                              <div>
                                <h2 className="text-[20px] text-[#036] lato-bold pt-5 text-center">
                                  Businesses
                                </h2>
                              </div>
                            )}
                            <div className="pt-10 pb-5">
                              <button
                                className="border-2 border-[#999999] flex justify-center items-center rounded-md p-2 h-[40px]"
                                onClick={() => navigate("/add-assets")}
                              >
                                <h1 className="text-[#333]">Add New Asset +</h1>
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <h1 className="text-[15px] text-[#007A86] lato-regular text-center">
                        You do not yet have any asset/cryptocurrency in your
                        Portfolio
                      </h1>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="bg-white h-[auto] rounded-md p-3">
            <div className="flex justify-between">
              <h1 className="text-[18px] text-[#036] lato-regular">
                Recent Transactions
              </h1>
              <div className="flex gap-1">
                <h1
                  className="text-[12px] lato-regular text-[#036]"
                  onClick={() => navigate("/transactions")}
                >
                  View All
                </h1>
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <BeatLoader color={"#036"} size={50} />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="p-4 text-left">ID</th>
                        <th className="p-4 text-left">Amount</th>
                        <th className="p-4 text-left">Asset</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.slice(-4).map((transaction) => (
                        <tr key={transaction.id} className="border-b">
                          <td className="p-4">{transaction.id}</td>
                          <td className="p-4">{transaction.amount}</td>
                          <td className="p-4">
                            {transaction.coin_type || "N/A"}
                          </td>
                          <td
                            className={`p-4 ${getStatusStyle(
                              transaction.status
                            )}`}
                          >
                            {transaction.status}
                          </td>
                          <td className="p-4">
                            {formatDate(transaction.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {transactions.length === 0 && (
                    <div className="flex justify-center align-middle pl-10 pt-20 pr-10">
                      <h1 className="text-[15px] text-[#007A86] lato-regular text-center">
                        No transactions available yet, carry out a transaction
                        to view
                      </h1>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
