"use client";
import axios from "axios";
import { useState } from "react";
import Card from "./card";

type ApiDataType = {
  totalRoomsStatus: {
    occupied: number;
    vacant: number;
  };
  totalHotels: number;
  foodOrders: number;
  foodRevenue: number;
  delayServices: number;
  runningServices: number;
};

const dummyData: ApiDataType = {
  totalRoomsStatus: {
    occupied: 22,
    vacant: 12,
  },
  totalHotels: 32,
  foodOrders: 6,
  foodRevenue: 400,
  delayServices: 2,
  runningServices: 5,
};

export default function Dashboard() {
  const [apiData, setApiData] = useState<ApiDataType>(dummyData);
  const staticToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVmMTNjNDRlMWQzZTVhMDc3YTdhMDciLCJpYXQiOjE3MjIwNzA0NjR9.Tc084wilUgMSl_OD2OrIQMFCrCL9DvPvoWHN3o5gOSU";

  console.log(localStorage.getItem("userToken"));
  axios
    .get(`https://cs-api.nugen.co.in/hotel/dashboard`, {
      headers: { Authorization: `Bearer ${staticToken}` },
    })
    .then((response) => {
      //   setApiData(response)
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="flex flex-col gap-6 2xl:gap-20 items-center">
      <div className="w-full items-center justify-center flex text-6xl mt-4 2xl:mt-14">
        <span className="text-white">DASH</span>
        <span className="text-blue-600">BOARD</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center">
        {/* Didn't use mapping as object have nested objects */}
        <Card
          value={apiData.totalRoomsStatus.occupied}
          label="Occupied Rooms"
        />
        <Card value={apiData.totalRoomsStatus.vacant} label="Vacant Rooms" />
        <Card value={apiData.totalHotels} label="Total Hotel" />
        <Card value={apiData.foodOrders} label="Food Orders" />
        <Card value={apiData.foodRevenue} label="Food Revenue" />
        <Card value={apiData.delayServices} label="Delayed Services" />
        <Card value={apiData.runningServices} label="Running Services" />
      </div>
    </div>
  );
}
