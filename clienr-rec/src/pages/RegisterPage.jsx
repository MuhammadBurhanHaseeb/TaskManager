import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Button  from "@/components/atoms/Button.jsx";
import Heading from "@/components/atoms/Heading";
import Input from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(signupUser({ email, password }))
      .unwrap()
      .then(() => {
        // ✅ Successful signup ke baad login page par bhej do
        navigate("/login");
      })
      .catch((err) => {
        console.error("Signup failed:", err);
      });
  };

  return (
    <Div
    variant="RegisterPageMainDiv"
    // className="p-6 max-w-md mx-auto"
    >
      {/* <h1 className="text-2xl font-bold mb-4">Register</h1> */}
      <Heading  level={1} variant= "registerLogin" >Register</Heading>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <Button
          type="submit"
          disabled={loading}
          // className="bg-green-500 text-white p-2 rounded"
          variant="RegisterButton"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
      {error && <Paragraph 
      variant ="Error"
      // className="text-red-500 mt-2"
      >{error}</Paragraph>}
    </Div>
  );
};

export default RegisterPage;
