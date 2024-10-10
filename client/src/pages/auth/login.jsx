import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const formRef = useRef(null);

  // GSAP animation for form and title with delay
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.5, // Increased duration for smoother effect
        ease: "power3.out",
        delay: 0.3, // Add delay before animation starts
      });
      gsap.from(formRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.8, // Increased duration for a slower reveal
        ease: "power3.out",
        stagger: 0.25, // Stagger delay between elements
        delay: 0.6, // Delay for form elements after container appears
      });
    });
    return () => ctx.revert(); // Cleanup animation on unmount
  }, []);

  const onSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <div
      className="mx-auto w-full max-w-md space-y-6 bg-white rounded-lg p-8"
      ref={containerRef}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Welcome Back!
        </h1>
        <p className="mt-4 text-gray-500">
          New to our platform?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Join us today
          </Link>
        </p>
      </div>
      <div ref={formRef}>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AuthLogin;
