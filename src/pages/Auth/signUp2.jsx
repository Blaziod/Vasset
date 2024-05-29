import { useFormik } from "formik";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";
import { useState } from "react";

const SignUp2 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuth();
  const userId = localStorage.getItem("userId");

  const formik = useFormik({
    initialValues: {
      country: "",
      streetAddress: "",
      city: "",
      state: "",
      postalCode: "",
      phoneNumber: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        let formData = new FormData();
        formData.append("country", values.country);
        formData.append("state", values.state);
        formData.append("address", values.streetAddress);
        formData.append("city", values.city);
        formData.append("postal_code", values.postalCode);
        formData.append("user_id", userId);

        const response = await axios.post(
          "https://api.vassetglobal.com/api/profile/update-address",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Signup Successful");
          navigate("/next-of-kin");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error signing in:", error);
        toast.error(errorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="bg-[#fff] w-full h-full">
      <div className="stan justify-center items-center align-middle">
        <form onSubmit={formik.handleSubmit}>
          <div className="p-5 items-center justify-center align-middle">
            <h1 className="text-[18px] font-lato font-bold text-[#000]  text-center">
              Create Account
            </h1>
            <h1 className="text-[16px] font-lato font-bold text-[#000]  text-center pt-2">
              Contact Address & Information
            </h1>
            <h1 className="text-[14px] font-lato text-[#000] pt-[11px]  text-center">
              All fields marked with a * must be completed
            </h1>
            <h1 className="text-[14px] font-lato text-[#000] pt-[11px]  text-center">
              You’re off to a great start
            </h1>{" "}
            <div>
              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px]">
                  Country *
                </h1>
                <input
                  type="text"
                  required
                  name="country"
                  onChange={formik.handleChange}
                  className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000]"
                />
              </div>
              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px]">
                  Street Address *
                </h1>
                <div style={{ position: "relative" }}>
                  <input
                    type={"text"}
                    required
                    name="streetAddress" // added
                    onChange={formik.handleChange} // added
                    className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000]"
                  />
                </div>
              </div>
              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px]">
                  City *
                </h1>
                <div style={{ position: "relative" }}>
                  <input
                    type={"text"}
                    required
                    name="city" // added
                    onChange={formik.handleChange} // added
                    className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000]"
                  />
                </div>
              </div>
              <div className=" pt-5">
                <div>
                  <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px]">
                    State *
                  </h1>
                  <input
                    type="text"
                    required
                    name="state" // added
                    onChange={formik.handleChange} // added
                    className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000]"
                  />
                </div>
                <div>
                  <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px] ">
                    Postal Code *
                  </h1>
                  <input
                    type="text"
                    required
                    name="postalCode" // added
                    onChange={formik.handleChange}
                    className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000]"
                  />
                </div>
              </div>
              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px]">
                  Phone Number *
                </h1>
                <div>
                  <PhoneInput
                    placeholder="Enter phone number"
                    international
                    defaultCountry="US"
                    name="phoneNumber" // added
                    onChange={formik.handleChange}
                    className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000]"
                  />
                </div>
              </div>
              <div className="flex align-middle items-center justify-center">
                <button
                  type="submit"
                  className="bg-[#036] text-[#fff] w-[300px] h-[40px] rounded-[50px] mt-[20px] font-lato"
                >
                  {isLoading ? (
                    <BeatLoader color={"#ffffff"} />
                  ) : (
                    <h1 className="text-[24px] font-lato font-bold text-[#fff]">
                      Save & Continue
                    </h1>
                  )}
                </button>
              </div>
              <div className="flex pt-5 gap-2 justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.91658 4.95833H10.4999C11.1416 4.95833 11.6666 5.48333 11.6666 6.125V11.9583C11.6666 12.6 11.1416 13.125 10.4999 13.125H3.49992C2.85825 13.125 2.33325 12.6 2.33325 11.9583V6.125C2.33325 5.48333 2.85825 4.95833 3.49992 4.95833H4.08325V3.79167C4.08325 2.18167 5.38992 0.875 6.99992 0.875C8.60992 0.875 9.91658 2.18167 9.91658 3.79167V4.95833ZM6.99992 2.04167C6.03159 2.04167 5.24992 2.82333 5.24992 3.79167V4.95833H8.74992V3.79167C8.74992 2.82333 7.96825 2.04167 6.99992 2.04167ZM3.49992 11.9583V6.125H10.4999V11.9583H3.49992ZM8.16658 9.04167C8.16658 9.68333 7.64158 10.2083 6.99992 10.2083C6.35825 10.2083 5.83325 9.68333 5.83325 9.04167C5.83325 8.4 6.35825 7.875 6.99992 7.875C7.64158 7.875 8.16658 8.4 8.16658 9.04167Z"
                    fill="#8692A6"
                  />
                </svg>
                <h1 className="text-[12px] font-lato text-[#8692A6]">
                  Your Info is safely secured
                </h1>
              </div>
              <h1 className="text-[#036] font-lato text-[14px] pt-6 underline text-center">
                Save & return to Dashboard
              </h1>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp2;
