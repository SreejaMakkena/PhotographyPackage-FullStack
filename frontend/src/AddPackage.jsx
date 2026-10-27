
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddPackage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    packageName: "",
    hoursIncluded: "",
    price: "",
    includesAlbum: false
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.packageName.trim().length < 3) {
      setError("Package name must contain at least 3 characters.");
      return;
    }

    if (
      !Number.isInteger(Number(formData.hoursIncluded)) ||
      Number(formData.hoursIncluded) < 1
    ) {
      setError("Hours must be a positive whole number.");
      return;
    }

    if (
      formData.price === "" ||
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) <= 0
    ) {
      setError("Price must be greater than zero.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8081/api/packages/add",
        {
          packageName: formData.packageName.trim(),
          hoursIncluded: Number(formData.hoursIncluded),
          price: Number(formData.price),
          includesAlbum: formData.includesAlbum
        }
      );

      setMessage("Photography package added successfully!");

      setFormData({
        packageName: "",
        hoursIncluded: "",
        price: "",
        includesAlbum: false
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to add package. Please check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: "12px 15px",
    border: "1px solid #DED3C8",
    borderRadius: "5px",
    backgroundColor: "#FDFBF8",
    color: "#4B3C32"
  };

  const labelStyle = {
    color: "#5B493D",
    fontWeight: "600",
    fontSize: "14px",
    marginBottom: "8px"
  };

  return (
    <div
      style={{
        backgroundColor: "#FAF8F5",
        minHeight: "100vh",
        paddingBottom: "50px"
      }}
    >
      {/* Compact Heading Section */}
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
          Create a Photography Package
        </h1>
      </section>

      {/* Form */}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-xl-6">
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8DFD6",
                borderRadius: "8px",
                padding: "clamp(24px, 4vw, 38px)",
                boxShadow: "0 5px 24px rgba(75, 60, 50, 0.04)"
              }}
            >
              <div className="text-center mb-4">
                <i
                  className="bi bi-camera"
                  style={{
                    fontSize: "29px",
                    color: "#806B5D"
                  }}
                ></i>

                <div
                  style={{
                    width: "45px",
                    height: "1px",
                    backgroundColor: "#CBBBAE",
                    margin: "15px auto 0"
                  }}
                ></div>
              </div>

              {message && (
                <div className="alert alert-success" role="status">
                  <i className="bi bi-check-circle me-2"></i>
                  {message}
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="packageName"
                    className="form-label"
                    style={labelStyle}
                  >
                    Package Name
                  </label>

                  <input
                    id="packageName"
                    type="text"
                    className="form-control"
                    style={inputStyle}
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={100}
                    required
                    placeholder="e.g. Wedding Photography"
                  />
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label
                      htmlFor="hoursIncluded"
                      className="form-label"
                      style={labelStyle}
                    >
                      Hours Included
                    </label>

                    <input
                      id="hoursIncluded"
                      type="number"
                      className="form-control"
                      style={inputStyle}
                      name="hoursIncluded"
                      value={formData.hoursIncluded}
                      onChange={handleChange}
                      min="1"
                      step="1"
                      required
                      placeholder="e.g. 8"
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="price"
                      className="form-label"
                      style={labelStyle}
                    >
                      Package Price (₹)
                    </label>

                    <input
                      id="price"
                      type="number"
                      className="form-control"
                      style={inputStyle}
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0.01"
                      step="0.01"
                      required
                      placeholder="e.g. 25000"
                    />
                  </div>
                </div>

                <div
                  className="mb-4 p-3"
                  style={{
                    backgroundColor: "#F8F4EF",
                    border: "1px solid #E8DFD6",
                    borderRadius: "5px"
                  }}
                >
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="includesAlbum"
                      name="includesAlbum"
                      checked={formData.includesAlbum}
                      onChange={handleChange}
                    />

                    <label
                      className="form-check-label"
                      htmlFor="includesAlbum"
                      style={{
                        color: "#5B493D",
                        fontWeight: "500"
                      }}
                    >
                      Include a Photo Album
                    </label>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn flex-grow-1"
                    style={{
                      backgroundColor: "#806B5D",
                      color: "#FFFFFF",
                      padding: "12px 22px",
                      borderRadius: "5px",
                      fontWeight: "500"
                    }}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-lg me-2"></i>
                        Create Package
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn flex-grow-1"
                    onClick={() => navigate("/packages")}
                    style={{
                      border: "1px solid #B9A594",
                      color: "#806B5D",
                      padding: "12px 22px",
                      borderRadius: "5px"
                    }}
                  >
                    View Packages
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPackage;
