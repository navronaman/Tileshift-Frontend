import { createSearchForm } from "./SearchForm.js"

const mockResults = [
  {
    id: 1,
    provider: "CNN",
    headline: "Breaking News",
    summary: "This is a summary of the breaking news",
    biasFactor: -5,
    reliabilityFactor: 50,
  },
  {
    id: 2,
    provider: "BBC",
    headline: "World News",
    summary: "This is a summary of world news",
    biasFactor: 2,
    reliabilityFactor: 55,
  },
  {
    id: 3,
    provider: "Reuters",
    headline: "Financial Update",
    summary: "This is a summary of financial news",
    biasFactor: 0,
    reliabilityFactor: 60,
  },
  {
    id: 4,
    provider: "Al Jazeera",
    headline: "Middle East Report",
    summary: "This is a summary of Middle East news",
    biasFactor: 10,
    reliabilityFactor: 45,
  },
  {
    id: 5,
    provider: "Fox News",
    headline: "Political Analysis",
    summary: "This is a summary of political analysis",
    biasFactor: 30,
    reliabilityFactor: 40,
  },
  {
    id: 6,
    provider: "Associated Press",
    headline: "Technology Trends",
    summary: "This is a summary of technology trends",
    biasFactor: -2,
    reliabilityFactor: 58,
  },
]

export function renderSearchResults(container, query) {
  container.innerHTML = ""

  const header = document.createElement("header")
  header.className = "header"
  const headerContent = document.createElement("div")
  headerContent.className = "header-content container"

  const logo = document.createElement("a")
  logo.href = "/"
  logo.className = "logo"
  logo.textContent = "TileShift"

  const searchForm = createSearchForm()

  headerContent.appendChild(logo)
  headerContent.appendChild(searchForm)
  header.appendChild(headerContent)

  const main = document.createElement("main")
  main.className = "main container"

  const resultsHeader = document.createElement("div")
  resultsHeader.className = "results-header"

  const resultsTitle = document.createElement("h1")
  resultsTitle.textContent = `Search Results for "${query}"`

  const viewToggle = document.createElement("div")
  viewToggle.className = "view-toggle"

  const tileButton = document.createElement("button")
  tileButton.textContent = "Tile"
  tileButton.className = "active"

  const listButton = document.createElement("button")
  listButton.textContent = "List"

  viewToggle.appendChild(tileButton)
  viewToggle.appendChild(listButton)

  resultsHeader.appendChild(resultsTitle)
  resultsHeader.appendChild(viewToggle)

  const resultsContainer = document.createElement("div")
  resultsContainer.className = "results-grid"

  function renderResults(viewType) {
    resultsContainer.innerHTML = ""
    resultsContainer.className = viewType === "tile" ? "results-grid" : "results-list"

    mockResults.forEach((result) => {
      const resultElement = document.createElement("div")
      resultElement.className = viewType === "tile" ? "tile" : "list-item"

      resultElement.innerHTML = `
                <h2>${result.headline}</h2>
                <p class="provider">${result.provider}</p>
                <p class="summary">${result.summary}</p>
                <div class="factors">
                    <span>Bias: ${result.biasFactor}</span>
                    <span>Reliability: ${result.reliabilityFactor}</span>
                </div>
            `

      resultsContainer.appendChild(resultElement)
    })
  }

  renderResults("tile")

  tileButton.addEventListener("click", () => {
    tileButton.classList.add("active")
    listButton.classList.remove("active")
    renderResults("tile")
  })

  listButton.addEventListener("click", () => {
    listButton.classList.add("active")
    tileButton.classList.remove("active")
    renderResults("list")
  })

  main.appendChild(resultsHeader)
  main.appendChild(resultsContainer)

  container.appendChild(header)
  container.appendChild(main)
}

