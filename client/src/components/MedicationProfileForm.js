import React, { useState, useEffect } from 'react';
import myAxios from '../my-axios';
import Footer from './Footer';

const MedicationProfileForm = ({ user }) => {
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [medicationDetails, setMedicationDetails] = useState([]);
  const [activeGrid, setActiveGrid] = useState(false);
  console.log("active", activeGrid, medicationDetails)
  
//  console.log("medicom",user)
  useEffect(() => {
    // Fetch the user's medication details if available
    if (user) {
      fetchMedicationDetails();
    }
  }, [user]);

  const fetchMedicationDetails = async () => {
    try {
      const response = await myAxios.get(`/api/users/medications/${user._id}`);
      setMedicationDetails(response.data);
      console.log("medi", response.data);
     setMedicationName(response.data[0].medicationName)
     setDosage(response.data[0].dosage)
     setFrequency(response.data[0].frequency)
     setSpecialInstructions(response.data[0].specialInstructions)
      // setActiveGrid(true);
      setActiveGrid(!activeGrid);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (medicationDetails.length === 1) {
        // If medication details exist, update them
        const response = await myAxios.put(
          `/api/users/medications/${user._id}`,
          {
            medicationName,
            dosage,
            frequency,
            specialInstructions,
          }
        );
        setActiveGrid(!activeGrid);
        setMedicationDetails([response.data]);
      } else {
        // If medication details don't exist, create new ones
        const response = await myAxios.post('/api/users/medications', {
          patientId: user._id,
          medicationName,
          dosage,
          frequency,
          specialInstructions,
        });
        setMedicationDetails([response.data]);
        setActiveGrid(!activeGrid);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render the form if medication details don't exist, otherwise render update button
  return (
    <div>
      {!activeGrid ? (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Medication Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Medication Name"
                value={medicationName}
                onChange={(e) => setMedicationName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dosage:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Frequency:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Frequency"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Special Instructions:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Special Instructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Medication Profile</button>
          </form>
        </div>
      ) : (
        <div>
          {activeGrid && medicationDetails.map((medication) => (
            <div key={medication._id}>
              <p>Medication Name: {medication.medicationName}</p>
              <p>Dosage: {medication.dosage}</p>
              <p>Frequency: {medication.frequency}</p>
              <p>Special Instructions: {medication.specialInstructions}</p>
            </div>
          ))}
          <button onClick={fetchMedicationDetails} className="btn btn-primary">Update Medication Details</button>
        </div>
      )}
    </div>
  );
};

export default MedicationProfileForm;
