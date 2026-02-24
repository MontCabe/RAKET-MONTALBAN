// Sign in form handler
const signInForm = document.getElementById("signInForm");
if (signInForm) {
  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;

    alert(`Welcome back!\n\nEmail: ${email}\n\nYou have been signed in.`);
    signInForm.reset();
  });
}
