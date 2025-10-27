import { useState } from "react";
import { addCompany } from "../services/api"; 

function CompanyRegistrationForm({ onRegistered, onViewList }) {
  const [company, setCompany] = useState({
    name: "",
    registrationNo: "",
    addresses: [
      {
        type: "",
        houseNo: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        country: "",
        zip: "",
      },
    ],
    hr: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      username: "",
      email: "",
    },
  });

  // --- Handle Address Change ---
  const handleAddressChange = (index, field, value) => {
    const updated = [...company.addresses];
    updated[index][field] = value;
    setCompany({ ...company, addresses: updated });
  };

  // --- Add New Address ---
  const addAddress = () => {
    setCompany({
      ...company,
      addresses: [
        ...company.addresses,
        {
          type: "",
          houseNo: "",
          street: "",
          landmark: "",
          city: "",
          state: "",
          country: "",
          zip: "",
        },
      ],
    });
  };

  // --- Remove Address ---
  const removeAddress = (index) => {
    if (company.addresses.length === 1) return;
    setCompany({
      ...company,
      addresses: company.addresses.filter((_, i) => i !== index),
    });
  };

  // --- Submit Company Registration ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCompany(company); // Using service layer
      alert("✅ Company Registered Successfully!");
      setCompany({
        name: "",
        registrationNo: "",
        addresses: [
          {
            type: "",
            houseNo: "",
            street: "",
            landmark: "",
            city: "",
            state: "",
            country: "",
            zip: "",
          },
        ],
        hr: {
          firstName: "",
          middleName: "",
          lastName: "",
          gender: "",
          username: "",
          email: "",
        },
      });
      onRegistered();
    } catch (error) {
      console.error(error);
      alert("❌ Error registering company");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4">Company Registration Form</h1>
      <button className="btn btn-info mb-4" onClick={onViewList}>
        View Company List
      </button>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Company Name</label>
          <input
            className="form-control mb-3"
            value={company.name}
            onChange={(e) => setCompany({ ...company, name: e.target.value })}
            required
          />
          <label>Registration No</label>
          <input
            className="form-control"
            value={company.registrationNo}
            onChange={(e) =>
              setCompany({ ...company, registrationNo: e.target.value })
            }
            required
          />
        </div>

        <h4>Addresses</h4>
        {company.addresses.map((addr, i) => (
          <div key={i} className="border p-3 mb-3 rounded">
            <div className="row g-2">
              <div className="col">
                <input
                  placeholder="Type"
                  className="form-control"
                  value={addr.type}
                  onChange={(e) =>
                    handleAddressChange(i, "type", e.target.value)
                  }
                />
              </div>
              <div className="col">
                <input
                  placeholder="House No"
                  className="form-control"
                  value={addr.houseNo}
                  onChange={(e) =>
                    handleAddressChange(i, "houseNo", e.target.value)
                  }
                />
              </div>
              <div className="col">
                <input
                  placeholder="Street"
                  className="form-control"
                  value={addr.street}
                  onChange={(e) =>
                    handleAddressChange(i, "street", e.target.value)
                  }
                />
              </div>
              <div className="col">
                <input
                  placeholder="Landmark"
                  className="form-control"
                  value={addr.landmark}
                  onChange={(e) =>
                    handleAddressChange(i, "landmark", e.target.value)
                  }
                />
              </div>
              <div className="col">
                <input
                  placeholder="City"
                  className="form-control"
                  value={addr.city}
                  onChange={(e) =>
                    handleAddressChange(i, "city", e.target.value)
                  }
                />
              </div>
              <div className="col">
                <input
                  placeholder="State"
                  className="form-control"
                  value={addr.state}
                  onChange={(e) =>
                    handleAddressChange(i, "state", e.target.value)
                  }
                />
              </div>
              <div className="col">
                <input
                  placeholder="Country"
                  className="form-control"
                  value={addr.country}
                  onChange={(e) =>
                    handleAddressChange(i, "country", e.target.value)
                  }
                />
              </div>
              <div className="col">
                <input
                  placeholder="ZIP"
                  className="form-control"
                  value={addr.zip}
                  onChange={(e) =>
                    handleAddressChange(i, "zip", e.target.value)
                  }
                />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-danger btn-sm mt-2"
              onClick={() => removeAddress(i)}
            >
              Remove Address
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-4"
          onClick={addAddress}
        >
          + Add Address
        </button>

        <h4>HR Details</h4>
        <div className="row g-3 mb-4">
          <div className="col">
            <input
              placeholder="First Name"
              className="form-control"
              value={company.hr.firstName}
              onChange={(e) =>
                setCompany({
                  ...company,
                  hr: { ...company.hr, firstName: e.target.value },
                })
              }
              required
            />
          </div>
          <div className="col">
            <input
              placeholder="Middle Name"
              className="form-control"
              value={company.hr.middleName}
              onChange={(e) =>
                setCompany({
                  ...company,
                  hr: { ...company.hr, middleName: e.target.value },
                })
              }
            />
          </div>
          <div className="col">
            <input
              placeholder="Last Name"
              className="form-control"
              value={company.hr.lastName}
              onChange={(e) =>
                setCompany({
                  ...company,
                  hr: { ...company.hr, lastName: e.target.value },
                })
              }
              required
            />
          </div>
          <div className="col">
            <input
              placeholder="Gender"
              className="form-control"
              value={company.hr.gender}
              onChange={(e) =>
                setCompany({
                  ...company,
                  hr: { ...company.hr, gender: e.target.value },
                })
              }
            />
          </div>
          <div className="col">
            <input
              placeholder="Username"
              className="form-control"
              value={company.hr.username}
              onChange={(e) =>
                setCompany({
                  ...company,
                  hr: { ...company.hr, username: e.target.value },
                })
              }
              required
            />
          </div>
          <div className="col">
            <input
              placeholder="Email"
              type="email"
              className="form-control"
              value={company.hr.email}
              onChange={(e) =>
                setCompany({
                  ...company,
                  hr: { ...company.hr, email: e.target.value },
                })
              }
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CompanyRegistrationForm;
