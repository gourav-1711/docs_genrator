"use client";

import { JobLetterData } from "../types";
import { numberToWords, formatCurrency } from "../utils/numberToWords";

interface LetterPreviewProps {
  data: JobLetterData;
}

export default function LetterPreview({ data }: LetterPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "_________";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "_________";
    // Time is already in "09:00 AM" format
    return timeString;
  };

  return (
    <div className="letter-preview">
      <div className="letter-border">
        <div className="letter-content">
          {/* Header */}
          <div className="letter-header">
            <h1 className="company-name">
              {data.companyName || "Company Name"}
            </h1>
            <p className="company-address">
              {data.companyAddress || "Company Address"}
            </p>
            <p className="company-email">
              Email: {data.companyEmail || "company@email.com"}
            </p>
            <div className="header-line"></div>
          </div>

          {/* To Section */}
          <div className="letter-to">
            <p>To,</p>
            <p>
              Name of Employee: {data.employeeName || "_____________________"}
            </p>
            <p>
              Address: {data.employeeAddress || "_____________________________"}
            </p>
          </div>

          {/* Subject */}
          <h2 className="letter-subject">
            Subject: Appointment & Joining Confirmation Letter
          </h2>

          {/* Body */}
          <div className="letter-body">
            <p>Dear Mr/Ms: {data.employeeName || "_______________"}</p>

            <p>
              We are pleased to offer the position of{" "}
              {data.position || "____________"} at {data.companyName}. You are
              required to join on {formatDate(data.joiningDate)}.
            </p>

            {data.additionalTasks && (
              <p>Any additional tasks: {data.additionalTasks}</p>
            )}

            <p>
              Your monthly salary will be Rs.{" "}
              {data.monthlySalary > 0
                ? formatCurrency(data.monthlySalary)
                : "________"}{" "}
              (in words:{" "}
              {data.monthlySalary > 0
                ? numberToWords(data.monthlySalary)
                : "____________"}
              )
            </p>

            {data.workingHoursDescription && (
              <p>
                Your working hours will (in words:{" "}
                {data.workingHoursDescription}).
              </p>
            )}

            <p>
              Your working hours will: From: {formatTime(data.workingHoursFrom)}{" "}
              to {formatTime(data.workingHoursTo)}
            </p>

            <p>
              Weekly Off: {data.weeklyOff1 || "____________"}
              {data.weeklyOff2 && ` | Weekly Off: ${data.weeklyOff2}`}
            </p>

            <p>
              You will be under your probation period of{" "}
              {data.probationMonths || "_"} months from date of joining.
            </p>
          </div>

          {/* Closing */}
          <div className="letter-closing">
            <p>Sincerely,</p>
            <p>Authorized Signatory</p>
            <p>{data.companyName} _______________</p>
          </div>
        </div>
      </div>
    </div>
  );
}
