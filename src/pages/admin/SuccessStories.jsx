import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit3, MapPin, Calendar, X, Plus } from "lucide-react";

export default function SuccessStoriesPage() {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Previews: UI mein dikhane ke liye (Existing URLs + New Blob URLs)
  const [previews, setPreviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    _id: "",
    coupleName: "",
    marriageDate: "",
    yearsTogether: "",
    story: "",
    location: "",
    images: [], // Sirf New Selected Files yahan rahengi
  });

  const API = "https://social-taste-matrimony.onrender.com/api/success-stories";
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjJlNGE0MTFlYjVlNWM4ODdmZTJlZCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc3NzYwOTYwOCwiZXhwIjoxNzgwMjAxNjA4fQ.810L_RzlkbtjDFn0gVnpVU3UqOLOGIfJjqsa9MxtGrw";

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setStories(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      fetchStories();
    } catch (err) {
      alert("Delete failed!");
    }
  };

  const openEditModal = (e, story) => {
    e.stopPropagation();
    setIsEditing(true);
    setForm({
      _id: story._id,
      coupleName: story.coupleName,
      marriageDate: story.marriageDate.split("T")[0],
      yearsTogether: story.yearsTogether,
      story: story.story,
      location: story.location,
      images: [], 
    });
    setPreviews(story.images || []); // Purani images ko preview mein daala
    setShowModal(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Nayi files ko purani files ke saath append karein
    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // PHOTO REMOVE LOGIC (FIXED)
  const removePhoto = (index) => {
    const photoToRemove = previews[index];

    // 1. Agar ye nayi selected file hai (Blob URL hai)
    if (photoToRemove.startsWith('blob:')) {
      // Humein find karna hoga ki ye form.images mein kaunse index par hai
      // Iske liye hum blob URL aur file ka index sync maintain karte hain
      // Par asaan tarika ye hai ki previews se index nikaal kar files ko bhi filter karein
      const blobCountBefore = previews.slice(0, index).filter(p => p.startsWith('blob:')).length;
      const updatedFiles = [...form.images];
      updatedFiles.splice(blobCountBefore, 1);
      setForm({ ...form, images: updatedFiles });
    }

    // 2. UI se remove karein
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("coupleName", form.coupleName);
      formData.append("marriageDate", form.marriageDate);
      formData.append("yearsTogether", form.yearsTogether);
      formData.append("story", form.story);
      formData.append("location", form.location);

      // --- CRITICAL PART FOR UPDATE ---
      // Hum sirf wahi purani images bhej rahe hain jo previews mein bachi hain
      const existingImagesToKeep = previews.filter(p => p.startsWith('http'));
      
      // Backend ko as an array bhej rahe hain
      existingImagesToKeep.forEach(img => {
        formData.append("images", img); 
      });

      // Nayi files add karein
      for (let i = 0; i < form.images.length; i++) {
        formData.append("images", form.images[i]);
      }

      if (isEditing) {
        // Update request
        await axios.put(`${API}/${form._id}`, formData, {
          headers: { 
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "multipart/form-data" 
          },
        });
        alert("✨ Updated Successfully!");
      } else {
        // Create request
        await axios.post(API, formData, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("✨ Story Added!");
      }

      setShowModal(false);
      resetForm();
      fetchStories();
    } catch (err) {
      alert("❌ Operation failed. " + (err.response?.data?.message || "Check API logic"));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ _id: "", coupleName: "", marriageDate: "", yearsTogether: "", story: "", location: "", images: [] });
    setPreviews([]);
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Success Stories</h1>
          <p style={styles.subHeading}>Celebrating Love that Lasts Forever</p>
        </div>
        <button style={styles.addBtn} onClick={() => { resetForm(); setShowModal(true); }}>
          + Share Your Story
        </button>
      </div>

      {loading && !showModal && <div style={styles.loader}>Shining up the stories...</div>}

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0, color: "#FFD700" }}>
                {isEditing ? "Edit Success Story" : "Create Story"}
              </h2>
              <button style={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Couple Names</label>
                <input required value={form.coupleName} style={styles.input} onChange={(e) => setForm({ ...form, coupleName: e.target.value })} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Marriage Date</label>
                <input required type="date" value={form.marriageDate} style={styles.input} onChange={(e) => setForm({ ...form, marriageDate: e.target.value })} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Years Together</label>
                <input required value={form.yearsTogether} style={styles.input} onChange={(e) => setForm({ ...form, yearsTogether: e.target.value })} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Location</label>
                <input required value={form.location} style={styles.input} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              </div>

              <div style={{ ...styles.inputGroup, gridColumn: "span 2" }}>
                <label style={styles.label}>Their Beautiful Story</label>
                <textarea required rows="4" value={form.story} style={styles.textarea} onChange={(e) => setForm({ ...form, story: e.target.value })} />
              </div>

              <div style={{ ...styles.inputGroup, gridColumn: "span 2" }}>
                <label style={styles.label}>Photos (Add New)</label>
                <div style={styles.fileInputWrapper}>
                  <input type="file" multiple accept="image/*" style={styles.fileInput} onChange={handleFileChange} />
                  <Plus size={20} color="#FFD700" />
                  <span style={{color: '#aaa', fontSize: '12px'}}> Add more photos</span>
                </div>
              </div>

              {/* PREVIEW WITH SYNCED REMOVE */}
              <div style={styles.previewContainer}>
                {previews.map((src, i) => (
                  <div key={i} style={styles.previewWrapper}>
                    <img src={src} alt="preview" style={styles.previewImg} />
                    <button type="button" style={styles.removeImgBtn} onClick={() => removePhoto(i)}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <button type="submit" disabled={loading} style={styles.submitBtn}>
                {loading ? "Saving..." : isEditing ? "Update Story" : "Publish Story"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* RENDER LIST */}
      <div style={styles.grid}>
        {stories.map((s) => (
          <div key={s._id} style={styles.card}>
            <div style={styles.imageWrapper}>
              <img src={s.images?.[0] || "https://via.placeholder.com/400"} alt="Couple" style={styles.image} />
              <div style={styles.cardBadge}>{s.yearsTogether}</div>
              <div style={styles.actionOverlay}>
                <button style={styles.miniBtnEdit} onClick={(e) => openEditModal(e, s)}><Edit3 size={16} /></button>
                <button style={styles.miniBtnDelete} onClick={(e) => handleDelete(e, s._id)}><Trash2 size={16} /></button>
              </div>
            </div>
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{s.coupleName}</h3>
              <div style={styles.cardMeta}>
                <span>📍 {s.location}</span>
                <span>📅 {new Date(s.marriageDate).toLocaleDateString()}</span>
              </div>
              <p style={styles.cardStory}>{s.story.substring(0, 80)}...</p>
              <button style={styles.readMore}>Read Full Story →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#0a0a0a", minHeight: "100vh", padding: "40px 5%", fontFamily: "'Inter', sans-serif", color: "#fff" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "50px" },
  heading: { fontSize: "2.5rem", margin: 0, color: "#FFD700", fontWeight: "800" },
  subHeading: { color: "#888", margin: "5px 0 0 0" },
  addBtn: { background: "linear-gradient(45deg, #FFD700, #FFA500)", border: "none", padding: "14px 28px", borderRadius: "50px", fontWeight: "700", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "30px" },
  card: { background: "#161616", borderRadius: "20px", overflow: "hidden", border: "1px solid #222", position: "relative" },
  imageWrapper: { position: "relative", height: "250px" },
  image: { width: "100%", height: "100%", objectFit: "cover" },
  cardBadge: { position: "absolute", bottom: "15px", left: "15px", background: "rgba(0,0,0,0.7)", padding: "5px 12px", borderRadius: "20px", color: "#FFD700", border: "1px solid #FFD700" },
  actionOverlay: { position: "absolute", top: "15px", right: "15px", display: "flex", gap: "8px" },
  miniBtnEdit: { background: "#FFD700", border: "none", width: "35px", height: "35px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  miniBtnDelete: { background: "#ff4444", color: "#fff", border: "none", width: "35px", height: "35px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  cardContent: { padding: "20px" },
  cardTitle: { margin: "0 0 10px 0", color: "#fff" },
  cardMeta: { display: "flex", gap: "15px", fontSize: "0.8rem", color: "#aaa", marginBottom: "10px" },
  cardStory: { fontSize: "0.9rem", color: "#ccc", marginBottom: "15px" },
  readMore: { background: "none", border: "none", color: "#FFD700", fontWeight: "600", cursor: "pointer" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" },
  modal: { background: "#1a1a1a", padding: "30px", borderRadius: "24px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", border: "1px solid #333" },
  modalHeader: { display: "flex", justifyContent: "space-between", marginBottom: "25px" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "0.85rem", color: "#888" },
  input: { background: "#252525", border: "1px solid #333", padding: "12px", borderRadius: "10px", color: "#fff" },
  textarea: { background: "#252525", border: "1px solid #333", padding: "12px", borderRadius: "10px", color: "#fff", resize: "none" },
  fileInputWrapper: { border: "1px dashed #444", padding: "15px", borderRadius: "12px", textAlign: "center", position: "relative", background: "#222" },
  fileInput: { position: "absolute", inset: 0, opacity: 0, cursor: "pointer" },
  previewContainer: { display: "flex", gap: "12px", marginTop: "15px", flexWrap: "wrap", gridColumn: "span 2" },
  previewWrapper: { position: "relative", width: "65px", height: "65px" },
  previewImg: { width: "100%", height: "100%", borderRadius: "8px", objectFit: "cover", border: "1px solid #444" },
  removeImgBtn: { position: "absolute", top: "-5px", right: "-5px", background: "#ff4444", color: "#fff", border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.5)" },
  submitBtn: { gridColumn: "span 2", background: "linear-gradient(45deg, #FFD700, #FFA500)", border: "none", padding: "15px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" },
  closeBtn: { background: "#333", border: "none", color: "#fff", width: "30px", height: "30px", borderRadius: "50%", cursor: "pointer" },
  loader: { textAlign: "center", padding: "50px", color: "#FFD700" }
};      