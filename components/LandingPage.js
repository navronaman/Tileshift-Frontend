import { createSearchForm } from "./SearchForm.js"

export function renderLandingPage(container) {
  const landing = document.createElement("div")
  landing.className = "landing"

  const logo = document.createElement("img");
  logo.src = "public/tileshift-logo.png"; // Adjust path if necessary
  logo.alt = "TileShift Logo";
  logo.className = "tileshift-logo"; // Add a CSS class for styling

  const title = document.createElement("h1")
  title.textContent = "TileShift"

  const missionStatement = document.createElement("p")
  missionStatement.className = "mission-statement"
  missionStatement.textContent = "Read the next tile in the news mosaic."

  const searchForm = createSearchForm()

  landing.appendChild(logo)
  landing.appendChild(title)
  landing.appendChild(missionStatement)
  landing.appendChild(searchForm)

  container.innerHTML = ""
  container.appendChild(landing)
}
