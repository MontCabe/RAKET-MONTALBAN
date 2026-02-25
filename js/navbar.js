// Navbar sign-in state manager
function updateNavbar() {
  const isSignedIn = localStorage.getItem("isSignedIn") === "true";
  const userEmail = localStorage.getItem("userEmail");
  const navMenu = document.getElementById("navMenu");

  if (!navMenu) return;

  // Find the navbar buttons container
  const authSection = navMenu.querySelector(".ms-auto");

  if (isSignedIn && userEmail) {
    // User is signed in - render desktop or mobile friendly layout
    const userName = userEmail.split("@")[0]; // Extract username from email
    const isMobile = window.matchMedia("(max-width: 991px)").matches;

    if (isMobile) {
      // In the collapsed mobile navbar show compact list items
      authSection.innerHTML = `
        <ul class="navbar-nav w-100">
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center" href="#" id="mobileNotifications">
              <i class="bi bi-bell-fill me-2"></i>
              <span>Notifications</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center" href="#" id="mobileProfile">
              <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2f6b47&color=fff&size=32" class="profile-avatar me-2" alt="Profile" />
              <span>${userName}</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-danger" href="#" id="mobileLogout"><i class="bi bi-box-arrow-right me-2"></i>Sign out</a>
          </li>
        </ul>
      `;

      // Mobile logout handler
      const mobileLogout = document.getElementById("mobileLogout");
      if (mobileLogout) {
        mobileLogout.addEventListener("click", function (e) {
          e.preventDefault();
          if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("isSignedIn");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("rememberMe");
            window.location.href = "index.html";
          }
        });
      }
    } else {
      // Desktop layout: avatar + username + dropdown
      authSection.innerHTML = `
        <div class="d-lg-flex align-items-center mt-3 mt-lg-0">
          <button class="btn btn-notification me-lg-3 position-relative" id="notificationBtn">
            <i class="bi bi-bell-fill"></i>
            <span class="notification-badge">3</span>
          </button>
          <div class="dropdown">
            <button class="btn btn-profile" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2f6b47&color=fff&size=32" 
                   alt="Profile" class="profile-avatar" />
              <span class="d-none d-lg-inline profile-username">${userName}</span>
              <i class="bi bi-chevron-down ms-1 d-none d-lg-inline profile-arrow"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-end profile-dropdown" aria-labelledby="profileDropdown">
              <li class="dropdown-header">
                <div class="d-flex align-items-center">
                  <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=2f6b47&color=fff&size=48" 
                       alt="Profile" class="profile-avatar-large me-3" />
                  <div>
                    <div class="fw-bold">${userName}</div>
                    <small class="text-muted">${userEmail}</small>
                  </div>
                </div>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i>Profile</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-bookmark me-2"></i>Saved Resumes</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-star me-2"></i>My reviews</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i>Settings</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-question-circle me-2"></i>Help</a></li>
              <li><a class="dropdown-item" href="#"><i class="bi bi-shield-lock me-2"></i>Privacy Center</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" id="logoutBtn" href="#"><i class="bi bi-box-arrow-right me-2"></i>Sign out</a></li>
            </ul>
          </div>
        </div>
      `;

      // Desktop logout handler
      const logoutBtn = document.getElementById("logoutBtn");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", function (e) {
          e.preventDefault();
          if (confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("isSignedIn");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("rememberMe");
            window.location.href = "index.html";
          }
        });
      }
    }
  } else {
    // User is not signed in - show sign in and create account buttons
    authSection.innerHTML = `
      <a href="create-account.html" class="nav-link create-link me-lg-3">Create Account</a>
      <a href="signin.html" class="btn btn-signin">Sign In</a>
    `;
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateNavbar);

// Also check and update if user returns from another page
window.addEventListener("focus", updateNavbar);
