import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Div from "@/components/atoms/Div";
import Input from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   dispatch(loginUser({ email, password }))
  //     .unwrap()
  //     .then((res) => { console.log(res);
  //       // ✅ Login successful → redirect to tasks page
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.error("Login failed:", err);
  //     });
  // };


  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await dispatch(loginUser({ email, password })).unwrap();
    console.log(res);

    // ✅ Login successful → redirect to tasks page
    navigate("/");
  } catch (err) {
    console.error("Login failed:", err);
  }
};


  return (
    <Div
    variant="LoginPageMainDiv"
    // className="p-6 max-w-md mx-auto"
    >
      {/* <h1 className="text-2xl font-bold mb-4">Login</h1> */}
      <Heading  level={1} variant= "registerLogin" >Login</Heading>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
          variant="LoginButton"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      {error && <Paragraph
      variant="Error"
      // className="text-red-500 mt-2"
      >{error}</Paragraph>}
    </Div>
  );
};

export default LoginPage;
