// GET ELEMENT ID
function getId(elementId) {
  const id = document.getElementById(elementId);
  return id;
}

// TOGGLE LOADING SPINNER
const toggleSpinner = isLoading => {
  const spinner = getId('loading-spinner');
  if (isLoading) {
    spinner.classList.remove('d-none');
  } else {
    spinner.classList.add('d-none');
  }
}

