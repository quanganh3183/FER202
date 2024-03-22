import { UilUser, UilArrowRight } from "@iconscout/react-unicons";
import { useState, useEffect } from "react";
import MedicalHistoryTabs from "./MedicalHistotyTabs";
import { useLocation } from 'react-router-dom';
export default function UserInformation() {
  const [personalInfo, setPersonalInfo] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      fetch(`http://localhost:9999/infor/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setPersonalInfo(data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <div className="w-screen h-auto flex justify-center items-center mt-[10px]">
      <div className="w-3/4">
        <div className="w-full h-auto">
          <div className="w-full flex justify-between">
            <h2 className="font-mono text-[20px] font-bold text-[#109AE5]">
              User Information
            </h2>
            <div className="flex">
              <a href={location.pathname === '/user-profile' ? "/homepage/user" : "/homepage/doctor"}>
                <button className="bg-[#109AE5] text-white  rounded-md p-1 font-bold font-mono flex">
                  Back to home
                  <UilArrowRight size={20} />
                </button>
              </a>
          </div>
        </div>
        <div className="w-full h-[2px] bg-[#109AE5] rounded-[-2px] mt-1"></div>
        <div className="w-full h-auto flex">
          <div className="w-1/4 mt-[20px]">
            <div className="w-[200px] h-[200px] bg-[#109AE5] rounded-[200px] flex justify-center items-center">
              <UilUser size={100} color={"#fff"} />
            </div>
          </div>
          <div className="w-3/4 mt-[20px]">
            {personalInfo && (
              <div className="w-full h-auto">
                <p className="font-mono text-[30px] font-extrabold mb-[20px]">
                  Personal
                </p>
                <div className="flex ">
                  <p className="text-[20px] font-mono font-bold">
                    Full name:
                  </p>
                  <p className="text-[20px] font-mono ml-[10px]">
                    {personalInfo.fullName}
                  </p>
                </div>
                <div className="flex ">
                  <p className="text-[20px] font-mono font-bold">
                    Date of birth:
                  </p>
                  <p className="text-[20px] font-mono ml-[10px]">
                    {personalInfo.dateOfBirth}
                  </p>
                </div>
                <div className="flex ">
                  <p className="text-[20px] font-mono font-bold">Email:</p>
                  <p className="text-[20px] font-mono ml-[10px]">
                    {personalInfo.email}
                  </p>
                </div>
                <div className="flex ">
                  <p className="text-[20px] font-mono font-bold">
                    Phone number:
                  </p>
                  <p className="text-[20px] font-mono ml-[10px]">
                    {personalInfo.phone}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-[1px] bg-[#109AE5] mt-[20px]"></div>
        <MedicalHistoryTabs />
        <div className="w-full h-[1px] bg-[#109AE5] mt-[20px]"></div>
      </div>
    </div>
    </div >
  );
}
