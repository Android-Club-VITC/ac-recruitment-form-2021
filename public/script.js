// object describing the possible values for the light/dark theme
const themes = {
  light: {
    background: "#FFFFFF",
    color: "#222222",
    shadow: "#dddddd",
  },
  dark: {
    background: "#231f2a",
    color: "#cccccc",
    shadow: "#111",
  },
};

// target the form element
const form = document.querySelector("form");
// boolean to keep track of the current theme
let theme = "light";

// function called when the change event is registered on the form
function handleChange(e) {
  // toggle the theme between light and dark
  theme = theme === "light" ? "dark" : "light";
  // toggle the .checked class from the form, to translate the pseudo element
  form.classList.toggle("checked");

  // retrieve the property-value pairs from the theme matching the current selection
  const entries = Object.entries(themes[theme]);

  // target the body and modify the custom properties to match the theme values
  const body = document.querySelector("body");
  entries.forEach(([property, value]) => {
    body.style.setProperty(`--${property}`, value);
  });
  // show/ hide the first circle in the background depending on the theme
  body.style.backgroundSize = theme === "light" ? "50%, 50%" : "0%, 50%";

  // target the svg element to animate the circle and the mask
  const svg = document.querySelector("svg.phone--theme");

  // update the circle with the gradient matching the selected theme
  //const circle = svg.querySelector("#theme-circle");
  //circle.setAttribute("fill", `url(#gradient-${theme}-theme)`);

  // update the mask to crop out a section of the circle if need be
  //const mask = svg.querySelector("#mask-circle");
  // ! applying a transition on the circle works on chrome, but not on firefox, nor edge
  // anime.js is used instead
  // mask.style.transition = 'all 0.5s ease-out';
  //   anime({
  //     targets: mask,
  //     easing: "easeOutCubic",
  //     r: theme === "light" ? 0 : 50,
  //     cx: theme === "light" ? 100 : 70,
  //     cy: theme === "light" ? 0 : 30,
  //     duration: 500,
  //   });
}

form.addEventListener("change", handleChange);

// bonus points: add the current hour and minutes in the span element
// using the h:mm format
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const zeroPadded = (num) => (num >= 10 ? num.toString() : `0${num}`);

const span = document.querySelector("nav span");
span.textContent = `${hours}:${zeroPadded(minutes)}`;

var fields = [
  "email",
  "name",
  "phone",
  "reg",
  "year",
  "branch",
  "department",
  "techExperience",
  "linkedin",
  "github",
  "whyAC",
  "submit",
];
var idx = 0;

function validate(valid) {
  if (valid[2].name == "email") {
    var validRegex1 =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //console.log(validRegex1.test(valid[2].value));
    if (!validRegex1.test(valid[2].value)) {
      //console.log("not valid");
      document.getElementById("reqe").innerHTML = "Invalid Email ID!"
      return false;
    }else{
      return true;
    }
  }
  if(valid[2].name == "name"){
    var validRegex2 = /^[a-z ,.'-]+$/i;
    if (!validRegex2.test(valid[2].value)) {
      //console.log("not valid");
      document.getElementById("reqn").innerHTML = "Invalid Name!"
      return false;
    }else{
      return true;
    }
  }
  if(valid[2].name == "phone"){
    var validRegex3 = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (!validRegex3.test(valid[2].value)) {
      //console.log("not valid");
      document.getElementById("reqp").innerHTML = "Invalid Phone number!"
      return false;
    }else{
      return true;
    }
  }
  else if (
    valid[2].value == "" &&
    valid[2].name != "github" &&
    valid[2].name != "linkedin"
  ) {
    return false;
  }
  else{
    return true;
  }
}

const btn_next = () => {
  // TODO validate fields
  let inputfield = document.querySelectorAll(`.ac--form>*[name='${fields[idx]}']`);
  // let valid1 = document.querySelectorAll(`.ac--form>input[name='${fields[idx]}']`,`.ac--form>select[name='${fields[idx]}']`)
  //console.log(valid);

  let valid = validate(inputfield);

  if (!valid) {
    console.log(valid);
    let x = document.querySelectorAll(`.phone--footer>*[name='next']`);
    x[0].setAttribute("disabled", "true");
  } else {
    // TODO if submit handle
    if (idx == fields.length - 1) return;

    let visible = document.querySelectorAll(
      `.ac--form>*[name='${fields[idx]}']`
    );
    visible.forEach((x) => (x.style.display = "none"));
    idx++;
    let hidden = document.querySelectorAll(
      `.ac--form>*[name='${fields[idx]}']`
    );
    hidden.forEach((x) => (x.style.display = "block"));

    if (fields[idx] === "submit") {
      document.querySelector(".ac--form .ac--loader").style.display = "block";
      document.querySelector(".ac--form .ac--loader").style.visibility =
        "hidden";
    }
  }
};

const btn_prev = () => {
  // TODO validate fields

  // TODO if submit handle

  if (idx == 0) return;
  let visible = document.querySelectorAll(`.ac--form>*[name='${fields[idx]}']`);
  visible.forEach((x) => (x.style.display = "none"));
  idx--;
  let hidden = document.querySelectorAll(`.ac--form>*[name='${fields[idx]}']`);
  hidden.forEach((x) => (x.style.display = "block"));
};

//https://script.google.com/macros/s/AKfycby0f3EOFdm2ZNoGZXcvIN18Dpni9n7qtePMDpqaexDRtwlRHExjoYOAqqZhGo8UPWY/exec

const onSubmit = async () => {
  let dataEle = document.querySelectorAll(`.ac--form>input,textarea,select`);
  let submit = document.querySelectorAll(`.ac--form>input[name="submit"]`);
  document.querySelector(".ac--form .ac--loader").style.visibility = "visible";
  submit[0].setAttribute("value", "Submitting...");
  submit[0].setAttribute("disabled", "true");
  let data = {};
  dataEle.forEach((x) => {
    data[x.name] = x.value;
  });

  let d = new URLSearchParams(data).toString();

  await fetch(
    "https://script.google.com/macros/s/AKfycby0f3EOFdm2ZNoGZXcvIN18Dpni9n7qtePMDpqaexDRtwlRHExjoYOAqqZhGo8UPWY/exec?" +
      d
  )
    .then((res) => res.json())
    .then((res) => {
      document.querySelector(".ac--form .ac--loader").style.visibility =
        "hidden";
      if (res.status == "success") {
        submit[0].setAttribute("value", "Done");
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else throw new Error();
    })
    .catch((e) => {
      document.querySelector(".ac--form .ac--loader").style.visibility =
        "hidden";
      submit[0].setAttribute("value", "Error");
      setTimeout(() => {
        submit[0].setAttribute("value", "Try Again Later");
      }, 1000);
    });
};

const onSuccess = () => {
  document.querySelector(".ac--form>*[name='submit']").style.display = "none";
  document.querySelector(".phone--footer").style.visibility = "hidden";
  let note = document.querySelectorAll(".ac--form-success");
  note.forEach((x) => (x.style.display = "block"));
};
