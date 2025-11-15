import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, desc, image, Icon, reverse = false, to = "#" }) => {
  const imgCol = reverse ? "md:col-start-2" : "md:col-start-1";
  const textCol = reverse ? "md:col-start-1" : "md:col-start-2";

  return (
    <article className="group bg-[#F4F8FD] rounded-3xl overflow-hidden max-w-6xl mx-auto">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 ${reverse ? "md:grid-flow-row-dense" : ""}`}
        style={{ minHeight: 260 }}
      >
        {/* IMAGE */}
        <div className={`${imgCol}`}>
          <div className="w-full h-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* TEXT */}
        <div className={`${textCol} p-8 md:p-12 flex flex-col justify-center`}>

          {/* ICON */}
          <div
            className="
              w-14 h-14 rounded-full flex items-center justify-center
              bg-yellow-400 transition-transform duration-300 
              group-hover:scale-110
            "
          >
            <Icon className="text-black text-2xl" />
          </div>

          {/* TITLE */}
          <h3 className="mt-5 text-3xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-yellow-400">
            {title}
          </h3>

          <p className="mt-3 text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
            {desc}
          </p>

          <Link
            to={to}
            className="
              mt-5 inline-flex items-center gap-2 font-semibold text-blue-600
              transition-all duration-300 group-hover:text-yellow-400
            "
          >
            Learn more 
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
