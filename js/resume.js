// Resume rendering and interaction script
const resumes = [
  {
    name: "Juan Dela Cruz",
    title: "UI/UX Designer",
    level: "Entry Level",
    type: "Full-Time",
    category: "Technology",
    age: 24,
    gender: "Male",
    barangay: "San Isidro",
    experience: [
      "2 years as junior designer",
      "worked on mobile apps",
      "led 3 design projects",
    ],
    skills: ["Figma", "Web Design", "Prototyping"],
    certifications: ["Google UX Certificate"],
  },
  {
    name: "Maria Santos",
    title: "Registered Nurse",
    level: "Mid Level",
    type: "Full-Time",
    category: "Healthcare",
    age: 29,
    gender: "Female",
    barangay: "Poblacion",
    experience: [
      "5 years hospital experience",
      "patient care specialist",
    ],
    skills: ["Patient Care", "Medical Records"],
    certifications: ["PRC Licensed Nurse"],
  },
  {
    name: "Kevin Tan",
    title: "Software Engineer",
    level: "Senior Level",
    type: "Full-Time",
    category: "Technology",
    age: 32,
    gender: "Male",
    barangay: "Malinis",
    experience: [
      "8 years full stack development",
      "team lead for 4 years",
    ],
    skills: ["React", "NodeJS", "MongoDB"],
    certifications: ["AWS Certified Developer"],
  },
];

// duplicate more for scroll testing
for (let i = 0; i < 6; i++) {
  resumes.push({ ...resumes[0] });
}

let currentPage = 1;
const perPage = 4;
let selectedCategory = "all";
let searchText = "";

const list = document.getElementById("resumeList");
const details = document.getElementById("detailsContent");

// render cards
function renderResumes() {
  list.innerHTML = "";

  const filtered = resumes.filter((r) => {
    const matchCategory =
      selectedCategory === "all" || r.category === selectedCategory;
    const matchSearch =
      r.name.toLowerCase().includes(searchText) ||
      r.title.toLowerCase().includes(searchText);
    return matchCategory && matchSearch;
  });

  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  paginated.forEach((resume) => {
    const card = document.createElement("div");
    card.className = "resume-card";

    card.innerHTML = `
            <div class="d-flex">
                <div class="resume-icon">
                    <i class="bi bi-person"></i>
                </div>
                <div class="ms-3 w-100">
                    <h5 class="mb-1">${resume.name}</h5>
                    <p class="fw-medium mb-1">${resume.title}</p>
                    <span class="badge badge-entry">${resume.level}</span>
                    <span class="badge badge-fulltime">${resume.type}</span>
                </div>
            </div>
        `;

    // when clicking card update right panel
    card.addEventListener("click", function () {
      document
        .querySelectorAll(".resume-card")
        .forEach((c) => c.classList.remove("active-card"));
      card.classList.add("active-card");

      updateDetails(resume);

      card.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    list.appendChild(card);
  });

  // auto-select first card on the page and show details
  if (paginated.length > 0) {
    const firstCard = list.querySelector(".resume-card");
    if (firstCard) {
      document
        .querySelectorAll(".resume-card")
        .forEach((c) => c.classList.remove("active-card"));
      firstCard.classList.add("active-card");
      updateDetails(paginated[0]);
    }
  } else {
    // clear details if no resumes
    details.innerHTML = '<p class="text-muted">No resumes found.</p>';
  }
}

// update right panel layout
function updateDetails(resume) {
  // animate out
  details.classList.add("fade-out");

  setTimeout(() => {
    details.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex">
                <div class="resume-icon-large me-3">
                    <i class="bi bi-person"></i>
                </div>
                <div>
                    <h2 class="mb-1">${resume.name}</h2>
                    <h5 class="text-muted">${resume.title}</h5>
                </div>
            </div>

            <button class="btn btn-save-big">
                <i class="bi bi-heart"></i> Save
            </button>
        </div>

        <div class="mt-4">
            <h5 class="section-title">Basic Information:</h5>
            <p>Age: ${resume.age}</p>
            <p>Gender: ${resume.gender}</p>
            <p>Barangay: ${resume.barangay}</p>
        </div>

        <div class="mt-4">
            <h5 class="section-title">Experiences:</h5>
            ${resume.experience.map((e) => `<p>${e}</p>`).join("")}
        </div>

        <div class="row mt-4">
            <div class="col-md-6">
                <h5 class="section-title">Skills:</h5>
                <ul class="custom-list">
                    ${resume.skills.map((s) => `<li>${s}</li>`).join("")}
                </ul>
            </div>
            <div class="col-md-6">
                <h5 class="section-title">Licenses and Certifications:</h5>
                <ul class="custom-list">
                    ${resume.certifications.map((c) => `<li>${c}</li>`).join("")}
                </ul>
            </div>
        </div>

        <div class="text-center mt-5">
            <button class="btn btn-green-lg">See Resume</button>
        </div>
        `;

    details.classList.remove("fade-out");
  }, 200);
}

// filters
document.querySelectorAll(".tag").forEach((tag) => {
  tag.addEventListener("click", function () {
    document
      .querySelectorAll(".tag")
      .forEach((t) => t.classList.remove("active"));
    tag.classList.add("active");
    selectedCategory = tag.dataset.category;
    currentPage = 1;
    renderResumes();
  });
});

// search
const searchInput = document.querySelector(".search-input input");
if (searchInput) {
  searchInput.addEventListener("input", function (e) {
    searchText = e.target.value.toLowerCase();
    currentPage = 1;
    renderResumes();
  });
}

// pagination
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn) {
  prevBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      renderResumes();
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", function () {
    currentPage++;
    renderResumes();
  });
}

renderResumes();
