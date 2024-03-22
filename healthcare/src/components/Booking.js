import React, { useState, useEffect } from "react";

export default function Booking() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedHealthProblem, setSelectedHealthProblem] = useState("");
  const [pathologicals, setPathologicals] = useState([]);
  const [patientFullName, setPatientFullName] = useState("");

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");
    if (userIdFromStorage) {
      setUserId(userIdFromStorage);
    }

    fetch("http://localhost:9999/infor")
      .then((response) => response.json())
      .then((data) => {
        const doctorData = data.filter((user) => user.role === "doctor");
        console.log("doctorData: ", doctorData);
        setDoctors(doctorData);
        setLoading(false);
        
        // Find the user with the same id as userId and get their fullName
      const currentUser = data.find(user => user.id === userIdFromStorage);
      if (currentUser) {
        const { fullName } = currentUser;
        setPatientFullName(fullName);
      }
     

      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      });

    fetch("http://localhost:9999/pathological")
      .then((response) => response.json())
      .then((data) => {
        setPathologicals(data);
      })
      .catch((error) => {
        console.error("Error fetching pathologicals:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
    const selectedDoctor = doctors.find(
      (doctor) => doctor.id === selectedDoctorId
    );
    const doctorFullName = selectedDoctor ? selectedDoctor.fullName : "Unknown";

    const bookingData = {
      doctorId: selectedDoctorId,
      patientId: userId,
      time: selectedTime,
      date: selectedDate,
      symptoms: symptoms,
      healthProblem: selectedHealthProblem,
      status: true,
      currentDate: currentDate,
      doctorFullName: doctorFullName,
      patientFullName: patientFullName,
      isRated: false,
    };

    fetch("http://localhost:9999/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to book appointment");
        }
        console.log("Appointment booked successfully!");
        window.location.href = "/homepage/user";
      })
      .catch((error) => {
        console.error("Error booking appointment:", error);
      });
  };

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full bg-[#DDE5F4] flex justify-center items-center">
        <div className="w-[700px] h-[400px] bg-white rounded-[30px] flex flex-col items-center">
          <p className="text-[#0493B3] font-mono font-bold text-[35px] mt-[20px]">
            Booking an appointment
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-[10px]">
              <div className="w-[300px] h-[40px] mt-[20px] flex items-center">
                <select
                  required
                  className="w-[300px] h-[40px] border-[1px] border-[#0493B3] rounded-[30px] pl-[10px]"
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                >
                  <option disabled selected hidden>
                    Select doctor
                  </option>
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.fullName
                          ? `Dr. ${doctor.fullName}`
                          : "Dr. Unknown"}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div className="w-[300px] h-[40px] mt-[20px] flex items-center">
                <select
                  required
                  className="w-[300px] h-[40px] border-[1px] border-[#0493B3] rounded-[30px] pl-[10px]"
                  onChange={(e) => setSelectedHealthProblem(e.target.value)}
                >
                  <option disabled selected hidden>
                    Select your health problem
                  </option>
                  {pathologicals.map((pathological) => (
                    <option key={pathological.id} value={pathological.name}>
                      {pathological.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-[10px]">
              <div className="w-[300px] h-[40px] mt-[20px] flex items-center">
                <input
                  className="w-[300px] h-[40px] border-[1px] border-[#0493B3] rounded-[30px] px-[10px]"
                  type="time"
                  placeholder="Select time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                />
              </div>
              <div className="w-[300px] h-[40px] mt-[20px] flex items-center">
                <input
                  className="w-[300px] h-[40px] border-[1px] border-[#0493B3] rounded-[30px] px-[10px]"
                  type="date"
                  placeholder="Select date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex">
              <div className="w-[500px] h-[80px] mt-[20px] flex items-center">
                <input
                  className="w-[500px] h-[80px] border-[1px] border-[#0493B3] rounded-[10px] px-[10px] items-start"
                  type="text"
                  placeholder="Enter your symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
            </div>
            <div className="w-[610px] gap-[10px] h-[40px] mt-[20px] flex items-center">
              <a href="/homepage/user" className="w-[300px] h-[40px] bg-[#999999] text-white text-center font-mono font-bold rounded-[30px]">
                <p className="mt-[7px]">Cancel</p>
              </a>
              <button
                className="w-[300px] h-[40px] bg-[#0872BB] text-white font-mono font-bold rounded-[30px]"
                type="submit"
              >
                Book the doctor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
