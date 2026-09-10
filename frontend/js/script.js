/* ================================
   MEMORYCRAFTS ONLINE
   CUSTOM JAVASCRIPT
================================ */


/* ================================
   MOBILE SEARCH TOGGLE
================================ */

const mobileSearch =
    document.querySelector(".mobile-search");

const mobileSearchBtn =
    document.querySelector(".mobile-search-btn");


if (mobileSearch && mobileSearchBtn) {

    mobileSearchBtn.addEventListener("click", function () {

        /* Open / close search */
        const isActive =
            mobileSearch.classList.toggle("active");


        /* Update accessibility state */
        mobileSearchBtn.setAttribute(
            "aria-expanded",
            isActive
        );


        /* Focus search input when opened */
        if (isActive) {

            const searchInput =
                mobileSearch.querySelector("input");

            if (searchInput) {
                searchInput.focus();
            }

        }

    });

}