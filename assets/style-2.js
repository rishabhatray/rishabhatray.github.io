// Theme settings
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

// Load saved theme or default
let currentTheme = localStorage.getItem("theme") || "dark";
applyTheme(currentTheme);

// Apply theme styles
function applyTheme(themeName) {
  const t = themes[themeName];

  // Load Google Font
  $("head").append(
    `<link href='https://fonts.googleapis.com/css2?family=${t.fontname}:wght@${t.fontweights.join(
      ";"
    )}&display=swap' rel='stylesheet'>`
  );
  $("body").css({
    "font-family": t.fontname,
    "color": t.basecolor,
    "font-weight": t.bodyfontweight,
    "font-size": t.bodyfontsize,
    "background-color": t.backgroundcolor
  });

  // Links
  $("a").css({
    "color": t.accentcolor,
    "text-decoration": "none"
  });

  // Menu
  $(".menulink").css({
    "color": t.menucolor,
    "font-size": t.menufontsize,
    "text-decoration": "none"
  });

  // Header & Name
  $(".header").css({
    "color": t.headercolor,
    "font-size": t.headerfontsize,
    "text-decoration": "none"
  });
  $(".name").css({
    "color": t.namecolor,
    "font-size": t.namefontsize
  });

  // Publications
  $(".papertitle").css({
    "color": t.accentcolor,
    "font-size": t.bodyfontsize,
    "font-weight": t.bodyfontweight,
    "text-decoration": "none",
    "font-style": "normal"
  });

  $(".thisauthor").css({
    "color": t.highlightcolor,
    "font-weight": t.bodyfontweight,
    "text-decoration": "none",
    "font-style": "normal"
  });

  // Institutions
  $(".institution").css({
    "color": t.insttitlecolor,
    "font-size": t.insttitlesize
  });
  $(".years").css({
    "color": t.instyearcolor,
    "font-size": t.instyearsize
  });

  // Save choice
  localStorage.setItem("theme", themeName);
}

// Theme toggle button
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
