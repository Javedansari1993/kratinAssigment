import React from "react";
import MedicationProfileForm from "./MedicationProfileForm";
import ReminderScheduleForm from "./ReminderScheduleForm";
import Footer from "./Footer";

const Dashboard = ({ user }) => {
    console.log(user);
    return (
        <div>
            <h3>welcome to {user.name}</h3>
            <div className="container">
                <div className="row p-5">
                    <div className="col-md-6 mb-5">
                        <MedicationProfileForm user={user} />
                    </div>
                    <div className="col-md-6">
                        <ReminderScheduleForm user={user} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
