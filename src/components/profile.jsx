import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { isEmailValid } from "./utils/patternVerify";
import Nav from "./other/navbar";
import { FooterThree } from "./other/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export const Profile = () => {
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [check, setCheck] = useState({
    emailCheck: false,
    otpSented: false,
    otpVerified: false,
  });
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      window.location = "/404";
    }
  }, [token]);

  useEffect(() => {
    console.log(otp.length);
    if (check.otpSented && otp.length === 6) {
      if (Number(otp) === Number(serverOtp)) {
        alert("OTP verified successfully");
        setCheck((prevState) => ({ ...prevState, otpSented: false }));
        setCheck((prevState) => ({ ...prevState, otpVerified: true }));
      } else {
        alert("Invalid OTP. Please try again.");
      }
    }
  }, [check.otpSented, otp, serverOtp]);

  async function fetchUser() {
    try {
      let response = await axios.get("http://localhost:4000/api/getUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success === true) {
        setName(response.data.users.name);
        setEmail(response.data.users.email);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteAccount = async () => {
    try {
      // Perform the delete operation
      const response = await axios.delete(
        "https://contact-app-back-end.onrender.com/api/deleteUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === true) {
        alert(response.data.message);
        // Redirect to login or home page after successful deletion
        window.location = "/login";
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

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
          setOtp("");
          setCheck((prevState) => ({ ...prevState, otpSented: true }));
        }
      } catch (err) {
        alert(err.response.data.message);
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        "https://contact-app-back-end.onrender.com/api/updateUser",
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success === true) {
        alert(response.data.message);
        fetchUser();
        // Toggle the state to show user profile details
        setUpdateFormVisible(false);
      }
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <section>
      <Nav />

      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md relative bg-white rounded shadow-2xl p-7 sm:p-10 ">
          <form
            className="mt-8"
            style={{ display: isUpdateFormVisible ? "block" : "none" }}
          >
            <button
              className="absolute top-4 right-4 "
              onClick={() => setUpdateFormVisible(false)}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Update Account
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    disabled={check.otpVerified}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              {!check.otpVerified && (
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Send OTP <ArrowRight className="ml-2" size={16} />
                </button>
              )}
              {check.otpSented && !check.otpVerified && (
                <>
                  <div>
                    <label
                      htmlFor="otp"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Enter OTP{" "}
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="number"
                        placeholder="Enter OTP"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}
              {check.otpVerified && (
                <>
                  <div>
                    <button
                      type="button"
                      onClick={handleUpdateProfile}
                      className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    >
                      Update Profile <ArrowRight className="ml-2" size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
          <div
            className="border border-gray-300 p-6 rounded-md shadow-md max-w-md mx-auto"
            style={{ display: isUpdateFormVisible ? "none" : "block" }}
          >
            <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
              Account Details
            </h2>
            {/* Display user profile details */}
            <div className="mb-4">
              <p className="text-lg font-semibold mb-1 text-gray-700">
                Name: {name}
              </p>
              <p className="text-md text-gray-600">Email: {email}</p>
            </div>
            {/* Display "Update Profile" button */}
            <button
              type="button"
              onClick={() => setUpdateFormVisible(true)}
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring focus:border-gray-800"
            >
              Update Profile <ArrowRight className="ml-2" size={16} />
            </button>

            <div className="flex items-center">
              <a
                onClick={() => localStorage.removeItem("token")}
                href="/login"
                className=" inline-flex w-full items-center justify-center rounded-md bg-black mt-3 px-4 py-2 text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring focus:border-gray-800"
              >
                logout
              </a>
            </div>
            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(true)}
              className="inline-flex w-full items-center justify-center rounded-md bg-red-500 mt-3 px-4 py-2 text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring focus:border-gray-800"
            >
              delete
            </button>

            {showDeleteConfirmation && (
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                  &#8203;
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Delete Account
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete your account? This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        onClick={() => setShowDeleteConfirmation(false)}
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-md bg-white mb-2 border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // Call your delete function here
                          handleDeleteAccount();
                          setShowDeleteConfirmation(false);
                          localStorage.removeItem("token");
                        }}
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-md bg-red-500 border border-transparent px-4 py-2 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterThree />
    </section>
  );
};
