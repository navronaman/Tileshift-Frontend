import { renderLandingPage } from "./components/LandingPage.js"
// Imports the function renderLandingPage from the LandingPage.js file
import { renderSearchResults } from "./components/SearchResults.js"
// Imports the function renderSearchResults from the SearchResults.js file

const app = document.getElementById("app")
// Creates a constant variable app and assigns it the value of the element with the id of app

function renderApp() {
  const searchParams = new URLSearchParams(window.location.search)
  const query = searchParams.get("q")

  if (query) {
    renderSearchResults(app, query)
  } else {
    renderLandingPage(app)
  } 
}

renderApp()

window.addEventListener("popstate", renderApp)

