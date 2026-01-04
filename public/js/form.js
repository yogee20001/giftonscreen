// ================================
// FORM.JS – TASK 3 (FINAL)
// ================================

// Confirm JS loaded
console.log("form.js loaded");

// Read URL params
const params = new URLSearchParams(window.location.search);
const section = params.get("section");
const template = params.get("template");

// Set hidden fields
document.getElementById("section").value = section || "";
document.getElementById("template").value = template || "";

// Get form
const form = document.getElementById("giftForm");

if (!form) {
  console.error("giftForm not found");
}

// Submit handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Form submit triggered");

  const mobile = document.getElementById("mobile").value.trim();

  if (!mobile) {
    alert("Mobile number is required");
    return;
  }

  // Build form data
  const formData = new FormData();
  formData.append("section", section);
  formData.append("template", template);
  formData.append("mobile", mobile);
  formData.append("name", document.getElementById("name").value);
  formData.append("message", document.getElementById("message").value);

  const photosInput = document.getElementById("photos");
  for (let i = 0; i < photosInput.files.length; i++) {
    formData.append("photos", photosInput.files[i]);
  }

  const voiceInput = document.getElementById("voice");
  if (voiceInput.files[0]) {
    formData.append("voice", voiceInput.files[0]);
  }

  const videoInput = document.getElementById("video");
  if (videoInput.files[0]) {
    formData.append("video", videoInput.files[0]);
  }

  try {
