import { UilLock, UilEnvelopeAlt } from "@iconscout/react-unicons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setSubmitted(true);
    let hasError = false;

    if (!email || !password) {
      setError("Email and password cannot be empty.");
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

    if (!hasError && submitted) {
      try {
        const response = await fetch("http://localhost:9999/infor");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          const user = data.find(
            (userInfo) =>
              userInfo.email === email &&
              userInfo.password.toString() === password
          );

          if (user) {
            localStorage.setItem("userId", user.id);
            localStorage.removeItem("otherUserId");

            if (user.role === "user") {
              window.location.href = "/homepage/user";
            } else if (user.role === "doctor") {
              window.location.href = "/homepage/doctor";
            }
          } else {
            setError("Invalid email or password");
          }
        } else {
          setError("Failed to fetch user information. Please try again later.");
        }
      } catch (error) {
        setError("An error occurred while processing your request.");
      }
    }
  };

  return (
    <div className="bg-[#DDE5F4] w-screen h-screen flex items-center justify-center">
      <div className="w-[350px] h-[550px] bg-[#ffff] rounded-[30px]">
        <div className="w-full h-auto flex justify-center mt-[10px]">
          <div className="w-[150px] h-[150px]">
            <img
              src="https://media.istockphoto.com/id/1321617070/vector/health-medical-logo.jpg?s=612x612&w=0&k=20&c=sus8vhG3c__vCdvOBLDhuf2vPUgIAudIAeUBApU_7Ew="
              alt="Logo"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="w-full h-auto flex justify-center mt-[30px]">
          <div className="w-3/4 h-[70px] bg-[#F1F7FA] rounded-[10px]">
            <p className="ml-[10px] mt-[5px] font-mono ">Email address:</p>
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
        <div className="w-full h-auto flex justify-center mt-[30px]">
          <div className="w-3/4 h-[70px] bg-[#F1F7FA] rounded-[10px]">
            <p className="ml-[10px] mt-[5px] font-mono ">Password:</p>
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
        <div className="w-full h-auto flex justify-center mt-[30px]">
          <button
            onClick={handleLogin}
            className="w-3/4 h-[40px] bg-[#0872BB] text-white rounded-[10px] font-mono font-bold font-[10px]"
          >
            Login
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
          <div className="w-3/4 flex justify-between font-mono font-bold text-[13px]">
            <a href="/signup">Sign up</a>
            <a href="#">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}
