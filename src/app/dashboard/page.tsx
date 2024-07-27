"use client";
import axios from "axios";
import { headers } from "next/headers";
import { useState } from "react";

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

const dummyData:ApiDataType={
    "totalRoomsStatus": {
        "occupied": 0,
        "vacant": 11
    },
    "totalHotels": 11,
    "foodOrders": 0,
    "foodRevenue": 0,
    "delayServices": 0,
    "runningServices": 0
}

export default function Dashboard() {
  const [apiData, setApiData] = useState<ApiDataType[]>([dummyData]);
  const staticToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVmMTNjNDRlMWQzZTVhMDc3YTdhMDciLCJpYXQiOjE3MjIwNzA0NjR9.Tc084wilUgMSl_OD2OrIQMFCrCL9DvPvoWHN3o5gOSU";

    console.log(localStorage.getItem("userToken"))
  axios
    .get(`http://192.168.29.65:8000/hotel/dashboard`,{headers:{Authorization:`Bearer${staticToken}`}})
    .then((response) => {
    //   setApiData(response)
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="w-full">Data:</div>
      {apiData.map((row) => (
        <ul className="flex gap-8">
          <li>Rooms Occupies : {row.totalRoomsStatus.occupied}</li>
          <li>Rooms Vacant : {row.totalRoomsStatus.vacant}</li>
          <li>food Orders : {row.foodOrders}</li>
          <li>Total Hotel : {row.totalHotels}</li>
          <li>food Orders : {row.foodOrders}</li>
          <li>Food Revenue : {row.foodRevenue}</li>
          <li>Delay Services : {row.delayServices}</li>
          <li>Running Services : {row.runningServices}</li>
        </ul>
      ))}
    </div>
  );
}
