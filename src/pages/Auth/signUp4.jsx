import { useFormik } from "formik";
import * as yup from "yup";
import Vasset from "../../assets/vasset.png";
import "react-phone-number-input/style.css";
import { useState } from "react";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain a number")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignUp4 = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="flex bg-[#fff] w-[100vw]">
      <div className="flex justify-start w-[30%]">
        <img src={Vasset} className="h-[100vh]" />
      </div>
      <div className="stan justify-center items-center pl-[206px] pr-[206px] align-middle">
        <form onSubmit={formik.handleSubmit}>
          <div className="pt-5 items-center">
            <h1 className="text-[18px] font-lato font-bold text-[#000]  text-center">
              Create Account
            </h1>
            <h1 className="text-[16px] font-lato font-bold text-[#000]  text-center pt-2">
              Identification/KYC Verification
            </h1>
            <h1 className="text-[14px] font-lato text-[#000] pt-[11px]  text-center">
              All fields marked with a * must be completed
            </h1>
            <h1 className="text-[14px] font-lato text-[#000] pt-[11px]  text-center">
              You’re off to a great start
            </h1>{" "}
            <div className="items-center  justify-center">
              <div>
                <h1 className="text-[18px] font-lato font-bold text-[#000] pt-[35px]">
                  Upload your ID Document
                </h1>
                <h1 className="text-[14px] font-lato font-bold text-[#000] pt-[20px]">
                  Select Document Type
                </h1>
              </div>
              <div className="mt-[20px] flex justify-between">
                <button
                  onClick={() => handleButtonClick(0)}
                  className="border-2 border-[#D9E7F0] w-[250px] h-[40px] px-2 rounded-[10px] text-[#000] bg-white  flex items-center"
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
                  onClick={() => handleButtonClick(1)}
                  className="border-2 border-[#D9E7F0] w-[250px] h-[40px] px-2 rounded-[10px] text-[#000] bg-white  flex items-center"
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
              <div className="mt-[10px] flex justify-between">
                <button
                  onClick={() => handleButtonClick(2)}
                  className="border-2 border-[#D9E7F0] w-[250px] h-[40px] px-2 rounded-[10px] text-[#000] bg-white  flex items-center"
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
                  onClick={() => handleButtonClick(3)}
                  className="border-2 border-[#D9E7F0] w-[250px] h-[40px] px-2 rounded-[10px] text-[#000] bg-white  flex items-center"
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

              <div className="pt-5 flex justify-between">
                <div>
                  <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px]">
                    Issue Date *
                  </h1>
                  <input
                    type="text"
                    required
                    className="border-2 border-[#D9E7F0] w-[250px] h-[30px] px-2 rounded-[10px] text-[#000] bg-white"
                  />
                </div>
                <div>
                  <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px]">
                    Expiration Date *
                  </h1>
                  <input
                    type="text"
                    required
                    className="border-2 border-[#D9E7F0] w-[250px] h-[30px] px-2 rounded-[10px] text-[#000] bg-white"
                  />
                </div>
              </div>

              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px]">
                  BVN *
                </h1>
                <div style={{ position: "relative" }}>
                  <input
                    type={"text"}
                    required
                    className="border-2 border-[#D9E7F0] w-[600px] h-[30px] px-2 rounded-[10px] bg-white text-[#000]"
                  />
                </div>
              </div>
              {/* let formValues = JSON.parse(localStorage.getItem('formValues'));
let firstName = formValues ? formValues.firstName : ''; */}
              <div className="pt-5 ">
                <h1 className="text-[14px] font-lato font-bold text-[#000] pb-[10px]">
                  Upload Picture *
                </h1>
                <div className="flex align-middle gap-10 items-center">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="bg-[#fff] text-[#888] w-[250px] h-[40px] rounded-[10px] font-lato border-2 border-[#D9E7F0] cursor-pointer"
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

              <button
                type="submit"
                className="bg-[#036] text-[#fff] w-[300px] h-[40px] rounded-[50px] mt-[20px] font-lato"
              >
                Save & Continue
              </button>
              <div className="flex pt-3">
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
              <h1 className="text-[#036] font-lato text-[14px] pt-3 underline">
                Save & return to Dashboard
              </h1>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp4;
