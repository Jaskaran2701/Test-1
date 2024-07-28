"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import classNames from "classnames";

type AuthDataType = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const [authData, setAuthData] = useState<AuthDataType>({
    email: "",
    password: "",
  });

  const [validateEmail, setValidateEmail] = useState<boolean>(); //used for valid email validation

  const emailVlaidation = (value: string) => {
    const emailRegular = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegular.test(value)) {
      setValidateEmail(true);
    } else {
      setValidateEmail(false);
    }
  };

  const [emptyField, setEmptyFieldError] = useState<{
    emailError: boolean;
    passwordError: boolean;
  }>({
    emailError: false,
    passwordError: false,
  });

  function checkEmailEmptyField() {
    if (authData.email.length == 0) {
      setEmptyFieldError({ ...emptyField, emailError: true });
    } else {
      setEmptyFieldError({ ...emptyField, emailError: false });
    }
  }

  function checkPasswordEmpytField() {
    if (authData.password.length == 0) {
      setEmptyFieldError({ ...emptyField, passwordError: true });
    } else {
      setEmptyFieldError({ ...emptyField, passwordError: false });
    }
  }

  const [apiResponse, setApiResposne] = useState<string>(); //for storing api data

  const submit = () => {
    axios
      .post("https://cs-api.nugen.co.in/auth/login", authData)
      .then((response) => {
        localStorage.setItem("userToken", response.data.accessToken);
        setApiResposne(response.data.message);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        setApiResposne(error.response.data.message);
      });
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center gap-4">
      <div className="w-full items-center justify-center flex text-6xl mt-4">
        <span className="text-white">Log</span>
        <span className="text-blue-600">In</span>
      </div>
      <div className="flex flex-col gap-2  w-96">
        <label htmlFor="email" className="text-sm font-medium text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:ring-blue-500 w-full p-2.5"
          placeholder="Enter Your Email"
          required
          onChange={(e) => {
            setAuthData({ ...authData, email: e.target.value });
            emailVlaidation(e.target.value);
          }}
          onKeyUp={checkEmailEmptyField}
        />
        {!validateEmail && authData.email.length > 0 && (
          <label htmlFor="email" className="text-sm font-medium text-red-600">
            Enter a valid email
          </label>
        )}
        {emptyField.emailError && (
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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring focus:ring-blue-500 w-full p-2.5"
          placeholder="Enter your password"
          required
          onChange={(e) => {
            setAuthData({ ...authData, password: e.target.value });
          }}
          onKeyUp={checkPasswordEmpytField}
        />
        {emptyField.passwordError && (
          <label className="text-sm font-medium text-red-600">
            Password field cannot be left empty
          </label>
        )}
      </div>
      <div className="text-white">{apiResponse}</div>
      <button
        onClick={submit}
        className={classNames(
          "w-40 h-8 rounded bg-blue-500 hover:text-black hover:bg-slate-200",
          (authData.email.length == 0 || authData.password.length == 0) &&
            "opacity-[20%] bg-white cursor-not-allowed"
        )}
        disabled={authData.email.length == 0 || authData.password.length == 0}
      >
        Submit
      </button>
    </div>
  );
}
