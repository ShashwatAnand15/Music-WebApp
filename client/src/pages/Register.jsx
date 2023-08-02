import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [picture, setPicture] = useState();
  const [picturePath, setPicturePath] = useState();
  let name, value;
  const navigate = useNavigate();
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const inputData = new FormData();

    inputData.append("firstName", user.firstName);
    inputData.append("lastName", user.lastName);
    inputData.append("email", user.email);
    inputData.append("password", user.password);
    inputData.append("picturePath", picturePath);
    inputData.append("picture", picture);

    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: inputData,
    });

    const data = await res.json();
    console.log(data);
    if (data.staus === 500 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration Successful");
      console.log("Registration Successful");

      navigate("/");
    }
  };

  return (
    <div className="relative ">
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-90">
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
              <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                  Lyriks
                </h1>
                <form method="POST" className="mt-6">
                  <div className="mb-2">
                    <label
                      for="firstName"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleInputs}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      for="lastName"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleInputs}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      for="picturePath"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setPicturePath(file.name);
                        setPicture(file);
                      }}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputs}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      for="password"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInputs}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <a
                    href="#"
                    className="text-xs text-purple-600 hover:underline"
                  >
                    Forget Password?
                  </a>
                  <div className="mt-6">
                    <button
                      onClick={handleRegister}
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                    >
                      Register
                    </button>
                  </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                  {" "}
                  Already Have an Account?{" "}
                  <a
                    href="/"
                    className="font-medium text-purple-600 hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="xl:sticky relative top-0 h-fit"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
