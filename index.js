const patientsAPI = "https://fedskillstest.coalitiontechnologies.workers.dev";
const username = "coalition";
const password = "skills-test";
const credentials = btoa(`${username}:${password}`);

document.addEventListener("DOMContentLoaded", () => {
  const navlinks = document.querySelectorAll(".links");

  navlinks.forEach((link) => {
    link.addEventListener("click", function () {
      navlinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
});

//PATIENTS PROFILES
const patientsProfiles = async function () {
  try {
    const response = await fetch(patientsAPI, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });
    const data = await response.json();
    const patientsContainer = document.querySelector(".profiles");
    patientsContainer.innerHTML = "";

    data.forEach((patient) => {
      const patientHtml = `
        <div class="patient-details">
          <div class="patient-name">
            <img src="${patient.profile_picture}" alt="patients-image" />
            <div>
              <p style="font-size: 14px; font-weight: bold">${patient.name}</p>
              <p style="color: #b5b5b5; font-size: 14px">Age: ${patient.age}</p>
            </div>
          </div>
          <div class="expand-more">
              <img src="images/more_horiz.png" alt="more" />
          </div>
        </div>
      `;

      patientsContainer.insertAdjacentHTML("beforeend", patientHtml);
    });
  } catch (error) {
    console.log(error);
  }
};

patientsProfiles();

const myChart = async function () {
  try {
    const response = await fetch(patientsAPI, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });
    const data = await response.json();
    console.log(data);

    const jessicaData = data.find(
      (patient) => patient.name === "Jessica Taylor"
    );

    // VITALS
    const latestDiagnosis =
      jessicaData.diagnosis_history[jessicaData.diagnosis_history.length - 1];
    console.log("Diagnosis:", latestDiagnosis);
    const vitalInfo = document.querySelector(".vitals-div");
    vitalInfo.innerHTML = `
                <div class="vitals" style="background-color: #e0f3fa">
                <img src="images/respiratory_rate.png" alt="respiratory" />
                <p class="rate">Respiratory Rate</p>
                <h6>${latestDiagnosis.respiratory_rate.value} bpm</h6>
                <p class="normal">${latestDiagnosis.respiratory_rate.levels}</p>
              </div>

              <div class="vitals" style="background-color: #ffe6e9">
                <img src="images/temperature.png" alt="temperature" />
                <p class="rate">Temperature</p>
                <h6>${latestDiagnosis.temperature.value} °F</h6>
                <p class="normal">${latestDiagnosis.temperature.levels}</p>
              </div>

              <div class="vitals" style="background-color: #ffe6f1">
                <img src="images/HeartBPM.png" alt="heartBeat" />
                <p class="rate">Heart Rate</p>
                <h6>${latestDiagnosis.heart_rate.value} bpm</h6>
                <p class="normal">${latestDiagnosis.heart_rate.levels}</p>
              </div>
   `;

    //BLOOD PRESSURE DETAILS
    const bloodPressureDetails = document.querySelector(
      ".blood-pressure-details"
    );
    bloodPressureDetails.innerHTML = `
     <div class ="systolic">
     <h6 style="font-size:14px;">Systolic</h6>
     <h4>${latestDiagnosis.blood_pressure.systolic.value}</h4>
     <p style="font-size:14px;">${latestDiagnosis.blood_pressure.systolic.levels}</p>
     </div>
   <hr/>
     <div class ="diastolic">
     <h6 style="font-size:14px;">Diastolic</h6>
     <h4>${latestDiagnosis.blood_pressure.diastolic.value}</h4>
     <p style="font-size:14px";>${latestDiagnosis.blood_pressure.diastolic.levels}</p>
     </div>
    `;

    // JESSICA INFO
    const pressureDetails = document.querySelector(".patient-profile");
    pressureDetails.innerHTML = `
      <img src="${jessicaData.profile_picture}" alt="Jessica's Picture" style="display: block; margin:0 auto;">
      <h5 style="font-size: 20px; text-align:center; margin-top:10px; margin-bottom:10px; " >${jessicaData.name}</h5>

      <div class="png-images">
        <img src='images/BirthIcon.png' alt='Calendar'>
        <div>
          <p >Date of birth</p>
          <p class="png-p">${jessicaData.date_of_birth}</p>
        </div>
      </div>
      
      <div class="png-images">
        <img src='images/FemaleIcon.png' alt='FemaleIcon'>
        <div>
         <p> Gender</p>
         <p class="png-p"> ${jessicaData.gender}</p>
        </div>
      </div>

      <div class="png-images">
        <img src='images/PhoneIcon.png' alt='PhoneIcon'>
        <div>
         <p> Contact Info</p>
         <p class="png-p"> ${jessicaData.phone_number}</p>
        </div>
      </div>
      
     
      <div class="png-images">
        <img src='images/PhoneIcon.png' alt='PhoneIcon'>
        <div>
         <p>Emergency Contacts</p>
         <p class="png-p">${jessicaData.emergency_contact}</p>
        </div>
     </div>

        
     
      <div class="png-images">
        <img src='images/InsuranceIcon.png' alt='Insurance'>
        <div>
         <p >Insurance Provider</p>
         <p class="png-p"> ${jessicaData.insurance_type}</p>
        </div>
      </div>
      <button class="info-btn">Show All Information</button>
    `;

    //DIAGNOSTIC-LIST
    const diagnosticList = document.querySelector(".problem-info");
    diagnosticList.innerHTML = "";
    jessicaData.diagnostic_list.forEach((diagnostic) => {
      console.log(diagnostic);
      diagnosticList.innerHTML += `
      
      <div class="box-container">
      <div class="box">
        <p>${diagnostic.name}</p>
      </div>
      <div class="box">
        <p>${diagnostic.description}</p>
      </div>
      <div class="box">
        <p style="margin-left: 4rem">${diagnostic.status}</p>
      </div>
      </div>
      `;
    });

    //LAB RESULTS
    const labResults = document.querySelector(".results");
    jessicaData.lab_results.forEach((result) => {
      labResults.innerHTML += `
      <div class="tests">
      <p>${result}</p>
      <img src="images/download.png" alt="download" />
    </div>
      `;
    });

    // CHART | GRAPH
    const filteredHistory = jessicaData.diagnosis_history.filter((record) => {
      const date = new Date(`${record.month} 1, ${record.year}`);
      const startDate = new Date("October 1, 2023");
      const endDate = new Date("March 31, 2024");
      return date >= startDate && date <= endDate;
    });

    const labels = filteredHistory.map((record) => {
      const date = new Date(`${record.month} 1, ${record.year}`);
      const monthAbbr = date.toLocaleString("default", { month: "short" });
      return `${monthAbbr}.${record.year}`;
    });

    const systolicPressure = filteredHistory.map(
      (record) => record.blood_pressure.systolic.value
    );
    const diastolicPressure = filteredHistory.map(
      (record) => record.blood_pressure.diastolic.value
    );

    const ctx = document.getElementById("myChart").getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Systolic Pressure",
            data: systolicPressure,
            borderColor: "#E66FD2",
            borderWidth: 2,
            tension: 0.1,
            fill: false,
          },
          {
            label: "Diastolic Pressure",
            data: diastolicPressure,
            borderColor: "#8C6FE6",
            borderWidth: 2,
            tension: 0.1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function (value) {
                return value;
              },
              stepSize: 20,
              suggestedMin: 60,
              suggestedMax: 180,
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

myChart();
