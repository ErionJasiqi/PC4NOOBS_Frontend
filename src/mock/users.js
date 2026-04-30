// Mock "database"
export const users = [
  {
    id: 1,
    username: "John Doe",
    email: "john.doe@example.com",
    password: "1234"
  }
]

// Helper functions (like fake backend)
export function findUserByEmail(email) {
  return users.find(u => u.email === email)
}

export function createUser(user) {
  const newUser = {
    id: Date.now(),
    ...user
  }
  users.push(newUser)
  return newUser
}