import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 let token = localStorage.getItem("token")
if(token){
   window.location = "/";
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("please enter email");
    } else if (!password) {
      alert("please enter password");
    } else {
      try {
        const response = await axios.post("https://contact-app-back-end.onrender.com/api/login", {
          email,
          password,
        });
        console.log(response.data.success);
        if (response.data.success === true) {
          localStorage.setItem("token", response.data.token);
          alert(response.data.message);
          window.location = "/";
        }
      } catch (err) {
        alert(err.response.data.message);
        console.log(err.message);
      }
    }
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 ">
        <img
          src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full  h-full"
          alt=""
        />
        <div className="relative bg-opacity-65 bg-black  h-full">
          <svg
            className="absolute inset-x-0 bottom-0  text-white  w-full"
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
                  Secure Login
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                  Login with confidence! Your data is our top priority. We use
                  state-of-the-art encryption to ensure the safety and security
                  of your information.
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
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10 sm:m-4 ">
                  {" "}
                  {/* sm:m-4 to fix height */}
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Sign In to continue
                  </h3>
                  <form onSubmit={handleSubmit}>
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
                        className="flex-grow w-full h-11 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-1 sm:mb-2">
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
                        className="flex-grow w-full h-11 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        value={password}
                       
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-gray-800  focus:shadow-outline focus:outline-none "
                      >
                        Sign In
                      </button>
                    </div>

                    <p className="text-xs text-gray-600 sm:text-sm">
                      We respect your privacy. delete your account at any time.
                    </p>

                    <button
                      onClick={() => (window.location = "/register")}
                      className="mt-4 text-xs text-gray-600 sm:text-sm underline focus:outline-none"
                    >
                      New user? Register here
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
