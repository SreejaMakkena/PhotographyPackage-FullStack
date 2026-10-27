
import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: "bi-plus-circle",
      title: "Create Packages",
      description: "Add photography packages with pricing and duration.",
      path: "/add",
      button: "Create Package"
    },
    {
      icon: "bi-collection",
      title: "Manage Packages",
      description: "View, search, update and delete existing packages.",
      path: "/packages",
      button: "View Packages"
    },
    {
      icon: "bi-bar-chart-line",
      title: "Dashboard",
      description: "View package statistics and pricing details.",
      path: "/dashboard",
      button: "View Dashboard"
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
          padding: "55px 20px"
        }}
      >
        <p
          style={{
            letterSpacing: "2.5px",
            color: "#927D6D",
            fontSize: "11px",
            fontWeight: "600",
            marginBottom: "12px"
          }}
        >
          THE PHOTOGRAPHY ATELIER
        </p>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(34px, 5vw, 48px)",
            color: "#3E3028",
            fontWeight: "500"
          }}
        >
          Photography Package Management
        </h1>

        <p
          style={{
            color: "#827267",
            fontSize: "15px",
            marginTop: "14px"
          }}
        >
          Create, organize and manage your photography packages.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
          <Link
            to="/add"
            className="btn"
            style={{
              backgroundColor: "#806B5D",
              color: "#FFFFFF",
              padding: "11px 25px"
            }}
          >
            Create Package
          </Link>

          <Link
            to="/packages"
            className="btn"
            style={{
              border: "1px solid #B9A594",
              color: "#806B5D",
              padding: "11px 25px"
            }}
          >
            View Packages
          </Link>
        </div>
      </section>

      <div className="container mt-5">
        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-md-4" key={feature.title}>
              <div
                className="h-100 p-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8DFD6",
                  borderRadius: "8px",
                  boxShadow: "0 5px 24px rgba(75,60,50,0.04)"
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center mb-4"
                  style={{
                    width: "52px",
                    height: "52px",
                    backgroundColor: "#F5F0E9",
                    borderRadius: "8px"
                  }}
                >
                  <i
                    className={`bi ${feature.icon}`}
                    style={{
                      fontSize: "24px",
                      color: "#806B5D"
                    }}
                  ></i>
                </div>

                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#3E3028",
                    fontSize: "24px"
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    color: "#827267",
                    fontSize: "14px",
                    minHeight: "44px"
                  }}
                >
                  {feature.description}
                </p>

                <Link
                  to={feature.path}
                  className="text-decoration-none fw-semibold"
                  style={{
                    color: "#806B5D",
                    fontSize: "14px"
                  }}
                >
                  {feature.button}
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
