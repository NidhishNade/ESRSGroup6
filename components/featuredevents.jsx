import Image from "next/image";
import Link from "next/link";
import React from "react";

const Featuredevents = ({
  eventId,
  eventName,
  eventDescription,
  eventImage,
  eventDate,
}) => {
  return (
    <div
      key={eventId}
      className="bg-color3 rounded-lg shadow-lg overflow-hidden transform transition duration-50 hover:scale-105">
      <Image
        src={eventImage}
        alt={eventName}
        width={400}
        height={250}
        objectFit="cover"
        className="w-full h-64 rounded-lg"
      />
      <div className="p-4">
        <h3 className="text-2xl font-semibold">{eventName}</h3>
        <p className="text-md text-color6">{eventDate}</p>
        <p className="mt-2">{eventDescription}</p>
        <Link
          href={`/event-page/${eventId}`}
          className="mt-4 inline-block bg-color6 text-color2 px-6 py-2 rounded hover:bg-color2 hover:text-color6 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default Featuredevents;
