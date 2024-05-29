import { useFormik } from "formik";
import * as yup from "yup";
import Vasset from "assets/vasset.png";
import facebook from "assets/facebook.png";
import google from "assets/google.png";
import apple from "assets/apple.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { errorMessage } from "utils/error-message";
import { useAuth } from "context/AuthContext";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain a number")
    .required("Password is required"),
});

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 52 52"
    fill="none"
  >
    <rect width="52" height="52" fill="" />
    <path
      d="M26 9.75C15.1666 9.75 5.91496 16.4883 2.16663 26C5.91496 35.5117 15.1666 42.25 26 42.25C36.8333 42.25 46.085 35.5117 49.8333 26C46.085 16.4883 36.8333 9.75 26 9.75ZM26 36.8333C20.02 36.8333 15.1666 31.98 15.1666 26C15.1666 20.02 20.02 15.1667 26 15.1667C31.98 15.1667 36.8333 20.02 36.8333 26C36.8333 31.98 31.98 36.8333 26 36.8333ZM26 19.5C22.4033 19.5 19.5 22.4033 19.5 26C19.5 29.5967 22.4033 32.5 26 32.5C29.5966 32.5 32.5 29.5967 32.5 26C32.5 22.4033 29.5966 19.5 26 19.5Z"
      fill="#D9E7F0"
    />
  </svg>
);

const SignIn = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://api.vassetglobal.com/api/login",
          {
            email_username: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Login Successful");
          login(response.data.access_token);
          navigate("/dashboard");
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
          <div className=" items-center">
            <h1 className="text-[38px] pb-10 font-lato font-bold pt-5 text-[#036] text-center">
              Login
            </h1>
            <div className="pt-10 flex gap-10 items-center justify-center">
              <img src={facebook} className="h-[35px] w-[35px]" />
              <img src={google} className="h-[35px] w-[35px]" />
              <img src={apple} className="h-[35px] w-[35px]" />
            </div>
            <div className="flex items-center pt-10 justify-center">
              <hr className="border border-[#666] w-20" />
              <h1 className="text-[20px] font-lato text-[#036] mx-2">
                or login with
              </h1>
              <hr className="border border-[#666] w-20" />
            </div>
            <div className="items-center  justify-center p-5">
              <div className="pt-5" style={{ position: "relative" }}>
                <h1 className="text-[24px] font-lato font-bold text-[#036] pb-10">
                  Email
                </h1>
                <input
                  type="text"
                  {...formik.getFieldProps("email")}
                  className="border-2 border-[#D9E7F0] w-[95%] h-[50px] px-2 rounded-[15px] text-[#000] bg-white "
                  style={{ paddingLeft: "60px" }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="26"
                  viewBox="0 0 33 26"
                  fill="none"
                  style={{
                    position: "absolute", // Position the SVG absolutely
                    left: "10px", // Adjust the position as needed
                    top: "105px", // Adjust the position as needed
                  }}
                >
                  <path
                    d="M33 2.16667V23.8333C33 25.0611 32.1063 26 30.9375 26H28.875V6.33678L16.5 15.6722L4.125 6.33678V26H2.0625C0.892375 26 0 25.0611 0 23.8333V2.16667C0 1.55278 0.22275 1.01111 0.592625 0.624C0.9625 0.231111 1.4795 0 2.0625 0H2.75L16.5 10.4722L30.25 0H30.9375C31.5219 0 32.0375 0.234 32.4074 0.624C32.7786 1.01111 33 1.55278 33 2.16667Z"
                    fill="#D9E7F0"
                  />
                </svg>
                {formik.touched.email && formik.errors.email ? (
                  <div
                    style={{ color: "red", fontSize: 12, fontFamily: "Lato" }}
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>{" "}
              <div className="pt-5">
                <h1 className="text-[24px] font-lato font-bold text-[#036] pb-[30px]">
                  Password
                </h1>
                <div style={{ position: "relative" }}>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    {...formik.getFieldProps("password")}
                    className="border-2 border-[#D9E7F0] h-[50px] px-2 w-[95%] rounded-[15px] bg-white text-[#000]"
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
              <div className="flex justify-center items-center align-middle">
                <button
                  type="submit"
                  className="bg-[#036] text-[#fff]  h-[50px] rounded-[50px] w-[80%] mt-10 font-lato text-[24px] text-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <BeatLoader color={"#ffffff"} />
                  ) : (
                    <h1 className="text-[24px] font-lato font-bold text-[#fff]">
                      Login
                    </h1>
                  )}
                </button>
              </div>
              <div
                className="flex pt-5 justify-center items-center"
                onClick={() => navigate("/create-account")}
              >
                <h1 className="text-[20px] font-lato text-[#000]">
                  Don’t have an account?
                </h1>
                <button
                  className="text-[20px] font-lato text-[#000] font-bold underline bg-white"
                  onClick={() => navigate("/create-account")}
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
