let activeButton = null;

function redirectToPage(loggedIn) {
    const button = document.getElementById('button-' + loggedIn);

    if (loggedIn === 1) {
        if (activeButton != null && activeButton !== button) {
            activeButton.classList.remove('active');
        }
        button.classList.toggle('active');
        activeButton = button;
        population();
    }
    else if (loggedIn === 2) {
        if (activeButton != null && activeButton !== button) {
            activeButton.classList.remove('active');
        }
        button.classList.toggle('active');
        activeButton = button;
        age();
    }
    else if (loggedIn === 3) {
        if (activeButton != null && activeButton !== button) {
            activeButton.classList.remove('active');
        }
        button.classList.toggle('active');
        activeButton = button;
        suicide();
    }
    else if (loggedIn === 4) {
        if (activeButton != null && activeButton !== button) {
            activeButton.classList.remove('active');
        }
        button.classList.toggle('active');
        activeButton = button;
        disorder();
    }
}

// Load the first page 1 when access to the main page at the first time
window.addEventListener('load', function() {
    redirectToPage(1);
});

function changeToNextPage(condition) {
    if (condition === true) {
        window.location.href = "vietnam-1.html";
    }
    else {
        window.location.href = "not-found.html"
    }
}

function changeToPreviousPage(condition) {
    if (condition === true) {
        window.location.href = "index.html";
    }
    else {
        window.location.href = "not-found.html";
    }
}