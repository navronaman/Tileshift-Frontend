import { createSearchForm } from "./SearchForm.js"

export function renderLandingPage(container) {
  const landing = document.createElement("div")
  landing.className = "landing"

  const title = document.createElement("h1")
  title.textContent = "TileShift"

  const searchForm = createSearchForm()

  landing.appendChild(title)
  landing.appendChild(searchForm)

  container.innerHTML = ""
  container.appendChild(landing)
}

