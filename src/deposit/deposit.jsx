import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import BTCQR from "assets/BTCQRCODE.png";
import USDT_ERC20_QR from "assets/TRC20USDT.png";
import USDT_TRC20_QR from "assets/REALUSDTTRC20.png";
import USDT_BEP20_QR from "assets/TRC20USDT.png";
import ETH_ERC20_QR from "assets/btcqr.png";
import ETH_BEP20_QR from "assets/btcqr.png";
import ETH_ARBITRUM_QR from "assets/btcqr.png";
import SOLQR from "assets/btcqr.png";

const CustomSingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <img src={props.data.logo} style={{ width: 20, marginRight: 10 }} alt="" />
    {children}
  </components.SingleValue>
);

const CustomOption = (props) => (
  <components.Option {...props}>
    <img src={props.data.logo} style={{ width: 20, marginRight: 10 }} alt="" />
    {props.data.label}
  </components.Option>
);

const Deposit = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [walletType, setWalletType] = useState("");
  const [walletTypeOptions, setWalletTypeOptions] = useState([]);
  const [qrCodeURL, setQrCodeURL] = useState("");
  const [depositWallet, setDepositWallet] = useState("");
  const [depositInstructions, setDepositInstructions] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [image, setImage] = useState(null);

  const options = [
    {
      value: "BTC",
      label: "Bitcoin (BTC)",
      logo: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    {
      value: "USDT",
      label: "USDT",
      logo: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
    },
    {
      value: "ETH",
      label: "Ethereum (ETH)",
      logo: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png",
    },
    {
      value: "SOL",
      label: "Solana (SOL)",
      logo: "https://coin-images.coingecko.com/coins/images/4128/large/solana.png",
    },
  ];

  const animatedComponents = makeAnimated();

  const customStyles = {
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const navigate = useNavigate();
  const coinData = {
    BTC: {
      walletTypes: [
        { type: "BTC", address: "1DKJgf6M9iH2B4Bo1zVvnyWtf9jrAqPo12" },
      ],
      qrCodeURL: BTCQR,
      depositInstructions:
        "Please make sure that only BTC deposit is made via this address. Otherwise, your deposited funds will not be added to your available balance — nor will it be refunded.",
    },
    USDT: {
      walletTypes: [
        {
          type: "ERC20",
          address: "0x1d7c076bde4d82ae052641496e05cb75fa06852d",
          qrCodeURL: USDT_ERC20_QR,
        },
        {
          type: "TRC20",
          address: "TUxJE4Ptg3ECm88tgkJwBKsfTuoQW8LYgN",
          qrCodeURL: USDT_TRC20_QR,
        },
        {
          type: "BEP20 (BSC)",
          address: "0x1d7c076bde4d82ae052641496e05cb75fa06852d",
          qrCodeURL: USDT_BEP20_QR,
        },
      ],
      depositInstructions:
        "Please make sure that only USDT deposit is made via this address. Otherwise, your deposited funds will not be added to your available balance — nor will it be refunded.",
    },
    ETH: {
      walletTypes: [
        {
          type: "ERC20",
          address: "0xExampleERC20ETH",
          qrCodeURL: ETH_ERC20_QR,
        },
        {
          type: "BEP20 (BSC)",
          address: "0xExampleBEP20ETH",
          qrCodeURL: ETH_BEP20_QR,
        },
        {
          type: "Arbitrum",
          address: "0xExampleArbitrum",
          qrCodeURL: ETH_ARBITRUM_QR,
        },
      ],
      depositInstructions:
        "Please make sure that only ETH deposit is made via this address. Otherwise, your deposited funds will not be added to your available balance — nor will it be refunded.",
    },
    SOL: {
      walletTypes: [
        { type: "SOL", address: "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy" },
      ],
      qrCodeURL: SOLQR,
      depositInstructions:
        "Please make sure that only SOL deposit is made via this address. Otherwise, your deposited funds will not be added to your available balance — nor will it be refunded.",
    },
  };

  const handleCoinChange = (option) => {
    setSelectedOption(option.value);

    const data = coinData[option.value];
    if (data) {
      setWalletType(data.walletTypes[0].type);
      setWalletTypeOptions(
        data.walletTypes.map((type) => ({ value: type.type, label: type.type }))
      );
      setQrCodeURL(data.walletTypes[0].qrCodeURL || data.qrCodeURL);
      setDepositWallet(data.walletTypes[0].address);
      setDepositInstructions(data.depositInstructions);
    }
  };

  const handleWalletTypeChange = (option) => {
    setWalletType(option.value);
    const selectedCoinData = coinData[selectedOption];
    const selectedWalletType = selectedCoinData.walletTypes.find(
      (wt) => wt.type === option.value
    );
    if (selectedWalletType) {
      setDepositWallet(selectedWalletType.address);
      setQrCodeURL(selectedWalletType.qrCodeURL || selectedCoinData.qrCodeURL);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select an image file.");
    }
  };

  const handleSubmit = async () => {
    try {
      const depositResponse = await axios.post(
        "https://api.vassetglobal.com/api/deposit",
        {
          coin: selectedOption,
          networkType: walletType,
          amount: depositAmount,
          wallet_address: "sljsknflkasnlf",
        }
      );
      if (depositResponse.status === 200) {
        if (image) {
          const formData = new FormData();
          formData.append("proof", image);
          await axios.post(
            "https://api.vassetglobal.com/api/payment/screenshot/1",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
        toast.success("Deposit request submitted successfully!");
      } else {
        toast.error("Error in submitting deposit request");
      }
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  const fetchCryptoData = async (cryptoId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}`
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  // Example usage
  fetchCryptoData("bitcoin");

  return (
    <div className="p-5 min-h-screen">
      <div>
        <div
          className="pb-5 flex items-center gap-5"
          onClick={() => navigate("/dashboard")}
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
          <h1 className="text-[14px] text-[#000] lato-bold">Dashboard</h1>
        </div>
        <h1 className="text-[24px] text-[#036] lato-bold">Deposit</h1>
        <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
          Choose Coin
        </h1>
        <div>
          <Select
            components={{
              SingleValue: CustomSingleValue,
              Option: CustomOption,
              animatedComponents,
            }}
            options={options}
            value={options.find((option) => option.value === selectedOption)}
            onChange={handleCoinChange}
            styles={customStyles}
          />
        </div>

        {selectedOption && (
          <>
            <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
              Deposit Network
            </h1>
            <Select
              options={walletTypeOptions}
              value={walletTypeOptions.find(
                (option) => option.value === walletType
              )}
              onChange={handleWalletTypeChange}
            />
          </>
        )}
        <div className="flex items-center justify-center p-5">
          {qrCodeURL && (
            <img
              src={qrCodeURL}
              alt="QR Code"
              className="w-[200px] h-[200px]"
            />
          )}
        </div>
        {depositWallet && (
          <>
            <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
              Deposit Address
            </h1>
            <div className="w-full bg-white p-2 border-2 border-[#b1b1b1] rounded-lg items-center text-center">
              {depositWallet}
            </div>
            <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
              Deposit Amount
            </h1>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Deposit Amount"
              className="w-full bg-white p-2 border-2 border-[#b1b1b1] rounded-lg items-center"
            />
            <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-4">
              Evidence of Payment
            </h1>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full bg-white p-2 border-2 border-[#b1b1b1] rounded-lg items-center"
                id="imageUpload"
              />
            </div>
          </>
        )}
        {depositInstructions && (
          <>
            <h1 className="text-[#005C99] lato-bold pt-5 text-[16px] pb-2">
              Send Only {selectedOption} to this Address!
            </h1>
            <p className="text-[#333333] lato-regular text-[14px] pb-4">
              {depositInstructions}
            </p>
          </>
        )}
        <div
          className=" flex flex-col w-[auto] h-[auto] p-5 rounded-lg cursor-pointer"
          style={{ backgroundColor: "rgba(0, 92, 153, 0.07)" }}
        >
          <h1 className="text-[#007A86] lato-bold text-[17px] pb-2">
            Important
          </h1>
          <div className="">
            <ul
              className="text-[#666666] lato-regular text-[12px]"
              style={{ listStyleType: "disc", paddingLeft: "20px" }}
            >
              <li className="pb-2">
                It may take a while for your deposit to reflect in your balance
                please be patient.
              </li>
              <li className="pb-2">
                You can check your deposit status by going to Transactions
              </li>
              <li className="pb-2">
                If you have any complaints or Inquires Click here
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#036] text-white rounded-lg justify-center mt-5 mb-20 w-[150px] h-[40px]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Deposit;
