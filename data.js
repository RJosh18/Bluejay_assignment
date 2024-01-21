const XLSX = require("xlsx");
const workbook = XLSX.readFile("Data.xlsx");
const sheet_name_list = workbook.SheetNames;
const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const employees = xlData.filter((employee) => {
  // a) who has worked for 7 consecutive days.
  const consecutiveDays = employee["Timecard Hours (as Time)"].split(":");
  if (consecutiveDays[0] >= 7) {
    return true;
  }

  // b) who have less than 10 hours of time between shifts but greater than 1 hour
  const timeBetweenShifts = employee["time"] - employee["timeout"];
  if (timeBetweenShifts > 1 && timeBetweenShifts < 10) {
    return true;
  }

  // c) Who has worked for more than 14 hours in a single shift
  const singleShiftHours = employee["Timecard Hours (as Time)"].split(":");
  if (singleShiftHours[0] > 14) {
    return true;
  }

  return false;
});

// Print the name and position of the employees who meet the criteria to the console.
employees.forEach((employee) => {
  console.log(
    `Name: ${employee["Employee Name"]}, Position: ${employee["Position ID"]}`
  );
  console.log(`Position Status: ${employee["Position Status"]}`);
});
