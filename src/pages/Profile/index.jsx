import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { errorMessage } from "utils/error-message";
import { BeatLoader } from "react-spinners";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();
  const token = localStorage.getItem("accessToken");

  const handleDeleteAccount = () => {
    setIsLoading(true);

    axios
      .delete("https://api.vassetglobal.com/api/delete-account", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response data:", response.data);
        toast.success("Account Deleted successful");
        setIsLoading(false);
        logout();
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error(errorMessage(error));
        if (error.response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          navigate("/login");
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="p-2 h-full">
      <h1 className="text-[25px] text-[#003366] lato-bold ">
        Account Settings
      </h1>
      <div className="flex flex-col gap-5 h-[90vh] p-5">
        <div
          className=" flex justify-between w-full p-5 bg-white rounded-lg border-[#000] border-2"
          onClick={() => navigate("/my-profile")}
        >
          <h1 className="text-[18px] text-[#000] lato-bold">My Profile</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7.50025 3.3999L12.9335 8.83323C13.5752 9.4749 13.5752 10.5249 12.9335 11.1666L7.50025 16.5999"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className=" flex justify-between w-full p-5 bg-white rounded-lg border-2 border-[#000]">
          <h1 className="text-[18px] text-[#000] lato-bold">
            Login & Security
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7.50025 3.3999L12.9335 8.83323C13.5752 9.4749 13.5752 10.5249 12.9335 11.1666L7.50025 16.5999"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div
          className=" flex justify-between w-full p-5 bg-white rounded-lg border-2 border-[#000]"
          onClick={() => navigate("/privacy-policy")}
        >
          <h1 className="text-[18px] text-[#000] lato-bold">
            Terms & Policies
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M7.50025 3.3999L12.9335 8.83323C13.5752 9.4749 13.5752 10.5249 12.9335 11.1666L7.50025 16.5999"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className=" flex justify-center w-full p-5 bg-[#036] rounded-lg border-[#EB5757] border-2">
          <button onClick={handleDeleteAccount} disabled={isLoading}>
            {isLoading ? (
              <BeatLoader color={"#000"} />
            ) : (
              <h1 className="text-[18px] text-[#EB5757] lato-bold text-center">
                Delete Account
              </h1>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
