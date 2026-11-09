
import React, { useState } from "react";
import axios from "axios";
import { LockKeyhole, Mail, ArrowRight, ShieldCheck } from "lucide-react";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    error: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus({ loading: true, error: "" });

    try {
      const response = await axios.post(
        "https://khalilabs-backend.onrender.com/api/auth/login",
        formData
      );

      if (response.data.success && response.data.token) {
        sessionStorage.setItem("khalilabsAdminToken", response.data.token);
        sessionStorage.setItem(
          "khalilabsAdmin",
          JSON.stringify(response.data.admin)
        );

        window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      setStatus({
        loading: false,
        error:
          error.response?.data?.message ||
          "Unable to log in. Please try again.",
      });
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <span className="admin-brand-icon">K</span>
          <div>
            <h2>KHALILABS</h2>
            <small>DIGITAL SOLUTIONS</small>
          </div>
        </div>

        <div className="admin-login-heading">
          <div className="admin-login-icon">
            <LockKeyhole size={27} />
          </div>

          <h3>Administrator Login</h3>
          <p>Sign in to manage your Khalilabs website.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>

            <div className="admin-input-group">
              <Mail size={19} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your admin email"
                required
                autoComplete="username"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <div className="admin-input-group">
              <LockKeyhole size={19} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {status.error && (
            <div className="alert alert-danger" role="alert">
              {status.error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-danger w-100 rounded-pill admin-login-button"
            disabled={status.loading}
          >
            {status.loading ? "Signing in..." : "Sign In"}
            {!status.loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="admin-login-security">
          <ShieldCheck size={17} />
          <span>Secure administrator access</span>
        </div>

        <a href="/" className="admin-back-link">
          Back to Khalilabs Website
        </a>
      </div>
    </div>
  );
}

export default AdminLogin;
