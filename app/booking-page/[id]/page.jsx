"use client";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const Page = ({ params }) => {
  const { id } = params;
  const toast = useToast();
  const [bookingDetailsInfo, setBookingDetailsInfo] = useState({});
  const [bookingPageDetails, setBookingPageDetails] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://ticketing-backend-iiyn.onrender.com/eventdetails/${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setBookingPageDetails(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    bookingDetailsInfo["event_id"] = parseInt(id);
    bookingDetailsInfo["user_id"] = parseInt(
      window.localStorage.getItem("userid")
    );

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(bookingDetailsInfo);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://ticketing-backend-iiyn.onrender.com/booking", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const ResultObj = JSON.parse(result);
        console.log(ResultObj);
        if (ResultObj.message === "Booking successful!") {
          setBookingDetailsInfo({ ...bookingDetailsInfo, ticket_number: "" });
          toast({
            title: "Hooraay!",
            description: "Booking Successful!",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error!",
            description: "Booking Failed",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((error) => console.error(error));

    console.log(bookingDetailsInfo);
  };

  return (
    <div className="min-h-screen bg-color3 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-color2">
          Book Tickets
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="my-3 text-xl text-center">
            <h2 className="my-2">
              <span className="font-bold">Event Name: </span>
              <span>{bookingPageDetails.event_title}</span>
            </h2>
            <h2 className="my-2">
              <span className="font-bold">Event Date: </span>
              <span>{bookingPageDetails.event_date}</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 my-5">
            <div>
              <label
                htmlFor="numOfTickets"
                className="block text-sm font-medium text-gray-700">
                Number of Tickets
              </label>
              <div className="mt-1">
                <input
                  id="ticket_number"
                  name="ticket_number"
                  type="number"
                  min={1}
                  max={2}
                  value={bookingDetailsInfo.ticket_number}
                  onChange={(e) => {
                    setBookingDetailsInfo({
                      ...bookingDetailsInfo,
                      ticket_number: parseInt(e.target.value),
                    });
                  }}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
                <sub className="text-center">Maximum number of is 2</sub>
              </div>
            </div>

            <div className="w-full flex justify-around">
              <button
                type="submit"
                className="mt-4 inline-block bg-color4 text-color2 px-12 py-2 rounded hover:bg-color3 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
