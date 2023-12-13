import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: null,
    address: '',
  });

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
  });

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date_of_birth: date,
    });
    setErrors({
      ...errors,
      date_of_birth: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Validation for first_name and last_name
    if (name === 'first_name' || name === 'last_name') {
      if (/[^a-zA-Z]/.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Only characters are allowed',
        });
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (formData.first_name.trim() === '') {
      validationErrors.first_name = 'First name is required';
    }

    if (formData.last_name.trim() === '') {
      validationErrors.last_name = 'Last name is required';
    }

    if (!formData.date_of_birth) {
      validationErrors.date_of_birth = 'Date of birth is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post('http://localhost:8002/voter/register', formData)
      .then((response) => {
        console.log('Registration successful:', response.data);
        toast.success('Registration successful');
        setFormData({
          first_name: '',
          last_name: '',
          date_of_birth: null,
          address: '',
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error('Validation errors:', error.response.data);
        } else {
          console.error('Registration failed:', error);
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div
              className="card-body has-bg-image"
              style={{
                backgroundImage: `url('https://media.kasperskydaily.com/wp-content/uploads/sites/92/2020/10/16044143/M187_Digital-voting-header.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <h2 className="text-center mb-4" style={{ fontFamily: 'Georgia, serif', color: 'black' }}>
                Voter Registration
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 row align-items-center">
                  <label htmlFor="first_name" className="form-label col-md-3" style={{ color: 'black', fontWeight: 'bold' }}>
                    First Name
                  </label>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className={`form-control ${errors.first_name && 'is-invalid'}`}
                      id="first_name"
                      name="first_name"
                      placeholder="Enter your first name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                  </div>
                </div>

                <div className="mb-3 row align-items-center">
                  <label htmlFor="last_name" className="col-sm-3 col-form-label" style={{ color: 'black', fontWeight: 'bold' }}>
                    Last Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${errors.last_name && 'is-invalid'}`}
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      required
                    />
                    {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="date_of_birth" className="form-label col-sm-3" style={{ color: 'black', fontWeight: 'bold' }}>
                    Date of Birth
                  </label>
                  <div className="col-sm-9">
                    <DatePicker
                      selected={formData.date_of_birth}
                      onChange={handleDateChange}
                      name="date_of_birth"
                      placeholderText="Select Date of Birth"
                      dateFormat="yyyy-MM-dd"
                      className={`form-control ${errors.date_of_birth && 'is-invalid'}`}
                      required
                    />
                    {errors.date_of_birth && <div className="invalid-feedback">{errors.date_of_birth}</div>}
                  </div>
                </div>

                <div className="mb-3 row align-items-center">
                  <label htmlFor="address" className="form-label col-sm-3" style={{ color: 'black', fontWeight: 'bold' }}>
                    Address
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegistrationForm;
