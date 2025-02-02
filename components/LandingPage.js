import { createSearchForm } from "./SearchForm.js"

export function renderLandingPage(container) {
  const landing = document.createElement("div")
  landing.className = "landing"

  const title = document.createElement("h1")
  title.textContent = "TileShift"

  const missionStatement = document.createElement("p")
  missionStatement.className = "mission-statement"
  missionStatement.textContent = "Read the next tile in the news mosaic."

  const searchForm = createSearchForm()

  landing.appendChild(title)
  landing.appendChild(missionStatement)
  landing.appendChild(searchForm)

  container.innerHTML = ""
  container.appendChild(landing)
}
