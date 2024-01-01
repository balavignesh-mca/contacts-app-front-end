import { useState, useEffect } from "react";
import axios from "axios";
import { isEmailValid, isPasswordValid } from "../utils/patternVerify";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState({
    emailCheck: false,
    otpSented: false,
    otpVerifyed: false,
  });

  //======================email verification================================

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      alert("Please enter a valid email address");
    } else {
      try {
        setCheck((prevState) => ({ ...prevState, emailCheck: true }));

        const response = await axios.post("https://contact-app-back-end.onrender.com/api/otp", {
          email,
        });

        if (response.data.success === true) {
          alert(response.data.message);
          setServerOtp(response.data.otp);
          setCheck((prevState) => ({ ...prevState, otpSented: true }));
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  //======================otp verification================================
  useEffect(() => {
    console.log(otp.length);
    if (check.otpSented && otp.length === 6) {
      console.log("hi");
      if (Number(otp) === Number(serverOtp)) {
        alert("OTP verified successfully");
        setCheck((prevState) => ({ ...prevState, otpVerifyed: true }));
      } else {
        alert("Invalid OTP. Please try again.");
      }
    }
  }, [check.otpSented, otp, serverOtp]);

  //======================account creation================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      alert("Please enter a valid email address");
    } else if (!isPasswordValid(password).success) {
      const validationResult = isPasswordValid(password);
      alert(validationResult.message);
    } else if (!name) {
      alert("Please enter your name");
    } else {
      try {
        if (!check.otpVerifyed) {
          alert("Please verify email");
          return;
        }

        const response = await axios.post(
          "https://contact-app-back-end.onrender.com/api/register",
          {
            name,
            email,
            password,
          }
        );

        if (response.data.success === true) {
          alert(response.data.message);
          window.location = "/login";
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 ">
        <img
          src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-opacity-65 bg-black h-full">
          <svg
            className="absolute inset-x-0 bottom-0 mb-0 text-white w-full"
            viewBox="0 0 1160 163"
          >
            <path
              fill="currentColor"
              d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
            />
          </svg>
          <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-18">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  Secure Registration
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                  Register with confidence! Your data is our top priority. We
                  use state-of-the-art encryption to ensure the safety and
                  security of your information.
                </p>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 12.79A10 10 0 1 0 11.21 21 9.93 9.93 0 0 0 21 12.79zM12 2a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1zM12 18a8 8 0 0 0 0-16V1a1 1 0 1 0-2 0v1a8 8 0 0 0 0 16v1a1 1 0 1 0 2 0v-1z"></path>
                  </svg>
                  <a
                    href="mailto:balavigneshmani13@gmail.com"
                    className="ml-2 font-semibold text-white hover:text-white"
                  >
                    support@contactsapp.com
                  </a>
                </div>
                <div className="flex items-center mt-2">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M21 12.79A10 10 0 1 0 11.21 21 9.93 9.93 0 0 0 21 12.79zM12 2a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1zM12 18a8 8 0 0 0 0-16V1a1 1 0 1 0-2 0v1a8 8 0 0 0 0 16v1a1 1 0 1 0 2 0v-1z"></path>
                  </svg>
                  <p className="ml-2 text-gray-300">sulur, coimbatore</p>
                </div>
              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10 ">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Sign up to continue
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="name"
                        className="inline-block mb-1 font-medium"
                      >
                        Name
                      </label>
                      <input
                        placeholder="John"
                        required
                        type="text"
                        className="flex-grow w-full h-9 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="mb-1 sm:mb-2">
                      <label
                        htmlFor="email"
                        className="inline-block mb-1 font-medium"
                      >
                        E-mail
                      </label>
                      <input
                        placeholder="john.doe@example.org"
                        required
                        type="text"
                        className="flex-grow w-full h-8 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        value={email}
                        disabled={check.otpVerifyed}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        style={
                          check.otpVerifyed
                            ? { display: "none" }
                            : { display: "block" }
                        }
                        onClick={(e) => handleVerifyEmail(e)}
                        type="button"
                        className="inline-flex items-center justify-center h-10 px-3 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-800 focus:shadow-outline focus:outline-none "
                      >
                        send otp
                      </button>
                    </div>
                    <div
                      className="mb-1 sm:mb-2"
                      style={
                        check.otpSented && !check.otpVerifyed
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <label
                        htmlFor="email"
                        className="inline-block mb-1 font-medium"
                      >
                        Verify-otp
                      </label>
                      <input
                        placeholder="enter otp"
                        required
                        type="Number"
                        className="flex-grow w-full h-8 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                        id="otp"
                        name="otp"
                        maxLength={6}
                        minLength={6}
                        min={0}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                    <div
                      className="mb-1 sm:mb-2"
                      style={
                        check.otpVerifyed
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <label
                        htmlFor="password"
                        className="inline-block mb-1 font-medium"
                      >
                        Password
                      </label>
                      <input
                        placeholder="Enter your password"
                        required
                        type="password"
                        className="flex-grow w-full h-8 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black  focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div
                      className="mt-4 mb-2 sm:mb-4"
                      style={
                        check.otpVerifyed
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-800 focus:shadow-outline focus:outline-none "
                      >
                        Sign Up
                      </button>
                    </div>

                    <p className="text-xs text-gray-600 sm:text-sm">
                      We respect your privacy. delete your account at any time.
                    </p>
                    <button
                      onClick={() => (window.location = "/login")}
                      className="mt-4 text-xs text-gray-600 sm:text-sm underline focus:outline-none"
                    >
                      Already have an account? Sign in here
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
