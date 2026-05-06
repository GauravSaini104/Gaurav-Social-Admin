import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit3,
  User,
  MapPin,
  Briefcase,
  Phone,
  Mail,
  Search,
  Loader2,
  X,
  Heart,
  GraduationCap,
  Info,
  Users,
  Settings,
  Award,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// --- API CONFIG ---
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjJlNGE0MTFlYjVlNWM4ODdmZTJlZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NzUyNzA5MSwiZXhwIjoxNzgwMTE5MDkxfQ.7mpF0CvlFLX4Ky5iPH592Mxl0SqVoFyLTIk4wuDzkfw";
const BASE_URL = "https://social-taste-matrimony.onrender.com/api/auth";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
const [deleteUserId, setDeleteUserId] = useState(null);
  // 1. GET ALL USERS
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      const data = await response.json();
      setUsers(data || []);
      setFilteredUsers(data || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search Logic
  useEffect(() => {
    const results = users.filter(
      (u) =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

 const handleDelete = async () => {
  try {
    await fetch(`${BASE_URL}/user/${deleteUserId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    setUsers(users.filter((u) => u._id !== deleteUserId));
    setDeleteUserId(null);
    toast.success("User Deleted Successfully!");
  } catch (error) {
    toast.error("Delete failed!");
  }
};

  // 3. UPDATE FULL PROFILE (PUT)
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/user/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(editingUser),
      });
      if (response.ok) {
        fetchUsers();
        setEditingUser(null);
        alert("Updated🔥");
      }
    } catch (error) {
      alert("Update failed!");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="admin-container">
      {/* INTERNAL CSS */}
      <style>{`
        .admin-container { background: #000; color: #fff; min-height: 100vh; padding: 40px 20px; font-family: 'Inter', sans-serif; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; gap: 20px; flex-wrap: wrap; }
        .title-area h1 { color: #ffcc00; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 28px; }
        .search-box { position: relative; width: 100%; max-width: 400px; }
        .search-box input { width: 100%; background: #111; border: 1px solid #333; padding: 12px 15px 12px 45px; border-radius: 10px; color: #aa3a3a; outline: none; transition: 0.3s; }
        .search-box input:focus { border-color: #f5f0f0; box-shadow: 0 0 10px rgba(233, 118, 25, 0.1); }
        
        .users-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(330px, 1fr)); gap: 25px; }
.user-card {
  background: #0a0a0a;
  border-radius: 20px;
  padding: 20px;
  position: relative;
  overflow: visible;
}
 .user-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  background-size: 200% 100%;
  animation: borderMove 10s linear infinite;
  
  pointer-events: none; /* <--- ADD THIS LINE EXACTLY HERE */

  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
}
@keyframes borderMove {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
          .user-card:hover { border-color: #ffffff; transform: translateY(-5px); }
        .user-header { display: flex; gap: 15px; align-items: center; }
        .user-img { width: 75px; height: 75px; border-radius: 15px; object-fit: cover; border: 2px solid #333; }
        .actions { display: flex; gap: 10px; margin-top: 20px; }
        .btn-edit { flex: 1; background: #ffcc00; color: #000; border: none; padding: 12px; border-radius: 50px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-delete { background: #ff44441a; color: #ff4444; border: 1px solid #ff4444; padding: 10px; border-radius: 10px; cursor: pointer; }

        /* FULL SCROLLABLE MODAL */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modal-content { background: #111; width: 100%; max-width: 850px; max-height: 90vh; border-radius: 25px; border: 1px solid #ffcc00; display: flex; flex-direction: column; }
        .modal-header { padding: 20px 30px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center; }
        .modal-body { padding: 30px; overflow-y: auto; flex: 1; }
        
        .section-title { color: #ffcc00; font-size: 13px; font-weight: bold; text-transform: uppercase; margin: 30px 0 15px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #222; padding-bottom: 8px; }
        .section-title:first-child { margin-top: 0; }
        .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        @media (max-width: 650px) { .form-grid { grid-template-columns: 1fr; } }
        
        .form-group label { display: block; font-size: 11px; color: #777; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; background: #000; border: 1px solid #333; padding: 12px; color: #fff; border-radius: 10px; font-size: 14px; box-sizing: border-box; outline: none; }
        .form-group input:focus { border-color: #ffcc00; }
        
        .modal-footer { padding: 20px 30px; border-top: 1px solid #222; }
        .btn-save { width: 100%; background: #ffcc00; padding: 16px; border-radius: 15px; border: none; font-weight: 800; font-size: 16px; cursor: pointer; text-transform: uppercase; box-shadow: 0 5px 15px rgba(255, 204, 0, 0.2); }
      `}</style>

      {/* --- HEADER --- */}
      <div className="header">
        <div className="title-area">
          <h1>Members Database</h1>
          <p style={{ color: "#ffffff", fontSize: "13px" }}>
            Management & Full Profile Control
          </p>
        </div>
        <div className="search-box">
          <Search
            style={{
              position: "absolute",
              left: "15px",
              top: "14px",
              color: "#ffcc00",
            }}
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name, email..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- USER LIST --- */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "100px" }}>
          <Loader2
            className="animate-spin"
            style={{ color: "#ffcc00" }}
            size={50}
          />
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <div className="user-card" key={user._id}>
              <div className="user-header">
                <img
                  src={user.primaryPhoto || "https://via.placeholder.com/150"}
                  className="user-img"
                  alt=""
                />
                <div className="user-info">
                  <h2 style={{ margin: 0 }}>{user.name}</h2>
                  <p
                    style={{
                      color: "#ffcc00",
                      fontSize: "13px",
                      margin: "5px 0",
                    }}
                  >
                    {user.occupation} • {user.city}
                  </p>
                </div>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  borderTop: "1px solid #1a1a1a",
                  paddingTop: "15px",
                  fontSize: "13px",
                  color: "#777",
                }}
              >
                <div style={{ marginBottom: "5px" }}>
                  <Mail size={12} /> {user.email}
                </div>
                <div>
                  <Phone size={12} /> {user.phone}
                </div>
              </div>
              <div className="actions">
                <button
                  className="btn-edit"
             onClick={() => setEditingUser(user)}
                >
                  <Edit3 size={16} /> Edit All Info
                </button>
               <button
  className="btn-delete"
  onClick={() => setDeleteUserId(user._id)}
>
  <Trash2 size={16} />
</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- COMPREHENSIVE UPDATE MODAL --- */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{ margin: 0, color: "#ffcc00" }}>
                Edit Member: {editingUser.name}
              </h2>
              <X
                style={{ cursor: "pointer" }}
                onClick={() => setEditingUser(null)}
              />
            </div>

            <div className="modal-body">
              <form id="fullUpdateForm" onSubmit={handleUpdate}>
                {/* Section 1: Basic Info */}
                <div className="section-title">
                  <User size={16} /> Basic Personal Details
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={editingUser.name || ""}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      value={editingUser.gender || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="text"
                      value={editingUser.dob || ""}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, dob: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Marital Status</label>
                    <input
                      type="text"
                      value={editingUser.maritalStatus || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          maritalStatus: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Section 2: Contact & Location */}
                <div className="section-title">
                  <MapPin size={16} /> Contact & Geography
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={editingUser.email || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={editingUser.phone || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={editingUser.city || ""}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, city: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      value={editingUser.state || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      value={editingUser.country || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          country: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Height</label>
                    <input
                      type="text"
                      value={editingUser.height || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          height: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Section 3: Professional Info */}
                <div className="section-title">
                  <GraduationCap size={16} /> Education & Career
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Education Level</label>
                    <input
                      type="text"
                      value={editingUser.education || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          education: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>College/University</label>
                    <input
                      type="text"
                      value={editingUser.college || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          college: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Occupation</label>
                    <input
                      type="text"
                      value={editingUser.occupation || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          occupation: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      value={editingUser.company || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          company: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Annual Income</label>
                    <input
                      type="text"
                      value={editingUser.annualIncome || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          annualIncome: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Section 4: Religious & Cultural */}
                <div className="section-title">
                  <Award size={16} /> Religion & Background
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Religion</label>
                    <input
                      type="text"
                      value={editingUser.religion || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          religion: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Caste</label>
                    <input
                      type="text"
                      value={editingUser.caste || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          caste: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Mother Tongue</label>
                    <input
                      type="text"
                      value={editingUser.motherTongue || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          motherTongue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Gotra</label>
                    <input
                      type="text"
                      value={editingUser.gotra || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          gotra: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Section 5: Family & Lifestyle */}
                <div className="section-title">
                  <Users size={16} /> Family & Lifestyle
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Parents Job</label>
                    <input
                      type="text"
                      value={editingUser.parentsJob || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          parentsJob: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Family Type</label>
                    <input
                      type="text"
                      value={editingUser.familyType || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          familyType: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Siblings</label>
                    <input
                      type="text"
                      value={editingUser.siblings || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          siblings: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Eating Habits</label>
                    <input
                      type="text"
                      value={editingUser.eatingHabits || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          eatingHabits: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Smoking/Drinking Habits</label>
                    <input
                      type="text"
                      value={editingUser.habits || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          habits: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Body Type</label>
                    <input
                      type="text"
                      value={editingUser.bodyType || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          bodyType: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Section 6: Partner Preferences */}
                <div className="section-title">
                  <Heart size={16} /> Partner Preferences
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Preferred Age Range</label>
                    <input
                      type="text"
                      value={editingUser.partnerAge || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          partnerAge: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Religion</label>
                    <input
                      type="text"
                      value={editingUser.partnerReligion || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          partnerReligion: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Education</label>
                    <input
                      type="text"
                      value={editingUser.partnerEdu || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          partnerEdu: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Preferred Location</label>
                    <input
                      type="text"
                      value={editingUser.partnerLoc || ""}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          partnerLoc: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Section 7: Bio */}
                <div className="section-title">
                  <Info size={16} /> About / Bio
                </div>
                <div className="form-group">
                  <textarea
                    rows="4"
                    value={editingUser.bio || ""}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, bio: e.target.value })
                    }
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                className="btn-save"
                form="fullUpdateForm"
                disabled={updateLoading}
              >
                {updateLoading
                  ? "Syncing with Database..."
                  : "Update Entire Member Profile"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* DELETE CONFIRMATION MODAL */}
{deleteUserId && (
  <div className="modal-overlay">
    <div
      style={{
        background: "#111",
        padding: "30px",
        borderRadius: "15px",
        border: "1px solid #ff4444",
        textAlign: "center",
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <h3 style={{ color: "#ff4444", marginBottom: "15px" }}>
        Confirm Delete
      </h3>
      <p style={{ color: "#ccc", marginBottom: "25px" }}>
        Are you sure you want to delete this user?
      </p>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          style={{
            flex: 1,
            padding: "10px",
            background: "#222",
            border: "1px solid #555",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={() => setDeleteUserId(null)}
        >
          Cancel
        </button>

        <button
          style={{
            flex: 1,
            padding: "10px",
            background: "#ff4444",
            border: "none",
            color: "#fff",
            borderRadius: "8px",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
)}
<ToastContainer position="top-right" autoClose={3000} />
    </div>
    
  );
}
