import { useState, useEffect } from "react";

export default function UpdateProfile() {
  const [userData, setUserData] = useState({
    id: "",
    email: "",
    password: "",
    doctorCode: "",
    role: "",
    fullName: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    specify: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [pathologicals, setPathologicals] = useState([]);
  const [showSpecify, setShowSpecify] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetch(`http://localhost:9999/infor/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUserData((prevUserData) => ({
              ...prevUserData,
              id: data.id,
              email: data.email,
              password: data.password,
              doctorCode: data.doctorCode,
              role: data.role,
              fullName: data.fullName || "",
              dateOfBirth: data.dateOfBirth || "",
              phone: data.phone || "",
              address: data.address || "",
            }));

            if (data.role === "doctor") {
              setShowSpecify(true);
            }
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }

    fetch("http://localhost:9999/pathological")
      .then((response) => response.json())
      .then((data) => {
        setPathologicals(data);
      })
      .catch((error) => {
        console.error("Error fetching pathologicals:", error);
      });
  }, []);

  const handleSpecifyChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      specify: e.target.value,
    }));
  };

  const validatePhoneNumber = () => {
    const phonePattern = /^0\d{9}$/;
    if (!phonePattern.test(userData.phone)) {
      setPhoneError("Phone number must start with 0 and have 10 digits.");
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validatePhoneNumber()) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9999/infor/${userData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        console.log("Update successful!");
      } else {
        console.error("Update failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    window.location.href = "/";
  };

  const handleFullNameChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      fullName: e.target.value,
    }));
  };

  const handleDateOfBirthChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      dateOfBirth: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      phone: e.target.value,
    }));
    setPhoneError("");
  };

  const handleAddressChange = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      address: e.target.value,
    }));
  };

  return (
    <div className="w-screen h-auto flex justify-center mt-[100px]">
      <div className="w-2/5 h-auto">
        <h2 className="font-mono text-[20px] font-bold text-[#109AE5]">
          Update Profile
        </h2>
        <div className="w-full h-[2px] bg-[#109AE5] rounded-[-2px] mt-1"></div>
        <div className="w-full">
          <div className="w-full flex mt-[10px]">
            <div className="w-1/2">
              <div className="w-3/4">
                <label
                  htmlFor="fullName"
                  className="font-mono text-black text-[20px] font-bold"
                >
                  Full name
                </label>
                <input
                  placeholder="Nguyen Van A"
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full h-[40px] rounded-[5px] border-[1px] border-black mt-1 pl-[5px] font-mono "
                  value={userData.fullName}
                  onChange={handleFullNameChange}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-3/4">
                <label
                  htmlFor="dateOfBirth"
                  className="font-mono text-black text-[20px] font-bold"
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full h-[40px] rounded-[5px] border-[1px] border-black mt-1 pl-[5px] font-mono"
                  value={userData.dateOfBirth}
                  onChange={handleDateOfBirthChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex mt-[10px]">
            <div className="w-1/2">
              <div className="w-3/4">
                <label
                  htmlFor="phone"
                  className="font-mono text-black text-[20px] font-bold"
                >
                  Phone number
                </label>
                <input
                  placeholder="0xxxxxxxxx"
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full h-[40px] rounded-[5px] border-[1px] border-black mt-1 pl-[5px] font-mono "
                  value={userData.phone}
                  onChange={handlePhoneChange}
                />
                {phoneError && (
                  <p className="text-red-500 font-mono text-[13px]">
                    {phoneError}
                  </p>
                )}
              </div>
            </div>
            <div className="w-1/2">
              <div className="w-3/4">
                <label
                  htmlFor="address"
                  className="font-mono text-black text-[20px] font-bold"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full h-[40px] rounded-[5px] border-[1px] border-black mt-1 pl-[5px] font-mono"
                  value={userData.address}
                  onChange={handleAddressChange}
                />
              </div>
            </div>
          </div>

          {showSpecify && (
            <div className="w-full flex mt-[10px]">
              <div className="w-1/2">
                <div className="w-3/4">
                  <label
                    htmlFor="specify"
                    className="font-mono text-black text-[20px] font-bold"
                  >
                    Choose specify
                  </label>
                  <select
                    required
                    className="w-full h-[40px] border-[1px] border-black mt-1 pl-[5px] font-mono"
                    onChange={handleSpecifyChange}
                    value={userData.specify}
                  >
                    <option disabled selected hidden>
                      Select specify
                    </option>
                    {pathologicals.map((pathological) => (
                      <option key={pathological.id} value={pathological.name}>
                        {pathological.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={handleUpdate}
            className="w-1/4 h-[40px] bg-[#109AE5] rounded-[5px] mt-[20px] font-mono text-white text-[20px] font-bold"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
