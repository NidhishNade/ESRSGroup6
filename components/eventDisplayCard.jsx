import Image from "next/image";
import React from "react";

const EventDisplayCard = ({
  event_id,
  event_date,
  event_title,
  event_description,
}) => {
  return (
    <div className="md:w-4/6 mx-auto m-5">
      <div className="max-w-full mx-auto bg-color2 shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row items-center hover:shadow-custom2">
        <div className="md:w-80 h-64 p-5">
          <Image
            className="w-full h-full object-cover rounded-md shadow-custom1"
            src={`/assets/event${event_id}.jpg`}
            alt={event_title}
            width={960}
            height={640}
          />
        </div>
        <div className="p-5 flex flex-col justify-center flex-1">
          <h2 className="text-xl font-semibold text-color5 text-center md:text-left">
            {event_title}
          </h2>
          <p className="mt-2 text-md font-bold text-color6 text-center md:text-left">
            {event_date}
          </p>
          <p className="mt-2 text-md text-color4 text-center md:text-left">
            {event_description}
          </p>
          <div className="mt-4 flex justify-center md:justify-start">
            <a
              href={`/event-page/${event_id}`}
              className="mt-4 inline-block bg-color4 text-color2 px-6 py-2 rounded hover:bg-color3 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">
              Browse Event
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDisplayCard;
