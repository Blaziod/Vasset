import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";
import { BeatLoader } from "react-spinners";
import Profile from ".";

const MyProfile = () => {
  const { authToken, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://api.vassetglobal.com/api/profile",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Profile fetched successfully");
          setProfile(response.data.user_profile || {});
          console.log(Profile);
          setIsLoading(false);
        } else if (response.status === 401) {
          toast.error("Unauthorized access, please login");
          setIsLoading(false);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
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
  }, []);

  return (
    <div className="p-5">
      <div>
        <h1 className="text-[24px] text-[#036] lato-bold">My Profile</h1>
      </div>
      <div className="pt-10">
        <img
          src={profile?.profile_picture}
          className="w-12 h-12 rounded-full bg-[#036] cursor-pointer"
        />
      </div>
      <div className="pt-5">
        <h1 className="text-[16px] text-[#000000] lato-bold">
          {profile?.firstname} {profile.lastname}
        </h1>
      </div>
      <div className="pt-2">
        <h1 className="text-[15px] text-[#707070] lato-regular">Novice</h1>
      </div>
      <div className="pt-2">
        <h1 className="text-[13px] text-[#AAAAAA] lato-regular">
          {profile?.address}
        </h1>
      </div>
      <div className="p-5">
        <h1 className="text-[22px] text-[#007A86] lato-bold pt-5">
          Personal Information
        </h1>
        <div className="pt-5">
          <h1 className="text-[16px] text-[#000] lato-bold">First Name</h1>
          <div className="pt-2">
            <input
              type="text"
              placeholder={profile?.firstname}
              className="border-2 border-[#aaa] rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-[16px] text-[#000] lato-bold">Last Name</h1>
          <div className="pt-2">
            <input
              type="text"
              placeholder={profile?.lastname}
              className="border-2 border-[#aaa] rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-[16px] text-[#000] lato-bold">Email</h1>
          <div className="pt-2">
            <input
              type="text"
              placeholder={profile?.email}
              className="border-2 border-[#aaa] rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-[16px] text-[#000] lato-bold">Phone Number</h1>
          <div className="pt-2">
            <input
              type="text"
              placeholder={profile?.phone || "Input Phone Number"}
              className="border-2 border-[#aaa] rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-[16px] text-[#000] lato-bold"> Username</h1>
          <div className="pt-2">
            <input
              type="text"
              placeholder={profile?.username || "Input Username"}
              className="border-2 border-[#aaa] rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="pt-5" />
        <div className="flex gap-2 items-center border-2 border-[#036] p-2 h-[auto] w-[auto] rounded-[10px] justify-center">
          <h1 className="text-[16px] text-[#036] lato-bold"> Update</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7.73524 2.09996L2.94607 7.16913C2.76524 7.36163 2.59024 7.7408 2.55524 8.0033L2.33941 9.8933C2.26357 10.5758 2.75357 11.0425 3.43024 10.9258L5.30857 10.605C5.57107 10.5583 5.93857 10.3658 6.11941 10.1675L10.9086 5.0983C11.7369 4.2233 12.1102 3.2258 10.8211 2.00663C9.53774 0.79913 8.56357 1.22496 7.73524 2.09996Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity="0.4"
              d="M6.93567 2.9458C7.1865 4.5558 8.49317 5.78663 10.1148 5.94997"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity="0.4"
              d="M1.75 12.8334H12.25"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-[22px] text-[#007A86] lato-bold pt-5">Address</h1>
        <div className="pt-5">
          <h1 className="text-[16px] text-[#000] lato-bold">Country</h1>
          <div className="pt-2">
            <input
              type="text"
              placeholder={profile?.country || "Input Your Country"}
              className="border-2 border-[#aaa] rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-[16px] text-[#000] lato-bold">City/State</h1>
          <div className="pt-2">
            <input
              type="text"
              placeholder={profile?.city || "Input Your State"}
              className="border-2 border-[#aaa] rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="pt-5">
          <h1 className="text-[16px] text-[#000] lato-bold">Postal Code</h1>
          <div className="pt-2">
            <input
              type="text"
              placeholder={profile?.postal_code || "Input Your Postal Code"}
              className="border-2 border-[#aaa] rounded-lg p-2 w-full"
            />
          </div>
        </div>

        <div className="pt-5" />
        <div className="flex gap-2 items-center border-2 border-[#036] p-2 h-[auto] w-[auto] rounded-[10px] justify-center">
          <h1 className="text-[16px] text-[#036] lato-bold"> Update</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M7.73524 2.09996L2.94607 7.16913C2.76524 7.36163 2.59024 7.7408 2.55524 8.0033L2.33941 9.8933C2.26357 10.5758 2.75357 11.0425 3.43024 10.9258L5.30857 10.605C5.57107 10.5583 5.93857 10.3658 6.11941 10.1675L10.9086 5.0983C11.7369 4.2233 12.1102 3.2258 10.8211 2.00663C9.53774 0.79913 8.56357 1.22496 7.73524 2.09996Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity="0.4"
              d="M6.93567 2.9458C7.1865 4.5558 8.49317 5.78663 10.1148 5.94997"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              opacity="0.4"
              d="M1.75 12.8334H12.25"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
