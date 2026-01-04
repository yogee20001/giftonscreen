console.log("form.js loaded");

const params = new URLSearchParams(window.location.search);
const section = params.get("section");
const template = params.get("template");

const sectionInput = document.getElementById("section");
const templateInput = document.getElementById("template");

if (sectionInput) sectionInput.value = section || "";
if (templateInput) templateInput.value = template || "";

const form = document.getElementById("giftForm");

if (!form) {
  console.error("giftForm not found");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Submit triggered");

  const mobile = document.getElementById("mobile").value.trim();
  if (!mobile) {
    alert("Mobile number is required");
    return;
  }

  const formData = new FormData(form);
  formData.append("section", section);
  formData.append("template", template);

  try {
    const res = await fetch(
      "https://giftonscreen-worker.giftonscreen.workers.dev/save-draft",
      {
        method: "POST",
        body: formData
      }
    );

    console.log("Status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error(text);
      alert("Server error");
      return;
    }

    const data = await res.json();
    console.log("Response:", data);

    if (data.success) {
      window.location.href = `/preview.html?mobile=${data.mobile}`;
    } else {
      alert("Failed to save draft");
    }
  } catch (err) {
    console.error(err);
    alert("Network error");
  }
});
