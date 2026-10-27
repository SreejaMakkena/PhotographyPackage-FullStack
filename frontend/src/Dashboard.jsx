
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/packages/all"
        );
        setPackages(response.data);
      } catch {
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const totalPackages = packages.length;

  const totalPrice = packages.reduce(
    (sum, pkg) => sum + Number(pkg.price),
    0
  );

  const averagePrice =
    totalPackages > 0 ? totalPrice / totalPackages : 0;

  const packagesWithAlbum = packages.filter(
    (pkg) => pkg.includesAlbum === true
  ).length;

  const totalHours = packages.reduce(
    (sum, pkg) => sum + Number(pkg.hoursIncluded),
    0
  );

  const formatPrice = (value) =>
    `₹${value.toLocaleString("en-IN", {
      maximumFractionDigits: 2
    })}`;

  const statistics = [
    {
      title: "Total Packages",
      value: totalPackages,
      icon: "bi-camera"
    },
    {
      title: "Average Price",
      value: formatPrice(averagePrice),
      icon: "bi-currency-rupee"
    },
    {
      title: "Packages With Album",
      value: packagesWithAlbum,
      icon: "bi-images"
    },
    {
      title: "Total Photography Hours",
      value: totalHours,
      icon: "bi-clock"
    }
  ];

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
          Photography Dashboard
        </h1>
      </section>

      <div className="container mt-4">
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
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <>
            <div className="row g-4">
              {statistics.map((stat) => (
                <div
                  className="col-md-6 col-lg-3"
                  key={stat.title}
                >
                  <div
                    className="h-100 p-4"
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E8DFD6",
                      borderRadius: "8px",
                      boxShadow:
                        "0 5px 24px rgba(75,60,50,0.04)"
                    }}
                  >
                    <div
                      className="d-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#F5F0E9",
                        borderRadius: "8px"
                      }}
                    >
                      <i
                        className={`bi ${stat.icon}`}
                        style={{
                          fontSize: "23px",
                          color: "#806B5D"
                        }}
                      ></i>
                    </div>

                    <h2
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#3E3028",
                        fontSize: "31px"
                      }}
                    >
                      {stat.value}
                    </h2>

                    <p
                      className="mb-0"
                      style={{
                        color: "#827267",
                        fontSize: "14px"
                      }}
                    >
                      {stat.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-4"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8DFD6",
                borderRadius: "8px",
                overflow: "hidden"
              }}
            >
              <div
                className="px-4 py-3"
                style={{
                  backgroundColor: "#F5F0E9",
                  borderBottom: "1px solid #E8DFD6"
                }}
              >
                <h3
                  className="mb-0"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "25px",
                    color: "#3E3028"
                  }}
                >
                  Package Summary
                </h3>
              </div>

              <div className="p-4">
                <div className="row g-4">
                  {[
                    {
                      label: "Total Available Packages",
                      value: totalPackages
                    },
                    {
                      label: "Packages Including Albums",
                      value: packagesWithAlbum
                    },
                    {
                      label: "Packages Without Albums",
                      value: totalPackages - packagesWithAlbum
                    },
                    {
                      label: "Total Package Value",
                      value: formatPrice(totalPrice)
                    }
                  ].map((item) => (
                    <div
                      className="col-md-6"
                      key={item.label}
                    >
                      <p
                        className="mb-2"
                        style={{
                          color: "#927D6D",
                          fontSize: "14px"
                        }}
                      >
                        {item.label}
                      </p>

                      <h4
                        className="mb-0"
                        style={{ color: "#4B3C32" }}
                      >
                        {item.value}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
