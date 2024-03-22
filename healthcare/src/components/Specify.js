import React, { useState, useEffect } from "react";
import Header from "./Header";

export default function Specify() {
  const [pathologicalData, setPathologicalData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/pathological")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPathologicalData(data);
      })
      .catch((error) => {
        console.error("Error fetching pathological data:", error);
      });
  }, []);

  return (
    <div className="w-screen h-auto">
      <Header />
      <div className="w-full flex justify-center">
        <div className="w-3/4">
          <p className="text-center text-[30px] font-mono font-bold">
            Our Specialist
          </p>
          <div className="bg-[#0872BB] h-[2px] w-full"></div>
          <div className="w-full mt-[20px] flex flex-wrap gap-[10px] justify-center">
            {pathologicalData &&
              pathologicalData.map((item) => (
                <div
                  key={item.id}
                  className="w-[calc((100%/3)-20px)] rounded-[20px] border-[4px] h-auto border-[#0872BB] border p-[20px]"
                >
                  <div className="w-full">
                    <div className="w-full flex justify-center">
                      <div className="w-[90px] h-[90px]">
                        <img src={item.src} alt={item.name} />
                      </div>
                    </div>
                    <p className="text-[18px] font-bold text-center mt-[20px]">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
