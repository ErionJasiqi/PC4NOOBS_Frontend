const backend = "https://apiv1.erion-jasiqi.bbzwinf.ch";

// Generische Request-Funktion.
async function request(url, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  const response = await fetch(backend + url, { headers, ...options });

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
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAccount(userId) {
  try {
    const response = await request(`/accounts/${userId}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function test() {
  try {
    const response = await request("/tester", {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
