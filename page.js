let activeButton = null;

function redirectToPage(loggedIn) {
  const button = document.getElementById("button-" + loggedIn);

  if (button) {
    // check if element exists
    if (loggedIn === 1) {
      if (activeButton != null && activeButton !== button) {
        activeButton.classList.remove("active");
      }
      button.classList.toggle("active");
      activeButton = button;
      population();
    } else if (loggedIn === 2) {
      if (activeButton != null && activeButton !== button) {
        activeButton.classList.remove("active");
      }
      button.classList.toggle("active");
      activeButton = button;
      age();
    } else if (loggedIn === 3) {
      if (activeButton != null && activeButton !== button) {
        activeButton.classList.remove("active");
      }
      button.classList.toggle("active");
      activeButton = button;
      suicide();
    } else if (loggedIn === 4) {
      if (activeButton != null && activeButton !== button) {
        activeButton.classList.remove("active");
      }
      button.classList.toggle("active");
      activeButton = button;
      disorder();
    }
  }
}

// Load the first page 1 when access to the main page at the first time
window.addEventListener("load", function () {
  redirectToPage(1);
});

function changeToNextPage(condition) {
  if (condition === true) {
    window.location.href = "vietnam.html";
  } else {
    window.location.href = "not-found.html";
  }
}

function changeToPreviousPage(condition) {
  if (condition === true) {
    window.location.href = "index.html";
  } else {
    window.location.href = "not-found.html";
  }
}

function changeToNextPage2(condition) {
  if (condition === true) {
    window.location.href = "intro.html";
  } else {
    window.location.href = "not-found.html";
  }
}

function changeToPreviousPage2(condition) {
  if (condition === true) {
    window.location.href = "vietnam.html";
  } else {
    window.location.href = "not-found.html";
  }
}

function changeToNextPage3(condition) {
  if (condition === true) {
    window.location.href = "depress.html";
  } else {
    window.location.href = "not-found.html";
  }
}

function changeToPreviousPage3(condition) {
  if (condition === true) {
    window.location.href = "intro.html";
  } else {
    window.location.href = "not-found.html";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const nextPageBtn = document.getElementById("page-change-btn");
  if (nextPageBtn) {
    // check if element exists
    nextPageBtn.addEventListener("click", function () {
      const pageContainer = document.querySelector(".main-page");
      pageContainer.classList.add("hidden");
      setTimeout(function () {
        window.location.href = "vietnam.html";
      }, 1500); // wait 0.5 seconds before navigating to next page
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const pageContainer = document.querySelector(".main-page");
  if (pageContainer) {
    pageContainer.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const nextPageBtn = document.getElementById("page-change-btn-2");
  if (nextPageBtn) {
    nextPageBtn.addEventListener("click", function () {
      const pageContainer = document.querySelector(".main-page-2");
      pageContainer.classList.add("hidden");
      setTimeout(function () {
        window.location.href = "depress.html";
      }, 1500); // wait 0.5 seconds before navigating to next page
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const pageContainer = document.querySelector(".main-page-2");
  if (pageContainer) {
    pageContainer.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const backPageBtn = document.getElementById("page-back-btn");
  if (backPageBtn) {
    backPageBtn.addEventListener("click", function () {
      const pageContainer = document.querySelector(".back-main-page");
      pageContainer.classList.add("hidden");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1500); // wait 0.5 seconds before navigating to next page
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const pageContainer = document.querySelector(".back-main-page");
  if (pageContainer) {
    pageContainer.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const backPageBtn = document.getElementById("page-change-btn-3");
  if (backPageBtn) {
    backPageBtn.addEventListener("click", function () {
      const pageContainer = document.querySelector(".container");
      pageContainer.classList.add("hidden");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 1500); // wait 0.5 seconds before navigating to next page
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const pageContainer = document.querySelector(".container");
  if (pageContainer) {
    pageContainer.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const nextPageBtn = document.getElementById("page-back-btn-3");
  if (nextPageBtn) {
    // check if element exists
    nextPageBtn.addEventListener("click", function () {
      const pageContainer = document.querySelector(".main-page-3");
      pageContainer.classList.add("hidden");
      setTimeout(function () {
        window.location.href = "vietnam.html";
      }, 1500); // wait 0.5 seconds before navigating to next page
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const pageContainer = document.querySelector(".main-page-3");
  if (pageContainer) {
    pageContainer.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const nextPageBtn = document.getElementById("page-change-btn-4");
  if (nextPageBtn) {
    // check if element exists
    nextPageBtn.addEventListener("click", function () {
      const pageContainer = document.querySelector(".main-page-3");
      pageContainer.classList.add("hidden");
      setTimeout(function () {
        window.location.href = "vietnam.html";
      }, 1500); // wait 0.5 seconds before navigating to next page
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const pageContainer = document.querySelector(".main-page-3");
  if (pageContainer) {
    pageContainer.classList.remove("hidden");
  }
});