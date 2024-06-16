import React, { useState } from "react";
import {
  Routes as RouterRoutes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "context/AuthContext";
import {
  VassetName,
  VassetLogo,
  AssetImage,
  LoanImage,
  LogoutImage,
  SupportImage,
  TransactionsImage,
  TrustImage,
  DashboardImage,
  InvestImage,
  ProfileImage,
} from "./Svg";
import UnProtectedRoute from "routes/unprotectedRoute";
import ProtectedRoute from "routes/protectedRoute";
import SignUp1 from "pages/Auth/signUp1";
import SignIn from "pages/Auth/signIn";
import SignUp2 from "pages/Auth/signUp2";
import SignUp3 from "pages/Auth/signUp3";
import SignUp4 from "pages/Auth/signUp4";
import Dashboard from "pages/Dashboard";
import Assets from "pages/Assets/assets";
import Transactions from "pages/Transactions";
import TrustFund from "pages/TrustFund";
import Profile from "pages/Profile";
import Invest from "pages/Invest";
import Loan from "pages/Loan";
import Homepage from "pages/Homepage";
import Support from "pages/Support";
import axios from "axios";
import toast from "react-hot-toast";
import { errorMessage } from "utils/error-message";
import { BeatLoader } from "react-spinners";
import CreateAsset from "pages/Assets/createAssets";
import MyProfile from "pages/Profile/myProfile";
import { useNavigate } from "react-router-dom";
import PrivacyPolicy from "pages/Profile/privacyPolicy";
import Deposit from "deposit/deposit";

const Layout = () => {
  const { authToken, logout } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const authRoutes = [
    "/create-account",
    "/contact-address",
    "/next-of-kin",
    "/identification",
    "/login",
    "/home",
  ];
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  const LogOut = () => {
    setIsLoading(true);
    axios
      .delete("https://api.vassetglobal.com/api/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Logout successful");
        setIsLoading(false);
        setIsMenuVisible(false);
        logout();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error(errorMessage(error));
        if (error.response.status === 401) {
          logout();
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          navigate("/login");
        }
        setIsLoading(false);
      });
  };

  const Menu = () => (
    <div className="absolute top-5 left-0 w-[80%] h-[auto] bg-[#c4daf1] shadow-[50px] flex flex-col rounded-tr-[50px] rounded-br-[50px] p-5 z-50">
      <div className="flex justify-between pt-10 pb-10 items-center">
        <div className="flex ">
          <div>
            <VassetLogo />
          </div>
          <div>
            <VassetName />
          </div>
        </div>
        <div
          className="bg-[#fff] rounded-full p-2"
          onClick={() => setIsMenuVisible(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
          >
            <path
              d="M6.41285 5.00046L9.47952 1.9338C9.86619 1.54714 9.86619 0.907135 9.47952 0.520469C9.09285 0.133802 8.45285 0.133802 8.06619 0.520469L4.99952 3.58712L1.93281 0.520469C1.54615 0.133802 0.906146 0.133802 0.519492 0.520469C0.132826 0.907135 0.132826 1.54714 0.519492 1.9338L3.58618 5.00046L0.519492 8.06712C0.132826 8.45379 0.132826 9.09379 0.519492 9.48046C0.719492 9.68046 0.972811 9.77379 1.22614 9.77379C1.47948 9.77379 1.73281 9.68046 1.93281 9.48046L4.99952 6.41379L8.06619 9.48046C8.26619 9.68046 8.51952 9.77379 8.77285 9.77379C9.02619 9.77379 9.27952 9.68046 9.47952 9.48046C9.86619 9.09379 9.86619 8.45379 9.47952 8.06712L6.41285 5.00046Z"
              fill="#005C99"
            />
          </svg>
        </div>
      </div>
      <div className="pl-10 flex flex-col gap-5">
        <div
          className="flex gap-1 p-5 rounded-lg items-center bg-[#F5F5F5]"
          onClick={() => {
            setIsMenuVisible(false);
            navigate("/dashboard");
          }}
        >
          <DashboardImage />
          <h1 className="font-bold text-[#036] text-[15px]">Dashboard</h1>
        </div>

        <div
          className="flex gap-1 p-5 rounded-lg items-center bg-[#F5F5F5]"
          onClick={() => {
            setIsMenuVisible(false);
            navigate("/assets");
          }}
        >
          <AssetImage />
          <h1 className="font-bold text-[#036] text-[15px]">Assets</h1>
        </div>

        <div
          className="flex gap-1 p-5 rounded-lg items-center bg-[#F5F5F5]"
          onClick={() => {
            setIsMenuVisible(false);
            navigate("/transactions");
          }}
        >
          <TransactionsImage />
          <h1 className="font-bold text-[#036] text-[15px]">Transactions</h1>
        </div>

        <div
          className="flex gap-1 p-5 rounded-lg items-center bg-[#F5F5F5]"
          onClick={() => {
            setIsMenuVisible(false);
            navigate("/invest");
          }}
        >
          <InvestImage />
          <h1 className="font-bold text-[#036] text-[15px]">Invest</h1>
        </div>

        <div
          className="flex gap-1 p-5 rounded-lg items-center bg-[#F5F5F5]"
          onClick={() => {
            setIsMenuVisible(false);
            navigate("/trustfund");
          }}
        >
          <TrustImage />
          <NavLink to="/trustfund">
            <h1 className="font-bold text-[#036] text-[15px]">Trust Fund</h1>
          </NavLink>
        </div>
        <div
          className="flex gap-1 p-5 rounded-lg items-center bg-[#F5F5F5]"
          onClick={() => {
            setIsMenuVisible(false);
            navigate("/profile");
          }}
        >
          <ProfileImage />
          <NavLink to="/profile">
            <h1 className="font-bold text-[#036] text-[15px]">Profile</h1>
          </NavLink>
        </div>

        <div
          className="flex gap-1 p-5 rounded-lg items-center bg-[#F5F5F5]"
          onClick={() => {
            setIsMenuVisible(false);
            navigate("/support");
          }}
        >
          <SupportImage />
          <NavLink to="/support">
            <h1 className="font-bold text-[#036] text-[15px]">Support</h1>
          </NavLink>
        </div>
        <div
          className="flex gap-1 p-5 rounded-lg items-center bg-[#F5F5F5]"
          onClick={() => {
            LogOut();
          }}
        >
          {isLoading ? (
            <BeatLoader color={"#000"} />
          ) : (
            <>
              <LogoutImage />
              <h1 className="font-bold text-[#EB5757] text-[15px]">Logout</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full h-full relative ${isMenuVisible ? "" : ""}`}>
      {!authRoutes.includes(location.pathname) && (
        <div className="flex bg-white pt-5 pb-5 justify-between place-items-start pr-5 pl-5">
          <div className="flex">
            <div>
              <VassetLogo />
            </div>
            <div>
              <VassetName />
            </div>
          </div>
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 30 30"
              fill="none"
            >
              <rect
                width="30"
                height="30"
                rx="15"
                fill="#005C99"
                fillOpacity="0.05"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.1609 4.01109C9.23397 4.9789 6.3217 8.52471 6.3217 12.7504V14.375C6.3217 16.5814 5.6348 19.3454 4.97104 21.5011C4.44932 23.1954 5.68567 25 7.45854 25H12.5003C12.5003 25.3283 12.5649 25.6534 12.6905 25.9567C12.8161 26.26 13.0004 26.5356 13.2325 26.7677C13.4646 26.9999 13.7403 27.184 14.0435 27.3097C14.3469 27.4354 14.672 27.5 15.0003 27.5C15.3285 27.5 15.6536 27.4354 15.957 27.3097C16.2603 27.184 16.5359 26.9999 16.768 26.7677C17.0001 26.5356 17.1843 26.26 17.31 25.9567C17.4356 25.6534 17.5003 25.3283 17.5003 25H22.887C24.5626 25 25.7795 23.3799 25.3967 21.7486C24.8805 19.5501 24.3216 16.6451 24.3216 14.375V12.7504C24.3216 8.28563 21.0705 4.57984 16.8065 3.87191C16.7863 3.79915 16.7615 3.72754 16.7325 3.65746C16.6383 3.42999 16.5001 3.22329 16.3261 3.04918C16.152 2.87506 15.9453 2.73695 15.7178 2.64273C15.4903 2.5485 15.2465 2.5 15.0003 2.5C14.754 2.5 14.5103 2.5485 14.2828 2.64273C14.0553 2.73695 13.8485 2.87506 13.6744 3.04918C13.5004 3.22329 13.3623 3.42999 13.268 3.65746C13.2206 3.7718 13.1848 3.89026 13.1609 4.01109ZM8.1967 12.7504V14.375C8.1967 16.8801 7.43461 19.8716 6.76301 22.0529C6.68394 22.3096 6.73357 22.5874 6.88884 22.8085C7.03956 23.0231 7.24352 23.125 7.45854 23.125H22.887C23.2855 23.125 23.6938 22.6992 23.5713 22.1771C23.051 19.9609 22.4466 16.8765 22.4466 14.375V12.7504C22.4466 8.81528 19.2566 5.625 15.3216 5.625C11.3868 5.625 8.1967 8.81528 8.1967 12.7504Z"
                fill="#007A86"
              />
              <circle
                cx="21.5"
                cy="7.5"
                r="3"
                fill="#EB5757"
                stroke="#E9EEF1"
              />
            </svg>
            <div>
              <img />
            </div>
            <div onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 27 27"
                fill="none"
              >
                <path
                  d="M3.375 7.875H23.625"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3.375 13.5H23.625"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M3.375 19.125H23.625"
                  stroke="#292D32"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      {isMenuVisible && (
        <>
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            onClick={toggleMenu}
          ></div>
          <Menu />
        </>
      )}
      <div
        className={`bg-[#F5F5F5] w-full h-full ${isMenuVisible ? "fixed" : ""}`}
      >
        <RouterRoutes>
          <Route
            path="/login"
            element={
              <UnProtectedRoute>
                <SignIn />
              </UnProtectedRoute>
            }
          />
          <Route path="/create-account" element={<SignUp1 />} />
          <Route path="/contact-address" element={<SignUp2 />} />
          <Route path="/next-of-kin" element={<SignUp3 />} />
          <Route path="/identification" element={<SignUp4 />} />
          <Route path="/home" element={<Homepage />} />
          {/* Private routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assets"
            element={
              <ProtectedRoute>
                <Assets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <ProtectedRoute>
                <Deposit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <ProtectedRoute>
                <PrivacyPolicy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-assets"
            element={
              <ProtectedRoute>
                <CreateAsset />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trustfund"
            element={
              <ProtectedRoute>
                <TrustFund />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invest"
            element={
              <ProtectedRoute>
                <Invest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/loan"
            element={
              <ProtectedRoute>
                <Loan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </RouterRoutes>
      </div>
    </div>
  );
};

export default Layout;
