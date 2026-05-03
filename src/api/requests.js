const backend = import.meta.env.VITE_ENDPOINT;

// Generische Request-Funktion.
async function request(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  const response = await fetch(backend + url, {
    headers,
    credentials: "include",
    ...options,
  });

  if (response.ok) {
    return response.json();
  } else if (response.status === 422) {
    const data = await response.json();

    throw new ValidationError("validation failed", data.errors);
  } else {
    throw new Error(`Server error: ${await response.text()}`);
  }
}

class ValidationError {
  message;
  errors;

  constructor(message, errors) {
    this.message = message;
    this.errors = errors;
  }
}

export async function loginUser(email, password) {
  try {
    const response = await request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    return response.userId;
  } catch (error) {
    throw new Error("Failed to login", {
      cause: error,
    });
  }
}

export async function logoutUser() {
  try {
    const response = await request("/logout", {
      method: "POST",
    });
    return response;
  } catch (error) {
    throw new Error("Logout failed", {
      cause: error,
    });
  }
}

export async function getAccount(userId) {
  try {
    const response = await request(`/accounts/${userId}`, {
      method: "GET",
    });
    return response[0];
  } catch (error) {
    throw new Error("Failed to login", {
      cause: error,
    });
  }
}

export async function registerUser(username, email, password, address, city, phone) {
  try {
    const response = await request("/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password, address, city, phone }),
    });
    return response;
  } catch (error) {
    throw new Error("Failed to register", {
      cause: error,
    });
  }
}

export async function getComponents() {
  const response = await request("/components", { method: "GET" });
  return response;
}

export async function getRecommendations(activity, budget) {
  const params = new URLSearchParams();
  if (activity) params.set("activity", activity);
  if (budget) params.set("budget", String(budget));
  const response = await request(`/recommendations?${params}`, { method: "GET" });
  return response;
}

export async function createPaymentIntent(amountChf) {
  const response = await request("/payment/create-intent", {
    method: "POST",
    body: JSON.stringify({ amountChf }),
  });
  return response;
}
