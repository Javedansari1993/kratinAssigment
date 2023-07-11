import React, { useState } from 'react';
import myAxios from '../my-axios';

const ReminderScheduleForm = ({ user }) => {
  const [days, setDays] = useState("Sunday");
  const [times, setTimes] = useState("08:00 AM");
  
 console.log("time", times,days,user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend API to save the reminder schedule
      const response = await myAxios.post('/api/users/reminders', {
        days,
        times,
        patientId: user._id
      });
      // Handle the response, e.g., show a success message or redirect the user
      console.log(response.data);
    } catch (error) {
      // Handle any errors from the request
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 fs-6">
        <label className="form-label">Days:</label>
        <select
          className="form-select"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        >
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Times:</label>
        <select
          className="form-select"
          value={times}
          onChange={(e) => setTimes(e.target.value)}
          required
        >
          <option value="08:00 AM">08:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="04:00 PM">04:00 PM</option>
          <option value="08:00 PM">08:00 PM</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Save Reminder Schedule
      </button>
    </form>
  );
};

export default ReminderScheduleForm;
