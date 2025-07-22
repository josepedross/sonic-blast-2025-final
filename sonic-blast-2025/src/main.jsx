import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const concerts = [
  {
    day: "Day 1",
    artist: "OVERCROOKS",
    stage: "Stage 3",
    start: "22:00",
    end: "22:55",
  },
  {
    day: "Day 1",
    artist: "DAILY THOMSON",
    stage: "Stage 3",
    start: "23:05",
    end: "00:00",
  },
  {
    day: "Day 1",
    artist: "NERVE AGENT",
    stage: "Stage 3",
    start: "00:05",
    end: "01:00",
  },
  {
    day: "Day 1",
    artist: "CASTLE RAT",
    stage: "Stage 3",
    start: "01:05",
    end: "02:00",
  },
  {
    day: "Day 1",
    artist: "THE HEAVY BROTHER DJ SET",
    stage: "Stage 3",
    start: "02:05",
    end: "04:00",
  },
  {
    day: "Day 2",
    artist: "HOOVER III",
    stage: "Main Stage 1",
    start: "16:05",
    end: "16:55",
  },
  {
    day: "Day 2",
    artist: "SLOMOSA",
    stage: "Main Stage 1",
    start: "17:55",
    end: "19:00",
  },
  {
    day: "Day 2",
    artist: "EARTHLESS",
    stage: "Main Stage 1",
    start: "20:00",
    end: "21:15",
  },
   {
    day: "Day 2",
    artist: "AMENRA",
    stage: "Main Stage 1",
    start: "22:30",
    end: "23:50",
  },
   {
    day: "Day 2",
    artist: "FU MANCHU",
    stage: "Main Stage 1",
    start: "00:00",
    end: "01:15",
  },

  {
    day: "Day 2",
    artist: "BOW",
    stage: "Main Stage 2",
    start: "15:20",
    end: "16:00",
  },
  {
    day: "Day 2",
    artist: "SPOON BENDERS",
    stage: "Main Stage 2",
    start: "17:00",
    end: "17:50",
  },
  {
    day: "Day 2",
    artist: "DITZ",
    stage: "Main Stage 2",
    start: "19:05",
    end: "19:55",
  },
  {
    day: "Day 2",
    artist: "KING WOMAN",
    stage: "Main Stage 2",
    start: "21:20",
    end: "22:20",
  },
  {
    day: "Day 2",
    artist: "MAQUINA",
    stage: "Main Stage 2",
    start: "01:20",
    end: "02:10",
  },
    {
    day: "Day 2",
    artist: "CAPELA MORTUARIA",
    stage: "Stage 3",
    start: "14:35",
    end: "15:15",
  },
  {
    day: "Day 2",
    artist: "HEAVY TRIP",
    stage: "Stage 3",
    start: "02:15",
    end: "03:00",
  },
  {
    day: "Day 2",
    artist: "INHUMAN NAUTURE",
    stage: "Stage 3",
    start: "03:10",
    end: "04:00",
  },
  {
    day: "Day 3",
    artist: "Bo Ningen",
    stage: "Lago Stage",
    start: "16:00",
    end: "17:00",
  },
  {
    day: "Day 3",
    artist: "Mueran Humanos",
    stage: "Echo Stage",
    start: "17:30",
    end: "18:30",
  },
  {
    day: "Day 4",
    artist: "Al Lover",
    stage: "Lago Stage",
    start: "16:00",
    end: "17:00",
  },
  {
    day: "Day 4",
    artist: "Ploho",
    stage: "Echo Stage",
    start: "17:30",
    end: "18:30",
  },
];

const parseTime = (timeStr) => {
  const [h, m] = timeStr.split(":".toString()).map(Number);
  return h * 60 + m;
};

const adjustTime = (minutes) => {
  return minutes < 240 ? minutes + 1440 : minutes;
};

const FestivalSchedule = () => {
  const [selectedDay, setSelectedDay] = useState("Day 1");
  const startTime = 14 * 60;
  const endTime = 28 * 60;
  const totalMinutes = endTime - startTime;

  const stages = [...new Set(concerts.filter(c => c.day === selectedDay).map((c) => c.stage))];
  const days = [...new Set(concerts.map((c) => c.day))];

  return (
    <div className="p-4 font-sans min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Sonic Blast 2025 – Portugal</h1>
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              selectedDay === day
                ? 'bg-blue-500 text-white'
                : 'bg-white text-blue-500 border-blue-500'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stages.map((stage, idx) => (
          <div key={idx} className="">
            <h2 className="text-xl font-semibold mb-2 text-center">{stage}</h2>
            <div className="relative h-[1200px] border rounded-lg bg-gray-100 overflow-hidden">
              {concerts
                .filter((c) => c.stage === stage && c.day === selectedDay)
                .map((c, i) => {
                  const adjustedStart = adjustTime(parseTime(c.start));
                  const adjustedEnd = adjustTime(parseTime(c.end));
                  const top = ((adjustedStart - startTime) / totalMinutes) * 100;
                  const height = ((adjustedEnd - adjustedStart) / totalMinutes) * 100;
                  return (
                    <div
                      key={i}
                      className="absolute left-2 right-2 rounded bg-blue-500 text-white p-2 text-sm shadow-md"
                      style={{ top: `${top}%`, height: `${height}%` }}
                    >
                      <strong>{c.artist}</strong>
                      <div>{c.start} - {c.end}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<FestivalSchedule />);
