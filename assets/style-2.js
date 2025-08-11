// === Theme Settings ===
const themes = {
  dark: {
    fontname: "Ubuntu",
    fontweights: [300, 400],
    basecolor: "#e6f1f7",
    accentcolor: "#00d4b0",
    highlightcolor: "#ffffff",
    bodyfontweight: 300,
    bodyfontsize: "12pt",
    backgroundcolor: "#0b1a2b",
    menucolor: "#e6f1f7",
    menufontsize: "14pt",
    headercolor: "#00d4b0",
    headerfontsize: "18pt",
    namecolor: "#ffffff",
    namefontsize: "23pt",
    insttitlecolor: "#ffffff",
    insttitlesize: "12px",
    instyearcolor: "#00d4b0",
    instyearsize: "11px"
  },
  light: {
    fontname: "Ubuntu",
    fontweights: [300, 400],
    basecolor: "#333",
    accentcolor: "#a00",
    highlightcolor: "#111",
    bodyfontweight: 300,
    bodyfontsize: "12pt",
    backgroundcolor: "#ffffff",
    menucolor: "#333",
    menufontsize: "14pt",
    headercolor: "#a00",
    headerfontsize: "18pt",
    namecolor: "#111",
    namefontsize: "23pt",
    insttitlecolor: "#111",
    insttitlesize: "12px",
    instyearcolor: "#a00",
    instyearsize: "11px"
  }
};

// === Load Saved Theme or Default ===
let currentTheme = localStorage.getItem("theme") || "dark";
applyTheme(currentTheme);

// === Apply Theme ===
function applyTheme(themeName) {
  const t = themes[themeName];

  // Google Fonts
  $("head").append(
    `<link href='https://fonts.googleapis.com/css2?family=${t.fontname}:wght@${t.fontweights.join(
      ";"
    )}&display=swap' rel='stylesheet'>`
  );

  // Base Styles
  $("body").css({
    "font-family": t.fontname,
    "color": t.basecolor,
    "font-weight": t.bodyfontweight,
    "font-size": t.bodyfontsize,
    "background-color": t.backgroundcolor
  });

  $("a").css({ "color": t.accentcolor, "text-decoration": "none" });
  $(".menulink").css({ "color": t.menucolor, "font-size": t.menufontsize });
  $(".header").css({ "color": t.headercolor, "font-size": t.headerfontsize });
  $(".name").css({ "color": t.namecolor, "font-size": t.namefontsize });
  $(".papertitle").css({ "color": t.accentcolor });
  $(".thisauthor").css({ "color": t.highlightcolor });
  $(".institution").css({ "color": t.insttitlecolor });
  $(".years").css({ "color": t.instyearcolor });

  // Save Theme
  localStorage.setItem("theme", themeName);

  // Update Icon
  $("#themeToggle").html(themeName === "dark" ? "🌙" : "☀️");
}

let defaultTheme = "light";
currentTheme = localStorage.getItem("theme") || defaultTheme;
applyTheme(currentTheme);

// ===== Theme Toggle Script =====
// Defaults to light theme on first visit, remembers user preference

(function () {
  // Try to load saved theme; default to light
  const savedTheme = localStorage.getItem("theme");
  let currentTheme = savedTheme || "light";

  // Apply initial theme ASAP
  applyTheme(currentTheme);

  // ===== Create Toggle Button (once) =====
  if (!$("#themeToggle").length) {
    $("<button id='themeToggle' aria-label='Toggle theme'></button>")
      .appendTo("body")
      .on("click", function () {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(currentTheme);
        localStorage.setItem("theme", currentTheme);
        // Update icon after applying theme
        $("#themeToggle").html(currentTheme === "dark" ? "🌙" : "☀️");
      });
  }

  // ===== Style Toggle Button =====
  $("<style>")
    .prop("type", "text/css")
    .html(`
      #themeToggle {
        position: fixed;
        top: 15px;
        right: 20px;
        z-index: 1000;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        border: none;
        background: #123f72ff;
        color: white;
        font-size: 22px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(23, 72, 136, 0.3);
        transition: all 0.3s ease;
      }
      #themeToggle:hover {
        transform: rotate(15deg) scale(1.1);
        box-shadow: 0 6px 18px rgba(0,0,0,0.5);
      }
    `)
    .appendTo("head");

  // ===== Set Initial Icon (light first) =====
  $("#themeToggle").html(currentTheme === "dark" ? "🌙" : "☀️");
})();

// ===== Theme Application Function =====
function applyTheme(theme) {
  // Method 1: Using data attributes (recommended)
  document.documentElement.setAttribute("data-theme", theme);
  
  // Method 2: Using body classes (alternative)
  // document.body.className = document.body.className.replace(/theme-\w+/g, '') + ' theme-' + theme;
  
  // Method 3: Direct inline styles (basic implementation)
  if (theme === "light") {
    document.body.style.background = "#ffffff";
    document.body.style.color = "#111111";
  } else {
    document.body.style.background = "#0f172a";
    document.body.style.color = "#e2e8f0";
  }
}


// === Monetary Curve Animation ===
document.addEventListener("DOMContentLoaded", function() {
    const path = document.querySelector(".draw-path");
    if (path) {
        const length = path.getTotalLength();

        // Initial state
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        // Animate curve draw
        path.animate(
            [
                { strokeDashoffset: length },
                { strokeDashoffset: 0 }
            ],
            {
                duration: 3000,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        // Glow effect after draw
        setTimeout(() => {
            path.animate(
                [
                    { filter: "drop-shadow(0 0 0px rgba(255,209,102,0))" },
                    { filter: "drop-shadow(0 0 10px rgba(255,209,102,0.4))" }
                ],
                {
                    duration: 1500,
                    iterations: Infinity,
                    direction: "alternate"
                }
            );
        }, 3000);
    }
});


// Link properties
const acolor = accentcolor;
const adecoration = "none";
// const ahovercolor = accentcolor;
// const ahoverduration = "0.3s";
// const ahoverdecoration = "none"; //none, underline, overline, dotted, color (https://www.w3schools.com/cssref/pr_text_text-decoration.asp)

// Menu properties
const menucolor = basecolor;
const menufontsize = "14pt";
const menudecoration = "none";
// const menuhover = accentcolor;
// const menuhoverduration = "0.3s";
// const menuhoverdecoration = "none"; //none, underline, overline, dotted, color (https://www.w3schools.com/cssref/pr_text_text-decoration.asp)

// Header properties
const headercolor = accentcolor;
const headerfontsize = "18pt";
const headerdecoration = "none";
const namecolor = highlightcolor;
const namefontsize = "23pt";


// Publication properties
const ptitlecolor = accentcolor;
const ptitlefontsize = bodyfontsize;
const ptitleweight = bodyfontweight;
const ptitledecoration = "none";
const ptitlestyle = "normal";

const authorcolor = accentcolor;
const authorweight = bodyfontweight;
const authordecoration = "none";
const authorstyle = "normal";

const selfcolor = highlightcolor;
const selfweight = bodyfontweight;
const selfdecoration = "none";
const selfstyle = "normal";

const tagcolor = accentcolor;
const tagweight = bodyfontweight;
const tagdecoration = "none";
const tagstyle = "normal";

const insttitlecolor = highlightcolor;
const insttitlesize = "12px";
const instyearcolor = accentcolor;
const instyearsize = "11px";

//     .institution {
//             font - size: 12px;
//             color: #222;
//         }
//   .years {
//             font - size: 11px;
//             color: #888;
//         }

// Works for sans serif, change otherwise
$("head").append("<link href='https://fonts.googleapis.com/css2?family=" + fontname + ":wght@" + fontweights.join(';') + "&display=swap' rel='stylesheet' type='text/css'>");
$("body").css("font-family", fontname);

$("body").css("color", basecolor);
$("body").css("font-weight", bodyfontweight);
$("body").css("font-size", bodyfontsize);
$("body").css("background-color", backgroundcolor);

$("a").css("color", acolor);
$("a").css("text-decoration", adecoration);

$(".menulink").css("color", menucolor);
$(".menulink").css("font-size", menufontsize);
$(".menulink").css("text-decoration", menudecoration);

$(".header").css("color", headercolor);
$(".header").css("font-size", headerfontsize);
$(".header").css("text-decoration", headerdecoration);
$(".name").css("color", namecolor);
$(".name").css("font-size", namefontsize);

$(".papertitle").css("color", ptitlecolor);
$(".papertitle").css("font-size", ptitlefontsize);
$(".papertitle").css("font-weight", ptitleweight);
$(".papertitle").css("text-decoration", ptitledecoration);
$(".papertitle").css("font-style", ptitlestyle);

$(".thisauthor").css("color", selfcolor);
$(".thisauthor").css("font-weight", selfweight);
$(".thisauthor").css("text-decoration", selfdecoration);
$(".thisauthor").css("font-style", selfstyle);

$(".institution").css("color", insttitlecolor);
$(".institution").css("font-size", insttitlesize);
$(".years").css("color", instyearcolor);
$(".years").css("font-size", instyearsize);
