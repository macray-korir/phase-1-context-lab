function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

function createTimeOutEvent(employee, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find((event) => event.date === date);
  const timeOut = employee.timeOutEvents.find((event) => event.date === date);

  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map((event) => event.date);
  const wages = datesWorked.reduce(
    (totalWages, date) => totalWages + wagesEarnedOnDate(employee, date),
    0
  );
  return wages;
}

function calculatePayroll(employees) {
  const totalPayroll = employees.reduce(
    (total, employee) => total + allWagesFor(employee),
    0
  );
  return totalPayroll;
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find((employee) => employee.firstName === firstName);
}

module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll,
  findEmployeeByFirstName,
};
