"use client";

import { useState } from "react";
import JobLetterForm from "./components/JobLetterForm";
import LetterPreview from "./components/LetterPreview";
import BillCreator from "./components/BillCreator";
import { JobLetterData, defaultFormData, BillData, defaultBillData } from "./types";
import { generateJobLetterPDF, generateBillPDF } from "./utils/generatePDF";
import { Briefcase, Receipt, Sparkles } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<"job" | "bill">("job");
  const [formData, setFormData] = useState<JobLetterData>(defaultFormData);
  const [billData, setBillData] = useState<BillData>(defaultBillData);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  const handleGeneratePDF = () => {
    if (!formData.employeeName || !formData.position) {
      alert("Please fill in Employee Name and Position");
      return;
    }
    generateJobLetterPDF(formData);
  };

  const handleGenerateBillPDF = () => {
    generateBillPDF(billData);
  };

  const handleReset = () => {
    setFormData(defaultFormData);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-500/30">
              <Sparkles className="text-amber-400" size={32} />
            </div>
          </div>
          <div className="logo">
            <h1>Jewellery Wala Tools</h1>
          </div>
          <p className="text-slate-400 mt-2 font-medium">Professional Document Creator</p>
          
          <nav className="tab-nav mt-8 max-w-md mx-auto">
            <button 
              className={`tab-nav-btn ${activeSection === "job" ? "active" : ""}`}
              onClick={() => setActiveSection("job")}
            >
              <div className="flex items-center justify-center gap-2">
                <Briefcase size={18} />
                Job Letter
              </div>
            </button>
            <button 
              className={`tab-nav-btn ${activeSection === "bill" ? "active" : ""}`}
              onClick={() => setActiveSection("bill")}
            >
              <div className="flex items-center justify-center gap-2">
                <Receipt size={18} />
                Bill Creator
              </div>
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {activeSection === "job" ? (
          <div>
            <div className="tab-nav max-w-md mx-auto">
              <button className={`tab-nav-btn ${activeTab === "form" ? "active" : ""}`} onClick={() => setActiveTab("form")}>Form</button>
              <button className={`tab-nav-btn ${activeTab === "preview" ? "active" : ""}`} onClick={() => setActiveTab("preview")}>Preview</button>
            </div>

            <div className="content-grid">
              <div className={`form-wrapper glass-card ${activeTab === "form" ? "block" : "hidden lg:block"}`}>
                <div className="section-title">
                  <Briefcase size={20} />
                  <h2>Fill Details</h2>
                </div>
                <JobLetterForm formData={formData} onChange={setFormData} />
                <div className="flex gap-4 mt-8">
                  <button className="btn btn-secondary flex-1" onClick={handleReset}>Reset</button>
                  <button className="btn btn-primary flex-1" onClick={handleGeneratePDF}>Download PDF</button>
                </div>
              </div>

              <div className={`preview-wrapper glass-card ${activeTab === "preview" ? "block" : "hidden lg:block"}`}>
                <div className="section-title">
                  <Sparkles size={20} />
                  <h2>Live Preview</h2>
                </div>
                <LetterPreview data={formData} />
              </div>
            </div>
          </div>
        ) : (
          <BillCreator 
            data={billData} 
            onChange={setBillData} 
            onDownload={handleGenerateBillPDF} 
          />
        )}
      </main>

      <footer className="app-footer border-t border-white/5 mt-12 py-8 text-center text-slate-500 text-sm">
        <p>&copy; 2026 Jewellery Wala. Crafted with premium design.</p>
      </footer>
    </div>
  );
}
