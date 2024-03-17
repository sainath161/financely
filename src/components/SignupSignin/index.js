import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signupWithEmail() {
    try {
      setLoading(true);
      if (
        name &&
        email &&
        password &&
        confirmPassword &&
        password === confirmPassword
      ) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        toast.success(`Account created for ${user.email}`);
        await createDoc(user);
        navigate("/dashboard");
      } else {
        toast.error("All fields are required and passwords must match");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function loginUsingEmail() {
    try {
      setLoading(true);
      if (email && password) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        toast.success(`Signed In! Welcome ${user.displayName || user.email}`);
        setLoading(false);
        navigate("/dashboard");
      } else {
        toast.error("Both Email and Password are required!");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function createDoc(user) {
    setLoading(true);
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Profile Created Successfully!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      // toast.error("User already exists.");
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user", user);
          navigate("/dashboard");
          setLoading(false);
          createDoc(user);
          toast.success(`Signed in as ${user.displayName}`);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          setLoading(false);
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } catch (e) {
      setLoading(false);
      toast.error(e.message);
    }
  }

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        {loginForm ? "Login" : "Sign up"} on{" "}
        <span style={{ color: "var(--theme)" }}>Financely</span>.
      </h2>
      <form>
        {!loginForm && (
          <Input
            label={"Full name"}
            state={name}
            setState={setName}
            placeholder={"John Doe"}
          />
        )}

        <Input
          label={"Email"}
          type={"email"}
          state={email}
          setState={setEmail}
          placeholder={"johndoe@gmail.com"}
        />

        <Input
          label={"Password"}
          type={"password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />

        {!loginForm && (
          <Input
            label={"Confirm Password"}
            type={"password"}
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder={"Example@123"}
          />
        )}

        <Button
          disabled={loading}
          text={loading ? "Loading..." : loginForm ? "Login" : "Signup"}
          onClick={loginForm ? loginUsingEmail : signupWithEmail}
        />
        <p className="p-login">Or</p>
        <Button
          onClick={googleAuth}
          text={
            loading
              ? "Loading..."
              : loginForm
              ? "Login using Google"
              : "Signup using Google"
          }
          blue={true}
        />
        <p
          className="p-login"
          style={{ cursor: "pointer" }}
          onClick={() => setLoginForm(!loginForm)}
        >
          {loginForm
            ? "Don't have an Account? Click here"
            : "Have an Account? Click here"}
        </p>
      </form>
    </div>
  );
}

export default SignupSigninComponent;
