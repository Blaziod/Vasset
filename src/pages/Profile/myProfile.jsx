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
  }, []);

  return (
    <div className="p-5">
      <div>
        <h1 className="text-[24px] text-[#036] lato-bold">My Profile</h1>
      </div>
      <div className="pt-10">
        <img
          src="https://res.cloudinary.com/dk5bvgq20/image/upload/v1634026824/Vector"
          className="w-12 h-12 rounded-full bg-[#036] cursor-pointer"
        />
        <h1 className="text-[12px] text-[#036] lato-regular">
          Upload your profile picture
        </h1>
      </div>
      <div className="pt-5">
        <h1 className="text-[16px] text-[#000000] lato-bold">
          {profile?.firstname} {profile.user_profile?.lastname}
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
      </div>
    </div>
  );
};
export default MyProfile;
