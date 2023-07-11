import React, { useState, useEffect } from "react";
import myAxios from "../my-axios";

const UserProfile = ({ user }) => {
    const [medicationDetails, setMedicationDetails] = useState([]);
    // console.log(user);
    useEffect(() => {
        // Fetch the user's medication details if available
        if (user) {
            fetchMedicationDetails();
        }
    }, [user]);

    const fetchMedicationDetails = async () => {
        // console.log("javed")
        try {
            const response = await myAxios.get(
                `/api/users/medications/${user._id}`
            );
            setMedicationDetails(response.data);
            // console.log("medication", response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="m-4 p-4">
            <div className="container">
                <div className="row p-5">
                    <div className="col-md-6 mb-5 fs-5">
                        <p>name:{" "}{user.name}</p>
                        <p>Email:{" "}{user.email}</p>
                        <p>Mobile Number:{" "}{user.mobileNumber}</p>
                    </div>
                    <div className="col-md-6">
                        {medicationDetails.length > 0 ? (
                            medicationDetails.map((medication) => (
                                <div key={medication._id} className="fs-5">
                                    <p>
                                        Medication Name:{" "}
                                        {medication.medicationName}
                                    </p>
                                    <p>Dosage: {medication.dosage}</p>
                                    <p>Frequency: {medication.frequency}</p>
                                    <p>
                                        Special Instructions:{" "}
                                        {medication.specialInstructions}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>No medication details available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
