document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const phoneMenu = document.getElementById("navigation-pages-phone");

    menuIcon.addEventListener("click", function () {
        phoneMenu.classList.toggle("active");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let headers = document.querySelectorAll(".first-level-footer h3");

    headers.forEach(function (header) {
        header.addEventListener("click", function () {
            let parentDiv = header.parentNode;

            parentDiv.classList.toggle("active");
        });
    });
});

document
    .getElementById("dark-mode-icon")
    .addEventListener("click", function () {
        const body = document.body;
        const logoImage = document.getElementById("logo-image");
        const darkLogoImage = document.getElementById("dark-logo-image");
        const header = document.getElementById("header");
        const navigationPages = document.querySelectorAll(
            "#navigation-pages a"
        );
        // const darkModeIcon = document.getElementById('dark-mode-icon');
        // const lightModeIcon = document.getElementById('light-mode-icon');

        if (body.classList.contains("dark-mode-active")) {
            body.classList.remove("dark-mode-active");
            logoImage.style.display = "block";
            darkLogoImage.style.display = "none";
            header.style.backgroundColor = "#ff595e";
            navigationPages.forEach((link) => {
                link.style.color = "#ffca3a";
            });
        } else {
            body.classList.add("dark-mode-active");
            logoImage.style.display = "none";
            darkLogoImage.style.display = "block";
            header.style.backgroundColor = "black";
            navigationPages.forEach((link) => {
                link.style.color = "rgb(255, 68, 68)";
            });
        }
        // if (localStorage.getItem('theme') === 'dark') {
        //     body.classList.add('dark-mode');
        //     darkModeIcon.style.display = 'none';
        //     lightModeIcon.style.display = 'block';
        // } else {
        //     body.classList.add('light-mode');
        //     darkModeIcon.style.display = 'block';
        //     lightModeIcon.style.display = 'none';
        // }

        // darkModeIcon.addEventListener('click', () => {
        //     body.classList.remove('light-mode');
        //     body.classList.add('dark-mode');
        //     darkModeIcon.style.display = 'none';
        //     lightModeIcon.style.display = 'block';
        //     localStorage.setItem('theme', 'dark');
        // });

        // lightModeIcon.addEventListener('click', () => {
        //     body.classList.remove('dark-mode');
        //     body.classList.add('light-mode');
        //     darkModeIcon.style.display = 'block';
        //     lightModeIcon.style.display = 'none';
        //     localStorage.setItem('theme', 'light');
        // });
    });
document
    .getElementById("dark-mode-icon")
    .addEventListener("click", enableDarkMode);
document
    .getElementById("light-mode-icon")
    .addEventListener("click", disableDarkMode);

const body = document.body;
const navigationPages = document.querySelectorAll("#navigation-pages a");
const darkModeIcon = document.getElementById("dark-mode-icon");
const lightModeIcon = document.getElementById("light-mode-icon");

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === "dark-mode-active") {
        darkModeIcon.style.display = "none";
        lightModeIcon.style.display = "block";
        navigationPages.forEach((link) => {
            link.style.color = "#dc1a1a";
        });
    } else {
        navigationPages.forEach((link) => {
            link.style.color = "#ffca3a";
        });
    }
}

function enableDarkMode() {
    body.classList.add("dark-mode-active");
    darkModeIcon.style.display = "none";
    lightModeIcon.style.display = "block";
    navigationPages.forEach((link) => {
        link.style.color = "#dc1a1a";
    });
    localStorage.setItem("theme", "dark-mode-active");
}

function disableDarkMode() {
    body.classList.remove("dark-mode-active");
    darkModeIcon.style.display = "block";
    lightModeIcon.style.display = "none";
    navigationPages.forEach((link) => {
        link.style.color = "#ffca3a";
    });
    localStorage.setItem("theme", "light-mode-active");
}
