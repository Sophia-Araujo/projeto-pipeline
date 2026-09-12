function getStatusMessage() {
  return 'Pipeline configurada com sucesso.';
}

function renderStatus() {
  const statusElement = document.getElementById('status');
  if (statusElement) {
    statusElement.textContent = getStatusMessage();
  }
}

document.addEventListener('DOMContentLoaded', renderStatus);
