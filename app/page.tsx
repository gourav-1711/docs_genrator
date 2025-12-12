"use client";

import { useState } from "react";
import JobLetterForm from "./components/JobLetterForm";
import LetterPreview from "./components/LetterPreview";
import { JobLetterData, defaultFormData } from "./types";
import { generateJobLetterPDF } from "./utils/generatePDF";

export default function Home() {
  const [formData, setFormData] = useState<JobLetterData>(defaultFormData);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  const handleGeneratePDF = () => {
    if (!formData.employeeName || !formData.position) {
      alert("Please fill in Employee Name and Position");
      return;
    }
    generateJobLetterPDF(formData);
  };

  const handleReset = () => {
    setFormData(defaultFormData);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📄</span>
            <h1>Job Letter Creator</h1>
          </div>
          <p className="tagline">
            Generate professional appointment letters in seconds
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Mobile Tab Switcher */}
        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === "form" ? "active" : ""}`}
            onClick={() => setActiveTab("form")}
          >
            <span>📝</span> Form
          </button>
          <button
            className={`tab-btn ${activeTab === "preview" ? "active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            <span>👁️</span> Preview
          </button>
        </div>

        <div className="content-grid">
          {/* Form Section */}
          <div
            className={`form-wrapper ${activeTab === "form" ? "active" : ""}`}
          >
            <div className="section-header">
              <h2>📝 Fill Details</h2>
            </div>
            <JobLetterForm formData={formData} onChange={setFormData} />

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={handleReset}>
                <span>🔄</span> Reset Form
              </button>
              <button className="btn btn-primary" onClick={handleGeneratePDF}>
                <span>📥</span> Download PDF
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div
            className={`preview-wrapper ${
              activeTab === "preview" ? "active" : ""
            }`}
          >
            <div className="section-header">
              <h2>👁️ Live Preview</h2>
            </div>
            <LetterPreview data={formData} />

            {/* Download button for mobile preview */}
            <div className="mobile-download">
              <button className="btn btn-primary" onClick={handleGeneratePDF}>
                <span>📥</span> Download PDF
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Create professional job appointment letters with ease</p>
      </footer>
    </div>
  );
}
