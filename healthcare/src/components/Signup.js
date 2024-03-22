import React, { useState } from "react";
import {
  UilLock,
  UilEnvelopeAlt,
  UilMedicalSquareFull,
} from "@iconscout/react-unicons";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    let hasError = false;

    if (!email || !password) {
      setError("Email and password are required.");
      hasError = true;
    }

    if (!hasError) {
      if (!email.endsWith("@gmail.com")) {
        setError("Email must end with @gmail.com");
        hasError = true;
      }

      if (
        !hasError &&
        (password.length < 6 ||
          !/\d/.test(password) ||
          !/[a-zA-Z]/.test(password))
      ) {
        setError(
          "Password must be at least 6 characters and contain both letters and numbers."
        );
        hasError = true;
      }
    }

    if (!hasError) {
      try {
        let role = "user";

        if (code) {
          const response = await fetch("http://localhost:9999/doctorCode");
          if (response.ok) {
            const data = await response.json();
            if (data.some((entry) => entry.code === code)) {
              role = "doctor";

              await fetch(
                `http://localhost:9999/doctorCode/${
                  data.find((entry) => entry.code === code).id
                }`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
            } else {
              const adminResponse = await fetch(
                "http://localhost:9999/adminCode"
              );
              if (adminResponse.ok) {
                const adminData = await adminResponse.json();
                if (adminData.some((entry) => entry.admin === code)) {
                  role = "admin";

                  await fetch(
                    `http://localhost:9999/adminCode/${
                      adminData.find((entry) => entry.admin === code).id
                    }`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                } else {
                  setError("Invalid code.");
                  hasError = true;
                }
              } else {
                setError("Error checking admin code. Please try again later.");
                return;
              }
            }
          } else {
            setError("Error checking code. Please try again later.");
            return;
          }
        }

        if (!hasError) {
          const response = await fetch("http://localhost:9999/infor", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              code,
              role,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const { id } = data;

            localStorage.setItem("userId", id);
            console.log("Signup successful!");
            window.location.href = "/update-profile";
          } else {
            setError("Signup failed. Please try again later.");
          }
        }
      } catch (error) {
        setError("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div className="bg-[#DDE5F4] w-screen h-screen flex items-center justify-center">
      <div className="w-[350px] h-[550px] bg-[#ffff] rounded-[30px]">
        <div className="w-full h-auto flex justify-center">
          <div className="w-[150px] h-[150px]">
            <img
              src="https://media.istockphoto.com/id/1321617070/vector/health-medical-logo.jpg?s=612x612&w=0&k=20&c=sus8vhG3c__vCdvOBLDhuf2vPUgIAudIAeUBApU_7Ew="
              alt="Logo"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="w-full h-auto flex justify-center">
          <div className="w-3/4 h-[70px] bg-[#F1F7FA] rounded-[10px]">
            <p className="ml-[10px] mt-[5px] font-mono">Email address:</p>
            <div className="flex items-center mt-[8px]">
              <div className="w-[20px] h-[20px] ml-[10px]">
                <UilEnvelopeAlt size={20} />
              </div>
              <input
                type="text"
                placeholder="username@gmail.com"
                className="pl-[5px] pb-[4px] font-mono  font-[10px] w-4/5 h-full outline-none rounded-[10px] ml-[10px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex justify-center mt-[15px]">
          <div className="w-3/4 h-[70px] bg-[#F1F7FA] rounded-[10px]">
            <p className="ml-[10px] mt-[5px] font-mono">Password:</p>
            <div className="flex items-center mt-[8px]">
              <div className="w-[20px] h-[20px] ml-[10px]">
                <UilLock size={20} />
              </div>
              <input
                type="password"
                placeholder="password..."
                className="pl-[5px] pb-[4px] font-mono  font-[10px] w-4/5 h-full outline-none rounded-[10px] ml-[10px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full h-auto flex justify-center mt-[15px]">
          <div className="w-3/4 h-[70px] bg-[#F1F7FA] rounded-[10px]">
            <p className="ml-[10px] mt-[5px] font-mono">
              Doctor Code or Admin Code:
            </p>
            <div className="flex items-center mt-[8px]">
              <div className="w-[20px] h-[20px] ml-[10px]">
                <UilMedicalSquareFull size={20} />
              </div>
              <input
                type="text"
                placeholder="optional"
                className="pl-[5px] pb-[4px] font-mono  font-[10px] w-4/5 h-full outline-none rounded-[10px] ml-[10px]"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex justify-center mt-[30px]">
          <button
            onClick={handleSignup}
            className="w-3/4 h-[40px] bg-[#0872BB] text-white rounded-[10px] font-mono font-bold font-[10px]"
          >
            Sign Up
          </button>
        </div>
        {error && (
          <div className="w-full h-auto flex justify-center mt-[10px]">
            <p className="text-red-500 font-mono font-bold text-[13px]">
              {error}
            </p>
          </div>
        )}
        <div className="w-full h-auto flex justify-center mt-[10px]">
          <div className="w-full flex justify-center font-mono font-bold text-[13px] items-center">
            <a href="/login">Already have an account?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
