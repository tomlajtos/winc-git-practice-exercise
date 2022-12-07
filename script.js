// variables pointing to elements needed for menu show/hide function
const menuButton = document.getElementById("menu-button");
const menuButtonEdge = document.getElementById("menu-button-edge");
const colorMenu = document.getElementById("color-menu");
const colorMenuEdge = document.getElementById("color-menu-edge");
const docHeader = document.getElementById("header");

// variables pointing to elements to be changed upon color selection
const docBody = document.getElementById("body");
const colorSelectors = document.getElementsByClassName("color-selector");
const colorText = document.getElementById("color-text"); // text feedback in footer
const colorIndicator = document.getElementById("color-indicator"); // color indicator in footer

// variables pointing to color menu input elements
const colorInputDefault = document.getElementById("color-input-default");
const colorInputViolet = document.getElementById("color-input-violet");
const colorInputBlue = document.getElementById("color-input-blue");
const colorInputCyan = document.getElementById("color-input-cyan");
const colorInputGreen = document.getElementById("color-input-green");
const colorInputYellow = document.getElementById("color-input-yellow");
const colorInputOrange = document.getElementById("color-input-orange");
const colorInputRed = document.getElementById("color-input-red");

// variables pointing to color menu label elements
const colorSelectorDefault = document.getElementById("color-selector-default");
const colorSelectorViolet = document.getElementById("color-selector-violet");
const colorSelectorBlue = document.getElementById("color-selector-blue");
const colorSelectorCyan = document.getElementById("color-selector-cyan");
const colorSelectorGreen = document.getElementById("color-selector-green");
const colorSelectorYellow = document.getElementById("color-selector-yellow");
const colorSelectorOrange = document.getElementById("color-selector-orange");
const colorSelectorRed = document.getElementById("color-selector-red");

/* Elements and their properties to be changed upon color selection
 * stored in form of an array of objects, [color]Array.
 * These arrays are given as arguments to the 'addClickEvent' function */
const defaultArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-default"] },
  { name: colorText, newClass: [], newText: "Default" },
  { name: colorIndicator, newClass: ["bg-default"] },
  { name: colorSelectorDefault, newClass: ["selected"] },
];
const violetArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-violet"] },
  { name: colorText, newClass: [], newText: "Violet" },
  { name: colorIndicator, newClass: ["bg-violet"] },
  { name: colorSelectorViolet, newClass: ["selected"] },
];
const blueArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-blue"] },
  { name: colorText, newClass: [], newText: "Blue" },
  { name: colorIndicator, newClass: ["bg-blue"] },
  { name: colorSelectorBlue, newClass: ["selected"] },
];
const cyanArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-cyan"] },
  { name: colorText, newClass: [], newText: "Cyan" },
  { name: colorIndicator, newClass: ["bg-cyan"] },
  { name: colorSelectorCyan, newClass: ["selected"] },
];
const greenArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-green"] },
  { name: colorText, newClass: [], newText: "Green" },
  { name: colorIndicator, newClass: ["bg-green"] },
  { name: colorSelectorGreen, newClass: ["selected"] },
];
const yellowArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-yellow"] },
  { name: colorText, newClass: [], newText: "Yellow" },
  { name: colorIndicator, newClass: ["bg-yellow"] },
  { name: colorSelectorYellow, newClass: ["selected"] },
];
const orangeArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-orange"] },
  { name: colorText, newClass: [], newText: "Orange" },
  { name: colorIndicator, newClass: ["bg-orange"] },
  { name: colorSelectorOrange, newClass: ["selected"] },
];
const redArray = [
  { name: colorSelectors, toRemove: ["selected"] },
  { name: docBody, newClass: ["bg-red"] },
  { name: colorText, newClass: [], newText: "Red" },
  { name: colorIndicator, newClass: ["bg-red"] },
  { name: colorSelectorRed, newClass: ["selected"] },
];

// FUNCTION DEFINITIONS

/* Function to make the color menu visible
 * modifies css styles directly on colorMenu element*/
const showColorMenu = function() {
  colorMenu.style.opacity = "1";
  colorMenu.style.left = "3px";
  colorMenu.style.transition =
    "left 500ms ease-in-out 300ms, opacity 500ms ease-out 100ms";
};

/* Function to hide the color menu
 * arguments(0)
 * modifies css styles directly on colorMenu element*/
const hideColorMenu = function() {
  colorMenu.style.opacity = "0";
  colorMenu.style.left = "-220px";
  colorMenu.style.transition =
    "left 500ms ease-in-out 400ms, opacity 500ms ease-out 600ms";
};

/* Function to show or hide color menu
 * based on mouse hovering-position/movement
 * Also: clicking on a color selector will close the c. menu
 * independently from this function. */
const showHideColorMenu = () => {
  menuButton.addEventListener("mouseover", showColorMenu);
  menuButtonEdge.addEventListener("mouseleave", () => {
    docHeader.addEventListener("mouseover", hideColorMenu, { once: true });
  });
  colorMenuEdge.addEventListener("mouseleave", hideColorMenu);
};

/* Function to add class(es) to a DOM object
 * argument(1): array of objects ([color]Array) */
const addClasses = (colorArray) =>
  colorArray
    // exclude object(s) with 'obj.name: colorSelectors' (HTMLCollection)
    .filter((element) => !element["name"].length)
    .forEach((element) => element["name"].classList.add(...element.newClass));

/* Function to remove highlight from color-selectors
 * argument(1): array of objects ([color]Array)
 *
 * Implementation note:
 * filter for object in [color]Array that has 'name: colorSelectors' property
 * which value is an (HTMLCollection) >> done by checking
 * if object['name'] of colorArray elements is array-like
 * and has length ('colorSelectors' is the only one in this case,
 * no need to be more specific) */
const removeSelectionIndicator = function(colorArray) {
  //assign filtered out object to a variable with array de-structuring
  const [colorSelectorsObj] = colorArray.filter(
    (object) => object["name"].length
  );

  // turn HTMLCollection (...obj.name) into an Array,
  // iterate through the elements and remove all classes
  // listed in the array of '..Obj.toRemove'
  Array.from(colorSelectorsObj.name).forEach((element) =>
    element.classList.remove(...colorSelectorsObj.toRemove)
  );
};

/* Function to remove all classes from a DOM object
 * argument(1): array of objects ([color]Array) */
const removeClasses = (colorArray) =>
  colorArray
    .filter((obj) => obj.name.tagName !== "LABEL" && !obj.name.length)
    .forEach((element) =>
      element["name"].classList.remove(...element["name"].classList)
    );

/* Function to change feedback text in footer
 * argument(1): array of objects ([color]Array) */
const changeColorText = function(colorArray) {
  //filter for object that has 'newText' property
  // assign obj to variable with array de-structuring
  const [colorTextObj] = colorArray.filter((obj) => obj.newText);

  colorTextObj.name.innerHTML = colorTextObj.newText;
};

/* Function to call all necessary functions when a color selector is clicked
 * argument(1): array of objects ([color]Array)
 * the 'addClickEvent' function takes this function as one of it's arguments */
const applyColorChange = (colorArray) => {
  removeSelectionIndicator(colorArray);
  removeClasses(colorArray);
  addClasses(colorArray);
  changeColorText(colorArray);
  hideColorMenu();
};

/* Function to add click events to an DOM object
 * arguments(3+):
 * - 1, target element
 * - 2, array of objects ([{elementToChange, propertiesToModify}] >> [color]Array)
 * - 3, any number of functions that take a [color]Array as argument */
const addClickEvent = (eventTarget, colorArray, ...handlerFunctions) => {
  eventTarget.addEventListener("click", () =>
    handlerFunctions.forEach((func) => func(colorArray))
  );
};

/* Add event listener for keyboard actions,
 * use event delegation to listen to keyboard events
 * Open/close the color menu (Enter/Escape) and select
 * colors (1-8) with keyboard. */
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "Enter":
      showColorMenu();
      break;
    case "Escape":
      hideColorMenu();
      break;
    case "1":
      applyColorChange(defaultArray);
      break;
    case "2":
      applyColorChange(violetArray);
      break;
    case "3":
      applyColorChange(blueArray);
      break;
    case "4":
      applyColorChange(cyanArray);
      break;
    case "5":
      applyColorChange(greenArray);
      break;
    case "6":
      applyColorChange(yellowArray);
      break;
    case "7":
      applyColorChange(orangeArray);
      break;
    case "8":
      applyColorChange(redArray);
      break;
    default:
      alert(
        `Key not recognized.
        - Open / Close color menu: 
            Enter / Escape
        - Color options (type the number to apply color):
            default: 1,  violet: 2
            blue: 3,  cyan: 4
            green: 5,  yellow: 6
            orange: 7,  red: 8`
      );
  }
});

// FUNCTION INVOCATIONS
showHideColorMenu();
addClickEvent(colorInputDefault, defaultArray, applyColorChange);
addClickEvent(colorInputViolet, violetArray, applyColorChange);
addClickEvent(colorInputBlue, blueArray, applyColorChange);
addClickEvent(colorInputCyan, cyanArray, applyColorChange);
addClickEvent(colorInputGreen, greenArray, applyColorChange);
addClickEvent(colorInputYellow, yellowArray, applyColorChange);
addClickEvent(colorInputOrange, orangeArray, applyColorChange);
addClickEvent(colorInputRed, redArray, applyColorChange);
