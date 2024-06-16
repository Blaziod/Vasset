import { useFormik } from "formik";
import * as yup from "yup";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup.string().required("Username is required"),
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

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 52 52"
    fill="none"
  >
    <rect width="52" height="52" fill="white" />
    <path
      d="M26 9.75C15.1666 9.75 5.91496 16.4883 2.16663 26C5.91496 35.5117 15.1666 42.25 26 42.25C36.8333 42.25 46.085 35.5117 49.8333 26C46.085 16.4883 36.8333 9.75 26 9.75ZM26 36.8333C20.02 36.8333 15.1666 31.98 15.1666 26C15.1666 20.02 20.02 15.1667 26 15.1667C31.98 15.1667 36.8333 20.02 36.8333 26C36.8333 31.98 31.98 36.8333 26 36.8333ZM26 19.5C22.4033 19.5 19.5 22.4033 19.5 26C19.5 29.5967 22.4033 32.5 26 32.5C29.5966 32.5 32.5 29.5967 32.5 26C32.5 22.4033 29.5966 19.5 26 19.5Z"
      fill="#D9E7F0"
    />
  </svg>
);
const SignUp1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);
  const { login, logout } = useAuth();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://api.vassetglobal.com/api/signup",
          {
            email: values.email,
            username: values.username,
            password: values.password,
            firstname: values.firstName,
            lastname: values.lastName,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Signup Successful");
          login(response.data.access_token);
          localStorage.setItem("userId", response.data.user_data.id);
          navigate("/contact-address");
        } else if (response.status === 401) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          navigate("/login");
          toast.error("Access Token Expired, Please login again");
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
      <div className="justify-center items-center align-middle">
        <form onSubmit={formik.handleSubmit}>
          <div className="pt-5 items-center">
            <h1 className="text-[18px] font-lato font-bold text-[#000] pt-10 text-center">
              Create Account
            </h1>
            <h1 className="text-[14px] font-lato text-[#000] pt-[11px]  text-center">
              You’re off to a great start
            </h1>
            <div className="pt-10 flex gap-10 items-center justify-center">
              <img src={facebook} className="h-[30px] w-[30px]" />
              <img src={google} className="h-[30px] w-[30px]" />
              <img src={apple} className="h-[30px] w-[30px]" />
            </div>
            <div className="flex items-center pt-[39px] justify-center">
              <hr className="border border-[#666] w-20" />
              <h1 className="text-[14px] font-lato text-[#036] mx-2">
                or signup with email
              </h1>
              <hr className="border border-[#666] w-20" />
            </div>
            <div className="items-center  justify-center p-5 ">
              <div className="pt-10 gap-5">
                <div>
                  <h1 className="text-[14px] font-lato font-bold text-[#036] pb-[10px]">
                    First name
                  </h1>
                  <input
                    type="text"
                    {...formik.getFieldProps("firstName")}
                    className="border-2 border-[#D9E7F0] h-[40px] rounded-[15px] w-[95%] px-2 bg-white text-[#000]"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div
                      style={{ color: "red", fontSize: 12, fontFamily: "Lato" }}
                    >
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>
                <div>
                  <h1 className="text-[14px] font-lato font-bold text-[#036] pb-[10px] ">
                    Last name
                  </h1>
                  <input
                    type="text"
                    {...formik.getFieldProps("lastName")}
                    className="border-2 border-[#D9E7F0] w-[95%] h-[40px] px-2 rounded-[15px] text-[#000] bg-white"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div
                      style={{ color: "red", fontSize: 12, fontFamily: "Lato" }}
                    >
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#036] pb-[10px]">
                  Username
                </h1>
                <input
                  type="text"
                  {...formik.getFieldProps("username")}
                  className="border-2 border-[#D9E7F0] w-[95%] h-[40px] px-2 rounded-[15px] text-[#000] bg-white"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div
                    style={{ color: "red", fontSize: 12, fontFamily: "Lato" }}
                  >
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#036] pb-[10px]">
                  Email
                </h1>
                <input
                  type="text"
                  {...formik.getFieldProps("email")}
                  className="border-2 border-[#D9E7F0] w-[95%] h-[40px] px-2 rounded-[15px] text-[#000] bg-white"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div
                    style={{ color: "red", fontSize: 12, fontFamily: "Lato" }}
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#036] pb-[10px]">
                  Password
                </h1>
                <div style={{ position: "relative" }}>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                    className="border-2 border-[#D9E7F0] w-[95%] h-[40px] px-2 rounded-[15px] bg-white text-[#000]"
                    typeof="password"
                  />
                  <i
                    onClick={() => setPasswordVisibility(!isPasswordVisible)}
                    style={{
                      position: "absolute",
                      right: "30px",
                      top: "10px",
                      cursor: "pointer",
                      color: "Black",
                    }}
                  >
                    {isPasswordVisible ? "Hide" : <EyeIcon />}
                  </i>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div
                    style={{ color: "red", fontSize: 12, fontFamily: "Lato" }}
                  >
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#036] pb-[10px]">
                  Confirm Password
                </h1>
                <div style={{ position: "relative" }}>
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    {...formik.getFieldProps("confirmPassword")}
                    className="border-2 border-[#D9E7F0] w-[95%] h-[40px] px-2 rounded-[15px] bg-white text-[#000]"
                  />
                  <i
                    onClick={() =>
                      setConfirmPasswordVisibility(!isConfirmPasswordVisible)
                    }
                    style={{
                      position: "absolute",
                      right: "30px",
                      top: "10px",
                      cursor: "pointer",
                      color: "Black",
                    }}
                  >
                    {isConfirmPasswordVisible ? "Hide" : <EyeIcon />}
                  </i>
                </div>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div
                    style={{ color: "red", fontSize: 12, fontFamily: "Lato" }}
                  >
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center items-center pb-[30px]">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#036] text-[#fff] w-[90%] h-[40px] rounded-[50px] mt-[20px] flex font-lato justify-center items-center"
                >
                  {isLoading ? (
                    <BeatLoader color={"#ffffff"} />
                  ) : (
                    <h1 className="text-[24px] font-lato font-bold text-[#fff]">
                      Next
                    </h1>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp1;
