"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { id } = params;
  const [eventPageDetails, setEventPageDetails] = useState(false);

  useEffect(() => {
    const raw = "";

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
        setEventPageDetails(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-color2">
      <div className="relative bg-gray-900">
        <Image
          className="w-full h-64 object-cover md:h-96 lg:h-screen"
          width={960}
          height={64}
          src="/assets/event1.jpg"
          alt="Event Banner"
        />
        <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {eventPageDetails.event_title}
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              {eventPageDetails.event_date}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8">
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-color3">
            Event Description
          </h2>
          <p className="mt-4 text-lg text-color4">
            {eventPageDetails.event_description}
          </p>
        </div>

        {eventPageDetails.event_key_items &&
          eventPageDetails.event_key_items.length !== 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-color3">Key Events</h2>
              <ul className="mt-4 list-disc list-inside">
                {eventPageDetails.event_key_items.map((event, index) => (
                  <li key={index} className="text-lg text-color4">
                    {event}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Book Now Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href={`/booking-page/${id}`}
            className="mt-4 inline-block bg-color4 text-color2 px-12 py-2 rounded hover:bg-color3 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
