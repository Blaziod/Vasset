import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";

const CreateAsset = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [menu, setMenu] = useState(null);
  const [cryptoMenu, setCryptoMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nftName, setNftName] = useState("");
  const [nftLink, setNftLink] = useState("");
  const [youtubeEmail, setYoutubeEmail] = useState("");
  const [youtubePassword, setYoutubePassword] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const { authToken } = useAuth();
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Selected Option Changed:", selectedOption);
    if (selectedOption === "crypto") {
      setMenu(
        <div>
          <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
            Select Crypto
          </h1>
          <div className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center">
            <select
              style={{
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                width: "100%",
              }}
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
            >
              <option value="">Select Crypto</option>
              <option value="btc">BTC</option>
              <option value="usdt">USDT</option>
              <option value="sol">SOL</option>
              <option value="eth">ETH</option>
            </select>
          </div>
          {cryptoMenu}
        </div>
      );
    } else if (selectedOption === "social_media") {
      setMenu(
        <div>
          <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
            Input Social Media
          </h1>
          <input
            className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
            type="text"
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
          />

          <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
            Input Username or Email
          </h1>
          <input
            className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
            Input Password
          </h1>
          <input
            className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
            Input Description
          </h1>
          <input
            className="h-[100px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h1 className="text-[#036] text-[13px] lato-italics">
            Is this your personal or business social media?
          </h1>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#036] text-[#fff] h-[50px] rounded-[10px] w-[40%] mt-10 font-lato text-[24px] text-center"
              disabled={isLoading}
              onClick={SubmitSocialMedia}
            >
              {isLoading ? (
                <BeatLoader color={"#ffffff"} />
              ) : (
                <h1 className="text-[12px] font-lato font-bold text-[#fff]">
                  Continue
                </h1>
              )}
            </button>
            <button
              type="button"
              className="border-2 border-[#007A86] h-[50px] rounded-[10px] w-[40%] mt-10 text-center"
              onClick={() => navigate("/assets")}
            >
              {isLoading ? (
                <BeatLoader color={"#000"} />
              ) : (
                <h1 className="text-[12px] font-lato font-bold text-[#007A86]">
                  Go Back
                </h1>
              )}
            </button>
          </div>
        </div>
      );
    } else if (selectedOption === "nft") {
      setMenu(
        <div>
          <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
            Input Your NFT Name
          </h1>
          <input
            className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
            type="text"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
          />
          <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
            Input Your NFT link
          </h1>{" "}
          <input
            className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
            type="text"
            value={nftLink}
            onChange={(e) => setNftLink(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#036] text-[#fff] h-[50px] rounded-[10px] w-[40%] mt-10 font-lato text-[24px] text-center"
              disabled={isLoading}
              onClick={SubmitNFT}
            >
              {isLoading ? (
                <BeatLoader color={"#ffffff"} />
              ) : (
                <h1 className="text-[12px] font-lato font-bold text-[#fff]">
                  Continue
                </h1>
              )}
            </button>
            <button
              type="button"
              className="border-2 border-[#007A86] h-[50px] rounded-[10px] w-[40%] mt-10 text-center"
              onClick={() => navigate("/assets")}
            >
              {isLoading ? (
                <BeatLoader color={"#000"} />
              ) : (
                <h1 className="text-[12px] font-lato font-bold text-[#007A86]">
                  Go Back
                </h1>
              )}
            </button>
          </div>
        </div>
      );
    } else if (selectedOption === "youtube") {
      setMenu(
        <div>
          <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
            Input YouTube Email
          </h1>
          <input
            className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
            type="text"
            value={youtubeEmail}
            onChange={(e) => setYoutubeEmail(e.target.value)}
          />
          <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
            Input YouTube Password
          </h1>
          <input
            className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
            type="text"
            value={youtubePassword}
            onChange={(e) => setYoutubePassword(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-[#036] text-[#fff] h-[50px] rounded-[10px] w-[40%] mt-10 font-lato text-[24px] text-center"
              onClick={SubmitYoutube}
              disabled={isLoading}
            >
              {isLoading ? (
                <BeatLoader color={"#ffffff"} />
              ) : (
                <h1 className="text-[12px] font-lato font-bold text-[#fff]">
                  Continue
                </h1>
              )}
            </button>
            <button
              type="button"
              className="border-2 border-[#007A86] h-[50px] rounded-[10px] w-[40%] mt-10 text-center"
              onClick={() => navigate("/assets")}
            >
              {isLoading ? (
                <BeatLoader color={"#000"} />
              ) : (
                <h1 className="text-[12px] font-lato font-bold text-[#007A86]">
                  Go Back
                </h1>
              )}
            </button>
          </div>
        </div>
      );
    } else {
      setMenu(null);
    }
  }, [
    selectedOption,
    cryptoMenu,
    socialMedia,
    username,
    password,
    description,
    nftName,
    nftLink,
    youtubeEmail,
    youtubePassword,
  ]);

  useEffect(() => {
    console.log("Selected Crypto Changed:", selectedCrypto);
    if (selectedOption === "crypto") {
      switch (selectedCrypto) {
        case "btc":
          setCryptoMenu(
            <div className="p-4">
              <img
                src="https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png"
                alt="btc"
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                Input BTC Amount
              </h1>
              <input
                className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent text-[#000]"
                type="text"
                value={amount}
                onChange={(e) => {
                  console.log("BTC Amount Change:", e.target.value);
                  setAmount(e.target.value);
                }}
              />
              <div>
                <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                  Deposit the amount to the following address
                </h1>
                <input
                  className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
                  type="text"
                  value="3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
                  disabled
                />
                <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                  Upload Proof of Payment
                </h1>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-1 bg-transparent"
                  id="imageUpload"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-[#036] text-[#fff] h-[50px] rounded-[10px] w-[40%] mt-10 font-lato text-[24px] text-center"
                  disabled={isLoading}
                  onClick={SubmitCrypto}
                >
                  {isLoading ? (
                    <BeatLoader color={"#ffffff"} />
                  ) : (
                    <h1 className="text-[12px] font-lato font-bold text-[#fff]">
                      Continue
                    </h1>
                  )}
                </button>
                <button
                  type="button"
                  className="border-2 border-[#007A86] h-[50px] rounded-[10px] w-[40%] mt-10 text-center"
                  onClick={() => navigate("/assets")}
                >
                  {isLoading ? (
                    <BeatLoader color={"#000"} />
                  ) : (
                    <h1 className="text-[12px] font-lato font-bold text-[#007A86]">
                      Go Back
                    </h1>
                  )}
                </button>
              </div>
            </div>
          );
          break;
        case "usdt":
          setCryptoMenu(
            <div className="p-4">
              <img
                src="https://coin-images.coingecko.com/coins/images/325/large/Tether.png"
                alt="usdt"
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                Input USDT Amount
              </h1>
              <input
                className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
                type="text"
                value={amount}
                onChange={(e) => {
                  console.log("USDT Amount Change:", e.target.value);
                  setAmount(e.target.value);
                }}
              />
              <div>
                <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                  Deposit the amount to the following address
                </h1>
                <input
                  className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
                  type="text"
                  value="3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
                  disabled
                />
                <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                  Upload Proof of Payment
                </h1>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-1 bg-transparent"
                  id="imageUpload"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-[#036] text-[#fff] h-[50px] rounded-[10px] w-[40%] mt-10 font-lato text-[24px] text-center"
                  disabled={isLoading}
                  onClick={SubmitCrypto}
                >
                  {isLoading ? (
                    <BeatLoader color={"#ffffff"} />
                  ) : (
                    <h1 className="text-[12px] font-lato font-bold text-[#fff]">
                      Continue
                    </h1>
                  )}
                </button>
                <button
                  type="button"
                  className="border-2 border-[#007A86] h-[50px] rounded-[10px] w-[40%] mt-10 text-center"
                  onClick={() => navigate("/assets")}
                >
                  {isLoading ? (
                    <BeatLoader color={"#000"} />
                  ) : (
                    <h1 className="text-[12px] font-lato font-bold text-[#007A86]">
                      Go Back
                    </h1>
                  )}
                </button>
              </div>
            </div>
          );
          break;
        case "sol":
          setCryptoMenu(
            <div className="p-4">
              <img
                src="https://coin-images.coingecko.com/coins/images/4128/large/solana.png"
                alt="sol"
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                Input SOL Amount
              </h1>
              <input
                className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
                type="text"
                value={amount}
                onChange={(e) => {
                  console.log("SOL Amount Change:", e.target.value);
                  setAmount(e.target.value);
                }}
              />
              <div>
                <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                  Deposit the amount to the following address
                </h1>
                <input
                  className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
                  type="text"
                  value="3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
                  disabled
                />
                <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                  Upload Proof of Payment
                </h1>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-1 bg-transparent"
                  id="imageUpload"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-[#036] text-[#fff] h-[50px] rounded-[10px] w-[40%] mt-10 font-lato text-[24px] text-center"
                  disabled={isLoading}
                  onClick={SubmitCrypto}
                >
                  {isLoading ? (
                    <BeatLoader color={"#ffffff"} />
                  ) : (
                    <h1 className="text-[12px] font-lato font-bold text-[#fff]">
                      Continue
                    </h1>
                  )}
                </button>
                <button
                  type="button"
                  className="border-2 border-[#007A86] h-[50px] rounded-[10px] w-[40%] mt-10 text-center"
                  onClick={() => navigate("/assets")}
                >
                  {isLoading ? (
                    <BeatLoader color={"#000"} />
                  ) : (
                    <h1 className="text-[12px] font-lato font-bold text-[#007A86]">
                      Go Back
                    </h1>
                  )}
                </button>
              </div>
            </div>
          );
          break;
        case "eth":
          setCryptoMenu(
            <div className="p-4">
              <img
                src="https://coin-images.coingecko.com/coins/images/279/large/ethereum.png"
                alt="eth"
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                Input ETH Amount
              </h1>
              <input
                className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
                type="text"
                value={amount}
                onChange={(e) => {
                  console.log("ETH Amount Change:", e.target.value);
                  setAmount(e.target.value);
                }}
              />
              <div>
                <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                  Deposit the amount to the following address
                </h1>
                <input
                  className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-5 bg-transparent"
                  type="text"
                  value="3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy"
                  disabled
                />
                <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
                  Upload Proof of Payment
                </h1>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center w-[100%] p-1 bg-transparent"
                  id="imageUpload"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-[#036] text-[#fff] h-[50px] rounded-[10px] w-[40%] mt-10 font-lato text-[24px] text-center"
                  disabled={isLoading}
                  onClick={SubmitCrypto}
                >
                  {isLoading ? (
                    <BeatLoader color={"#ffffff"} />
                  ) : (
                    <h1 className="text-[12px] font-lato font-bold text-[#fff]">
                      Continue
                    </h1>
                  )}
                </button>
                <button
                  type="button"
                  className="border-2 border-[#007A86] h-[50px] rounded-[10px] w-[40%] mt-10 text-center"
                  onClick={() => navigate("/assets")}
                >
                  {isLoading ? (
                    <BeatLoader color={"#000"} />
                  ) : (
                    <h1 className="text-[12px] font-lato font-bold text-[#007A86]">
                      Go Back
                    </h1>
                  )}
                </button>
              </div>
            </div>
          );
          break;
        default:
          setCryptoMenu(null);
      }
    } else {
      setCryptoMenu(null);
    }
  }, [selectedCrypto, amount]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Please select an image file.");
    }
  };

  const SubmitSocialMedia = async () => {
    setIsLoading(true);
    console.log("Submitting Social Media:", {
      platform: socialMedia,
      username: username,
      password: password,
      description: description,
    });
    try {
      const response = await axios.post(
        "https://api.vassetglobal.com/api/users/social_media",
        {
          platform: socialMedia,
          username: username,
          password: password,
          description: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        setSocialMedia("");
        setUsername("");
        setPassword("");
        setDescription("");
        navigate("/assets");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(errorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };
  const SubmitNFT = async () => {
    setIsLoading(true);
    console.log("Submitting NFT:", {
      name: nftName,
      uri: nftLink,
    });
    try {
      const response = await axios.post(
        "https://api.vassetglobal.com/api/users/nfts",
        {
          name: nftName,
          uri: nftLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        setNftLink("");
        setNftName("");
        navigate("/assets");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(errorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const SubmitYoutube = async () => {
    setIsLoading(true);
    console.log("Submitting NFT:", {
      name: nftName,
      uri: nftLink,
    });
    try {
      const response = await axios.post(
        "https://api.vassetglobal.com/api/users/youtube",
        {
          email: youtubeEmail,
          password: youtubePassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        setNftLink("");
        setNftName("");
        navigate("/assets");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(errorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };
  const SubmitCrypto = async () => {
    setIsLoading(true);
    console.log("Submitting Crypto:", {
      symbol: selectedCrypto,
      amount: Number(amount),
      screenshot: image,
    });
    try {
      const response = await axios.post(
        "https://api.vassetglobal.com/api/users/cryptos",
        {
          symbol: selectedCrypto,
          amount: Number(amount),
          screenshot: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success(response.data.message);
        setAmount("");
        navigate("/assets");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error(errorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 min-h-screen">
      <div className="flex items-center" onClick={() => navigate("/assets")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M8.74986 11.6199L4.94656 7.81656C4.49739 7.36739 4.49739 6.63239 4.94656 6.18323L8.74986 2.37988"
            stroke="#292D32"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="text-[#007A86] font-regular text-[15px]">
          Create New Asset
        </h1>
      </div>
      <div className="p-5">
        <h1 className="text-[#036] lato-bold text-[21px]">Type of Asset</h1>
        <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
          Select Asset
        </h1>
        <div className="h-[40px] rounded-lg border-2 border-[#CCC] items-center flex justify-center">
          <select
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              width: "100%",
            }}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">Select Asset Type</option>
            <option value="crypto">Crypto</option>
            <option value="social_media">Social Media</option>
            <option value="nft">NFT</option>
            <option value="youtube">YouTube</option>
          </select>
        </div>
        {menu}
      </div>
    </div>
  );
};

export default CreateAsset;
