// content.js
(function() {
    // DOI regex pattern
    const DOI_REGEX = /\b(10\.[0-9]{4,}(?:\.[0-9]+)*\/(?:(?!["&\'<>])\S)+)\b/;
    
    // Prioritized list of Sci-Hub URLs
    const SCIHUB_URLS = [
      "https://sci-hub.se/",
      "https://www.sci-hub.red/",
      "https://sci-hub.st/",
      "https://sci-hub.ru/",
      "https://sci-hub.ee/",
      "https://sci-hub.is/",
      "https://sci-hub.shop/",
      "https://sci-hub.wf/"
    ];

    // Asynchronous function to check each URL and redirect
    async function findWorkingSciHubUrl(doi) {
      console.log("Checking for a working Sci-Hub URL...");
      
      for (const url of SCIHUB_URLS) {
        try {
          // Use a race to add a timeout to the fetch request
          const response = await Promise.race([
            fetch(url, { method: 'HEAD', mode: 'no-cors' }),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Timeout')), 2000)
            )
          ]);
          
          // If the request was successful, redirect
          console.log(`Success! Redirecting to: ${url}`);
          window.location.href = url + doi;
          return; // Exit the function
        } catch (error) {
          // Log the failure and try the next URL
          console.error(`Failed to reach ${url}: ${error.message}`);
        }
      }

      // If the loop finishes, all domains are down.
      alert("Could not find a working Sci-Hub URL. All domains appear to be down.");
    }

    // Function to find DOI in the page content
    function findDOI() {
      // Check for DOI in common elements
      const possibleDOIElements = [
        ...document.querySelectorAll('meta[name="citation_doi"]'),
        ...document.querySelectorAll('meta[name="dc.identifier"]'),
        ...document.querySelectorAll('a[href*="doi.org"]'),
        ...document.querySelectorAll('[data-doi]'),
        ...document.querySelectorAll('.doi')
      ];
      
      // Try to extract DOI from meta tags first
      for (const element of possibleDOIElements) {
        if (element.tagName === 'META') {
          const doiContent = element.getAttribute('content');
          if (doiContent && DOI_REGEX.test(doiContent)) {
            return doiContent.match(DOI_REGEX)[0];
          }
        } else if (element.hasAttribute('data-doi')) {
          const doiContent = element.getAttribute('data-doi');
          if (doiContent && DOI_REGEX.test(doiContent)) {
            return doiContent.match(DOI_REGEX)[0];
          }
        } else if (element.href && element.href.includes('doi.org')) {
          const doiMatch = element.href.match(/doi\.org\/(.+)$/);
          if (doiMatch && doiMatch[1]) {
            return doiMatch[1];
          }
        } else {
          const text = element.textContent;
          if (text && DOI_REGEX.test(text)) {
            return text.match(DOI_REGEX)[0];
          }
        }
      }
      
      // If no DOI found in specific elements, search the entire page
      const pageText = document.body.innerText;
      const matches = pageText.match(DOI_REGEX);
      return matches ? matches[0] : null;
    }
    
    // Function to create and add the Sci-Hub button
    function addSciHubButton(doi) {
      // Avoid adding duplicate buttons
      if (document.querySelector('.sci-hub-button')) {
        return;
      }
      
      // Create Sci-Hub button
      const button = document.createElement('button');
      button.className = 'sci-hub-button';
      button.innerHTML = 'Access via Sci-Hub';
      button.title = 'Open this article in Sci-Hub';
      
      // Add click event handler
      button.addEventListener('click', function(e) {
        e.preventDefault();
        findWorkingSciHubUrl(doi);
      });
      
      // Try to find a good place to insert the button
      const possibleContainers = [
        document.querySelector('.doi'),
        document.querySelector('[data-doi]'),
        document.querySelector('a[href*="doi.org"]'),
        document.querySelector('.citation'),
        document.querySelector('.article-header'),
        document.querySelector('.article-info'),
        document.querySelector('.publication-meta')
      ].filter(el => el !== null);
      
      if (possibleContainers.length > 0) {
        // Insert after the first found container
        possibleContainers[0].parentNode.insertBefore(button, possibleContainers[0].nextSibling);
      } else {
        // If no good place found, add it fixed at the top right of the page
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.zIndex = '9999';
        document.body.appendChild(button);
      }
    }
    
    // Main function
    function initialize() {
      const doi = findDOI();
      if (doi) {
        addSciHubButton(doi);
        console.log('Sci-Hub Access Extension: Found DOI', doi);
      } else {
        console.log('Sci-Hub Access Extension: No DOI found on this page');
      }
    }
    
    // Wait for the page to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
    } else {
      initialize();
    }
    
    // Re-check after a delay for dynamic pages
    setTimeout(initialize, 2000);
})();