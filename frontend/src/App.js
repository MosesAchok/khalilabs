// import React from "react";
import AdminDashboard from "./pages/AdminDashboard";
import React, { useState } from "react";
import axios from "axios";

import {
  ArrowRight,
  Code2,
  Monitor,
  ShoppingCart,
  Smartphone,
  Search,
  Settings,
  CheckCircle2,
  Menu,
  Globe,
  Layers,
  MessageCircle,
} from "lucide-react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
const packages = [
  {
    name: "Essential Website",
    price: "35,000",
    description: "A simple website that works on phones.",
    icon: Monitor,
    features: [
      "Up to 5 pages",
      "Responsive website design",
      "Phone, tablet and desktop layouts",
    ],
  },
  {
    name: "Business Website",
    price: "75,000",
    description: "More room for your services and content.",
    icon: Code2,
    popular: true,
    features: [
      "Up to 10 pages",
      "SEO foundations",
      "Professional business design",
      "Expanded content sections",
    ],
  },
  {
    name: "Online Store",
    price: "120,000",
    description: "A catalogue and checkout for online sales.",
    icon: ShoppingCart,
    features: [
      "Product catalogue",
      "Online payment integration",
      "Order management",
      "Online shopping experience",
    ],
  },
];

const services = [
  {
    icon: Monitor,
    title: "Website Development",
    description:
      "Modern, responsive and professional websites that help your business establish a strong online presence.",
  },
  {
    icon: Settings,
    title: "Custom Software Systems",
    description:
      "Business management systems designed to automate operations and simplify everyday business activities.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Development",
    description:
      "Online stores that allow your customers to browse products, make payments and place orders.",
  },
  {
    icon: Smartphone,
    title: "Web Applications",
    description:
      "Interactive web applications that provide practical digital solutions for businesses and organizations.",
  },
  {
    icon: Search,
    title: "SEO & Digital Optimization",
    description:
      "Search engine foundations and website improvements that help customers discover your business online.",
  },
  {
    icon: Layers,
    title: "IT Solutions",
    description:
      "Technology solutions and digital tools that support business growth and efficiency.",
  },
];

function HomePage() {
      // Contact form state
  const [contactStatus, setContactStatus] = useState({
    type: "",
    message: "",
  });

  // Quote form state
  const [quoteStatus, setQuoteStatus] = useState({
    type: "",
    message: "",
  });

  const API_URL = "http://localhost:5000/api";

  // Submit contact message
  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setContactStatus({
      type: "loading",
      message: "Sending your message...",
    });

    try {
      const response = await axios.post(
        `${API_URL}/contact`,
        data
      );

      setContactStatus({
        type: "success",
        message: response.data.message,
      });

      form.reset();
    } catch (error) {
      setContactStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to send your message. Please try again.",
      });
    }
  };

  // Submit quotation request
  const handleQuoteSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setQuoteStatus({
      type: "loading",
      message: "Submitting your quotation request...",
    });

    try {
      const response = await axios.post(
        `${API_URL}/quotes`,
        data
      );

      setQuoteStatus({
        type: "success",
        message: response.data.message,
      });

      form.reset();
    } catch (error) {
      setQuoteStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Unable to submit your request. Please try again.",
      });
    }
  };
  return (
    <>
      {/* NAVIGATION */}
      <nav className="navbar navbar-expand-lg navbar-dark khalilabs-nav sticky-top">
        <div className="container">
          <a className="navbar-brand" href="#home">
            <span className="brand-k">K</span>HALILABS
            <small className="brand-subtitle">DIGITAL SOLUTIONS</small>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <Menu />
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#pricing">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-danger rounded-pill px-4 nav-cta" href="#contact">
                  Get a Quote <ArrowRight size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero-section" id="home">
        <div className="container">
          <div className="row align-items-center hero-row">
            <div className="col-lg-7">
              <div className="hero-content">
                <div className="hero-label">
                  <span className="pulse-dot"></span>
                  YOUR DIGITAL TECHNOLOGY PARTNER
                </div>

                <h1>
                  We Build Websites.
                  <br />
                  We Create <span>Systems.</span>
                </h1>

                <p className="hero-description">
                  We help businesses and organizations transform their
                  ideas into powerful digital experiences through
                  professional websites, custom software and technology
                  solutions.
                </p>

                <div className="hero-buttons">
                  <a href="#pricing" className="btn btn-danger btn-lg rounded-pill">
                    Explore Packages <ArrowRight size={18} />
                  </a>

                  <a href="#services" className="btn btn-outline-light btn-lg rounded-pill">
                    Our Services
                  </a>
                </div>

                <div className="hero-note">
                  <CheckCircle2 size={17} />
                  Websites and systems built around your needs.
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-visual">
                <div className="visual-circle circle-one"></div>
                <div className="visual-circle circle-two"></div>

                <div className="code-window">
                  <div className="window-header">
                    <div className="window-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <small>khalilabs.digital</small>
                  </div>

                  <div className="window-body">
                    <div className="code-icon">
                      <Code2 size={42} />
                    </div>

                    <h3>Digital Innovation</h3>
                    <p>Turning ideas into reality.</p>

                    <div className="code-line line-long"></div>
                    <div className="code-line line-medium"></div>
                    <div className="code-line line-short"></div>

                    <div className="window-bottom">
                      <span><Globe size={15} /> Web Development</span>
                      <span className="online-dot"></span>
                    </div>
                  </div>
                </div>

                <div className="floating-card floating-top">
                  <Monitor size={22} />
                  <div>
                    <strong>Modern Websites</strong>
                    <small>Responsive design</small>
                  </div>
                </div>

                <div className="floating-card floating-bottom">
                  <Settings size={22} />
                  <div>
                    <strong>Smart Systems</strong>
                    <small>Built for business</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom-line"></div>
      </header>

      {/* ABOUT */}
      <section className="about-section section-padding" id="about">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="about-visual">
                <div className="about-icon-box">
                  <Code2 size={65} />
                </div>
                <div className="about-visual-text">
                  <span>INNOVATION</span>
                  <h3>Technology for a Better Business Future.</h3>
                </div>
                <div className="about-decoration"></div>
              </div>
            </div>

            <div className="col-lg-6">
              <span className="section-label">WHO WE ARE</span>
              <h2 className="section-title mt-3">
                Your Ideas Deserve the Right Technology.
              </h2>

              <p className="section-description">
                Khalilabs is a technology company focused on creating
                professional websites and innovative software systems.
                We work to help businesses and organizations establish
                their digital presence, improve operations and embrace
                technology.
              </p>

              <p className="section-description">
                From simple business websites to advanced management
                systems and e-commerce platforms, we turn your vision
                into practical digital solutions.
              </p>

              <a href="#contact" className="text-link">
                Let's work together <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section section-padding" id="services">
        <div className="container">
          <div className="text-center section-heading">
            <span className="section-label">OUR EXPERTISE</span>
            <h2 className="section-title mt-3">
              Digital Solutions for Every Ambition.
            </h2>
            <p className="section-description mx-auto">
              We create technology that helps businesses work smarter,
              connect with customers and grow.
            </p>
          </div>

          <div className="row g-4 mt-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div className="col-md-6 col-lg-4" key={service.title}>
                  <div className="service-card h-100">
                    <div className="service-number">
                      0{index + 1}
                    </div>

                    <div className="service-icon-box">
                      <Icon size={29} />
                    </div>

                    <h4>{service.title}</h4>
                    <p>{service.description}</p>

                    <a href="#contact" className="service-link">
                      Learn more <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section section-padding" id="pricing">
        <div className="container">
          <div className="text-center section-heading">
            <span className="section-label">SIMPLE & TRANSPARENT PRICING</span>
            <h2 className="section-title mt-3">
              Choose the Right Package.
            </h2>
            <p className="section-description mx-auto">
              Whether you are starting small or building an online
              business, we have a solution for you.
            </p>
          </div>

          <div className="row g-4 mt-4">
            {packages.map((item) => {
              const Icon = item.icon;

              return (
                <div className="col-lg-4" key={item.name}>
                  <div className={`pricing-card h-100 ${item.popular ? "popular-card" : ""}`}>
                    {item.popular && (
                      <div className="popular-label">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="pricing-icon">
                      <Icon size={31} />
                    </div>

                    <h4>{item.name}</h4>
                    <p className="package-description">
                      {item.description}
                    </p>

                    <div className="price-area">
                      <small>From</small>
                      <h2>KSh {item.price}</h2>
                    </div>

                    <div className="pricing-divider"></div>

                    <p className="features-title">PACKAGE INCLUDES</p>

                    <ul className="feature-list">
                      {item.features.map((feature) => (
                        <li key={feature}>
                          <CheckCircle2 size={17} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a
                    //   href={`#contact`}
                    href="#quote-form"
                      className={`btn ${item.popular ? "btn-danger" : "btn-outline-primary"} rounded-pill w-100 pricing-button`}
                    >
                      Get Started <ArrowRight size={17} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="pricing-note text-center mt-4">
            Need something different? Contact us for a custom solution.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section section-padding">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="section-label">WHY KHALILABS</span>
              <h2 className="section-title mt-3">
                More Than Just Technology. We Deliver Solutions.
              </h2>

              <p className="section-description">
                We focus on creating useful digital products that
                respond to real business needs.
              </p>

              <div className="why-list">
                {[
                  "Solutions designed around your business.",
                  "Responsive and user-friendly designs.",
                  "Modern technologies and development practices.",
                  "Professional and reliable support.",
                ].map((item) => (
                  <div className="why-item" key={item}>
                    <CheckCircle2 size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="why-visual">
                <div className="why-main-icon">
                  <Code2 size={75} />
                </div>
                <h3>Build. Innovate. Grow.</h3>
                <p>Your digital journey starts here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      {/* <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-content text-center">
            <span className="section-label">LET'S BUILD SOMETHING GREAT</span>
            <h2>Have an Idea? Let's Make It Happen.</h2>
            <p>
              Tell us about your business, website or software project.
              We are ready to help you take the next step.
            </p>

            <a href="mailto:info@khalilabs.com" className="btn btn-danger btn-lg rounded-pill">
              <MessageCircle size={18} /> Start a Conversation
            </a>
          </div>
        </div>
      </section> */}
{/* CONTACT AND QUOTATION FORMS */}
<section className="contact-section section-padding" id="contact">
  <div className="container">

    <div className="contact-content text-center mb-5">
      <span className="section-label">
        LET'S BUILD SOMETHING GREAT
      </span>

      <h2>Have an Idea? Let's Make It Happen.</h2>

      <p>
        Tell us about your business, website or software project.
        We are ready to help you take the next step.
      </p>
    </div>

    <div className="row g-4">

      {/* CONTACT FORM */}
      <div className="col-lg-6" id="contact-form">
        <div className="service-card h-100">

          <div className="service-icon-box mb-3">
            <MessageCircle size={28} />
          </div>

          <h3>Send Us a Message</h3>

          <p className="text-muted">
            Have a question? Send us a message.
          </p>

          <form onSubmit={handleContactSubmit}>

            <div className="mb-3">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your full name"
                maxLength="100"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="you@example.com"
                maxLength="150"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Your phone number"
                maxLength="30"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Subject</label>
              <input
                type="text"
                name="subject"
                className="form-control"
                placeholder="What is your message about?"
                maxLength="150"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Your Message *</label>
              <textarea
                name="message"
                className="form-control"
                rows="5"
                placeholder="Write your message here..."
                maxLength="3000"
                required
              ></textarea>
            </div>

            {contactStatus.message && (
              <div
                className={`alert ${
                  contactStatus.type === "success"
                    ? "alert-success"
                    : contactStatus.type === "error"
                    ? "alert-danger"
                    : "alert-info"
                }`}
                role="status"
              >
                {contactStatus.message}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-danger rounded-pill w-100"
              disabled={contactStatus.type === "loading"}
            >
              {contactStatus.type === "loading"
                ? "Sending..."
                : "Send Message"}
              <ArrowRight size={17} className="ms-2" />
            </button>

          </form>
        </div>
      </div>

      {/* QUOTATION FORM */}
      <div className="col-lg-6" id="quote-form">
        <div className="service-card h-100">

          <div className="service-icon-box mb-3">
            <Code2 size={28} />
          </div>

          <h3>Request a Quote</h3>

          <p className="text-muted">
            Tell us about your project and receive a quotation.
          </p>

          <form onSubmit={handleQuoteSubmit}>

            <div className="mb-3">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Your full name"
                maxLength="100"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="you@example.com"
                maxLength="150"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="e.g. 0712345678"
                maxLength="30"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Company / Organisation</label>
              <input
                type="text"
                name="company"
                className="form-control"
                placeholder="Company name (optional)"
                maxLength="150"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Service Required *</label>
              <select
                name="service"
                className="form-select"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="Essential Website">
                  Essential Website
                </option>
                <option value="Business Website">
                  Business Website
                </option>
                <option value="Online Store">
                  Online Store
                </option>
                <option value="Custom Software Systems">
                  Custom Software Systems
                </option>
                <option value="Web Applications">
                  Web Applications
                </option>
                <option value="SEO & Digital Optimization">
                  SEO & Digital Optimization
                </option>
                <option value="Other IT Solutions">
                  Other IT Solutions
                </option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Estimated Budget</label>
              <select
                name="budget"
                className="form-select"
                defaultValue=""
              >
                <option value="">Select your budget</option>
                <option value="Below KSh 35,000">
                  Below KSh 35,000
                </option>
                <option value="KSh 35,000 - 75,000">
                  KSh 35,000 - 75,000
                </option>
                <option value="KSh 75,000 - 120,000">
                  KSh 75,000 - 120,000
                </option>
                <option value="Above KSh 120,000">
                  Above KSh 120,000
                </option>
                <option value="Not yet decided">
                  Not yet decided
                </option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                Project Details *
              </label>
              <textarea
                name="projectDetails"
                className="form-control"
                rows="5"
                placeholder="Describe the website or system you want us to build..."
                maxLength="3000"
                required
              ></textarea>
            </div>

            {quoteStatus.message && (
              <div
                className={`alert ${
                  quoteStatus.type === "success"
                    ? "alert-success"
                    : quoteStatus.type === "error"
                    ? "alert-danger"
                    : "alert-info"
                }`}
                role="status"
              >
                {quoteStatus.message}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-danger rounded-pill w-100"
              disabled={quoteStatus.type === "loading"}
            >
              {quoteStatus.type === "loading"
                ? "Submitting..."
                : "Request Quotation"}
              <ArrowRight size={17} className="ms-2" />
            </button>

          </form>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="row g-4 py-5">
            <div className="col-lg-5">
              <a className="footer-brand" href="#home">
                <span>K</span>HALILABS
              </a>
              <p className="footer-description">
                Creating websites and innovative software systems
                that help businesses and organizations move forward.
              </p>
            </div>

            <div className="col-6 col-lg-2">
              <h5>Company</h5>
              <a href="#about">About Us</a>
              <a href="#services">Our Services</a>
              <a href="#pricing">Pricing</a>
            </div>

            <div className="col-6 col-lg-2">
              <h5>Services</h5>
              <a href="#services">Websites</a>
              <a href="#services">Custom Systems</a>
              <a href="#services">Online Stores</a>
            </div>

            <div className="col-lg-3">
              <h5>Get in Touch</h5>
              <a href="mailto:info@khalilabs.com">
                info@khalilabs.com
              </a>
              <a href="#contact">Request a Quote</a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Khalilabs. All rights reserved.</p>
            <p>Designed with purpose. Built with innovation.</p>
          </div>
        </div>
      </footer>
    </>
  );
}



// Protect administrator dashboard
function ProtectedAdminRoute({ children }) {
  const token = sessionStorage.getItem("khalilabsAdminToken");

  return token ? children : <Navigate to="/admin" replace />;
}

// Main application routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
