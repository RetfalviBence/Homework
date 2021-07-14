const CalculateDueDate = require('./CalculateDueDate')

// Error tests
test('input type tests', () => {
  const submitDate = new Date(2021, 6, 13, 10)
  const turnaroundTime = 1

  expect(() => CalculateDueDate("iHaveWrongType", turnaroundTime)).toThrow("submitDate input must be Date!");
  expect(() => CalculateDueDate(submitDate, "iAmNotAnInteger")).toThrow("turn-around input must be Integer!");
})

test('invalid turn-around time', () => {
  const submitDate = new Date(2021, 6, 13, 10)
  const turnaroundTime = -1

  expect(() => CalculateDueDate(submitDate, turnaroundTime)).toThrow("Not valid turn-around time");
})

test('invalid submit date hour', () => {
  const submitDate = new Date(2021, 6, 13, 3)
  const turnaroundTime = 10

  expect(() => CalculateDueDate(submitDate, turnaroundTime)).toThrow("Report allowed in working hours (9AM to 5PM)");
})

test('invalid submit date day', () => {
  const submitDate = new Date(2021, 6, 11, 10)
  const turnaroundTime = 10

  expect(() => CalculateDueDate(submitDate, turnaroundTime)).toThrow("Report allowed in weekdays (Monday to Friday)");
})

// Basic tests
test('resolve in the same day', () => {
  const submitDate = new Date(2021, 6, 12, 10)
  const turnaroundTime = 2

  const actualDate = CalculateDueDate(submitDate, turnaroundTime)
  const expectedDate = new Date(2021, 6, 12, 12)

  expect(actualDate.toString()).toBe(expectedDate.toString());
})

test('resolve in other day', () => {
  const submitDate = new Date(2021, 6, 12, 10)
  const turnaroundTime = 39

  const actualDate = CalculateDueDate(submitDate, turnaroundTime)
  const expectedDate = new Date(2021, 6, 19, 9)
  console.log(actualDate.toString())

  expect(actualDate.toString()).toBe(expectedDate.toString());
})

test('resolve in other year, and month', () => {
  const submitDate = new Date(2021, 11, 31, 9)
  const turnaroundTime = 11

  const actualDate = CalculateDueDate(submitDate, turnaroundTime)
  const expectedDate = new Date(2022, 0, 3, 12)

  expect(actualDate.toString()).toBe(expectedDate.toString());
})