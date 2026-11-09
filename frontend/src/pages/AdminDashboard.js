import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  X,
  RefreshCw,
  Mail,
  Phone,
  CalendarDays,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  User,
  Building2,
  Wallet,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

function AdminDashboard() {
  const [admin, setAdmin] = useState({});
  const [activeTab, setActiveTab] = useState("overview");
  const [overview, setOverview] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [replySubject, setReplySubject] = useState("");
const [replyMessage, setReplyMessage] = useState("");
const [replySending, setReplySending] = useState(false);
const [replyFeedback, setReplyFeedback] = useState("");
  const [contactSearch, setContactSearch] = useState("");
const [contactStatusFilter, setContactStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = sessionStorage.getItem("khalilabsAdminToken");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Verify administrator session
  useEffect(() => {
    const verifyAdmin = async () => {
      if (!token) {
        window.location.href = "/admin";
        return;
      }

      try {
        const response = await axios.get(
          `${API_URL}/auth/me`,
          authConfig
        );

        if (!response.data.success) {
          throw new Error("Administrator verification failed.");
        }

        setAdmin(
          response.data.admin ||
          JSON.parse(sessionStorage.getItem("khalilabsAdmin") || "{}")
        );

        await loadOverview();
      } catch (err) {
        sessionStorage.removeItem("khalilabsAdminToken");
        sessionStorage.removeItem("khalilabsAdmin");
        window.location.href = "/admin";
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  // Load dashboard statistics
  const loadOverview = async () => {
    try {
      setError("");

      const response = await axios.get(
        `${API_URL}/admin/overview`,
        authConfig
      );

      setOverview(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load dashboard statistics."
      );
    }
  };

  // Load contact messages
  const loadContacts = async () => {
    try {
      setError("");

      const response = await axios.get(
        `${API_URL}/admin/contacts`,
        authConfig
      );

      setContacts(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load contact messages."
      );
    }
  };

  // Load quotation requests
  const loadQuotes = async () => {
    try {
      setError("");

      const response = await axios.get(
        `${API_URL}/admin/quotes`,
        authConfig
      );

      setQuotes(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to load quotation requests."
      );
    }
  };

  // Change dashboard section
  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
    setError("");

    if (tab === "overview") {
      await loadOverview();
    }

    if (tab === "contacts") {
      await loadContacts();
    }

    if (tab === "quotes") {
      await loadQuotes();
    }
  };

  // Update contact message status
const handleViewContact = (contact) => {
  setSelectedContact(contact);

  setReplySubject(
    `Re: ${contact.subject || "Your Khalilabs enquiry"}`
  );

  setReplyMessage("");
  setReplyFeedback("");
};
  
//hadle contact status
const handleContactStatus = async (id, status) => {
  try {
    setUpdating(id);
    setError("");

    await axios.patch(
      `${API_URL}/admin/contacts/${id}/status`,
      { status },
      authConfig
    );

    await loadContacts();
    await loadOverview();

    return true;
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Unable to update message status."
    );

    return false;
  } finally {
    setUpdating("");
  }
};

    // Send email reply to a client
const handleSendReply = async (event) => {
  event.preventDefault();

  if (!selectedContact) return;

  if (!replySubject.trim() || !replyMessage.trim()) {
    setReplyFeedback("Please enter both the subject and your reply.");
    return;
  }

  try {
    setReplySending(true);
    setReplyFeedback("");
    setError("");

    const response = await axios.post(
      `${API_URL}/admin/email/reply`,
      {
        to: selectedContact.email,
        subject: replySubject.trim(),
        message: replyMessage.trim(),
        clientName: selectedContact.name,
      },
      authConfig
    );

    if (!response.data.success) {
      throw new Error(
        response.data.message || "Unable to send email."
      );
    }

    // Update the contact status only after successful email delivery.
    const statusUpdated =
      selectedContact.status === "replied"
        ? true
        : await handleContactStatus(selectedContact._id, "replied");

    setSelectedContact((previous) => ({
      ...previous,
      status: statusUpdated ? "replied" : previous.status,
    }));

    setReplyFeedback(
      statusUpdated
        ? "Email sent successfully. Contact marked as replied."
        : "Email sent successfully, but the contact status could not be updated."
    );

    setReplyMessage("");
  } catch (err) {
    setReplyFeedback(
      err.response?.data?.message ||
      err.message ||
      "Unable to send your reply. Please try again."
    );
  } finally {
    setReplySending(false);
  }
};  

  // Update quotation status
  const handleQuoteStatus = async (id, status) => {
    try {
      setUpdating(id);
      setError("");

      await axios.patch(
        `${API_URL}/admin/quotes/${id}/status`,
        { status },
        authConfig
      );

      await loadQuotes();
      await loadOverview();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Unable to update quotation status."
      );
    } finally {
      setUpdating("");
    }
  };

  // Logout administrator
  const handleLogout = () => {
    sessionStorage.removeItem("khalilabsAdminToken");
    sessionStorage.removeItem("khalilabsAdmin");
    window.location.href = "/admin";
  };

  // Format dates
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    const classes = {
      new: "status-new",
      read: "status-read",
      replied: "status-replied",
      pending: "status-pending",
      reviewing: "status-reviewing",
      approved: "status-approved",
      rejected: "status-rejected",
    };

    return classes[status] || "status-default";
  };

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="spinner-border text-danger" role="status" />
        <p>Loading administrator dashboard...</p>
      </div>
    );
  }

  const statistics = overview?.statistics || {};
  const filteredContacts = contacts.filter((contact) => {
  const search = contactSearch.toLowerCase().trim();

  const matchesSearch =
    contact.name?.toLowerCase().includes(search) ||
    contact.email?.toLowerCase().includes(search) ||
    contact.phone?.toLowerCase().includes(search);

  const matchesStatus =
    contactStatusFilter === "all" ||
    contact.status === contactStatusFilter;

  return matchesSearch && matchesStatus;
});

  return (
    <div className="admin-dashboard">

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">K</div>

          <div>
            <h4>KHALILABS</h4>
            <span>ADMINISTRATION</span>
          </div>

          <button
            className="admin-mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        <div className="admin-sidebar-section">
          <small>MAIN MENU</small>

          <button
            className={`admin-nav-link ${
              activeTab === "overview" ? "active" : ""
            }`}
            onClick={() => handleTabChange("overview")}
          >
            <LayoutDashboard size={19} />
            <span>Overview</span>
          </button>

          <button
            className={`admin-nav-link ${
              activeTab === "contacts" ? "active" : ""
            }`}
            onClick={() => handleTabChange("contacts")}
          >
            <MessageSquare size={19} />
            <span>Contact Messages</span>
            {statistics.newMessages > 0 && (
              <span className="admin-nav-count">
                {statistics.newMessages}
              </span>
            )}
          </button>

          <button
            className={`admin-nav-link ${
              activeTab === "quotes" ? "active" : ""
            }`}
            onClick={() => handleTabChange("quotes")}
          >
            <FileText size={19} />
            <span>Quote Requests</span>
            {statistics.pendingQuotes > 0 && (
              <span className="admin-nav-count">
                {statistics.pendingQuotes}
              </span>
            )}
          </button>
        </div>

        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-user">
            <div className="admin-user-avatar">
              <User size={20} />
            </div>

            <div className="admin-user-details">
              <strong>{admin.name || "Administrator"}</strong>
              <small>System Administrator</small>
            </div>
          </div>

          <button
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main">

        {/* Top bar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-menu-button"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={23} />
            </button>

            <div>
              <h2>
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "contacts" && "Contact Messages"}
                {activeTab === "quotes" && "Quotation Requests"}
              </h2>

              <p>Welcome to your Khalilabs administration panel.</p>
            </div>
          </div>

          <div className="admin-topbar-right">
            <span className="admin-online-indicator">
              <span /> Online
            </span>

            <button
              className="admin-refresh-button"
              onClick={() => handleTabChange(activeTab)}
              title="Refresh data"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </header>

        <div className="admin-content">

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2">
              <AlertCircle size={19} />
              {error}
            </div>
          )}

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <>
              <div className="admin-welcome-card">
                <div>
                  <span>ADMINISTRATION PANEL</span>
                  <h3>Welcome back, {admin.name || "Administrator"}!</h3>
                  <p>
                    Here is what's happening on your Khalilabs website.
                  </p>
                </div>

                <div className="admin-welcome-icon">
                  <LayoutDashboard size={55} />
                </div>
              </div>

              <div className="admin-stat-grid">

                <div className="admin-stat-card">
                  <div className="admin-stat-icon stat-blue">
                    <MessageSquare size={23} />
                  </div>
                  <div>
                    <span>Total Messages</span>
                    <h3>{statistics.totalContacts ?? 0}</h3>
                    <small>
                      {statistics.newMessages ?? 0} new messages
                    </small>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon stat-red">
                    <Mail size={23} />
                  </div>
                  <div>
                    <span>New Messages</span>
                    <h3>{statistics.newMessages ?? 0}</h3>
                    <small>Awaiting attention</small>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon stat-purple">
                    <FileText size={23} />
                  </div>
                  <div>
                    <span>Total Quote Requests</span>
                    <h3>{statistics.totalQuotes ?? 0}</h3>
                    <small>All quotation requests</small>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon stat-orange">
                    <Clock size={23} />
                  </div>
                  <div>
                    <span>Pending Quotes</span>
                    <h3>{statistics.pendingQuotes ?? 0}</h3>
                    <small>Awaiting review</small>
                  </div>
                </div>

              </div>

              <div className="admin-stat-grid admin-stat-grid-secondary">
                <div className="admin-mini-stat">
                  <span>Under Review</span>
                  <strong>{statistics.reviewingQuotes ?? 0}</strong>
                </div>

                <div className="admin-mini-stat">
                  <span>Approved Quotes</span>
                  <strong className="text-success">
                    {statistics.approvedQuotes ?? 0}
                  </strong>
                </div>

                <div className="admin-mini-stat">
                  <span>Rejected Quotes</span>
                  <strong className="text-danger">
                    {statistics.rejectedQuotes ?? 0}
                  </strong>
                </div>
              </div>

              <div className="admin-overview-columns">

                <section className="admin-panel">
                  <div className="admin-panel-heading">
                    <div>
                      <h4>Recent Messages</h4>
                      <p>Latest website enquiries</p>
                    </div>

                    <button onClick={() => handleTabChange("contacts")}>
                      View All
                    </button>
                  </div>

                  {overview?.recentContacts?.length > 0 ? (
                    <div className="admin-recent-list">
                      {overview.recentContacts.map((contact) => (
                        <div className="admin-recent-item" key={contact._id}>
                          <div className="admin-recent-icon">
                            <MessageSquare size={18} />
                          </div>

                          <div className="admin-recent-info">
                            <strong>{contact.name}</strong>
                            <span>{contact.subject || contact.email}</span>
                          </div>

                          <span className={`admin-status ${getStatusClass(contact.status)}`}>
                            {contact.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="admin-empty-state">
                      <MessageSquare size={30} />
                      <p>No contact messages yet.</p>
                    </div>
                  )}
                </section>

                <section className="admin-panel">
                  <div className="admin-panel-heading">
                    <div>
                      <h4>Recent Quote Requests</h4>
                      <p>Latest project enquiries</p>
                    </div>

                    <button onClick={() => handleTabChange("quotes")}>
                      View All
                    </button>
                  </div>

                  {overview?.recentQuotes?.length > 0 ? (
                    <div className="admin-recent-list">
                      {overview.recentQuotes.map((quote) => (
                        <div className="admin-recent-item" key={quote._id}>
                          <div className="admin-recent-icon quote-icon">
                            <FileText size={18} />
                          </div>

                          <div className="admin-recent-info">
                            <strong>{quote.name}</strong>
                            <span>{quote.service}</span>
                          </div>

                          <span className={`admin-status ${getStatusClass(quote.status)}`}>
                            {quote.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="admin-empty-state">
                      <FileText size={30} />
                      <p>No quotation requests yet.</p>
                    </div>
                  )}
                </section>

              </div>
            </>
          )}

          {/* CONTACT MESSAGES */}
          {activeTab === "contacts" && (
            <section className="admin-panel admin-full-panel">
              <div className="admin-panel-heading">
                <div>
                  <h4>Website Contact Messages</h4>
                  <p>Messages submitted by visitors through your website.</p>
                </div>

                <span className="admin-total-label">
                  {contacts.length} Messages
                </span>
              </div>


                <div className="admin-contact-filters">
  <div className="admin-contact-search">
    <input
      type="text"
      className="form-control"
      placeholder="Search by name, email or phone..."
      value={contactSearch}
      onChange={(event) => setContactSearch(event.target.value)}
    />
  </div>

  <div className="admin-contact-status-filter">
    <select
      className="form-select"
      value={contactStatusFilter}
      onChange={(event) =>
        setContactStatusFilter(event.target.value)
      }
    >
      <option value="all">All Messages</option>
      <option value="new">New</option>
      <option value="read">Read</option>
      <option value="replied">Replied</option>
    </select>
  </div>

  <span className="admin-total-label">
    Showing {filteredContacts.length} of {contacts.length} messages
  </span>
</div>
            {filteredContacts.length > 0 ? (
              
                <div className="table-responsive">
                  <table className="table admin-data-table">
                    <thead>
                      <tr>
                        <th>Sender</th>
                        <th>Contact Details</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredContacts.map((contact) => (
                        <tr key={contact._id}>
                          <td>
                            <strong>{contact.name}</strong>
                          </td>

                          <td>
                            <div className="admin-contact-details">
                              <span>
                                <Mail size={14} /> {contact.email}
                              </span>
                              {contact.phone && (
                                <span>
                                  <Phone size={14} /> {contact.phone}
                                </span>
                              )}
                            </div>
                          </td>

                          <td>{contact.subject || "General enquiry"}</td>

                          <td>{formatDate(contact.createdAt)}</td>

                          <td>
                            <span className={`admin-status ${getStatusClass(contact.status)}`}>
                              {contact.status}
                            </span>
                          </td>

                          <td>
                            <button
  type="button"
  className="btn btn-sm btn-outline-primary mb-2"
  onClick={() => handleViewContact(contact)}
>
  <Eye size={15} className="me-1" />
  View Message
</button>
                            <select
                              className="admin-status-select"
                              value={contact.status}
                              disabled={updating === contact._id}
                              onChange={(event) =>
                                handleContactStatus(
                                  contact._id,
                                  event.target.value
                                )
                              }
                            >
                              <option value="new">New</option>
                              <option value="read">Read</option>
                              <option value="replied">Replied</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="admin-empty-state">
                  <MessageSquare size={40} />
                  <h5>No messages found</h5>
                  <p>Contact messages will appear here when visitors submit the form.</p>
                </div>
              )}

              {contacts.length > 0 && (
                <div className="admin-message-details-list">
                  <h5>Message Details</h5>

                  {filteredContacts.map((contact) => (
                    <details className="admin-message-detail" key={contact._id}>
                      <summary>
                        <span>
                          <Eye size={16} /> {contact.name} —{" "}
                          {contact.subject || "General enquiry"}
                        </span>
                        <span>{formatDate(contact.createdAt)}</span>
                      </summary>

                      <div className="admin-message-body">
                        <p>{contact.message}</p>
                      </div>
                    </details>
                  ))}
                </div>
              )}
            </section>
          )}

          {selectedContact && (
  <div
    className="admin-message-modal-overlay"
    onClick={() => setSelectedContact(null)}
  >
    <div
      className="admin-message-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="admin-message-modal-header">
        <div>
          <span>CONTACT ENQUIRY</span>
          <h4>Message Details</h4>
        </div>

        <button
          type="button"
          onClick={() => setSelectedContact(null)}
          aria-label="Close message"
        >
          <X size={22} />
        </button>
      </div>

      <div className="admin-message-modal-body">
        <div className="admin-message-field">
          <small>CLIENT NAME</small>
          <strong>{selectedContact.name}</strong>
        </div>

        <div className="admin-message-field">
          <small>EMAIL ADDRESS</small>
          <strong>{selectedContact.email}</strong>
        </div>

        <div className="admin-message-field">
          <small>PHONE NUMBER</small>
          <strong>{selectedContact.phone || "Not provided"}</strong>
        </div>

        <div className="admin-message-field">
          <small>SUBJECT</small>
          <strong>
            {selectedContact.subject || "General enquiry"}
          </strong>
        </div>

        <div className="admin-message-field">
          <small>DATE RECEIVED</small>
          <strong>{formatDate(selectedContact.createdAt)}</strong>
        </div>

        <div className="admin-message-full">
          <small>CLIENT MESSAGE</small>
          <p>{selectedContact.message}</p>
        </div>
        <form
  id="client-reply-form"
  onSubmit={handleSendReply}
  className="admin-reply-form"
>
  <h5>Reply to Client</h5>

  <div className="mb-3">
    <label className="form-label">Recipient</label>

    <input
      type="email"
      className="form-control"
      value={selectedContact.email}
      readOnly
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Subject</label>

    <input
      type="text"
      className="form-control"
      value={replySubject}
      onChange={(event) => setReplySubject(event.target.value)}
      required
    />
  </div>

  <div className="mb-3">
    <label className="form-label">Your Reply</label>

    <textarea
      className="form-control"
      rows="6"
      placeholder="Write your reply to the client..."
      value={replyMessage}
      onChange={(event) => setReplyMessage(event.target.value)}
      required
    />
  </div>

  {replyFeedback && (
    <div
      className={`alert ${
        replyFeedback.startsWith("Email sent")
          ? "alert-success"
          : "alert-danger"
      }`}
    >
      {replyFeedback}
    </div>
  )}
</form>
      </div>

            
//admin message modL actions

  <div className="admin-message-modal-actions">
  <button
    type="submit"
    form="client-reply-form"
    className="btn btn-danger"
    disabled={replySending || !selectedContact.email}
  >
    <Mail size={16} className="me-2" />

    {replySending ? "Sending Reply..." : "Send Reply"}
  </button>

  <button
    type="button"
    className="btn btn-outline-secondary"
    disabled={replySending}
    onClick={() => setSelectedContact(null)}
  >
    Close
  </button>
</div>
      
    </div>
  </div>
)}

          {/* QUOTATION REQUESTS */}
          {activeTab === "quotes" && (
            <section className="admin-panel admin-full-panel">
              <div className="admin-panel-heading">
                <div>
                  <h4>Client Quotation Requests</h4>
                  <p>Manage project and service quotation enquiries.</p>
                </div>

                <span className="admin-total-label">
                  {quotes.length} Requests
                </span>
              </div>

              {quotes.length > 0 ? (
                <div className="admin-quote-list">
                  {quotes.map((quote) => (
                    <article className="admin-quote-card" key={quote._id}>
                      <div className="admin-quote-header">
                        <div>
                          <h5>{quote.name}</h5>
                          <span>
                            <CalendarDays size={14} />
                            Submitted {formatDate(quote.createdAt)}
                          </span>
                        </div>

                        <span className={`admin-status ${getStatusClass(quote.status)}`}>
                          {quote.status}
                        </span>
                      </div>

                      <div className="admin-quote-information">
                        <div>
                          <Mail size={16} />
                          <span>{quote.email}</span>
                        </div>

                        <div>
                          <Phone size={16} />
                          <span>{quote.phone}</span>
                        </div>

                        <div>
                          <Building2 size={16} />
                          <span>{quote.company || "Individual client"}</span>
                        </div>

                        <div>
                          <FileText size={16} />
                          <span>{quote.service}</span>
                        </div>

                        <div>
                          <Wallet size={16} />
                          <span>{quote.budget || "Budget not specified"}</span>
                        </div>
                      </div>

                      <div className="admin-quote-description">
                        <strong>Project Details</strong>
                        <p>{quote.projectDetails}</p>
                      </div>

                      <div className="admin-quote-actions">
                        <label htmlFor={`quote-${quote._id}`}>
                          Update request status:
                        </label>

                        <select
                          id={`quote-${quote._id}`}
                          className="admin-status-select"
                          value={quote.status}
                          disabled={updating === quote._id}
                          onChange={(event) =>
                            handleQuoteStatus(
                              quote._id,
                              event.target.value
                            )
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="admin-empty-state">
                  <FileText size={40} />
                  <h5>No quotation requests found</h5>
                  <p>Client quotation requests will appear here.</p>
                </div>
              )}
            </section>
          )}

          <footer className="admin-footer">
            <span>© {new Date().getFullYear()} Khalilabs. All rights reserved.</span>
            <span>Administrator Panel</span>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;