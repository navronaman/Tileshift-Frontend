export function createSearchForm() {
    const form = document.createElement("form")
    form.className = "search-form"
  
    const input = document.createElement("input")
    input.type = "text"
    input.placeholder = "Search for news"
    input.className = "search-input"
  
    const button = document.createElement("button")
    button.type = "submit"
    button.textContent = "Search"
    button.className = "search-button"
  
    form.appendChild(input)
    form.appendChild(button)
  
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const query = input.value.trim()
      if (query) {
        window.history.pushState(null, "", `?q=${encodeURIComponent(query)}`)
        const event = new Event("popstate")
        window.dispatchEvent(event)
      }
    })
  
    return form
  }
  
  