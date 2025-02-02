import { createSearchForm } from "./SearchForm.js"
import { fetchBiasData } from "./FetchData.js"

export async function renderSearchResults(container, query) {
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

  try {
    const results = await fetchBiasData(query); // fetchBiasData is not defined
    console.log(results);

    function renderResults(viewType) {
        resultsContainer.innerHTML = "";
        resultsContainer.className = viewType === "tile" ? "results-grid" : "results-list";
  
        results.forEach((result) => {
          const resultElement = document.createElement("div");
          resultElement.href = result.link; // link 
          resultElement.target = "_blank";
          resultElement.className = viewType === "tile" ? "tile" : "list-item";
          resultElement.style.textDecoration = "none";
  
          resultElement.innerHTML = `
                    <h2>${result.headline}</h2>
                    <p class="provider"><>${result.Provider}</p>
                    <p class="summary">${result.summary}</p>
                    <div class="factors">
                        <span>Bias: ${result.biasFactor}</span>
                        <span>Reliability: ${result.reliabilityFactor}</span>
                    </div>
                `;
  
          resultsContainer.appendChild(resultElement);
        });        
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
} catch (error) {
    console.error("Rendering Error:", error.message);

    // Create an error message box inside the current page
    const errorContainer = document.createElement("div");
    errorContainer.className = "error-container";
    errorContainer.innerHTML = `
        <h1>Error Occurred</h1>
        <p>${error.message}</p>
        <button class="retry-button">Retry</button>
    `;

    container.appendChild(errorContainer);

    document.querySelector(".retry-button").addEventListener("click", () => {
        location.reload();
    });
}
}

