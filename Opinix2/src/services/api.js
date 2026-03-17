const API_BASE = "http://localhost:8080/api";

async function handleResponse(response, defaultMessage) {
  if (!response.ok) {
    let errorMessage = defaultMessage;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || defaultMessage;
    } catch {
      // ignore JSON parse failure
    }

    throw new Error(errorMessage);
  }

  return response.json();
}

// authentication shi
export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response, "Login failed");
}

export async function registerUser(email, password, fullName, role) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, fullName, role }),
  });

  return handleResponse(response, "Registration failed");
}

// user stuff
export async function getAllUsers() {
  const response = await fetch(`${API_BASE}/users`);
  return handleResponse(response, "Failed to fetch users");
}

export async function getUserById(id) {
  const response = await fetch(`${API_BASE}/users/${id}`);
  return handleResponse(response, "Failed to fetch user");
}

export async function getCurrentUser(email) {
  const response = await fetch(
    `${API_BASE}/users/me?email=${encodeURIComponent(email)}`
  );
  return handleResponse(response, "Failed to fetch current user");
}

export async function updateUserRole(id, role) {
  const response = await fetch(`${API_BASE}/users/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  });

  return handleResponse(response, "Failed to update role");
}

export async function updateUserActiveStatus(id, active) {
  const response = await fetch(`${API_BASE}/users/${id}/active`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ active }),
  });

  return handleResponse(response, "Failed to update active status");
}

// polls and such
export async function importPoll(file, title = "Imported Poll", source = "GOOGLE_FORMS", ownerEmail) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("source", source);
  formData.append("ownerEmail", ownerEmail);

  const response = await fetch(`${API_BASE}/polls/import`, {
    method: "POST",
    body: formData,
  });

  return handleResponse(response, "Import failed");
}

export async function analyzePoll(pollId) {
  const response = await fetch(`${API_BASE}/polls/${pollId}/analyze`, {
    method: "POST",
  });

  return handleResponse(response, "Analysis failed");
}

export async function getPolls() {
  const response = await fetch("http://localhost:8080/api/polls");

  if (!response.ok) {
    throw new Error("Failed to fetch polls");
  }

  return response.json();
}

export async function getMyPolls(email) {
  const response = await fetch(`${API_BASE}/polls/my?email=${encodeURIComponent(email)}`);
  return handleResponse(response, "Failed to fetch user polls");
}

// health checking chuds
export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health/check`);
  return handleResponse(response, "Health check failed");
}