submitBtn.addEventListener("click", formValidation);

function formValidation() {
 
  nameValidation();
  emailValidation();
  dobValidation();
  genderValidation();
  hobbyValidation();
  countryValidation();
  stateValidation();
  cityValidation();

  
    if(
        userName.value !== "" && 
        userEmail.value !== "" && 
        userDOB.value !== "" && 
        (Male.checked  || Female.checked ) &&
        (Reading.checked || Traveling.checked ||   Sports.checked ) 
        &&
        userCountry.value !== "" && 
        userState.value !== "" && 
        userCity.value !== "" 
    )
    {
        formValid = true;
    }
     
}

userName.addEventListener("input", nameValidation);
function nameValidation() {
  if (userName.value === "") {
    showError("nameError", "Please enter your name");
  } else if (userName.value.length < 3) {
    showError("nameError", "Name must have at least 3 characters");
  } else if (userName.value.length > 10) {
    showError("nameError", "Name must have at most 10 characters");
  } else {
    removeError("nameError");
  }
}

userEmail.addEventListener("input", emailValidation);
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
function emailValidation() {
  if (userEmail.value === "") {
    showError("emailError", "Please enter your email");
  } else if (!emailRegExp.test(userEmail.value)) {
    showError("emailError", "Please enter valid email");
  } else {
    removeError("emailError");
  }
}

userDOB.addEventListener("input", dobValidation);
const dobRegExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
function dobValidation() {


  if (userDOB.value == "") {
    showError("dobError", "Please Enter Your DOB");
  } else if (!dobRegExp.test(userDOB.value)) {
    showError("dobError", "Please Enter Valid DOB");
  } else {
    removeError("dobError");
  }
}

Male.addEventListener("change", genderValidation);
Female.addEventListener("change", genderValidation);
function genderValidation() {
  !Male.checked && !Female.checked
    ? showError("genderError", "Please select your gender")
    : removeError("genderError");
}

Reading.addEventListener("change", hobbyValidation);
Traveling.addEventListener("change", hobbyValidation);
Sports.addEventListener("change", hobbyValidation);
function hobbyValidation() {
  hobbyArray = [];
  for (let i = 0; i < hobby.length; i++) {
    if (hobby[i].checked) {
      hobbyArray.push(hobby[i].value);
    }
  }
  hobbyArray.length > 0
    ? removeError("hobbyError")
    : showError("hobbyError", "Please select your hobby");
}

userCountry.addEventListener("change", countryValidation);
function countryValidation() {
  userCountry.value === ""
    ? showError("countryError", "Please select your Country")
    : removeError("countryError");
}

userState.addEventListener("change", stateValidation);
function stateValidation() {
  userState.value === ""
    ? showError("stateError", "Please select your State")
    : removeError("stateError");
}

userCity.addEventListener("change", cityValidation);
function cityValidation() {
  userCity.value === ""
    ? showError("cityError", "Please select your city")
    : removeError("cityError");
}

function showError(id, value) {
  document.getElementById(id).innerText = value;
  document.getElementById(id).style.margin = "0px";
  document.getElementById(id).style.marginLeft = "50px";
}

function removeError(id) {
  document.getElementById(id).innerText = "";
  document.getElementById(id).style.margin = "16px";
}
