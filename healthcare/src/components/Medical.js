import React, { useState, useEffect } from "react";

export default function Medical() {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedRecord, setEditedRecord] = useState({
    id: "",
    medicineName: "",
    endDate: "",
    usage: "",
    notification1: "",
    notification2: "",
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    fetch(`http://localhost:9999/infor/${storedUserId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserRole(data.role);

        if (data.role === "user") {
          fetch(`http://localhost:9999/medical?patientId=${storedUserId}`)
            .then((response) => response.json())
            .then((data) => {
              setMedicalRecords(data);
            })
            .catch((error) => {
              console.error("Error fetching medical records:", error);
            });
        } else if (data.role === "doctor") {
          fetch(`http://localhost:9999/medical?doctorId=${storedUserId}`)
            .then((response) => response.json())
            .then((data) => {
              setMedicalRecords(data);
            })
            .catch((error) => {
              console.error("Error fetching medical records:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching user role:", error);
      });
  }, []);

  const handleEditClick = (record) => {
    setEditedRecord(record);
    setShowEditPopup(true);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:9999/medical/${editedRecord.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecord),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedMedicalRecords = medicalRecords.map((record) =>
          record.id === editedRecord.id ? data : record
        );
        setMedicalRecords(updatedMedicalRecords);
      })
      .catch((error) => {
        console.error("Error updating medical record:", error);
      });
    setShowEditPopup(false);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditedRecord({
      ...editedRecord,
      [name]: value,
    });
  };

  return (
    <div className="w-full h-auto flex justify-center items-center mt-[10px]">
      <div className="w-full">
        <div className="w-full mt-[20px]">
          <p className="font-mono text-[30px] text-center font-extrabold mb-[20px]">
          Prescription History
          </p>
          <div className="w-full">
            <table className="w-full mt-8 table-auto font-mono">
              <thead>
                <tr className="bg-[#109AE5] text-white font-bold">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Start Date</th>
                  <th className="px-4 py-2 border">End Date</th>
                  <th className="px-4 py-2 border">The Usage And Dosage</th>
                  <th className="px-4 py-2 border">Recommended Time</th>
                  {userRole === "doctor" && (
                    <th className="px-4 py-2 border">Patient Name</th>
                  )}
                  {userRole === "doctor" && (
                    <th className="px-4 py-2 border">Edit</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {medicalRecords.map((record) => (
                  <tr key={record.id} className="bg-white">
                    <td className="px-4 py-2 border">
                      <div className="w-full h-full flex items-center justify-center">
                        <p>{record.medicineName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 border">
                                            <div className="w-full h-full flex items-center justify-center">
                                                <p>{record.startDate}</p>
                                            </div>
                                        </td>
                    <td className="px-4 py-2 border">
                      <div className="w-full h-full flex items-center justify-center">
                        <p>{record.endDate}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="w-full h-full flex items-center justify-center max-w-[200px]">
                        <p>{record.usage}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 border">
                      <div className="w-full h-full flex items-center justify-center">
                        <p>
                          {record.notification1} & {record.notification2}
                        </p>
                      </div>
                    </td>
                    {userRole === "doctor" && (
                      <td className="px-4 py-2 border">
                        <div className="w-full h-full flex items-center justify-center">
                          <p>{record.patientFullName}</p>
                        </div>
                      </td>
                    )}
                    {userRole === "doctor" && (
                      <td className="px-4 py-2 border">
                        <div className="w-full h-full flex items-center justify-center">
                          <button onClick={() => handleEditClick(record)} className="bg-green-500 text-white w-20 rounded-md py-1">
                            Edit
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showEditPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-bold mb-4">Edit Medical Record</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="medicineName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Medicine Name:
                </label>
                <input
                  type="text"
                  id="medicineName"
                  name="medicineName"
                  value={editedRecord.medicineName}
                  onChange={handleEditChange}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date:
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={editedRecord.endDate}
                  onChange={handleEditChange}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="usage"
                  className="block text-sm font-medium text-gray-700"
                >
                  The Usage And Dosage:
                </label>
                <textarea
                  id="usage"
                  name="usage"
                  value={editedRecord.usage}
                  onChange={handleEditChange}
                  rows="3"
                  className="w-full border rounded-md px-3 py-2 mt-1"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="notification1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recommended Time 1:
                </label>
                <input
                  type="time"
                  id="notification1"
                  name="notification1"
                  value={editedRecord.notification1}
                  onChange={handleEditChange}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="notification2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recommended Time 2:
                </label>
                <input
                  type="time"
                  id="notification2"
                  name="notification2"
                  value={editedRecord.notification2}
                  onChange={handleEditChange}
                  className="w-full border rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                  onClick={() => setShowEditPopup(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
