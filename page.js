function redirectToPopPage(loggedIn) {
    if (loggedIn === true) {
        window.location.href = "populationPage.html";
    } else {
        window.location.href = "notLoggedInPage.html";
    }
}

function redirectToAgePage(loggedIn) {
    if (loggedIn === true) {
        window.location.href = "agePage.html";
    } else {
        window.location.href = "notLoggedInPage.html";
    }
}

function redirectToSuiPage(loggedIn) {
    if (loggedIn === true) {
        window.location.href = "suicidePage.html";
    } else {
        window.location.href = "notLoggedInPage.html";
    }
}

function redirectToDisPage(loggedIn) {
    if (loggedIn === true) {
        window.location.href = "disorderPage.html";
    } else {
        window.location.href = "notLoggedInPage.html";
    }
}

function backToHomePage(loggedIn) {
    if (loggedIn === true) {
        window.location.href = "index.html";
    } else {
        window.location.href = "notLoggedInPage.html";
    }
}