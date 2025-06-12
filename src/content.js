function initialize() {
  if (UIManager) {
    UIManager.initialize();
  }
}

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}