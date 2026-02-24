// Forgot password form handler
const forgotPasswordForm = document.getElementById("forgotPasswordForm");
if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("forgotEmail").value;

    alert(
      `Reset link sent!\n\nEmail: ${email}\n\nPlease check your email for further instructions.`,
    );
    forgotPasswordForm.reset();
  });
}
