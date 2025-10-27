import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: "http://localhost:9292/api",
});

// --- Companies API ---
export const getCompanies = () => API.get("/companies");
export const addCompany = (company) => API.post("/companies/register", company);
export const updateCompany = (id, company) => API.put(`/companies/${id}`, company);
export const deleteCompany = (id) => API.delete(`/companies/${id}`);
