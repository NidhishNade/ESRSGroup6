"use client";
import React from "react";
import Image from "next/image";
import TestimonialCarousel from "@/components/testimonial";
import Featuredevents from "@/components/featuredevents";

const HomePage = () => {
  const handleBooknow = () => {
    if (window.localStorage.getItem("isUserLoggedIn") === "true") {
      window.location.href = "/booking-page/14";
    } else {
      window.location.href = "/signIn";
    }
  };

  const eventCardsHomaPageDetails = [
    {
      eventId: "15",
      eventName: "Live Concert",
      eventDate: "2024-06-15",
      eventDescription:
        "Experience an electrifying night of live music with top artists.",
      image: "/assets/event15.jpg",
      eventLink: "/event-page",
    },
    {
      eventId: "16",
      eventName: "Tech Conference",
      eventDate: "2024-07-20",
      eventDescription:
        "Dive into the latest in tech innovation and network with industry leaders.",
      image: "/assets/event16.jpg",
      eventLink: "/event-page",
    },
    {
      eventId: "17",
      eventName: "Art Workshop",
      eventDate: "2024-05-25",
      eventDescription:
        "Explore your creativity in our interactive art workshops for all skill levels.",
      image: "/assets/event17.jpg",
      eventLink: "/event-page",
    },
  ];

  return (
    <div className="text-color2">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-screen"
        style={{
          backgroundImage: "url('/assets/hero.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold">Discover Amazing Events</h1>
            <p className="mt-4 text-lg max-w-md mx-auto">
              Find the best events happening around you, from music festivals to
              tech conferences.
            </p>
          </div>
        </div>
      </div>
      {/* Main Event Section */}
      <div className=" py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-color5 to-color4 rounded-lg shadow-xl p-8 md:p-12 lg:p-16">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full lg:w-6/12">
                <h2 className="text-3xl font-bold">Main Event of the Month</h2>
                <p className="text-xl mt-2">Tech Innovation Conference 2024</p>
                <p className="mt-4 text-lg">
                  Join us on July 15, 2024, at the Downtown Convention Center
                  for the leading tech conference of the year.
                </p>
                <ul className="list-disc list-inside mt-4">
                  <li>Exclusive workshops and panels</li>
                  <li>Networking with industry leaders</li>
                  <li>Latest tech trends and innovations</li>
                </ul>
                <button
                  onClick={handleBooknow}
                  className="mt-4 inline-block bg-color6 text-color2 px-6 py-2 rounded hover:bg-color2 hover:text-color6 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
                  Book Now
                </button>
              </div>
              <div className="w-full lg:w-5/12 mt-8 lg:mt-0">
                <Image
                  src="/assets/event14.jpg"
                  alt="Main Event"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl text-color3 font-bold text-center mb-[4rem]">
          Featured Events of the Month
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventCardsHomaPageDetails.map((event) => (
            <Featuredevents
              key={event.eventId}
              eventId={event.eventId}
              eventName={event.eventName}
              eventDescription={event.eventDescription}
              eventImage={event.image}
              eventDate={event.eventDate}
            />
          ))}
        </div>
      </div>
      {/* Testimonials Section */}
      <div className="bg-color4 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-color2 font-bold text-center">
            What Our Customers Say
          </h2>
        </div>
        <div className="flex w-full justify-around">
          <div className="w-5/6 bg-color2 p-[3rem] rounded-xl my-5">
            <TestimonialCarousel />
          </div>
        </div>
      </div>
      {/* Footer (if not included in the navbar) */}
      <footer className="bg-color5 text-color4 text-center py-4">
        <p>
          {" "}
          <span className="text-color6"> © EVENTEASE </span> All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
