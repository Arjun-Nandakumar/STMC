export const setupDisableDevTools = () => {
  // Disable right-click
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    // Optional: Uncomment to show a message
    // alert('Right-click is disabled for security reasons.');
  });

  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  document.addEventListener('keydown', (e) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      // Optional: Uncomment to show a message
      // alert('Developer tools are disabled for security reasons.');
    }
  });
};