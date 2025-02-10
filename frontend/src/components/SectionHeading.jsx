import React from "react";

export default function SectionHeading({ heading, backgroundTitle }) {
  const containerStyle = {
    position: "relative",
    textAlign: "center",
    marginBottom: "30px",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    position: "relative",
    zIndex: "1",
    fontWeight: "bold",
    color: 'white'
  };

  const backgroundStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -55%)",
    fontSize: "3.8rem",
    color: "gray",
    opacity: "0.2",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    zIndex: "0",
    color: '#555555'
  };

  return (
    <div style={containerStyle}>
      <span style={backgroundStyle}>{backgroundTitle}</span>
      <h2 style={headingStyle}>{heading}</h2>
    </div>
  );
}
