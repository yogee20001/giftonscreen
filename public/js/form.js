console.log("form.js loaded");

document.addEventListener("DOMContentLoaded", () => {
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
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submit triggered");

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

      if (!res.ok) {
        const text = await res.text();
        console.error("Worker error:", text);
        alert("Server error");
        return;
      }

      const data = await res.json();
      console.log("Worker response:", data);

      if (data.success && data.mobile) {
        window.location.href =
          `/preview.html?mobile=${encodeURIComponent(data.mobile)}`;
      } else {
        alert("Failed to save draft");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error");
    }
  });
});
