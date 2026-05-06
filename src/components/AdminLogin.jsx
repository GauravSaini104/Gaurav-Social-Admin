// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// export default function AdminLogin() {
//   const [showSplash, setShowSplash] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowSplash(false);
//     }, 2500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div style={styles.container}>
//       <style>{animations}</style>

//       {/* TOASTER */}
//       <Toaster position="top-right" />

//       {showSplash && <SplashScreen />}
//       {!showSplash && <LoginScreen navigate={navigate} />}
//     </div>
//   );
// }

// const SplashScreen = () => {
//   return (
//     <div style={{ ...styles.fullScreen, animation: "fadeIn 1s ease" }}>
//       <h1 style={styles.title}>SOCIAL TASTE</h1>
//       <p style={styles.subtitle}>DEFINING LUXURY</p>
//       <div style={styles.loader}></div>
//     </div>
//   );
// };

// const LoginScreen = ({ navigate }) => {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     console.log("Button clicked");

//     if (!emailOrPhone || !password) {
//       return toast.error("Please enter email & password");
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(
//         "https://social-taste-matrimony.onrender.com/api/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             emailOrPhone,
//             password,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data));

//         toast.success("Login successful 🎉");

//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 1000);
//       } else {
//         toast.error(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login Error:", err);
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ ...styles.card, animation: "slideUp 0.8s ease" }}>
//       <h2 style={styles.heading}>Welcome Back</h2>
//       <p style={styles.text}>Login to your admin panel</p>

//       <input
//         type="email"
//         placeholder="Email Address"
//         style={styles.input}
//         value={emailOrPhone}
//         onChange={(e) => setEmailOrPhone(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         style={styles.input}
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button
//         onClick={handleLogin}
//         disabled={loading}
//         style={{
//           ...styles.button,
//           opacity: loading ? 0.6 : 1,
//           cursor: loading ? "not-allowed" : "pointer",
//         }}
//       >
//         {loading ? "Logging in..." : "LOGIN"}
//       </button>

//       <p style={styles.footer}>Forgot password?</p>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     height: "100vh",
//     backgroundColor: "black",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "white",
//     fontFamily: "sans-serif",
//   },
//   fullScreen: {
//     position: "absolute",
//     inset: 0,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "black",
//     pointerEvents: "none", // ✅ click issue fix
//   },
//   title: {
//     fontSize: "48px",
//     color: "#facc15",
//     letterSpacing: "4px",
//   },
//   subtitle: {
//     marginTop: "10px",
//     color: "gray",
//     letterSpacing: "3px",
//   },
//   loader: {
//     marginTop: "30px",
//     width: "150px",
//     height: "4px",
//     backgroundColor: "#facc15",
//     animation: "pulse 1.5s infinite",
//   },
//   card: {
//     width: "350px",
//     padding: "30px",
//     background: "rgba(0,0,0,0.8)",
//     border: "1px solid #facc15",
//     borderRadius: "15px",
//     boxShadow: "0 0 20px rgba(255,204,0,0.3)",
//   },
//   heading: {
//     fontSize: "26px",
//     color: "#facc15",
//     marginBottom: "10px",
//   },
//   text: {
//     color: "gray",
//     marginBottom: "20px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "15px",
//     background: "transparent",
//     border: "none",
//     borderBottom: "1px solid #facc15",
//     color: "white",
//     outline: "none",
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#facc15",
//     border: "none",
//     borderRadius: "8px",
//     fontWeight: "bold",
//   },
//   footer: {
//     marginTop: "15px",
//     textAlign: "center",
//     color: "gray",
//   },
// };

// const animations = `
// @keyframes fadeIn {
//   from { opacity: 0; transform: scale(0.9); }
//   to { opacity: 1; transform: scale(1); }
// }

// @keyframes slideUp {
//   from { opacity: 0; transform: translateY(50px); }
//   to { opacity: 1; transform: translateY(0); }
// }

// @keyframes pulse {
//   0% { opacity: 0.3; }
//   50% { opacity: 1; }
//   100% { opacity: 0.3; }
// }
// `;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AdminLogin() {
  const[showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  },[]);

  return (
    <div className="lux-container">
      <style>{luxStyles}</style>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#fff",
            border: "1px solid #facc15",
          },
        }}
      />

      <div className="bg-pattern"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      {showSplash && <SplashScreen />}
      {!showSplash && <LoginScreen navigate={navigate} />}
    </div>
  );
}

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <div className="splash-bg"></div>
      
      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`particle p-${i + 1}`}></div>
      ))}

      <div className="splash-content">
        <h1 className="splash-title">
          SOCIAL TASTE
          <span className="light-sweep"></span>
        </h1>
        <p className="splash-subtitle">DEFINING LUXURY</p>
        <div className="premium-loader"></div>
      </div>
    </div>
  );
};

const LoginScreen = ({ navigate }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      return toast.error("Please enter email & password");
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://social-taste-matrimony.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOrPhone,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        toast.success("Login successful 🎉");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-wrapper">
      <div className="animated-border"></div>
      
      <div className="lux-card">
        <div className="lux-header">
          <h2>Welcome Back</h2>
          <p>Login to your exclusive admin panel</p>
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            className="lux-input"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            className="lux-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <button onClick={handleLogin} disabled={loading} className="lux-btn">
          {loading ? <span className="btn-loader"></span> : "LOGIN"}
        </button>

        <p className="lux-footer">
          <span className="footer-link">Forgot password?</span>
        </p>
      </div>
    </div>
  );
};

const luxStyles = `
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .lux-container {
    height: 100vh;
    background: radial-gradient(circle at top right, #1a1a1a 0%, #000000 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    position: relative;
    overflow: hidden;
  }

  .bg-pattern {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    z-index: 1;
  }

  .bg-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    z-index: 2;
  }

  .orb-1 {
    width: 500px;
    height: 500px;
    background: rgba(250, 204, 21, 0.08);
    top: -150px;
    left: -150px;
    animation: float 14s ease-in-out infinite alternate;
  }

  .orb-2 {
    width: 400px;
    height: 400px;
    background: rgba(250, 204, 21, 0.06);
    bottom: -100px;
    right: -100px;
    animation: float 12s ease-in-out infinite alternate-reverse;
  }

  .splash-container {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
    z-index: 50;
    pointer-events: none;
    overflow: hidden;
  }

 

  .splash-title {
    position: relative;
    font-size: 52px;
    background: linear-gradient(90deg, #d4af37, #fff, #facc15, #fff, #d4af37);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 10px;
    font-weight: 300;
    overflow: hidden;
    animation: textGradientLoop 3s linear infinite;
  }

 
.splash-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
    animation: bgZoom 3s ease-out forwards;
  }

  .splash-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: logoEnter 2.5s cubic-bezier(0.2, 1, 0.3, 1) forwards;
  }

  .light-sweep {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
    transform: skewX(-20deg);
    animation: sweep 2.5s infinite;
  }

  .splash-subtitle {
    margin-top: 15px;
    color: #facc15;
    letter-spacing: 8px;
    font-size: 15px;
    text-transform: uppercase;
    opacity: 0;
    animation: fadeIn 1s ease 1s forwards;
  }

  .premium-loader {
    margin-top: 40px;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(250, 204, 21, 0.1);
    border-top: 2px solid #facc15;
    border-radius: 50%;
    animation: spin 1s linear infinite, glowPulse 2s ease-in-out infinite;
  }

  .particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #facc15;
    border-radius: 50%;
    box-shadow: 0 0 10px #facc15;
    opacity: 0;
  }
  .p-1 { top: 20%; left: 30%; animation: floatUp 2s ease infinite 0.1s; }
  .p-2 { top: 60%; left: 20%; animation: floatUp 2.5s ease infinite 0.3s; }
  .p-3 { top: 40%; left: 70%; animation: floatUp 2.2s ease infinite 0.5s; }
  .p-4 { top: 80%; left: 80%; animation: floatUp 2.8s ease infinite 0.2s; }
  .p-5 { top: 30%; left: 50%; animation: floatUp 2.4s ease infinite 0.7s; }
  .p-6 { top: 70%; left: 50%; animation: floatUp 2.6s ease infinite 0.4s; }

  /* Add these Missing Keyframes at the bottom of your CSS */
  @keyframes bgZoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }

  @keyframes logoEnter {
    0% { transform: scale(0.8); opacity: 0; filter: drop-shadow(0 0 0px transparent); }
    50% { filter: drop-shadow(0 0 20px rgba(250,204,21,0.6)); }
    100% { transform: scale(1); opacity: 1; filter: drop-shadow(0 0 10px rgba(250,204,21,0.3)); }
  }

  @keyframes sweep {
    0% { left: -100%; }
    50% { left: 200%; }
    100% { left: 200%; }
  }

  @keyframes floatUp {
    0% { transform: translateY(0); opacity: 0; }
    50% { opacity: 0.5; }
    100% { transform: translateY(-60px); opacity: 0; }
  }

  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 5px rgba(250, 204, 21, 0.2); }
    50% { box-shadow: 0 0 20px rgba(250, 204, 21, 0.6); }
  }
  .card-wrapper {
    position: relative;
    z-index: 10;
    width: 480px;
    min-height: 550px;
    border-radius: 24px;
    padding: 2px;
    overflow: hidden;
    box-shadow: 0 0 40px rgba(250, 204, 21, 0.15), 0 20px 60px rgba(0,0,0,0.8);
    animation: cardAppear 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  .animated-border {
    position: absolute;
    inset: -50%;
    background: conic-gradient(from 0deg, transparent 70%, #facc15 100%);
    animation: spin 4s linear infinite;
  }

  .lux-card {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    background: rgba(15, 15, 15, 0.65);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: 22px;
     border: 1px solid rgba(255, 255, 255, 0.27);
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .lux-header {
    text-align: center;
    margin-bottom: 45px;
  }

  .lux-header h2 {
    font-size: 32px;
    color: #facc15;
    font-weight: 400;
    letter-spacing: 1.5px;
    margin-bottom: 12px;
    text-shadow: 0 0 15px rgba(250, 204, 21, 0.3);
  }

  .lux-header p {
    color: #999;
    font-size: 15px;
    letter-spacing: 0.5px;
  }

  .input-group {
    margin-bottom: 30px;
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    color: #666;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .lux-input {
    width: 100%;
    padding: 18px 20px 18px 55px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    color: #fff;
    font-size: 16px;
    transition: all 0.3s ease;
    outline: none;
  }

  .lux-input::placeholder {
    color: #666;
    letter-spacing: 0.5px;
  }

  .lux-input:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(250, 204, 21, 0.3);
  }

  .lux-input:focus {
    background: rgba(250, 204, 21, 0.05);
    border-color: #facc15;
    box-shadow: 0 0 20px rgba(250, 204, 21, 0.25), inset 0 0 10px rgba(250, 204, 21, 0.1);
  }

  .lux-input:focus + .input-icon {
    color: #facc15;
    filter: drop-shadow(0 0 5px rgba(250, 204, 21, 0.5));
  }

  .lux-btn {
    width: 100%;
    padding: 18px;
    margin-top: 15px;
    background: linear-gradient(135deg, #facc15 0%, #c49a00 100%);
    color: #000;
    border: none;
    border-radius: 14px;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 2.5px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60px;
    box-shadow: 0 5px 15px rgba(250, 204, 21, 0.2);
  }

  .lux-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 15px 25px rgba(250, 204, 21, 0.35);
  }

  .lux-btn:active:not(:disabled) {
    transform: translateY(1px);
  }

  .lux-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #a38716 0%, #826703 100%);
    box-shadow: none;
  }

  .btn-loader {
    width: 24px;
    height: 24px;
    border: 3px solid #000;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    animation: rotation 1s linear infinite;
  }

  .lux-footer {
    margin-top: 35px;
    text-align: center;
  }

  .footer-link {
    color: #888;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
  }

  .footer-link:hover {
    color: #facc15;
    text-shadow: 0 0 10px rgba(250, 204, 21, 0.4);
  }

  @keyframes textReveal {
    0% { opacity: 0; transform: translateY(20px); filter: blur(5px); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  @keyframes lineGrow {
    0% { width: 0; opacity: 1; }
    70% { width: 300px; opacity: 1; }
    100% { width: 300px; opacity: 0; }
  }

  @keyframes cardAppear {
    0% { opacity: 0; transform: translateY(40px) scale(0.95); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes float {
    0% { transform: translate(0, 0); }
    100% { transform: translate(40px, 40px); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes rotation {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;