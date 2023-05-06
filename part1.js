// The points to be used for interpolation
const points = [
  [1, 4522.68],
  [2, 4307.54],
  [3, 4605.38],
  [4, 4567.00],
  [5, 4766.18],
  [6, 4515.55],
  [7, 4373.79],
  [8, 4530.41],
  [9, 4131.93],
  [10, 4132.15],
  [11, 3785.38],
  [12, 4130.29],
  [13, 3955.00],
  [14, 3585.62],
  [15, 3871.98],
  [16, 4080.11],
  [17, 3839.50],
  [18, 4076.60],
  [19, 3970.15],
  [20, 4109.31]
];

// Generate fields for each point
let pointsContainer = document.getElementById("pointsContainer");
for (let i = 0; i < points.length; i++) {
  let pointDiv = document.createElement("div");
  pointDiv.innerHTML = `
  (${points[i][0]}, ${points[i][1].toFixed(2)})
  `;
  pointsContainer.appendChild(pointDiv);
}

function calculate() {
  // Get the value of x to solve P(x)
  let xValue = parseFloat(document.getElementById("xValue").value.trim());

  // Get the data points from the points array
  let xArr = [], yArr = [];
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0];
    let y = points[i][1];
    xArr.push(x);
    yArr.push(y);
  }

  // Calculate the divided differences
  let n = xArr.length;
  let fArr = yArr.slice(); // Copy yArr
  for (let k = 1; k < n; k++) {
    for (let i = n-1; i >= k; i--) {
      fArr[i] = (fArr[i] - fArr[i-1]) / (xArr[i] - xArr[i-k]);
    }
  }

  // Compute the interpolating polynomial
  let p = fArr[n-1];
  for (let i = n-2; i >= 0; i--) {
    p = fArr[i] + (xValue - xArr[i]) * p;
  }

  // Display the result
  document.getElementById("result").innerHTML = "P(" + xValue + ") = " + p.toFixed(2);
  //displaying the Polynomial
  displayPolynomial(xArr, fArr);
}

function displayPolynomial(xArr, fArr) {
  let polyStr = "P(x) = ";
  let n = xArr.length;
  for (let i = 0; i < n; i++) {
    let term = "";
    if (i > 0) {
      term += "(x - " + xArr[i-1] + ")";
    }
    if (i < n-1) {
      term += " * ";
    }
    let coefficient = fArr[i].toFixed(2);
    polyStr += coefficient + term;
  }
  document.getElementById("polynomial").innerHTML = polyStr;
}
