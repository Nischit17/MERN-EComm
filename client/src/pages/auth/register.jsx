import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
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
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(formRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.25,
        delay: 0.6,
      });
    });
    return () => ctx.revert();
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
          Join Our Community
        </h1>
        <p className="mt-4 text-gray-500">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Sign in here
          </Link>
        </p>
      </div>
      <div ref={formRef}>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AuthRegister;
