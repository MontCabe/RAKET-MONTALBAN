// Real-time validation for Create Account Form
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

// Validation functions
function validateFullname(value) {
  if (!value || value.trim().length === 0) {
    return { valid: false, message: "Full name is required" };
  }
  if (value.trim().length < 2) {
    return {
      valid: false,
      message: "Full name must be at least 2 characters",
    };
  }
  if (/[0-9]/.test(value)) {
    return { valid: false, message: "Full name cannot contain numbers" };
  }
  return { valid: true, message: "✓ Full name looks good" };
}

function validateEmail(value) {
  if (!value || value.trim().length === 0) {
    return { valid: false, message: "Email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return {
      valid: false,
      message: "Please enter a valid email address",
    };
  }
  return { valid: true, message: "✓ Email is valid" };
}

function validatePassword(value) {
  if (!value || value.length === 0) {
    return { valid: false, message: "Password is required" };
  }
  if (value.length < 8) {
    return {
      valid: false,
      message: "Password must be at least 8 characters",
    };
  }
  return { valid: true, message: "✓ Password is strong" };
}

function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword || confirmPassword.length === 0) {
    return { valid: false, message: "Please confirm your password" };
  }
  if (password !== confirmPassword) {
    return { valid: false, message: "Passwords do not match" };
  }
  return { valid: true, message: "✓ Passwords match" };
}

// Update field styling and feedback
function updateFieldValidation(
  input,
  errorDiv,
  validDiv,
  isValid,
  message,
) {
  if (isValid) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    errorDiv.textContent = "";
    validDiv.textContent = message;
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    errorDiv.textContent = message;
    validDiv.textContent = "";
  }
}

// Full name validation
if (fullnameInput) {
  fullnameInput.addEventListener("input", function () {
    const validation = validateFullname(this.value);
    updateFieldValidation(
      this,
      document.getElementById("fullnameError"),
      document.getElementById("fullnameValid"),
      validation.valid,
      validation.message,
    );
  });

  fullnameInput.addEventListener("blur", function () {
    if (this.value) {
      const validation = validateFullname(this.value);
      updateFieldValidation(
        this,
        document.getElementById("fullnameError"),
        document.getElementById("fullnameValid"),
        validation.valid,
        validation.message,
      );
    } else {
      this.classList.remove("is-valid", "is-invalid");
      document.getElementById("fullnameError").textContent = "";
      document.getElementById("fullnameValid").textContent = "";
    }
  });
}

// Email validation
if (emailInput) {
  emailInput.addEventListener("input", function () {
    if (this.value) {
      const validation = validateEmail(this.value);
      updateFieldValidation(
        this,
        document.getElementById("emailError"),
        document.getElementById("emailValid"),
        validation.valid,
        validation.message,
      );
    }
  });

  emailInput.addEventListener("blur", function () {
    if (this.value) {
      const validation = validateEmail(this.value);
      updateFieldValidation(
        this,
        document.getElementById("emailError"),
        document.getElementById("emailValid"),
        validation.valid,
        validation.message,
      );
    } else {
      this.classList.remove("is-valid", "is-invalid");
      document.getElementById("emailError").textContent = "";
      document.getElementById("emailValid").textContent = "";
    }
  });
}

// Password validation
if (passwordInput) {
  passwordInput.addEventListener("input", function () {
    if (this.value) {
      const validation = validatePassword(this.value);
      updateFieldValidation(
        this,
        document.getElementById("passwordError"),
        document.getElementById("passwordValid"),
        validation.valid,
        validation.message,
      );

      // Also validate confirm password if it has value
      if (confirmPasswordInput && confirmPasswordInput.value) {
        const confirmValidation = validateConfirmPassword(
          this.value,
          confirmPasswordInput.value,
        );
        updateFieldValidation(
          confirmPasswordInput,
          document.getElementById("confirmPasswordError"),
          document.getElementById("confirmPasswordValid"),
          confirmValidation.valid,
          confirmValidation.message,
        );
      }
    }
  });

  passwordInput.addEventListener("blur", function () {
    if (this.value) {
      const validation = validatePassword(this.value);
      updateFieldValidation(
        this,
        document.getElementById("passwordError"),
        document.getElementById("passwordValid"),
        validation.valid,
        validation.message,
      );
    } else {
      this.classList.remove("is-valid", "is-invalid");
      document.getElementById("passwordError").textContent = "";
      document.getElementById("passwordValid").textContent = "";
    }
  });
}

// Confirm password validation
if (confirmPasswordInput) {
  confirmPasswordInput.addEventListener("input", function () {
    if (this.value && passwordInput) {
      const validation = validateConfirmPassword(
        passwordInput.value,
        this.value,
      );
      updateFieldValidation(
        this,
        document.getElementById("confirmPasswordError"),
        document.getElementById("confirmPasswordValid"),
        validation.valid,
        validation.message,
      );
    }
  });

  confirmPasswordInput.addEventListener("blur", function () {
    if (this.value && passwordInput) {
      const validation = validateConfirmPassword(
        passwordInput.value,
        this.value,
      );
      updateFieldValidation(
        this,
        document.getElementById("confirmPasswordError"),
        document.getElementById("confirmPasswordValid"),
        validation.valid,
        validation.message,
      );
    } else {
      this.classList.remove("is-valid", "is-invalid");
      document.getElementById("confirmPasswordError").textContent = "";
      document.getElementById("confirmPasswordValid").textContent = "";
    }
  });
}

// Form handlers
const createAccountForm = document.getElementById("createAccountForm");
if (createAccountForm) {
  createAccountForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
      document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert(
      `Account created successfully!\n\nName: ${fullname}\nEmail: ${email}\n\nWelcome to RAKET!`,
    );
    createAccountForm.reset();
  });
}
