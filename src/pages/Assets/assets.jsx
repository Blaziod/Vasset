import React, { useState, useEffect } from "react";
import Investing from "assets/Illustration.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";
import { BeatLoader } from "react-spinners";

const Assets = () => {
  const navigate = useNavigate();
  const { authToken, logout } = useAuth();
  const [assets, setAssets] = useState({
    businesses: [],
    cryptos: [],
    nfts: [],
    real_estates: [],
    social_media: [],
    stocks: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://api.vassetglobal.com/api/users/assets",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Assets fetched successfully");
          setAssets(response.data.message || {});
          console.log(response.data.message);
          setIsLoading(false);
        } else if (response.status === 401) {
          toast.error("Unauthorized access, please login");
          setIsLoading(false);
          logout();
          navigate("/login");
        } else {
          toast.error(response.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
        toast.error(errorMessage(error));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authToken, logout, navigate]);

  const hasAssets = Object.values(assets).some(
    (assetArray) => Array.isArray(assetArray) && assetArray.length > 0
  );

  return (
    <div className=" min-h-screen h-full">
      {isLoading ? (
        <BeatLoader color={"#036"} size={50} />
      ) : (
        <div className="pt-10 pl-5 pr-5 pb-10">
          {hasAssets ? (
            <>
              <div className="pb-10">
                <div className="bg-white p-5 rounded-lg h-[auto]">
                  {assets.social_media?.length > 0 && (
                    <div className="flex justify-between pt-5">
                      <h2 className="text-[20px] text-[#036] lato-bold">
                        Social Media Accounts
                      </h2>
                      <div
                        style={{ backgroundColor: "rgba(0, 51, 102, 0.14)" }}
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
                        style={{ backgroundColor: "rgba(0, 51, 102, 0.14)" }}
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
                        style={{ backgroundColor: "rgba(0, 51, 102, 0.14)" }}
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
              <div className="bg-white p-5 rounded-lg h-[auto]">
                {assets.social_media?.length > 0 && (
                  <div>
                    <h2 className="text-[20px] text-[#036] lato-bold text-center">
                      Social Media Accounts
                    </h2>

                    {assets.social_media.map((account) => (
                      <>
                        <h1
                          key={account.id}
                          className="text-[16px] text-[#036] lato-bold"
                        >
                          {account.platform}:
                        </h1>
                        <h1 className="text-[13px] text-[#036] lato-regular">
                          {account.username}
                        </h1>
                      </>
                    ))}
                  </div>
                )}
                {assets.cryptos?.length > 0 && (
                  <div>
                    <h2 className="text-[20px] text-[#036] lato-bold pt-5 text-center">
                      Cryptocurrencies
                    </h2>
                    <ul>
                      {assets.cryptos.map((crypto) => (
                        <>
                          <h1
                            key={crypto.id}
                            className="text-[16px] text-[#036] lato-bold"
                          >
                            Crypto: {crypto.symbol}
                          </h1>
                          <h1 className="text-[15px] text-[#036] lato-regular">
                            Amount: {crypto.amount}
                          </h1>
                        </>
                      ))}
                    </ul>
                  </div>
                )}
                {assets.nfts?.length > 0 && (
                  <div>
                    <h2 className="text-[20px] text-[#036] lato-bold pt-5 text-center">
                      NFTs
                    </h2>
                    <ul>
                      {assets.nfts.map((nft) => (
                        <>
                          <h1
                            key={nft.id}
                            className="text-[16px] text-[#036] lato-bold"
                          >
                            Name: {nft.name}
                          </h1>
                          <h1 className="text-[15px] text-[#036] lato-regular">
                            Link: {nft.uri}
                          </h1>
                        </>
                      ))}
                    </ul>
                  </div>
                )}
                {assets.businesses?.length > 0 && (
                  <div>
                    <h2 className="text-[20px] text-[#036] lato-bold pt-5 text-center">
                      Businesses
                    </h2>
                    <ul>
                      {assets.businesses.map((business) => (
                        <li key={business.id}>
                          Business: {business.name}, Type: {business.type}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-[100vh]">
              <div className="justify-center items-center flex">
                <img src={Investing} />
              </div>
              <h1 className="text-[20px] text-[#036] lato-bold pt-10 text-center pl-20 pr-20">
                Let’s Help You add your desired assets
              </h1>
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-[#036] text-[#fff]  h-[50px] rounded-[50px] w-[auto] mt-10 p-5 text-center flex justify-center items-center"
                  onClick={() => navigate("/add-assets")}
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
                    Add New Asset
                  </h1>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Assets;
