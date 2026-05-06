import React, { useState, useEffect } from "react";

// --- CONFIGURATION ---
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjJlNGE0MTFlYjVlNWM4ODdmZTJlZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3Nzg3NTcxOSwiZXhwIjoxNzgwNDY3NzE5fQ.U1F6K8kNuKyq0IG71hYG9y_MEuCXFr4K3AGkCIJDR5c";
const BASE_URL = "https://social-taste-matrimony.onrender.com/api/spam";

const SpamControl = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [isDeleteModal, setIsDeleteModal] = useState(false);
const [deleteUserId, setDeleteUserId] = useState(null);
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };

  // 1. Get All Reports
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/all-reports`, { headers });
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // 2. Get Detail By ID
  const handleViewDetail = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/report-detail/${id}`, { headers });
      const data = await res.json();
      setSelectedReport(data);
      setIsModalOpen(true);
    } catch (err) {
      alert("Details fetch karne mein error aaya!");
    }
  };

  // 3. Deactivate User
  const handleDeactivate = async (userId) => {
    if (!userId) return alert("User ID nahi mili!");
    if (!window.confirm("Kya aap is user ko deactivate karna chahte hain?")) return;

    try {
      const res = await fetch(`${BASE_URL}/deactivate/${userId}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ status: true }),
      });
      const data = await res.json();
      if (data.success) alert("Account Deactivated Successfully!");
    } catch (err) {
      alert("Deactivation failed!");
    }
  };

  // 4. Delete User
  const handleDelete = async (userId) => {
    if (!userId) return alert("User ID nahi mili!");
    if (!window.confirm("DANGER: Kya aap is account ko hamesha ke liye delete karna chahte hain?")) return;

    try {
      const res = await fetch(`${BASE_URL}/delete/${userId}`, {
        method: "DELETE",
        headers,
      });
      const data = await res.json();
      if (data.success) {
        alert("Account Deleted Permanently!");
        fetchReports(); // List refresh
      }
    } catch (err) {
      alert("Delete failed!");
    }
  };

  return (
    <div style={styles.container}>
      {/* Internal CSS Stylesheet */}
      <style>{customCSS}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Spam Control Panel</h1>
        <p style={styles.subtitle}>Monitor and manage community safety reports</p>
      </div>

      {/* Stats Quick View */}
      <div style={styles.statsRow}>
        <div className="stat-card">
          <span className="stat-label">Total Reports</span>
          <span className="stat-value">{reports.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Security Status</span>
          <span className="stat-value" style={{ color: "#00ff00", fontSize: "1rem" }}>ACTIVE</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="table-container">
        {loading ? (
          <div style={styles.loading}>Fetching Secure Data...</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Reporter</th>
                <th style={styles.th}>Reported User</th>
                <th style={styles.th}>Reason</th>
                <th style={styles.th}>Status</th>
                <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id} className="table-row">
                  <td style={styles.td}>
                    <div className="name-bold">{report.reporter?.name}</div>
                    <div className="sub-text">{report.reporter?.phone}</div>
                  </td>
                  <td style={styles.td}>
                    {report.reportedUser ? (
                      <>
                        <div className="name-bold" style={{ color: "#fff" }}>{report.reportedUser.name}</div>
                        <div className="sub-text">{report.reportedUser.email}</div>
                      </>
                    ) : (
                      <span style={{ color: "#ff4444", fontSize: "0.8rem" }}>User Removed</span>
                    )}
                  </td>
                  <td style={styles.td}>
                    <span className="reason-tag">{report.reason}</span>
                  </td>
                  <td style={styles.td}>
                    <span className={`status-pill ${report.status}`}>{report.status}</span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionBtns}>
                      <button className="btn btn-view" onClick={() => handleViewDetail(report._id)}>View</button>
                      <button className="btn btn-deactivate" onClick={() => handleDeactivate(report.reportedUser?._id)}>Block</button>
                   <button className="btn btn-delete" onClick={() => { setDeleteUserId(report.reportedUser?._id); setIsDeleteModal(true); }}
>
  Delete
</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedReport && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Report Investigation</h3>
              <button onClick={() => setIsModalOpen(false)} className="close-x">&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-grid">
                <div className="info-sec">
                  <label>REPORTED BY</label>
                  <p><strong>Name:</strong> {selectedReport.reporter?.name}</p>
                  <p><strong>Phone:</strong> {selectedReport.reporter?.phone}</p>
                  <p><strong>Gender:</strong> {selectedReport.reporter?.gender}</p>
                </div>
                <div className="info-sec">
                  <label style={{ color: "#ff4444" }}>ACCUSED USER</label>
                  <p><strong>Name:</strong> {selectedReport.reportedUser?.name}</p>
                  <p><strong>Email:</strong> {selectedReport.reportedUser?.email}</p>
                  <p><strong>City:</strong> {selectedReport.reportedUser?.city || "N/A"}</p>
                </div>
              </div>
              <div className="reason-box">
                <label>COMPLAINT DESCRIPTION</label>
                <p>"{selectedReport.reason}"</p>
              </div>
            </div>
            <div className="modal-footer">
               <button className="btn btn-deactivate" onClick={() => handleDeactivate(selectedReport.reportedUser?._id)}>Deactivate Now</button>
               <button className="btn btn-delete" onClick={() => handleDelete(selectedReport.reportedUser?._id)}>Delete Permanently</button>
            </div>
          </div>
        </div>
      )}
      {isDeleteModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h3>Confirm Delete</h3>
        <button onClick={() => setIsDeleteModal(false)} className="close-x">
          &times;
        </button>
      </div>

      <div className="modal-body">
        <p>Are you sure you want to permanently delete this user?</p>
      </div>

      <div className="modal-footer">
        <button
          className="btn btn-delete"
          onClick={() => {
            handleDelete(deleteUserId);
            setIsDeleteModal(false);
          }}
        >
          Yes, Delete
        </button>

        <button className="btn btn-view" onClick={() => setIsDeleteModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

// --- STYLES OBJECT ---
const styles = {
  container: {
    backgroundColor: "#000",
    minHeight: "100vh",
    color: "#fff",
    padding: "30px",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    borderLeft: "4px solid #FFD700",
    paddingLeft: "20px",
    marginBottom: "40px",
  },
  title: {
    color: "#FFD700",
    fontSize: "2rem",
    textTransform: "uppercase",
    margin: 0,
    letterSpacing: "2px",
  },
  subtitle: {
    color: "#888",
    marginTop: "5px",
  },
  statsRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#FFD700",
    color: "#000",
    padding: "15px",
    textAlign: "left",
    fontSize: "0.8rem",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  td: {
    padding: "15px",
    borderBottom: "1px solid #222",
  },
  actionBtns: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  loading: {
    padding: "100px",
    textAlign: "center",
    color: "#FFD700",
    fontSize: "1.2rem",
    fontWeight: "bold",
  }
};

// --- RAW CSS ---
const customCSS = `
  .table-container {
    background: #111;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #222;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }
  .table-row:hover {
    background: #1a1a1a;
  }
  .name-bold {
    font-weight: 600;
    color: #FFD700;
  }
  .sub-text {
    font-size: 0.75rem;
    color: #666;
  }
  .reason-tag {
    background: #222;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    border: 1px solid #333;
  }
  .status-pill {
    text-transform: uppercase;
    font-size: 0.7rem;
    font-weight: 900;
    padding: 3px 8px;
    border-radius: 20px;
    background: #333;
    color: #FFD700;
    border: 1px solid #FFD700;
  }
  .stat-card {
    background: #111;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #222;
    min-width: 150px;
    display: flex;
    flex-direction: column;
  }
  .stat-label { color: #666; font-size: 0.7rem; text-transform: uppercase; }
  .stat-value { color: #fff; font-size: 1.8rem; font-weight: bold; }

  .btn {
    padding: 6px 12px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 0.75rem;
    transition: 0.3s;
  }
  .btn-view { background: #333; color: #FFD700; }
  .btn-deactivate { background: #e67e22; color: #fff; }
  .btn-delete { background: #ff4444; color: #fff; }
  .btn:hover { transform: translateY(-2px); opacity: 0.8; }

  .modal-overlay {
    position: fixed; top:0; left:0; width:100%; height:100%;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(5px);
    display: flex; justify-content: center; align-items: center; z-index: 999;
  }
  .modal-content {
    background: #111; width: 90%; max-width: 600px;
    border-radius: 15px; border: 2px solid #FFD700; overflow: hidden;
  }
  .modal-header {
    background: #FFD700; color: #000; padding: 15px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .close-x { background: none; border: none; font-size: 1.5rem; font-weight: bold; cursor: pointer; }
  .modal-body { padding: 25px; }
  .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .info-sec label { font-size: 0.7rem; color: #FFD700; font-weight: bold; display: block; margin-bottom: 8px; }
  .info-sec p { margin: 5px 0; font-size: 0.9rem; }
  .reason-box { background: #000; padding: 15px; border-radius: 8px; margin-top: 20px; border: 1px solid #222; }
  .modal-footer { padding: 15px; background: #0a0a0a; display: flex; gap: 10px; justify-content: flex-end; }

  @media (max-width: 768px) {
    .modal-grid { grid-template-columns: 1fr; }
    .table-container { overflow-x: auto; }
  }
`;

export default SpamControl;