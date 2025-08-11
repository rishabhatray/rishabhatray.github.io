// Initialize font properties
const fontname = "Ubuntu";
const fontweights = [300, 400]

// Color properties
const basecolor = "#777";
const accentcolor = "#a00";
const highlightcolor = "#111";

// const basecolor = "#888";
// const accentcolor = "#222";
// const highlight = "#111";

// Body properties
const bodyfontweight = 300;
const bodyfontsize = "12pt";
const backgroundcolor = "#fff";

// Load saved theme or default to dark
let currentTheme = localStorage.getItem("theme") || "dark";
applyTheme(currentTheme);

// Apply theme function
function applyTheme(themeName) {
  const t = themes[themeName];

  // Load font
  $("head").append(
    `<link href='https://fonts.googleapis.com/css2?family=${t.fontname}:wght@${t.fontweights.join(
      ";"
    )}&display=swap' rel='stylesheet' type='text/css'>`
  );
  $("body").css("font-family", t.fontname);

  // Body
  $("body").css({
    "color": t.basecolor,
    "font-weight": t.bodyfontweight,
    "font-size": t.bodyfontsize,
    "background-color": t.backgroundcolor
  });

  // Links
  $("a").css("color", t.accentcolor);

  // Menu
  $(".menulink").css("color", t.basecolor);

  // Header & Name
  $(".header").css("color", t.accentcolor);
  $(".name").css("color", t.highlightcolor);

  // Publications
  $(".papertitle").css("color", t.accentcolor);
  $(".thisauthor").css("color", t.highlightcolor);

  // Institutions
  $(".institution").css("color", t.highlightcolor);
  $(".years").css("color", t.accentcolor);

  // Save theme choice
  localStorage.setItem("theme", themeName);
}

// Create theme toggle button
$("<button id='themeToggle'>🌓</button>")
  .css({
    position: "fixed",
    top: "15px",
    right: "20px",
    zIndex: 1000,
    padding: "6px 10px",
    fontSize: "14px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    background: "#888",
    color: "#fff"
  })
  .appendTo("body")
  .on("click", function () {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
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
