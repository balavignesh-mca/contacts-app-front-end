import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import Nav from "./other/navbar";
import { FooterThree } from "./other/footer";

export const Welcome = () => {
  const [userName, setUserName] = useState("");
  const [contactsData, setContactsData] = useState({});
  const [contactName, setContactName] = useState("");
  const [mobileNo, setMobileNo] = useState('');
  const [mobileNo1, setMobileNo1] = useState('');
  const [id, setId] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpEdit, setShowPopUpEdit] = useState(false);

  let token = localStorage.getItem("token");

  useEffect(() => {
  
    async function fetchUser() {
      try {
        let response = await axios.get("http://localhost:4000/api/getUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success === true) {
          setUserName(response.data.users.name);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
    fetchContacts();
  }, [token]);

 async function fetchContacts() {
   try {
     let response = await axios.get("http://localhost:4000/api/getContacts", {
       headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
     });
     if (response.data.success === true) {
       setContactsData(response.data);
     }
   } catch (error) {
     console.error(error);
   }
 }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contactName) {
      alert("please enter name");
    } else if (!mobileNo) {
      alert("please enter mobile no");
    } else {
      try {
        const response = await axios.post("https://contact-app-back-end.onrender.com/api/createContact/", {
         name: contactName,
         phone: mobileNo,
         phone1: mobileNo1,
        },
        {headers:{
          Authorization:`Bearer ${token}`
        }}
        );
        
        if (response.data.success === true) {
         
          alert(response.data.message);
          fetchContacts();
         setShowPopUp(false) 
        } 
      } catch (err) {
        alert(err.response.data.message);
        console.log(err.message);
      }
    }
  };

   const handleEdit= async (e) => {
     e.preventDefault();

     if (!contactName) {
       alert("please enter name");
     } else if (!mobileNo) {
       alert("please enter mobile no");
     } else {
       try {
         const response = await axios.put(
           `https://contact-app-back-end.onrender.com/api/updateContact/${id}`,
           {
             name: contactName,
             phone: mobileNo,
             phone1: mobileNo1,
           },
           {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           }
         );
console.log(response);
         if (response.data.success === true) {
           alert(response.data.message);
           fetchContacts();
           setShowPopUpEdit(false);
         }
       } catch (err) {
         alert(err.response.data.message);
         console.log(err.message);
       }
     }
   };
  const handleDelete =async(e,id) =>{
       e.preventDefault();
       try {
          const response = await axios.delete(`https://contact-app-back-end.onrender.com/api/deleteContact/${id}`,
        {headers:{
          Authorization:`Bearer ${token}`
        }}
        );
        
        if (response.data.success === true) {
          alert(response.data.message);}
         fetchContacts();
       } catch (err) {
         alert(err.response.data.message);
         console.log(err.message);
       }
  }
  return (
    <>
      <Nav />
      {token ? (
        <div className="welcome-container px-4 py-8 mx-auto sm:max-w-xl md:max-w-full   lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-6">
          <div className="flex flex-col lg:flex-row ">
            <div
              style={showPopUpEdit ? { display: "none" } : { display: "block" }}
              className="welcome-content mb-8 lg:mt-[8rem] lg:max-w-lg lg:pr-5 ml-[6%] lg:w-3/5 "
            >
              <h2 className="welcome-heading mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                Welcome
                <br className="hidden md:block" />
                to our contact app{" "}
                <span className="inline-block text-black">{userName}</span>
              </h2>
              <p className="welcome-text pr-5 mb-5 text-base text-gray-700  md:text-lg">
                Connecting with your contacts has never been easier. Our app is
                designed to streamline your communication and keep you
                effortlessly connected with the people who matter most.
              </p>
              <div className="flex items-center">
                <button
                  onClick={() => setShowPopUp(true)}
                  className="welcome-btn inline-flex items-center justify-center mb-4 h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black-700 focus:shadow-outline focus:outline-none"
                >
                  Create Contact
                </button>
              </div>
            
            </div>

            {/* Contacts take up 30% width on large screens with scrolling */}

            <div
              className="contacts-section relative lg:flex-grow lg:w-2/5 max-h-[440px] overflow-y-auto sm:mr-[10%] sm:mt-[8%] sm:m-10"
              style={showPopUp ? { display: "none" } : { display: "block" }}
            >
              <div className="contacts-grid grid gap-6 row-gap-8 mx-auto sm:row-gap-10 ml-[20%] w-[80%] lg:max-w-screen-lg sm:grid-cols-1">
                {contactsData &&
                  contactsData.contacts &&
                  contactsData.contacts.map((contact, index) => (
                    <div
                      key={index}
                      className="contact-item text-white flex bg-black p-3 rounded-lg shadow-md"
                    >
                      <div className="contact-info flex flex-col justify-center w-full">
                        <FontAwesomeIcon icon={faUser} />
                        <p className="text-lg font-bold text-center">
                          {contact.name}
                        </p>
                        <p className="text-sm text-white text-center">
                          {contact.phone}
                        </p>
                      </div>
                      <button
                        className="ml-[-6] mr-6"
                        onClick={() => {
                          setId(contact._id);
                          setShowPopUpEdit(true);
                          setContactName(contact.name);
                          setMobileNo(contact.phone)
                          setMobileNo1(contact.phone1)
                        }}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button className="">
                        <FontAwesomeIcon
                          onClick={(e) => handleDelete(e, contact._id)}
                          icon={faCircleXmark}
                        />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div
              className="w-full max-w-xl xl:px-8 xl:w-5/12 "
              style={showPopUp ? { display: "block" } : { display: "none" }}
            >
              <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10 sm:m-4 sm:mt-24">
                <button
                  className="absolute top-4 right-4 "
                  onClick={() => setShowPopUp(false)}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  new Contact
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="contactName"
                      className="inline-block mb-1 font-medium"
                    >
                      Name<span className="font-bold text-red-600">*</span>
                    </label>
                    <input
                      placeholder="BALA"
                      required
                      type="text"
                      className="flex-grow w-full h-11 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                      id="contactName"
                      name="contactName"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="mobile"
                      className="inline-block mb-1 font-medium"
                    >
                      Mobile No<span className="font-bold text-red-600">*</span>
                    </label>
                    <input
                      placeholder="Enter your mobile no"
                      required
                      type="Number"
                      className="flex-grow w-full h-11 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                      id="mobile"
                      name="mobile"
                      value={mobileNo}
                      min={0}
                      onChange={(e) => setMobileNo(e.target.value)}
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="mobile1"
                      className="inline-block mb-1 font-medium"
                    >
                      mobile no 1
                    </label>
                    <input
                      placeholder="Enter your mobile no 1"
                      type="Number"
                      className="flex-grow w-full h-11 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                      id="mobile1"
                      name="mobile1"
                      value={mobileNo1}
                      min={0}
                      onChange={(e) => setMobileNo1(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black  focus:shadow-outline focus:outline-none "
                    >
                      ADD
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* edit */}
            <div
              className="w-full max-w-xl xl:px-8 xl:w-5/12 "
              style={showPopUpEdit ? { display: "block" } : { display: "none" }}
            >
              <div className="relative bg-white rounded shadow-2xl p-7 sm:p-10 sm:m-4 sm:mt-24">
                <button
                  className="absolute top-4 right-4 "
                  onClick={() => setShowPopUpEdit(false)}
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                 edit Contact
                </h3>

                <form onSubmit={handleEdit}>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="contactName"
                      className="inline-block mb-1 font-medium"
                    >
                      Name<span className="font-bold text-red-600">*</span>
                    </label>
                    <input
                      placeholder="BALA"
                      required
                      type="text"
                      className="flex-grow w-full h-11 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                      id="contactName"
                      name="contactName"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="mobile"
                      className="inline-block mb-1 font-medium"
                    >
                      Mobile No<span className="font-bold text-red-600">*</span>
                    </label>
                    <input
                      placeholder="Enter your mobile no"
                      required
                      type="Number"
                      className="flex-grow w-full h-11 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                      id="mobile"
                      name="mobile"
                      value={mobileNo}
                      min={0}
                      onChange={(e) => setMobileNo(e.target.value)}
                    />
                  </div>
                  <div className="mb-1 sm:mb-2">
                    <label
                      htmlFor="mobile1"
                      className="inline-block mb-1 font-medium"
                    >
                      mobile no 1
                    </label>
                    <input
                      placeholder="Enter your mobile no 1"
                      type="Number"
                      className="flex-grow w-full h-11 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-black focus:outline-none focus:shadow-outline"
                      id="mobile1"
                      name="mobile1"
                      value={mobileNo1}
                      min={0}
                      onChange={(e) => setMobileNo1(e.target.value)}
                    />
                  </div>

                  <div className="mt-4 mb-2 sm:mb-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-black hover:bg-black  focus:shadow-outline focus:outline-none "
                    >
                      UPDATE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        (window.location = "404")
      )}
      <FooterThree />
    </>
  );
};
