import React, { useState, useEffect } from "react";
import SectionPage from "./SectionPage";

const VerifiedDocument = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  
  // States for Modals
  const [selectedUser, setSelectedUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // For Image Popup

  const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjJlNGE0MTFlYjVlNWM4ODdmZTJlZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3Nzg4NTk5OSwiZXhwIjoxNzgwNDc3OTk5fQ.zETWn4yf7AuVyLrKfNXKfK1WmdPR96Sef6cTOfpjqac";

  const headers = {
    "Authorization": `Bearer ${ADMIN_TOKEN}`,
    "Content-Type": "application/json"
  };

  const fetchPending = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://social-taste-matrimony.onrender.com/api/verification/admin/pending", { headers });
      const data = await response.json();
      setPendingUsers(Array.isArray(data) ? data : []);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const fetchUserDetails = async (id) => {
    try {
      const response = await fetch(`https://social-taste-matrimony.onrender.com/api/auth/user/${id}`, { headers });
      const data = await response.json();
      setSelectedUser(data);
    } catch (error) { alert("Details load fail!"); }
  };

  // Modern Action API (Supports individual status)
  const handleVerifyAction = async (userId, selfieStatus, govtIdStatus) => {
    try {
      setActionLoading(userId);
      const response = await fetch("https://social-taste-matrimony.onrender.com/api/verification/admin/verify-action", {
        method: "POST",
        headers,
        body: JSON.stringify({ userId, selfieStatus, govtIdStatus }),
      });
      if (response.ok) {
        alert("Action Updated!");
        setSelectedUser(null);
        fetchPending();
      }
    } catch (error) { alert("API Error"); } finally { setActionLoading(null); }
  };

  useEffect(() => { fetchPending(); }, []);

  return (
    <>
      <style>{`
        .admin-wrap { background: #000; color: #fff; font-family: 'Inter', sans-serif; padding: 20px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        
        /* Card UI */
        .u-card { background: #111; border: 1px solid #222; border-radius: 15px; padding: 15px; transition: 0.3s; }
        .u-card:hover { border-color: #ffcc00; }
        .u-name { font-size: 18px; font-weight: bold; color: #ffcc00; margin-bottom: 5px; }
        
        /* Image Thumbnails */
        .img-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 15px 0; }
        .thumb-box { text-align: center; cursor: pointer; position: relative; }
        .thumb-box img { width: 100%; height: 100px; object-fit: cover; border-radius: 8px; border: 2px solid #222; transition: 0.2s; }
        .thumb-box img:hover { border-color: #ffcc00; transform: scale(1.03); }
        .thumb-box span { font-size: 10px; color: #888; text-transform: uppercase; margin-top: 5px; display: block; }

        /* Full Screen Image Popup */
        .img-popup-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.95); z-index: 2000; display: flex; justify-content: center; align-items: center; cursor: zoom-out; }
        .img-popup-content { max-width: 90%; max-height: 90%; border: 3px solid #ffcc00; border-radius: 10px; animation: pop 0.3s ease; }
        @keyframes pop { from { transform: scale(0.8); } to { transform: scale(1); } }

        /* Detail Modal */
        .modal { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.8); z-index: 1500; display: flex; justify-content: flex-end; }
        .modal-side { width: 100%; max-width: 500px; background: #111; height: 100%; overflow-y: auto; border-left: 2px solid #ffcc00; padding: 25px; animation: slide 0.4s ease; }
        @keyframes slide { from { transform: translateX(100%); } to { transform: translateX(0); } }

        /* Action Buttons */
        .verify-row { background: #1a1a1a; padding: 15px; border-radius: 10px; margin-bottom: 15px; border: 1px solid #333; }
        .verify-label { display: block; color: #ffcc00; font-weight: bold; margin-bottom: 10px; font-size: 14px; }
        .btn-group { display: flex; gap: 10px; }
        .btn-mini { flex: 1; padding: 8px; border-radius: 6px; border: none; cursor: pointer; font-weight: bold; font-size: 12px; }
        .btn-app { background: #ffcc00; color: #000; }
        .btn-rej { background: transparent; color: #ff4444; border: 1px solid #ff4444; }
        
        .btn-full-app { width: 100%; background: #ffcc00; color: #000; padding: 15px; border: none; border-radius: 10px; font-weight: 900; margin-top: 20px; cursor: pointer; font-size: 16px; }
        .close-x { float: right; color: #ffcc00; font-size: 24px; cursor: pointer; }

        .info-tag { font-size: 12px; color: #aaa; margin-bottom: 4px; }
        .section-h { border-bottom: 1px solid #222; padding-bottom: 5px; margin: 20px 0 10px; color: #ffcc00; font-size: 14px; text-transform: uppercase; }
      `}</style>

      <SectionPage
        title="Admin Document Control"
        description="Click on any image to zoom. Review individual documents and approve."
        points={[
          { title: "Zoom Feature", text: "Click on ID or Selfie to view full screen." },
          { title: "Split Approval", text: "You can approve ID but reject selfie if needed." },
          { title: "Security", text: "Always match Selfie with the ID Photo." },
        ]}
      />

      <div className="admin-wrap">
        {loading ? (
          <div style={{textAlign: 'center', padding: '50px', color: '#ffcc00'}}>Fetching pending requests...</div>
        ) : (
          <div className="grid">
            {pendingUsers.map(user => (
              <div className="u-card" key={user._id}>
                <div className="u-name">{user.name}</div>
                <div className="info-tag">{user.email}</div>
                
                <div className="img-grid">
                  <div className="thumb-box" onClick={() => setPreviewImage(user.verification.govtIdUrl)}>
                    <span>Govt ID</span>
                    <img src={user.verification.govtIdUrl} alt="ID" />
                  </div>
                  <div className="thumb-box" onClick={() => setPreviewImage(user.verification.selfieUrl)}>
                    <span>Selfie</span>
                    <img src={user.verification.selfieUrl} alt="Selfie" />
                  </div>
                </div>

                <button className="btn-mini btn-app" style={{width: '100%'}} onClick={() => fetchUserDetails(user._id)}>
                  View Full Profile & Action
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 1. Image Zoom Popup */}
      {previewImage && (
        <div className="img-popup-overlay" onClick={() => setPreviewImage(null)}>
           <img src={previewImage} className="img-popup-content" alt="Zoomed" />
           <p style={{position: 'absolute', bottom: '20px', color: '#fff'}}>Click anywhere to close</p>
        </div>
      )}

      {/* 2. Side Detail Modal */}
      {selectedUser && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && setSelectedUser(null)}>
          <div className="modal-side">
            <span className="close-x" onClick={() => setSelectedUser(null)}>&times;</span>
            <h2 style={{color: '#ffcc00'}}>{selectedUser.name}'s Profile</h2>
            
            {/* Action Section */}
            <div className="section-h">Action Center</div>
            
            {/* Govt ID Action */}
            <div className="verify-row">
              <span className="verify-label">Government ID Verification</span>
              <div className="btn-group">
                <button className="btn-mini btn-app" onClick={() => handleVerifyAction(selectedUser._id, selectedUser.verification.selfieStatus, "Approved")}>Approve ID</button>
                <button className="btn-mini btn-rej" onClick={() => handleVerifyAction(selectedUser._id, selectedUser.verification.selfieStatus, "Rejected")}>Reject ID</button>
              </div>
            </div>

            {/* Selfie Action */}
            <div className="verify-row">
              <span className="verify-label">Selfie Verification</span>
              <div className="btn-group">
                <button className="btn-mini btn-app" onClick={() => handleVerifyAction(selectedUser._id, "Approved", selectedUser.verification.govtIdStatus)}>Approve Selfie</button>
                <button className="btn-mini btn-rej" onClick={() => handleVerifyAction(selectedUser._id, "Rejected", selectedUser.verification.govtIdStatus)}>Reject Selfie</button>
              </div>
            </div>

            {/* Bulk Action */}
            <button className="btn-full-app" onClick={() => handleVerifyAction(selectedUser._id, "Approved", "Approved")}>
              APPROVE BOTH & VERIFY USER ✅
            </button>

            {/* Profile Info */}
            <div className="section-h">Profile Details</div>
            <div style={{fontSize: '14px', lineHeight: '2'}}>
              <div><b>Income:</b> {selectedUser.annualIncome}</div>
              <div><b>Education:</b> {selectedUser.education}</div>
              <div><b>Job:</b> {selectedUser.company}</div>
              <div><b>Location:</b> {selectedUser.city}, {selectedUser.state}</div>
              <div><b>Religion:</b> {selectedUser.religion}</div>
              <div className="section-h">User Bio</div>
              <p style={{color: '#888', fontStyle: 'italic'}}>{selectedUser.bio}</p>
            </div>

            <div className="section-h">Photos Audit</div>
            <div className="img-grid">
               <img src={selectedUser.primaryPhoto} onClick={() => setPreviewImage(selectedUser.primaryPhoto)} style={{width: '100%', borderRadius: '8px', cursor: 'pointer'}} />
               {selectedUser.additionalPhotos?.map((p,i) => (
                 <img key={i} src={p} onClick={() => setPreviewImage(p)} style={{width: '100%', borderRadius: '8px', cursor: 'pointer', marginBottom: '10px'}} />
               ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifiedDocument;