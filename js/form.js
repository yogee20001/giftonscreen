console.log("form.js loaded");

const params = new URLSearchParams(window.location.search);
document.getElementById("section").value = params.get("section");
document.getElementById("template").value = params.get("template");

document.getElementById("giftForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("section", document.getElementById("section").value);
  formData.append("template", document.getElementById("template").value);
  formData.append("mobile", document.getElementById("mobile").value);
  formData.append("name", document.getElementById("name").value);
  formData.append("message", document.getElementById("message").value);

  [...document.getElementById("photos").files].forEach(f =>
    formData.append("photos", f)
  );

  if (document.getElementById("voice").files[0])
    formData.append("voice", document.getElementById("voice").files[0]);

  if (document.getElementById("video").files[0])
    formData.append("video", document.getElementById("video").files[0]);

  const res = await fetch(
    "https://giftonscreen-worker.giftonscreen.workers.dev/save-draft",
    { method: "POST", body: formData }
  );

  const data = await res.json();

  if (data.success) {
    window.location.href = `/preview.html?mobile=${data.mobile}`;
  } else {
    alert("Error saving draft");
  }
});
