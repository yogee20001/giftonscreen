const params = new URLSearchParams(window.location.search);
const sectionId = document.body.dataset.section;

const container = document.getElementById("templates");

if (!templates[sectionId]) {
  container.innerHTML = "<p>No templates available.</p>";
} else {
  templates[sectionId].forEach(template => {
    const card = document.createElement("div");
    card.className = "template-card";

    card.innerHTML = `
      <img src="${template.cover}" alt="${template.title}">
      <h3>${template.title}</h3>
      <button>Select</button>
    `;

    card.querySelector("button").onclick = () => {
      window.location.href =
        `/template.html?section=${sectionId}&template=${template.id}`;
    };

    container.appendChild(card);
  });
}
