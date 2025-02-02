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

    function getBiasColor(biasFactor) {
        const minBias = -38;
        const maxBias = 38;
    
        if (biasFactor < minBias) biasFactor = minBias;
        if (biasFactor > maxBias) biasFactor = maxBias;
    
        const biasRatio = (biasFactor - minBias) / (maxBias - minBias); // Normalize between 0 and 1
    
        // Interpolating between Blue (-38), Gray (0), and Red (38)
        const red = Math.round(255 * biasRatio);
        const blue = Math.round(255 * (1 - biasRatio));
        const green = Math.round(255 * (1 - Math.abs(biasRatio - 0.5) * 2)); // Keep green low

        console.log(`rgb(${red}, ${green}, ${blue})`);
    
        return `rgb(${red}, ${green}, ${blue})`; // Returns a color from blue → gray → red
    }
    

    function renderResults(viewType) {
        resultsContainer.innerHTML = "";
        resultsContainer.className = viewType === "tile" ? "results-grid" : "results-list";
  
        results.forEach((result) => {

          const resultElement = document.createElement("div");
          resultElement.href = result.link; // link 
          resultElement.target = "_blank";
          resultElement.className = viewType === "tile" ? "tile" : "list-item";
          resultElement.style.textDecoration = "none";

          const hoverColor = getBiasColor(result.biasFactor);
          console.log(`BiasFactor: ${result.biasFactor}, Hover Color: ${hoverColor}`);  
          resultElement.style.transition = "transform 0.2s ease, background-color 0.3s ease";  
          resultElement.addEventListener("mouseenter", () => {
              resultElement.style.backgroundColor = hoverColor; 
              resultElement.style.transform = "scale(1.03)";
          });  
          resultElement.addEventListener("mouseleave", () => {
              resultElement.style.backgroundColor = "var(--navy-700)";
              resultElement.style.transform = "scale(1)";
          });
        
  
          resultElement.innerHTML = `
                <h2>${result.headline}</h2>
                    <p class="provider">
                        <a href="${result.link}" target="_blank" class="provider-link">${result.Provider}</a>
                    </p>
                    <p class="summary">${result.summary}</p>
                    <div class="factors">
                        <span>Bias: ${result.biasFactor}</span>
                        <span>Reliability: ${result.reliabilityFactor}</span>
                    </div>                `
                ;
  
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

