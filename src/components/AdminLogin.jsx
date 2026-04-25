import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <style>{animations}</style>
      {showSplash ? <SplashScreen /> : <LoginScreen navigate={navigate} />}
    </div>
  );
}

const SplashScreen = () => {
  return (
    <div style={{ ...styles.fullScreen, animation: "fadeIn 1s ease" }}>
      <h1 style={styles.title}>SOCIAL TASTE</h1>
      <p style={styles.subtitle}>DEFINING LUXURY</p>
      <div style={styles.loader}></div>
    </div>
  );
};

const LoginScreen = ({ navigate }) => {
  return (
    <div style={{ ...styles.card, animation: "slideUp 0.8s ease" }}>
      <h2 style={styles.heading}>Welcome Back</h2>
      <p style={styles.text}>Login to your admin panel</p>

      <input type="email" placeholder="Email Address" style={styles.input} />
      <input type="password" placeholder="Password" style={styles.input} />

      <button 
        onClick={() => navigate("/dashboard")}
        style={styles.button}
      >
        LOGIN
      </button>

      <p style={styles.footer}>Forgot password?</p>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "sans-serif",
  },
  fullScreen: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: "48px",
    color: "#facc15",
    letterSpacing: "4px",
  },
  subtitle: {
    marginTop: "10px",
    color: "gray",
    letterSpacing: "3px",
  },
  loader: {
    marginTop: "30px",
    width: "150px",
    height: "4px",
    backgroundColor: "#facc15",
    animation: "pulse 1.5s infinite",
  },
  card: {
    width: "350px",
    padding: "30px",
    background: "rgba(0,0,0,0.8)",
    border: "1px solid #facc15",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(255,204,0,0.3)",
  },
  heading: {
    fontSize: "26px",
    color: "#facc15",
    marginBottom: "10px",
  },
  text: {
    color: "gray",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #facc15",
    color: "white",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#facc15",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    marginTop: "15px",
    textAlign: "center",
    color: "gray",
  },
};

const animations = `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}
`;
