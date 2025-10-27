import { useEffect, useState } from "react";
import {
  getCompanies,
  updateCompany,
  deleteCompany,
} from "../services/api"; // Imported API service

function CompanyList({ onBack }) {
  const [companies, setCompanies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [filterName, setFilterName] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [sortField, setSortField] = useState("");

  //  Fetching companies using service
  const fetchCompanies = async () => {
    try {
      const res = await getCompanies();
      console.log(" API Result:", res.data);
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    try {
      await deleteCompany(id);
      alert("Company deleted successfully");
      fetchCompanies();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete company");
    }
  };

  // Start edit
  const startEdit = (company) => {
    setEditingId(company.id);
    setEditingCompany({ ...company });
  };

  // Save edit
  const handleSave = async () => {
    try {
      await updateCompany(editingId, editingCompany);
      alert("Company updated successfully");
      setEditingId(null);
      setEditingCompany(null);
      fetchCompanies();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update company");
    }
  };

  // Cancel
  const cancelEdit = () => {
    setEditingId(null);
    setEditingCompany(null);
  };

  const handleChange = (field, value) => {
    setEditingCompany({ ...editingCompany, [field]: value });
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...editingCompany.addresses];
    updatedAddresses[index][field] = value;
    setEditingCompany({ ...editingCompany, addresses: updatedAddresses });
  };

  const filteredCompanies = companies
    .filter((c) =>
      c.name ? c.name.toLowerCase().includes(filterName.toLowerCase()) : false
    )
    .filter((c) =>
      c.addresses.some((a) =>
        a.city?.toLowerCase().includes(filterCity.toLowerCase())
      )
    );

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField] ?? "";
    const valB = b[sortField] ?? "";
    return valA.localeCompare(valB);
  });

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🏢 Company List</h2>

      <button className="btn btn-secondary mb-3" onClick={onBack}>
        ← Back to Registration
      </button>

      <div className="row g-2 mb-4">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by Company Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by City"
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
          />
        </div>
        <div className="col">
          <select
            className="form-control"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="name">Name</option>
            <option value="registrationNo">Registration No</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Registration No</th>
            <th>HR Name</th>
            <th>HR Email</th>
            <th>Addresses</th>
            <th style={{ width: "90px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedCompanies.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No companies found.
              </td>
            </tr>
          ) : (
            sortedCompanies.map((company) => (
              <tr key={company.id}>
                <td>{company.id}</td>

                <td>
                  {editingId === company.id ? (
                    <input
                      className="form-control"
                      value={editingCompany.name ?? ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  ) : (
                    company.name
                  )}
                </td>

                <td>
                  {editingId === company.id ? (
                    <input
                      className="form-control"
                      value={editingCompany.registrationNo ?? ""}
                      onChange={(e) =>
                        handleChange("registrationNo", e.target.value)
                      }
                    />
                  ) : (
                    company.registrationNo
                  )}
                </td>

                <td>
                  {company.hr?.firstName} {company.hr?.lastName}
                </td>
                <td>{company.hr?.email}</td>

                <td>
                  {editingId === company.id ? (
                    <div className="p-2 bg-light rounded">
                      {editingCompany.addresses.map((addr, i) => (
                        <div key={i} className="mb-3">
                          <input
                            className="form-control mb-1"
                            placeholder="City"
                            value={addr.city ?? ""}
                            onChange={(e) =>
                              handleAddressChange(i, "city", e.target.value)
                            }
                          />
                          <input
                            className="form-control mb-1"
                            placeholder="State"
                            value={addr.state ?? ""}
                            onChange={(e) =>
                              handleAddressChange(i, "state", e.target.value)
                            }
                          />
                          <input
                            className="form-control mb-1"
                            placeholder="Country"
                            value={addr.country ?? ""}
                            onChange={(e) =>
                              handleAddressChange(i, "country", e.target.value)
                            }
                          />
                          <input
                            className="form-control mb-1"
                            placeholder="Zip"
                            value={addr.zip ?? ""}
                            onChange={(e) =>
                              handleAddressChange(i, "zip", e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {company.addresses.map((addr, i) => (
                        <div key={i}>
                          <strong>{addr.city}</strong>, {addr.state},{" "}
                          {addr.country}, {addr.zip}
                        </div>
                      ))}
                    </div>
                  )}
                </td>

                <td className="text-center">
                  {editingId === company.id ? (
                    <>
                      <span
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={handleSave}
                      >
                        ✔
                      </span>{" "}
                      <span
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={cancelEdit}
                      >
                        ✖
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => startEdit(company)}
                      >
                        ✏️
                      </span>{" "}
                      <span
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleDelete(company.id)}
                      >
                        🗑️
                      </span>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyList;
