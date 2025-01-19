import React from "react";
import "./upcoming-events.scss";

const events = [
  {
    id: 1,
    title: "Hukuksal Çözümler",
    background: "/images/sections/section-1.jpg",
    gradient: "rgba(33, 37, 41, 0.9)",
  },
  {
    id: 2,
    title: "Hukuki Danışmanlık",
    background: "/images/sections/section-2.jpg",
    gradient: "rgba(108, 117, 125, 0.9)",
  },
  {
    id: 3,
    title: (
      <>
        Hukuki Süreçlerin
        <br />
        Yönetilmesi
      </>
    ),
    background: "/images/sections/section-3.jpg",
    gradient: "rgba(220, 53, 69, 0.9)",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="upcoming-events border-top border-bottom border-1">
      <div className="row g-1 m-0">
        {events.map((event) => (
          <div key={event.id} className="col-12 col-md-4 px-1">
            <div
              className="event-card transition-text text-start text-white py-9 px-4 h-100 d-flex align-items-center justify-content-start"
              style={{
                background: `linear-gradient(${event.gradient}, ${event.gradient}), url(${event.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h3>{event.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
