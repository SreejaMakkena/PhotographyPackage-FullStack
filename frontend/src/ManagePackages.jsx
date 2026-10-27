
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8081/api/packages";

function ManagePackages() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [editForm, setEditForm] = useState({
    packageName: "",
    hoursIncluded: "",
    price: "",
    includesAlbum: false
  });

  const fetchPackages = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/all`);
      setPackages(response.data);
    } catch {
      setError("Unable to load packages. Check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this photography package?")) {
      return;
    }

    setError("");
    setMessage("");
    setDeletingId(id);

    try {
      await axios.delete(`${API_URL}/delete/${id}`);

      if (editingId === id) {
        setEditingId(null);
      }

      await fetchPackages();
      setMessage("Package deleted successfully.");
    } catch {
      setError("Failed to delete package.");
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (pkg) => {
    setEditingId(pkg.id);

    setEditForm({
      packageName: pkg.packageName,
      hoursIncluded: pkg.hoursIncluded,
      price: pkg.price,
      includesAlbum: pkg.includesAlbum
    });

    setError("");
    setMessage("");
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (editForm.packageName.trim().length < 3) {
      setError("Package name must contain at least 3 characters.");
      return;
    }

    if (
      !Number.isInteger(Number(editForm.hoursIncluded)) ||
      Number(editForm.hoursIncluded) < 1
    ) {
      setError("Hours must be a positive whole number.");
      return;
    }

    if (
      editForm.price === "" ||
      !Number.isFinite(Number(editForm.price)) ||
      Number(editForm.price) <= 0
    ) {
      setError("Price must be greater than zero.");
      return;
    }

    setError("");
    setMessage("");
    setSaving(true);

    try {
      await axios.put(`${API_URL}/update/${editingId}`, {
        packageName: editForm.packageName.trim(),
        hoursIncluded: Number(editForm.hoursIncluded),
        price: Number(editForm.price),
        includesAlbum: editForm.includesAlbum
      });

      setEditingId(null);
      await fetchPackages();
      setMessage("Package updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update package."
      );
    } finally {
      setSaving(false);
    }
  };

  const filteredPackages = packages
    .filter((pkg) =>
      pkg.packageName.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return a.id - b.id;
    });

  const inputStyle = {
    padding: "11px 14px",
    border: "1px solid #DED3C8",
    borderRadius: "5px",
    backgroundColor: "#FDFBF8"
  };

  const labelStyle = {
    color: "#5B493D",
    fontWeight: "600",
    fontSize: "14px"
  };

  return (
    <div
      style={{
        backgroundColor: "#FAF8F5",
        minHeight: "100vh",
        paddingBottom: "55px"
      }}
    >
      <section
        className="text-center px-3"
        style={{
          backgroundColor: "#F5F0E9",
          padding: "32px 20px 36px"
        }}
      >
        <p
          style={{
            letterSpacing: "2.5px",
            color: "#927D6D",
            fontSize: "11px",
            fontWeight: "600",
            marginBottom: "10px"
          }}
        >
          THE PHOTOGRAPHY ATELIER
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(30px, 4vw, 42px)",
            color: "#3E3028",
            fontWeight: "500",
            marginBottom: 0
          }}
        >
          Manage Photography Packages
        </h1>
      </section>

      <div className="container mt-4">
        {message && (
          <div className="alert alert-success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div
          className="p-4 mb-4"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E8DFD6",
            borderRadius: "8px"
          }}
        >
          <div className="row g-3 align-items-center">
            <div className="col-md-8">
              <div className="input-group">
                <span
                  className="input-group-text"
                  style={{
                    backgroundColor: "#FDFBF8",
                    borderColor: "#DED3C8",
                    color: "#806B5D"
                  }}
                >
                  <i className="bi bi-search"></i>
                </span>

                <input
                  type="search"
                  className="form-control"
                  style={inputStyle}
                  placeholder="Search photography packages..."
                  aria-label="Search packages"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                style={inputStyle}
                aria-label="Sort packages"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Default Order</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border"
              style={{ color: "#806B5D" }}
              role="status"
            >
              <span className="visually-hidden">Loading</span>
            </div>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div
            className="text-center p-5"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8DFD6",
              borderRadius: "8px"
            }}
          >
            <i
              className="bi bi-camera"
              style={{
                fontSize: "30px",
                color: "#806B5D"
              }}
            ></i>

            <h3
              className="mt-3"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#3E3028"
              }}
            >
              No Packages Found
            </h3>

            <p style={{ color: "#827267" }}>
              {search
                ? "Try a different search."
                : "No photography packages available."}
            </p>
          </div>
        ) : (
          <div
            className="table-responsive"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8DFD6",
              borderRadius: "8px",
              overflow: "hidden"
            }}
          >
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  {[
                    "ID",
                    "Package Name",
                    "Hours",
                    "Price",
                    "Album",
                    "Actions"
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="p-3"
                      style={{
                        backgroundColor: "#F5F0E9",
                        color: "#5B493D",
                        fontSize: "14px"
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredPackages.map((pkg) => (
                  <tr key={pkg.id}>
                    <td className="p-3">{pkg.id}</td>

                    <td
                      className="p-3 fw-semibold"
                      style={{ color: "#4B3C32" }}
                    >
                      {pkg.packageName}
                    </td>

                    <td className="p-3">
                      {pkg.hoursIncluded}
                    </td>

                    <td className="p-3">
                      ₹{Number(pkg.price).toLocaleString("en-IN")}
                    </td>

                    <td className="p-3">
                      <span
                        style={{
                          backgroundColor: "#F5F0E9",
                          color: "#806B5D",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          fontSize: "13px"
                        }}
                      >
                        {pkg.includesAlbum ? "Yes" : "No"}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => startEdit(pkg)}
                          style={{
                            border: "1px solid #B9A594",
                            color: "#806B5D"
                          }}
                        >
                          <i className="bi bi-pencil me-1"></i>
                          Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm"
                          disabled={deletingId === pkg.id}
                          onClick={() => handleDelete(pkg.id)}
                          style={{
                            border: "1px solid #E3C5BE",
                            color: "#965D51"
                          }}
                        >
                          <i className="bi bi-trash me-1"></i>
                          {deletingId === pkg.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editingId !== null && (
          <div
            className="mt-4 p-4"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8DFD6",
              borderRadius: "8px"
            }}
          >
            <h3
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#3E3028",
                fontSize: "27px"
              }}
            >
              Edit Package
            </h3>

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label
                  htmlFor="editName"
                  className="form-label"
                  style={labelStyle}
                >
                  Package Name
                </label>

                <input
                  id="editName"
                  type="text"
                  className="form-control"
                  style={inputStyle}
                  name="packageName"
                  value={editForm.packageName}
                  onChange={handleEditChange}
                  minLength={3}
                  maxLength={100}
                  required
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label
                    htmlFor="editHours"
                    className="form-label"
                    style={labelStyle}
                  >
                    Hours Included
                  </label>

                  <input
                    id="editHours"
                    type="number"
                    className="form-control"
                    style={inputStyle}
                    name="hoursIncluded"
                    value={editForm.hoursIncluded}
                    onChange={handleEditChange}
                    min="1"
                    step="1"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="editPrice"
                    className="form-label"
                    style={labelStyle}
                  >
                    Package Price (₹)
                  </label>

                  <input
                    id="editPrice"
                    type="number"
                    className="form-control"
                    style={inputStyle}
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="form-check mb-4">
                <input
                  id="editAlbum"
                  type="checkbox"
                  className="form-check-input"
                  name="includesAlbum"
                  checked={editForm.includesAlbum}
                  onChange={handleEditChange}
                />

                <label
                  htmlFor="editAlbum"
                  className="form-check-label"
                >
                  Include a Photo Album
                </label>
              </div>

              <div className="d-flex gap-3 flex-wrap">
                <button
                  type="submit"
                  className="btn"
                  disabled={saving}
                  style={{
                    backgroundColor: "#806B5D",
                    color: "#FFFFFF",
                    padding: "11px 24px"
                  }}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditingId(null)}
                  style={{
                    border: "1px solid #B9A594",
                    color: "#806B5D",
                    padding: "11px 24px"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagePackages;
