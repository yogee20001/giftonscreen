const container = document.getElementById("sections");

sections.forEach(section => {
  const card = document.createElement("div");
  card.className = "section-card";

  card.innerHTML = `
    <img src="${section.cover}" alt="${section.title}">
    <h2>${section.title}</h2>
  `;

  card.onclick = () => {
    window.location.href = `/sections/${section.id}.html`;
  };

  container.appendChild(card);
});
