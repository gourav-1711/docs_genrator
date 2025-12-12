export interface JobLetterData {
  // Company Information
  companyName: string;
  companyAddress: string;
  companyEmail: string;

  // Employee Information
  employeeName: string;
  employeeAddress: string;
  position: string;

  // Job Details
  joiningDate: string;
  monthlySalary: number;
  workingHoursDescription: string;
  workingHoursFrom: string;
  workingHoursTo: string;
  timeFormat: "AM" | "PM";
  weeklyOff1: string;
  weeklyOff2: string;
  probationMonths: number;
  additionalTasks: string;
}

export const defaultFormData: JobLetterData = {
  companyName: "Jewellery Wala",
  companyAddress: "Jhalamand Circle, Jodhpur",
  companyEmail: "jewellerywalaonline@gmail.com",
  employeeName: "",
  employeeAddress: "",
  position: "",
  joiningDate: "",
  monthlySalary: 0,
  workingHoursDescription: "",
  workingHoursFrom: "09:00 AM",
  workingHoursTo: "06:00 PM",
  timeFormat: "AM",
  weeklyOff1: "Sunday",
  weeklyOff2: "",
  probationMonths: 3,
  additionalTasks: "",
};
