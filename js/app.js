
window.addEventListener('DOMContentLoaded', () => {
    /**
     * 
     * Manipulating the DOM exercise.
     * Exercise programmatically builds navigation,
     * scrolls to anchors from navigation,
     * and highlights section in viewport upon scrolling.
     * 
     * Dependencies: None
     * 
     * JS Version: ES2015/ES6
     * 
     * JS Standard: ESlint
     * 
    */

    /**
     * Define Global Variables
     * 
    */
    const t0 = performance.now();
    const doc = document;
    const navbarList = doc.querySelector('#navbar__list');
    const sections = doc.querySelectorAll('section');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    };
    let observer = new IntersectionObserver(handleIntersect, options);
    let menuLinks = null;
    const toggleMenuBtn = document.querySelector('.hamburger');

    /**
     * End Global Variables
     * Start Helper Functions
     * 
    */

    /**
    * @description Detect if element is in viewport
    * @param {array} entries
    * @param {object} observer
    */
    function handleIntersect([entry]) {
        if (entry.isIntersecting) {
            // do things if element in view
            // Add class 'active' to section when near top of viewport
            handleActiveClass(sections, entry.target);
            // Add class 'active' to link according to section
            let activeLinkIndex = entry.target.getAttribute('data-nav').split(" ")[1] - 1;
            handleActiveClass(menuLinks, menuLinks[activeLinkIndex]);
            return
        }
    }

    /**
    * @description Add active class to element and remove it from its sibilings
    * @param {NodeList} elements
    * @param {Element} activeElement
    */
    const handleActiveClass = (elements, activeElement) => {
        for (let element of elements) {
            element.classList.remove('active');
        }

        activeElement.classList.add('active');
    }

    /**
     * End Helper Functions
     * Begin Main Functions
     * 
    */

    /**
    * @description Build the nav
    *
    */
    const buildMenuNav = () => {
        let navFragment = doc.createDocumentFragment();
        // Check if there are any sections
        if (sections.length > 0) {
            for (let section of sections) {
                // Observe every section with Intersection Observer API
                observer.observe(section);
                // Create list item
                let li = doc.createElement('li');
                // Create menu link
                let menuLink = doc.createElement('a');
                // Add class to menu link
                menuLink.classList.add('menu__link');
                // Add the text of the menu link
                menuLink.textContent = section.getAttribute('data-nav');
                // Set href attribute with the id of the section
                menuLink.setAttribute('href', '#' + section.id);
                // Append the link to the list item
                li.appendChild(menuLink);
                // Append the list item to the fragment
                navFragment.appendChild(li);
            }
        }
        // Append the fragment to the nav bar list
        navbarList.appendChild(navFragment);
    };

    buildMenuNav();

    // Update the menuLinks variable after adding the links to the DOM
    menuLinks = doc.querySelectorAll('.menu__link');
    //The first menu link is set to active class by default
    menuLinks[0].classList.add('active');

    /**
    * @description Click handler for menu links
    * @param {object} e
    */
    const handleMenuLinkClick = (e) => {
        // Event delegation for menu links
        if (e.target && e.target.nodeName.toLowerCase() === 'a') {
            // Prevent default behavior for links
            e.preventDefault();
            // Add active class to the clicked link and remove it from the rest
            handleActiveClass(menuLinks, e.target);
            // Scroll to the section
            doc.querySelector(e.target.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    /**
    * @description Click handler for menu button
    * @param {object} e
    */
    const toggleMenu = (e) => {
        toggleMenuBtn.classList.toggle('is-active');
        navbarList.classList.toggle('responsive');
    };

    /**
     * End Main Functions
     * Begin Events
     *
    */

    // Scroll to section on link click
    navbarList.addEventListener('click', handleMenuLinkClick);
    // Set sections as active
    const t1 = performance.now();
    console.log(`Performance time: ${t1 - t0} milliseconds.`);
    // Toggle Menu on Mobile
    toggleMenuBtn.addEventListener('click', toggleMenu);
});