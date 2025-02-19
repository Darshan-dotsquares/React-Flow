"use client";
import React from "react";
import Image from "next/image";
import ResponsiveAppBar from "../Global/Header/index.js";
import { useRouter } from "next/navigation";
import "../../app/globals.css";
import ImageTextCard from "../utills/card";
import Footer from "../utills/footer";

const HomePage = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/signup");
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          background:
            "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(8,31,135,1) 42%, rgba(6,72,162,1) 55%, rgba(5,106,185,1) 66%, rgba(0,212,255,1) 100%)",
          color: "white",
          padding: "20px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
          width: "100%",
        }}
      >
        Registration is open now
        <button
          onClick={handleRedirect}
          style={{
            backgroundColor: "#CD5C5C" || "transparent",
            color: "white",
            padding: "10px 20px",
            fontSize: "18px",
            fontWeight: "bold" || "normal",
            border: "none",
            borderRadius: "19px",
            cursor: "pointer",
            marginLeft: "10px",
            transition: "all 0.3s ease",
          }}
        >
          Register Now
        </button>
      </div>
      <ResponsiveAppBar />
      <div>
        <img
          src="/assets/new6.png"
          style={{
            width: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
      </div>

      <div>
        <ImageTextCard />
      </div>
      <div>
        <Footer />
      </div>

      {/* Add media queries for responsiveness */}
      <style jsx>{`
        /* Desktop and larger screens */
        @media (min-width: 1024px) {
          .home-page-heading {
            font-size: 48px;
          }

          .registration-banner {
            font-size: 24px;
          }

          .register-button {
            font-size: 18px;
            padding: 10px 20px;
          }
        }

        /* Tablets and smaller screens */
        @media (max-width: 1024px) {
          .home-page-heading {
            font-size: 36px;
          }

          .registration-banner {
            font-size: 20px;
          }

          .register-button {
            font-size: 16px;
            padding: 8px 16px;
          }

          /* Adjust video height */
          video {
            height: 400px;
          }
        }

        /* Mobile phones */
        @media (max-width: 768px) {
          .home-page-heading {
            font-size: 28px;
          }

          .registration-banner {
            font-size: 18px;
          }

          .register-button {
            font-size: 14px;
            padding: 6px 12px;
          }

          /* Adjust video height */
          video {
            height: 300px;
          }

          .registration-banner {
            font-size: 16px;
            padding: 15px;
          }

          .home-page-heading {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
