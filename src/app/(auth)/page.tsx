"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'

type AuthDataType = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter()

  const [authData, setAuthData] = useState<AuthDataType>({
    email: "",
    password: "",
  });

  const [validateEmail, setValidateEmail] = useState<boolean>(); //used for valid email validation

  const emailVlaidation = (value: string) => {
    const emailRegular = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    console.log(emailRegular.test(value));
    if (emailRegular.test(value)) {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }
  };

  const [isSubmit, setIsSubmit] = useState<boolean>(false); //used for empty fields validation

  const [apiResponse, setApiResposne] = useState<string>(); //for storing api data

  const submit = () => {
    setIsSubmit(!isSubmit);
    if (authData.email.length != 0 && authData.password.length != 0) {
      axios
        .post("http://192.168.29.65:8000/auth/login", authData)
        .then((response) => {
          localStorage.setItem("userToken", response.data.accessToken);
          setApiResposne(response.data.message);
          setTimeout(()=>{router.push('/dashboard'),console.log('function fs')},1000)
        })
        .catch((error) => {
          setApiResposne(error.response.data.message);
        });
    }
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center gap-4">
      <div className="flex flex-col gap-2 w-96">
        <label htmlFor="email" className="text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
          placeholder="Enter Your Email"
          required
          onChange={(e) => {
            setAuthData({ ...authData, email: e.target.value });
            emailVlaidation(e.target.value);
            setIsSubmit(false);
          }}
        />
        {!validateEmail && authData.email.length > 0 && (
          <label htmlFor="email" className="text-sm font-medium text-red-600">
            Enter a valid email
          </label>
        )}
        {isSubmit && authData.email.length == 0 && (
          <label className="text-sm font-medium text-red-600">
            Email field cannot be left empty
          </label>
        )}
      </div>
      <div className="flex flex-col gap-2 w-96">
        <label htmlFor="password" className="text-sm font-medium text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
          placeholder="Enter your password"
          required
          onChange={(e) => {
            setAuthData({ ...authData, password: e.target.value });
            setIsSubmit(false);
          }}
        />
        {isSubmit && authData.password.length == 0 && (
          <label className="text-sm font-medium text-red-600">
            Password field cannot be left empty
          </label>
        )}
      </div>
      <div className="text-white">{apiResponse}</div>
      <button onClick={submit} className="w-40 h-8 rounded bg-blue-500">
        Submit
      </button>
    </div>
  );
}
