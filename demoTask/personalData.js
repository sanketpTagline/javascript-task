const table = document.getElementById("tableBody1");
const submitBtn = document.getElementById("submitButton");
const myForm = document.getElementById("myForm");

let id = 1;
let formValid = false;
let gender;
let hobbyArray;

let userName = document.getElementById("Name");
let userEmail = document.getElementById("Email");
let userDOB = document.getElementById("DOB");

let Male = document.getElementById("Male");
let Female = document.getElementById("Female");
let genderList = document.getElementsByName("gender");

let hobby = document.getElementsByName("hobby");
let Reading = document.getElementById("Reading");
let Traveling = document.getElementById("Traveling");
let Sports = document.getElementById("Sports");

let userCountry = document.getElementById("country");
let userState = document.getElementById("state");
let userCity = document.getElementById("city");

const tableEmptyMessage = document.createElement("h3");
const copyNameBtn = document.createElement("button");
let nameNumber;

const persons = [
  {
    id: id++,
    name: "sanket",
    email: "sanket@gmail.com",
    dob: "2003-01-17",
    gender: "Male",
    hobby: "Reading",
    country: "INDIA",
    state: "Gujarat",
    city: "Surat",
  },
  {
    id: id++,
    name: "john",
    email: "john@gmail.com",
    dob: "2583-08-15",
    gender: "Male",
    hobby: "Traveling",
    
    country: "Japan",
     
    state: "Ibaragi",
     
    city: "Mito",
  },
];

const getDataFromForm = () => {
  //get selected value of Gender
  for (let i = 0; i < genderList.length; i++) {
    if (genderList[i].checked) {
      gender = genderList[i].value;
    }
  }
  // get selected value's array of Hobby
  hobbyArray = [];
  for (let i = 0; i < hobby.length; i++) {
    if (hobby[i].checked) {
      hobbyArray.push(hobby[i].value);
    }
  }
};

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
   
    getDataFromForm();

    const formData = {
      id: id,
      name: userName.value,
      email: userEmail.value,
      dob: userDOB.value,
      gender: gender,
      hobby: hobbyArray,
      country: userCountry.value,
      state: userState.value,
      city: userCity.value,
    };
formValidation();
   if(formValid == true)
   {
    if (submitBtn.id === "submitButton") {
      persons.push(formData);
      cancelEdit();
      clearForm();
      id++;
     
    }
    formValid=false; 
   }

   
  table.innerHTML = "";
  addRowData(persons);
});

const clearForm = () => {
  myForm.reset();
  document.getElementById("state").options.length=0;
  document.getElementById("city").options.length=0;
  Male.checked = false;
  Female.checked = false;
  Reading.checked = false;
  Traveling.checked = false;
  Sports.checked = false;
};

 
function addRowData(array) {
   
    array.forEach((element, index) => {
      const addTableRow = document.createElement("tr");
  
      for (const key in element) {
        const rowData = document.createElement("td");
  
        if (key === "id") {
          rowData.innerHTML = index + 1;
          addTableRow.id = element.id;
        } else if (key === "name") {
          rowData.innerHTML = `${element[key]}`;
  
          rowData.id = `name${element.id}`;
        } else {
          rowData.innerHTML = element[key];
        }
        rowData.style.textAlign = "center";
  
        addTableRow.appendChild(rowData);
      }
  
      const addDeleteButton = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.id = `deleteBtn${element.id}`;
  
      deleteButton.classList.add("button", "remove");
      deleteButton.setAttribute("onclick", "deleteTableRow(this.id)");
      addDeleteButton.appendChild(deleteButton);
      addTableRow.appendChild(addDeleteButton);
  
      const addEditButton = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.setAttribute("onclick", "editTableRow(this.id)");
      editButton.id = `editBtn${element.id}`;
      editButton.classList.add("button", "edit");
      editButton.innerHTML = "Edit";
  
      addEditButton.appendChild(editButton);
      addTableRow.appendChild(addEditButton);
  
      table.appendChild(addTableRow);
    });
   
}

const cancelBtn = document.createElement("button");
cancelBtn.innerHTML = "Cancel";
cancelBtn.classList.add("cancel", "edit");

function editTableRow(ids) {
 
  editButtonId = ids;
  const getEditButtonNumber = 7;
  let editButton = +editButtonId.slice(getEditButtonNumber);  

  cancelBtn.style.display = "inline";
 
  submitBtn.value = "Update";
  submitBtn.innerText = "Update";
  submitBtn.id = "updateButton";
  myForm.appendChild(cancelBtn);

  for (const person of persons) {
    formValidation();
    if (parseInt(editButton) === person.id) {
      userName.value = person.name;
      userEmail.value = person.email;
      userDOB.value = person.dob;

      if (person.gender === "Male") {
        Male.checked = true;
      } else {
        Female.checked = true;
      }

      Reading.checked = person.hobby.includes("Reading");
      Traveling.checked = person.hobby.includes("Traveling");
      Sports.checked = person.hobby.includes("Sports");

      userCountry.value = person.country;
      getState(person.country);
      userState.value = person.state;
      getCity();
      userCity.value = person.city;
    }
  }

  myForm.setAttribute("onsubmit", "updateTableData()");
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cancelEdit();
    
     
  });
}

function updateTableData(ids) {
 

  let editButton = +editButtonId.slice(7);

  const newData = {
    id: editButton,
    name: userName.value,
    email: userEmail.value,
    dob: userDOB.value,
    gender: gender,
    hobby: hobbyArray,
    country: userCountry.value,
    state: userState.value,
    city: userCity.value,
  };
  
  console.log(newData);
  formValidation();

   if(formValid == true)
   {
    if (submitBtn.id == "updateButton") {
      for (let i = 0; i < persons.length; i++) {
        if (editButton == persons[i].id) {
          persons.splice(i, 1, newData);
          break;
        }
      }
       
      cancelEdit();
    }  
   }
  
    table.innerHTML = "";
    addRowData(persons);
    
 

  
}

function cancelEdit() {
  cancelBtn.style.display = "none";
  submitBtn.id = "submitButton";
  submitBtn.value = "Submit";
  submitBtn.innerHTML = "Submit";
  submitBtn.removeAttribute("onclick");
  myForm.removeAttribute("onsubmit");
  clearForm();
}

function deleteTableRow(id) {
  deleteButtonId = id;

  const getDeleteButtonNumber = 9;
  const deleteButton = +deleteButtonId.slice(getDeleteButtonNumber);
  for (let i = 0; i < persons.length; i++) {
    if (persons[i].id === deleteButton) {
      persons.splice(i, 1);
    }
  }
  table.innerHTML = "";
  addRowData(persons);
  
  cancelEdit();
  showMessageOnTableEmpty(persons);
}

function showMessageOnTableEmpty(array) {
  const arrayLength = array.length;
  if (arrayLength === 0) {
    tableEmptyMessage.innerHTML = "No records found";
    tableEmptyMessage.style.marginLeft = "50%";
    tableEmptyMessage.style.transform = "translate('-50%')";
    document.body.appendChild(tableEmptyMessage);
  } else {
    tableEmptyMessage.innerHTML = "";
  }
}

function myFunction() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();

  table = document.getElementById("detailTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];

    if (td) {
      txtValue = td.textContent || td.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function tableFilter() {
  let input, filter, table, tbody, tr, i, td, j, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("detailTable");
  tbody = table.getElementsByTagName("tbody")[0];
  tr = tbody.getElementsByTagName("tr");

   
  for (i = 0; i < tr.length; i++) {
    if (
      !(
        tr[i].classList.contains("subhead1") ||
        tr[i].classList.contains("subhead2")
      )
    ) {
      tr[i].style.display = "none";
      td = tr[i].getElementsByTagName("td");
      for (j = 0; j < td.length; j++) {
        if (td[j]) {
          txtValue = td[j].textContent || td[j].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          }
        }
      }
    }
  }
}

function customSort(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) {
    return -1;
  } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
    return 1;
  } else {
    return 0;
  }
}

function sortData(array) {
  sortTableData = [...array];
  if (sort.value === "Ascending") {
    sortTableData.sort(customSort);
    table.innerHTML = "";
    addRowData(sortTableData);
  } else if (sort.value === "Descending") {
    const descendingSortData = sortTableData.sort(customSort).reverse();
    table.innerHTML = "";
    addRowData(descendingSortData);
  } else {
    table.innerHTML = "";
    addRowData(array);
  }
}

addRowData(persons);

let Cities = {
  country: [
    {
      countryname: "INDIA",
      states: [
        {
          name: "Gujarat",
          cities: [
            { name: "Ahmedabad" },
            { name: "Amreli" },
            { name: "Anand" },
            { name: "Aravalli" },
            { name: "Banaskantha" },
            { name: "Bharuch" },
            { name: "Bhavnagar" },
            { name: "Botad" },
            { name: "Chhota Udaipur" },
            { name: "Dahod" },
            { name: "Dang" },
            { name: "Devbhoomi Dwarka" },
            { name: "Gandhinagar" },
            { name: "Gir Somnath" },
            { name: "Jamnagar" },
            { name: "Junagadh" },
            { name: "Kheda" },
            { name: "Kutch" },
            { name: "Mahisagar" },
            { name: "Mehsana" },
            { name: "Morbi" },
            { name: "Narmada" },
            { name: "Navsari" },
            { name: "Panchmahal" },
            { name: "Patan" },
            { name: "Porbandar" },
            { name: "Rajkot" },
            { name: "Sabarkantha" },
            { name: "Surat" },
            { name: "Surendranagar" },
            { name: "Tapi" },
            { name: "Vadodara" },
            { name: "Valsad" }
          ],
        },
        {
          name: "Maharashtra",
          cities: [
            { name: "Pune" },
            { name: "Mumbai" },
            { name: "Nagpur" },
            { name: "Thane" },
          ],
        },
        {
          name: "UP",
          cities: [
            { name: "Prayagraj" },
            { name: "Agra" },
            { name: "Meerut" },
            { name: "Noida" },
          ],
        },
        {
          name: "Bihar",
          cities: [
            { name: "Patna" },
            { name: "Sasaram" },
            { name: "Gaya" },
            { name: "Purnia" },
          ],
        },
        {
          name : "AndraPradesh",
          cities: [
            { name :"Anantapur"},
            { name :"Chittoor"},
            { name :"East Godavari"},
            { name :"Guntur"},
            { name :"Kadapa"},
            { name :"Krishna"},
            { name :"Kurnool"},
            { name :"Prakasam"},
            { name :"Nellore"},
            { name :"Srikakulam"},
            { name :"Visakhapatnam"},
            { name :"Vizianagaram"},
            { name :"West Godavari"},
          ],
        }
      ],
    },
    {
      countryname: "China",
      states: [
        {
          name: "Gansu",
          cities: [
            { name: "Lanzhou" },
            { name: "Tianshui" },
            { name: "Dingxi" },
            { name: "Linxia" },
          ],
        },
        {
          name: "Fujian",
          cities: [
            { name: "Fuzhou" },
            { name: "Xiamen" },
            { name: "Quanzhou" },
            { name: "Zhangzhou" },
          ],
        },
        {
          name: "Hainan",
          cities: [
            { name: "Haikou" },
            { name: "Sanya" },
            { name: "Qionghai" },
            { name: "Wanning" },
          ],
        },
        {
          name: "Yunnan",
          cities: [
            { name: "Kunming" },
            { name: "Lijiang" },
            { name: "Dali" },
            { name: "Yuxi" },
          ],
        },
      ],
    },
   
    {
      countryname: "Japan",
      states: [
        { name: "ChHyogoiba", cities: [{ name: "Chiba" }] },
        {
          name: "Ibaragi",
          cities: [
            { name: "Ibaragi" },
            { name: "Mito" },
            { name: "Hitachi" },
            { name: "Koga" },
          ],
        },
      ],
    },
    {
      countryname: "UK",
      states: [
        {
          name:"England",
          cities:[
      { name :"Bath"},
      { name :"Birmingham"},
      { name :"Bradford"},
      { name :"Brighton & Hove"},
      { name :"Bristol"},
      { name :"Cambridge"},
      { name :"Canterbury"},
      { name :"Carlisle"},
      { name :"Chelmsford"},
      { name :"Chester"},
      { name :"Chichester"},
      { name :"Colchester"},
      { name :"Coventry"},
      { name :"Derby"},
      { name :"Doncaster"},
      { name :"Durham"},
      { name :"Ely"},
      { name :"Exeter"},
      { name :"Gloucester"},
      { name :"Hereford"},
      { name :"Kingston-upon-Hull"},
      { name :"Lancaster"},
      { name :"Leeds"},
      { name :"Leicester"},
      { name :"Lichfield"},
      { name :"Lincoln"},
      { name :"Liverpool"},
      { name :"London"},
      { name :"Manchester"},
      { name :"Milton Keynes"},
      { name :"Newcastle-upon-Tyne"},
      { name :"Norwich"},
      { name :"Nottingham"},
      { name :"Oxford"},
      { name :"Peterborough"},
      { name :"Plymouth"},
      { name :"Portsmouth"},
      { name :"Preston"},
      { name :"Ripon"},
      { name :"Salford"},
      { name :"Salisbury"},
      { name :"Sheffield"},
      { name :"Southampton"},
      { name :"Southend-on-Sea"},
      { name :"St Albans"},
      { name :"Stoke on Trent"},
      { name :"Sunderland"},
      { name :"Truro"},
      { name :"Wakefield"},
      { name :"Wells"},
      { name :"Westminster"},
      { name :"Winchester"},
      { name :"Wolverhampton"},
      { name :"Worcester"},
      { name :"York"},
          ]
        }
      ]
    },
    {
      countryname : "USA",
      states: [
        {name :"New York",
      cities: [
        { name: "New York"},
        { name: "Buffalo"},
        { name: "Rochester"},
        { name: "Yonkers"},
        { name: "Syracuse"},
        { name: "Albany"},
        { name: "New Rochelle"},
        { name: "Mount Vernon"},
        { name: "Schenectady"},
        { name: "Utica"},
        { name: "White Plains"},
        { name: "Hempstead"},
        { name: "Troy"},
        { name: "Niagara Falls"},
        { name: "Binghamton"},
        { name: "Freeport"},
        { name: "Valley Stream"},

      ]}
      ]
    }

  ],
};

getCountry();

function getCountry() {
  let select = document.getElementById("country");

  for (let i = 0; i < Cities.country.length; i++) {
    let optn = Cities.country[i].countryname;
    let el = document.createElement("option");
    el.textContent = optn;
    el.value = optn;
    select.appendChild(el);
  }
}

function getState(text) {
  let e = document.getElementById("country");
  document.getElementById("state").innerHTML = "";
  var text = e.options[e.selectedIndex].text;
  let select = document.getElementById("state");
  for (let j = 0; j < Cities.country.length; j++) {
    if (text === Cities.country[j].countryname) {
      for (let i = 0; i < Cities.country[j].states.length; i++) {
        let optn = Cities.country[j].states[i].name;
        let el = document.createElement("option");
        el.textContent = optn;
        el.value = optn;
        select.appendChild(el);
      }
    }
  }
  getCity();
}

function getCity() {
  let e = document.getElementById("country");
  document.getElementById("city").innerHTML = "";
  let text1 = e.options[e.selectedIndex].text;
   
  let e2 = document.getElementById("state");
  let text2 = e2.options[e2.selectedIndex].text;
   
  for (let j = 0; j < Cities.country.length; j++) {
    if (text1 === Cities.country[j].countryname) {
      for (let i = 0; i < Cities.country[j].states.length; i++) {
        if (text2 === Cities.country[j].states[i].name) {
          for (let k = 0; k < Cities.country[j].states[i].cities.length; k++) {
            let select = document.getElementById("city");
            let optn = Cities.country[j].states[i].cities[k].name;
            let el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);
          }
        }
      }
    }
  }
}
