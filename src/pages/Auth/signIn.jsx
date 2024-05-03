import { useFormik } from "formik";
import * as yup from "yup";
import Vasset from "assets/vasset.png";
import facebook from "assets/facebook.png";
import google from "assets/google.png";
import apple from "assets/apple.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "routes/routes.config";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
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
  const navigate = useNavigate();

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
      <div className="flex flex-wrap justify-start w-[30%]">
        <img src={Vasset} className="h-[100vh]" />
      </div>
      <div className="stan justify-center items-center flex-wrap pl-[206px] pr-[206px] align-middle">
        <form onSubmit={formik.handleSubmit}>
          <div className="pt-10 items-center">
            <h1 className="text-[38px] pb-10 font-lato font-bold text-[#036]">
              Login
            </h1>
            <div className="pt-10 flex gap-[59px] items-center justify-center">
              <img src={facebook} className="h-[35px] w-[35px]" />
              <img src={google} className="h-[35px] w-[35px]" />
              <img src={apple} className="h-[35px] w-[35px]" />
            </div>
            <div className="flex items-center pt-[39px] justify-center pb-[39px]">
              <hr className="border border-[#666] w-[220px]" />
              <h1 className="text-[20px] font-lato text-[#036] mx-2">
                or login with
              </h1>
              <hr className="border border-[#666] w-[220px]" />
            </div>
            <div className="items-center  justify-center">
              <div className="pt-5" style={{ position: "relative" }}>
                <h1 className="text-[24px] font-lato font-bold text-[#036] pb-[30px]">
                  Email
                </h1>
                <input
                  type="text"
                  {...formik.getFieldProps("email")}
                  className="border-2 border-[#D9E7F0] w-[600px] h-[50px] px-2 rounded-[15px] text-[#000] bg-white"
                  style={{ paddingLeft: "60px" }} // Add padding to prevent the text from overlapping with the icon
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
                    top: "95px", // Adjust the position as needed
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
                    className="border-2 border-[#D9E7F0] w-[600px] h-[50px] px-2 rounded-[15px] bg-white text-[#000]"
                  />
                  <i
                    onClick={() => setPasswordVisibility(!isPasswordVisible)}
                    style={{
                      position: "absolute",
                      right: "10px",
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
              <button
                type="submit"
                className="bg-[#036] text-[#fff] w-[600px] h-[50px] rounded-[50px] mt-[50px] font-lato text-[24px]"
                onClick={() => navigate(Routes.Dashboard)}
              >
                <h1 className="text-[24px] font-lato font-bold text-[#fff]">
                  Login
                </h1>
              </button>
              <div
                className="flex pt-5 justify-center items-center"
                onClick={() => navigate("/")}
              >
                <h1 className="text-[20px] font-lato text-[#000]">
                  Don’t have an account?
                </h1>
                <button
                  className="text-[20px] font-lato text-[#000] font-bold underline bg-white"
                  onClick={() => navigate("/")}
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
