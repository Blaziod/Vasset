import { useFormik } from "formik";
import * as yup from "yup";
import Vasset from "../../assets/vasset.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);
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
      localStorage.setItem("formValues", JSON.stringify(values));
      navigate("/signup2");
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
            <h1 className="text-[14px] font-lato text-[#000] pt-[11px]  text-center">
              You’re off to a great start
            </h1>
            <div className="pt-10 flex gap-[59px] items-center justify-center">
              <img src={facebook} className="h-[30px] w-[30px]" />
              <img src={google} className="h-[30px] w-[30px]" />
              <img src={apple} className="h-[30px] w-[30px]" />
            </div>
            <div className="flex items-center pt-[39px] justify-center">
              <hr className="border border-[#666] w-[220px]" />
              <h1 className="text-[14px] font-lato text-[#036] mx-2">
                or signup with email
              </h1>
              <hr className="border border-[#666] w-[220px]" />
            </div>
            <div className="items-center  justify-center">
              <div className="flex pt-[35px] justify-between">
                <div>
                  <h1 className="text-[14px] font-lato font-bold text-[#036] pb-[10px]">
                    First name
                  </h1>
                  <input
                    type="text"
                    {...formik.getFieldProps("firstName")}
                    className="border-2 border-[#D9E7F0] w-[220px] h-[40px] px-2 rounded-[15px] bg-white text-[#000]"
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
                    className="border-2 border-[#D9E7F0] w-[220px] h-[40px] px-2 text-[#000] rounded-[15px] bg-white"
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
                  Email
                </h1>
                <input
                  type="text"
                  {...formik.getFieldProps("email")}
                  className="border-2 border-[#D9E7F0] w-[600px] h-[40px] px-2 rounded-[15px] text-[#000] bg-white"
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
                    className="border-2 border-[#D9E7F0] w-[600px] h-[40px] px-2 rounded-[15px] bg-white text-[#000]"
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
              <div className="pt-5">
                <h1 className="text-[14px] font-lato font-bold text-[#036] pb-[10px]">
                  Confirm Password
                </h1>
                <div style={{ position: "relative" }}>
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    {...formik.getFieldProps("confirmPassword")}
                    className="border-2 border-[#D9E7F0] w-[600px] h-[40px] px-2 rounded-[15px] bg-white text-[#000]"
                  />
                  <i
                    onClick={() =>
                      setConfirmPasswordVisibility(!isConfirmPasswordVisible)
                    }
                    style={{
                      position: "absolute",
                      right: "10px",
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
              <button
                type="submit"
                className="bg-[#036] text-[#fff] w-[600px] h-[40px] rounded-[50px] mt-[20px] font-lato"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp1;
