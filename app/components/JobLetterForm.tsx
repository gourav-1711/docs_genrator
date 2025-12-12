"use client";

import { JobLetterData } from "../types";

interface JobLetterFormProps {
  formData: JobLetterData;
  onChange: (data: JobLetterData) => void;
}

export default function JobLetterForm({
  formData,
  onChange,
}: JobLetterFormProps) {
  const handleChange = (field: keyof JobLetterData, value: string | number) => {
    onChange({ ...formData, [field]: value });
  };

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = ["00", "15", "30", "45"];
  const periods = ["AM", "PM"];

  return (
    <div className="form-container">
      {/* Company Information */}
      <section className="form-section">
        <h2 className="section-title">
          <span className="section-icon">🏢</span>
          Company Information
        </h2>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Enter company name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyAddress">Company Address</label>
            <input
              type="text"
              id="companyAddress"
              value={formData.companyAddress}
              onChange={(e) => handleChange("companyAddress", e.target.value)}
              placeholder="Enter company address"
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="companyEmail">Company Email</label>
            <input
              type="email"
              id="companyEmail"
              value={formData.companyEmail}
              onChange={(e) => handleChange("companyEmail", e.target.value)}
              placeholder="Enter company email"
            />
          </div>
        </div>
      </section>

      {/* Employee Information */}
      <section className="form-section">
        <h2 className="section-title">
          <span className="section-icon">👤</span>
          Employee Information
        </h2>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="employeeName">Employee Name *</label>
            <input
              type="text"
              id="employeeName"
              value={formData.employeeName}
              onChange={(e) => handleChange("employeeName", e.target.value)}
              placeholder="Enter employee name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Position / Designation *</label>
            <input
              type="text"
              id="position"
              value={formData.position}
              onChange={(e) => handleChange("position", e.target.value)}
              placeholder="e.g., Sales Executive"
              required
            />
          </div>
          <div className="form-group full-width">
            <label htmlFor="employeeAddress">Employee Address</label>
            <input
              type="text"
              id="employeeAddress"
              value={formData.employeeAddress}
              onChange={(e) => handleChange("employeeAddress", e.target.value)}
              placeholder="Enter employee address"
            />
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="form-section">
        <h2 className="section-title">
          <span className="section-icon">💼</span>
          Job Details
        </h2>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="joiningDate">Joining Date *</label>
            <input
              type="date"
              id="joiningDate"
              value={formData.joiningDate}
              onChange={(e) => handleChange("joiningDate", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="monthlySalary">Monthly Salary (₹) *</label>
            <input
              type="number"
              id="monthlySalary"
              value={formData.monthlySalary || ""}
              onChange={(e) =>
                handleChange("monthlySalary", parseInt(e.target.value) || 0)
              }
              placeholder="e.g., 25000"
              min="0"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="probationMonths">Probation Period (Months)</label>
            <input
              type="number"
              id="probationMonths"
              value={formData.probationMonths || ""}
              onChange={(e) =>
                handleChange("probationMonths", parseInt(e.target.value) || 0)
              }
              placeholder="e.g., 3"
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="additionalTasks">Additional Tasks</label>
            <input
              type="text"
              id="additionalTasks"
              value={formData.additionalTasks}
              onChange={(e) => handleChange("additionalTasks", e.target.value)}
              placeholder="e.g., Whatsapp Handling"
            />
          </div>
        </div>
      </section>

      {/* Working Hours */}
      <section className="form-section">
        <h2 className="section-title">
          <span className="section-icon">⏰</span>
          Working Hours
        </h2>
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="workingHoursDescription">
              Working Hours Description
            </label>
            <input
              type="text"
              id="workingHoursDescription"
              value={formData.workingHoursDescription}
              onChange={(e) =>
                handleChange("workingHoursDescription", e.target.value)
              }
              placeholder="e.g., 9 hours per day"
            />
          </div>

          {/* From Time Selector */}
          <div className="form-group">
            <label>From Time</label>
            <div className="time-selector">
              <select
                id="workingHoursFromHour"
                value={formData.workingHoursFrom.split(":")[0] || "09"}
                onChange={(e) => {
                  const minutes =
                    formData.workingHoursFrom.split(":")[1] || "00";
                  const period =
                    formData.workingHoursFrom.split(" ")[1] || "AM";
                  handleChange(
                    "workingHoursFrom",
                    `${e.target.value}:${minutes} ${period}`
                  );
                }}
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span className="time-separator">:</span>
              <select
                id="workingHoursFromMinute"
                value={
                  formData.workingHoursFrom.split(":")[1]?.split(" ")[0] || "00"
                }
                onChange={(e) => {
                  const hour = formData.workingHoursFrom.split(":")[0] || "09";
                  const period =
                    formData.workingHoursFrom.split(" ")[1] || "AM";
                  handleChange(
                    "workingHoursFrom",
                    `${hour}:${e.target.value} ${period}`
                  );
                }}
              >
                {minutes.map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
              <select
                id="workingHoursFromPeriod"
                value={formData.workingHoursFrom.split(" ")[1] || "AM"}
                onChange={(e) => {
                  const timePart =
                    formData.workingHoursFrom.split(" ")[0] || "09:00";
                  handleChange(
                    "workingHoursFrom",
                    `${timePart} ${e.target.value}`
                  );
                }}
              >
                {periods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To Time Selector */}
          <div className="form-group">
            <label>To Time</label>
            <div className="time-selector">
              <select
                id="workingHoursToHour"
                value={formData.workingHoursTo.split(":")[0] || "06"}
                onChange={(e) => {
                  const minutes = formData.workingHoursTo.split(":")[1] || "00";
                  const period = formData.workingHoursTo.split(" ")[1] || "PM";
                  handleChange(
                    "workingHoursTo",
                    `${e.target.value}:${minutes} ${period}`
                  );
                }}
              >
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span className="time-separator">:</span>
              <select
                id="workingHoursToMinute"
                value={
                  formData.workingHoursTo.split(":")[1]?.split(" ")[0] || "00"
                }
                onChange={(e) => {
                  const hour = formData.workingHoursTo.split(":")[0] || "06";
                  const period = formData.workingHoursTo.split(" ")[1] || "PM";
                  handleChange(
                    "workingHoursTo",
                    `${hour}:${e.target.value} ${period}`
                  );
                }}
              >
                {minutes.map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
              <select
                id="workingHoursToPeriod"
                value={formData.workingHoursTo.split(" ")[1] || "PM"}
                onChange={(e) => {
                  const timePart =
                    formData.workingHoursTo.split(" ")[0] || "06:00";
                  handleChange(
                    "workingHoursTo",
                    `${timePart} ${e.target.value}`
                  );
                }}
              >
                {periods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="weeklyOff1">Weekly Off (Day 1)</label>
            <select
              id="weeklyOff1"
              value={formData.weeklyOff1}
              onChange={(e) => handleChange("weeklyOff1", e.target.value)}
            >
              {weekDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="weeklyOff2">Weekly Off (Day 2)</label>
            <select
              id="weeklyOff2"
              value={formData.weeklyOff2}
              onChange={(e) => handleChange("weeklyOff2", e.target.value)}
            >
              <option value="">None</option>
              {weekDays.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
