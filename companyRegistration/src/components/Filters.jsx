import React from "react";

function Filters({ filters, setFilters }) {
  return (
    <div className="mb-3 d-flex gap-2">
      <input
        type="text"
        placeholder="Search by name"
        className="form-control"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="City"
        className="form-control"
        value={filters.city}
        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
      />
    </div>
  );
}

export default Filters;
