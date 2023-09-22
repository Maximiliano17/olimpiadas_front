// AlarmContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import io from "socket.io-client";

const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const audio = new Audio("../../public/Alarm sound effect￼.mp4");
  const activateAlarm = () => {
    audio.play();
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      audio.play();
    });
  };

  const deactivateAlarm = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  useEffect(() => {
    const socket = io(
      "https://olimpiadas-informatica-production.up.railway.app"
    );

    // Escuchar el evento 'onLoadAlarm' del WebSocket
    socket.on("server:reloadAlarm", (data) => {
      if (data) {
        activateAlarm();
      } else {
        deactivateAlarm();
        console.log("apague alarma");
        audio.pause(); // Detener la reproducción
        audio.currentTime = 0;
      }
    });

    // Limpia el evento cuando el componente se desmonta
    return () => {
      socket.off("server:reloadAlarm");
    };
  }, []);
  return (
    <AlarmContext.Provider value={{ activateAlarm, deactivateAlarm }}>
      {children}
    </AlarmContext.Provider>
  );
};

export const useAlarm = () => {
  return useContext(AlarmContext);
};
