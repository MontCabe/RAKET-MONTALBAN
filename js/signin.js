// Sample credentials (for demo purposes)
const VALID_CREDENTIALS = {
  email: "user@example.com",
  password: "Password123",
};

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(message) {
  const errorDiv = document.getElementById("errorMessage");
  if (errorDiv) {
    errorDiv.innerHTML = message;
    errorDiv.style.display = "block";
  } else {
    alert(message);
  }
}

function clearError() {
  const errorDiv = document.getElementById("errorMessage");
  if (errorDiv) {
    errorDiv.innerHTML = "";
    errorDiv.style.display = "none";
  }
}

// Sign in form handler
const signInForm = document.getElementById("signInForm");
if (signInForm) {
  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearError();

    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    // Validation
    if (!email) {
      showError("Email address is required.");
      return;
    }

    if (!validateEmail(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      showError("Password is required.");
      return;
    }

    if (!validatePassword(password)) {
      showError("Password must be at least 6 characters long.");
      return;
    }

    // Check credentials
    if (
      email === VALID_CREDENTIALS.email &&
      password === VALID_CREDENTIALS.password
    ) {
      // Store sign-in state: use sessionStorage for session-only sign-ins
      if (rememberMe) {
        localStorage.setItem("isSignedIn", "true");
        localStorage.setItem("userEmail", email);
        localStorage.setItem("rememberMe", "true");
      } else {
        sessionStorage.setItem("isSignedIn", "true");
        sessionStorage.setItem("userEmail", email);
        localStorage.removeItem("rememberMe");
      }

      // Show success message
      showError(
        "<div style='color: green; background: #d4edda; padding: 10px; border-radius: 5px; border: 1px solid #c3e6cb;'>✓ Sign in successful! Redirecting to home...</div>",
      );

      // Redirect to home page after 1.5 seconds
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      showError(
        "Invalid email or password. Try user@example.com / Password123",
      );
    }

    signInForm.reset();
  });
}
