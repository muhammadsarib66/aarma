import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import loginImg from "../../assets/Forms/Form1.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginAccApi } from "../../features/slicer/LoginSlicer";
import Loader from "../../components/Loader";
import { ToastContainer } from "react-toastify";
interface FormValues {
  email: string;
  password: string;
}
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state: any) => state.LoginSlicer);
  const [isVisible, setIsVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password not match")
      .required("Password is required"),
  });
  const handleSubmit = async (values: FormValues, { resetForm }: any) => {
    try {
      setSubmitting(true);
      // Perform form submission logic here
      console.log(values);
      dispatch(LoginAccApi(values));
      // navigate("Dashboard");
      // window.location.reload();
      // Set submitting to false after successful submission
      resetForm();
      setSubmitting(false);
    } catch (error) {
      // Handle form submission error
      console.error(error);
      setSubmitting(false);
    }
  };
  const savedCredentials = localStorage.getItem("ArmaCredienials");

  useEffect(() => {
    // Check if there are saved credentials in local storage

    // console.log(savedCredentials);
    if (savedCredentials) {
      // console.log(savedCredentials);
      try {
        const parsedCredentials = JSON.parse(savedCredentials);
        // Automatically log in with saved credentials
        dispatch(LoginAccApi(parsedCredentials));
        // Navigate to "/Operations2"
        navigate("/Dashboard");
      } catch (error: any) {
        console.error("Error parsing saved credentials:", error.message);
      }
    }
  }, [handleSubmit]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className="flex pt-14 md:pt-20 ">
      {isLoading && <Loader />}
      <div className=" hidden md:flex flex-1  ">
        <img src={loginImg} className=" object-cover w-full h-screen " />
      </div>
      <div className=" flex flex-1 items-center pt-32  flex-col  ">
        <div className="w-[70%] flex flex-col ">
          <div className="pb-5 flex flex-col gap-2 ">
            <h1 className="text-onPrimary font-bold text-3xl">Log In</h1>
            <p> Log In below to access your account </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                className=" bg-onSecondary h-12 w-full px-2 my-2 rounded-md"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email *"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error text-red-600">{formik.errors.email}</div>
              )}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div className="flex items-center justify-between  bg-onSecondary h-12 w-full px-2 my-2 rounded-md ">
                <input
                  className=" bg-onSecondary w-full"
                  type={isVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter Your Password *"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                <span onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? (
                    <i className="text-onPrimary fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="text-onPrimary fa-solid fa-eye"></i>
                  )}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="error text-red-600">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <button
              className="active:bg-primary w-full h-12 flex rounded-lg justify-center items-center bg-[#F33434]   text-secondary"
              type="submit"
              disabled={submitting}
            >
              Submit
            </button>
            <p className="pt-2 text-sm">
              Don't have an account?{" "}
              <span className="text-[#F33434] underline cursor-pointer">
                <Link to="/">Sign Up</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
