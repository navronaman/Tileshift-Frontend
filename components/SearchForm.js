export function createSearchForm() {
    const form = document.createElement("form");
    form.className = "search-form";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Search for news";
    input.className = "search-input";

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Search";
    button.className = "search-button";

    // Create the dropdown list
    const dropdownList = document.createElement("ul");
    dropdownList.className = "autocomplete-list";
    
    const trendingSearches = [
        "birthright citizenship",
        "california fires",
        "canada tariffs",
        "dei plane"
    ];

    // Populate dropdown with trending searches
    trendingSearches.forEach((search) => {
        const listItem = document.createElement("li");
        listItem.textContent = search;
        listItem.className = "autocomplete-item";

        listItem.addEventListener("click", () => {
            input.value = search; // ✅ Fill input but don't submit
            hideDropdown();
            input.focus(); // Keep the input active for user to press "Search"
        });

        dropdownList.appendChild(listItem);
    });

    form.appendChild(input);
    form.appendChild(button);
    form.appendChild(dropdownList);

    function showDropdown() {
        dropdownList.classList.add("show");
    }

    function hideDropdown() {
        dropdownList.classList.remove("show");
    }

    // Show dropdown when input is focused
    input.addEventListener("focus", showDropdown);

    // Hide dropdown when user starts typing
    input.addEventListener("input", hideDropdown);

    // Hide dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!form.contains(e.target)) {
            hideDropdown();
        }
    });

    // Search only when the button is clicked
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
            window.history.pushState(null, "", `?q=${encodeURIComponent(query)}`);
            const event = new Event("popstate");
            window.dispatchEvent(event);
        }
    });

    return form;
}
