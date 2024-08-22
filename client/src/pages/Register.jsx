import {
  CircleCheckBig,
  Eye,
  EyeOff,
  Loader,
  Mail,
  UserRoundPlus,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/formValidation";
import Tooltip from "@mui/material/Tooltip";
import { registerUser } from "../../routes/authRoutes";
import toast, { Toaster } from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();

  const {
    values,
    handleBlur,
    isSubmitting,
    touched,
    setFieldTouched,
    handleChange,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      let registerPromise = registerUser(values);

      toast.promise(registerPromise, {
        loading: "Registering...",
        success: (res) => {
          return res.message;
        },
        error: (err) => err.message,
      });

      registerPromise.then((res) => {
        const token=res.token;
        localStorage.setItem("token", token);
        navigate('/')
    
      });
    },
  });
  const [passIcon, setPassIcon] = useState(false);
  const [cPassIcon, setCPassIcon] = useState(false);
  const passVisible = () => {
    setPassIcon(!passIcon);
  };
  const cPassVisible = () => {
    setCPassIcon(!cPassIcon);
  };
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label
                htmlFor="username"
                className="sr-only">
                username
              </label>

              <div className="relative">
                <Tooltip
                  title={errors.username}
                  placement="top-end"
                  className="w-full">
                  <input
                    type="text"
                    id="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setFieldTouched("username", true)}
                    value={values.username}
                    className={
                      errors.username && touched.username
                        ? "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-red-700"
                        : "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-700"
                    }
                    placeholder="Enter Username"
                  />
                </Tooltip>

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  {errors.username || !touched.username ? (
                    <UserRoundPlus
                      size={18}
                      color="gray"
                    />
                  ) : (
                    <CircleCheckBig
                      size={18}
                      color="green"
                    />
                  )}
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="sr-only">
                Email
              </label>

              <div className="relative">
                <Tooltip
                  title={errors.email}
                  placement="top-end"
                  className="w-full">
                  <input
                    type="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setFieldTouched("email", true)}
                    value={values.email}
                    className={
                      errors.email && touched.email
                        ? "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-red-700"
                        : "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-700"
                    }
                    placeholder="Enter email"
                  />
                </Tooltip>

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  {errors.email || !touched.email ? (
                    <Mail
                      color="gray"
                      size={18}
                    />
                  ) : (
                    <CircleCheckBig
                      size={18}
                      color="green"
                    />
                  )}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="sr-only">
                Password
              </label>

              <div className="relative">
                <Tooltip
                  title={errors.password}
                  placement="top-end"
                  className="w-full">
                  <input
                    type={passIcon ? "text" : "password"}
                    placeholder="Enter password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setFieldTouched("password", true)}
                    value={values.password}
                    className={
                      errors.password && touched.password
                        ? "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-red-700"
                        : "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-700"
                    }
                  />
                </Tooltip>
                <span
                  onClick={passVisible}
                  className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  {passIcon ? (
                    <Eye
                      color="gray"
                      size={18}
                    />
                  ) : (
                    <EyeOff
                      color="gray"
                      size={18}
                    />
                  )}
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="sr-only">
                confirmPassword
              </label>

              <div className="relative">
                <Tooltip
                  title={errors.confirmPassword}
                  placement="top-end"
                  className="w-full">
                  <input
                    type={cPassIcon ? "text" : "password"}
                    placeholder="Confirm password"
                    id="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setFieldTouched("confirmPassword", true)}
                    value={values.confirmPassword}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "w-full rounded-lg border-gray-400 p-4 pe-12 text-sm shadow-sm focus:outline-red-700"
                        : "w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:outline-green-700"
                    }
                  />
                </Tooltip>
                <span
                  onClick={cPassVisible}
                  className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  {cPassIcon ? (
                    <Eye
                      color="gray"
                      size={18}
                    />
                  ) : (
                    <EyeOff
                      color="gray"
                      size={18}
                    />
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <span
                  onClick={() => navigate("/login")}
                  className="underline cursor-pointer text-blue-400">
                  Sign in
                </span>
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                {isSubmitting ? <Loader className="animate-spin" /> : "Sign in"}
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default Register;
