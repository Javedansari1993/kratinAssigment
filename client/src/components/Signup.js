import React from 'react';

const Signup = ({ name, email, password, mobileNumber, setName, setEmail, setPassword, setMobileNumber, handleRegister,notification }) => {
  return (
    <div className="container">
      {notification &&
<div class="modal-dialog modal-dialog-scrollable">
  {notification}
</div>}
      <h2 className="text-center">Signup</h2>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className="form-control"
                id="mobileNumber"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                maxLength={10}
              />
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-primary" onClick={handleRegister}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
