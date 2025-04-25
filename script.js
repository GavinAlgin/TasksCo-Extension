document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
  
    // Initially set the first tab as active
    if (tabs.length > 0 && tabContents.length > 0) {
      tabs[0].classList.add('border-blue-500');
      tabContents[0].hidden = false;
    }
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove the active border from all tabs
        tabs.forEach(t => t.classList.remove('border-blue-500'));
        // Hide all tab contents
        tabContents.forEach(tc => tc.hidden = true);
  
        // Add the active border to the clicked tab
        tab.classList.add('border-blue-500');
        // Show the corresponding tab content using the data-tab attribute
        const targetId = tab.dataset.tab;
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.hidden = false;
        }
      });
    });
  });