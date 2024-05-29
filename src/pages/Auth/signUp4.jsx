import { useFormik } from "formik";
import "react-phone-number-input/style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";

const SignUp4 = () => {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuth();
  const userId = localStorage.getItem("userId");
  const [save, setSave] = useState(false);
  const saveAndContinue = () => {
    setSave(true);
    formik.handleSubmit();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      formik.setFieldValue("id_picture", file);
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      formik.setFieldValue("id_picture", null);
    }
  };

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
    formik.setFieldValue(
      "id_type",
      ["passport", "nin", "National ID Card", "drivers licence"][buttonNumber]
    );
  };

  const formik = useFormik({
    initialValues: {
      id_type: "",
      id_issue_date: "",
      id_expiration_date: "",
      bvn: "",
      id_picture: null,
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        let formData = new FormData();
        formData.append("id_type", values.id_type);
        formData.append("id_issue_date", values.id_issue_date);
        formData.append("id_expiration_date", values.id_expiration_date);
        formData.append("bvn", values.bvn);
        formData.append("id_picture", values.id_picture);
        formData.append("user_id", userId);

        const response = await axios.post(
          "https://api.vassetglobal.com/api/profile/update-identification",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/dashboard");
          if (save) {
            navigate("/dashboard");
          }
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
    <div className=" bg-[#fff] w-full h-full">
      <div className="stan justify-center items-center align-middle">
        <form onSubmit={formik.handleSubmit}>
          <div className="pt-5 items-center">
            <h1 className="text-[18px] lato-bold text-[#000]  text-center">
              Create Account
            </h1>
            <h1 className="text-[16px] lato-bold text-[#000]  text-center pt-2">
              Identification/KYC Verification
            </h1>
            <h1 className="text-[14px] font-lato text-[#000] pt-[11px]  text-center">
              All fields marked with a * must be completed
            </h1>
            <h1 className="text-[14px] lato-regular text-[#000] pt-[11px]  text-center">
              You’re off to a great start
            </h1>{" "}
            <div className="items-center  justify-center p-5">
              <div>
                <h1 className="text-[18px] lato-bold text-[#000] text-center">
                  Upload your ID Document
                </h1>
                <h1 className="text-[14px] lato-bold text-[#000] pt-[10px] text-center">
                  Select Document Type
                </h1>
              </div>
              <div className="mt-[20px] gap-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => handleButtonClick(0)}
                  className={`border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000] flex items-center ${
                    selectedButton === 0 ? "border-[#005C99]" : ""
                  }`}
                >
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill={selectedButton === 0 ? "#005C99" : "none"}
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7.25"
                        stroke="#005C99"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  Passport
                </button>
                <button
                  type="button"
                  onClick={() => handleButtonClick(1)}
                  className={`border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000] flex items-center ${
                    selectedButton === 1 ? "border-[#005C99]" : ""
                  }`}
                >
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill={selectedButton === 1 ? "#005C99" : "none"}
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7.25"
                        stroke="#005C99"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  NIN
                </button>
              </div>
              <div className="mt-[10px] gap-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => handleButtonClick(2)}
                  className={`border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000] flex items-center ${
                    selectedButton === 2 ? "border-[#005C99]" : ""
                  }`}
                >
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill={selectedButton === 2 ? "#005C99" : "none"}
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7.25"
                        stroke="#005C99"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  National ID Card
                </button>
                <button
                  type="button"
                  onClick={() => handleButtonClick(3)}
                  className={`border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000] flex items-center ${
                    selectedButton === 3 ? "border-[#005C99]" : ""
                  }`}
                >
                  <div className="mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill={selectedButton === 3 ? "#005C99" : "none"}
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7.25"
                        stroke="#005C99"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                  Drivers Licence
                </button>
              </div>

              <div className="mt-[10px]">
                <h1 className="text-[14px] lato-bold text-[#000] pb-[10px]">
                  Issue Date *
                </h1>
                <input
                  type="date"
                  required
                  name="id_issue_date"
                  onChange={formik.handleChange}
                  value={formik.values.id_issue_date}
                  className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000] flex items-center"
                />
                <h1 className="text-[10px] lato-bold text-[red] pb-[10px]">
                  Format: YYYY-MM-DD
                </h1>
                <div>
                  <h1 className="text-[14px] lato-bold text-[#000] pb-[10px]">
                    Expiration Date *
                  </h1>
                  <input
                    type="date"
                    required
                    name="id_expiration_date"
                    onChange={formik.handleChange}
                    value={formik.values.id_expiration_date}
                    className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000] flex items-center outline-none"
                    placeholder="Expiration Date"
                  />
                  <h1 className="text-[10px] lato-bold text-[red] pb-[10px]">
                    Format: YYYY-MM-DD
                  </h1>
                </div>
              </div>

              <div className="pt-5">
                <h1 className="text-[14px] lato-bold text-[#000] pb-[10px]">
                  BVN *
                </h1>
                <input
                  type="text"
                  required
                  name="bvn"
                  onChange={formik.handleChange}
                  value={formik.values.bvn}
                  className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[98%] px-2 bg-white text-[#000]"
                />
              </div>

              <div className="pt-5 ">
                <h1 className="text-[14px] lato-bold text-[#000] pb-[10px]">
                  Upload Picture *
                </h1>
                <div className="flex align-middle gap-10 items-center justify-center">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-[#fff] text-[#888] w-[95%] px-2 h-[40px] rounded-[10px] font-lato border-2 border-[#D9E7F0] cursor-pointer"
                      id="imageUpload"
                    />
                  </div>
                  {image && (
                    <img
                      src={image}
                      alt="Uploaded"
                      className=" w-[50px] h-[50px] justify-center items-center"
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#036] text-[#fff] w-[300px] h-[40px] rounded-[50px] mt-[20px] font-lato"
                >
                  {isLoading ? (
                    <BeatLoader color={"#ffffff"} />
                  ) : (
                    "Save & Continue"
                  )}
                </button>
              </div>
              <div className="flex pt-3 justify-center">
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
              <div
                onClick={() => saveAndContinue()}
                className="text-[#036] font-lato text-[14px] pt-6 underline text-center"
              >
                <h1 className="">
                  {isLoading ? (
                    <BeatLoader color={"#000"} />
                  ) : (
                    <h1 className="text-[#036] font-lato text-[14px] pt-6 underline text-center">
                      Save & Return to Dashboard
                    </h1>
                  )}
                </h1>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp4;
