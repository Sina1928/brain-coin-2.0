import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import apiService from "../../services/api";
import "./LoginPage.scss";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiService.login(formData.email, formData.password);

      // Show success message
      toast.success("Login successful!");

      // Add a small delay before navigation to allow the toast to show
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

// import { useState, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import apiService from "../../services/api";
// import "./LoginPage.scss";

// const LoginPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await apiService.login(email, password);
//       localStorage.setItem("token", response.token);
//       localStorage.setItem("user", JSON.stringify(response.user));
//       toast.success("Login successful!");
//       navigate("/dashboard");
//     } catch (error: any) {
//       toast.error(error.response?.data?.error || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-content">
//           <h1>Welcome Back!</h1>
//           <p>Enter your details to access your BrainCoins account</p>

//           <form onSubmit={handleSubmit} className="login-form">
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="username@example.com"
//                 required
//               />
//               <small className="help-text">Example: reynald@example.com</small>
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Enter your password"
//                 required
//               />
//               <small className="help-text">Default password: password123</small>
//             </div>

//             <button type="submit" className="login-button" disabled={isLoading}>
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <div className="login-help">
//             <p>All seeded users use the password: "password123"</p>
//             <p>Email format: username@example.com</p>
//             <p>Example: reynald@example.com</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
