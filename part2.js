function generateFields() {
    // Clear the pointsContainer
    let pointsContainer = document.getElementById("pointsContainer");
    pointsContainer.innerHTML = "";
  
    // Get the number of points from the input field
    let pointsCount = parseInt(document.getElementById("pointsCount").value.trim());
  
    // Create input fields for each point
    for (let i = 1; i <= pointsCount; i++) {
      let pointDiv = document.createElement("div");
      pointDiv.innerHTML = `
      Point ${i}<br>
      <input type="number" id="x${i}" step="any" placeholder="X${i}">
      <input type="number" id="y${i}" step="any" placeholder="Y${i}">
      <hr>
    `;
      pointsContainer.appendChild(pointDiv);
    }
  }
  
  function calculate() {
    // Get the data points from the input fields
    let pointsCount = parseInt(document.getElementById("pointsCount").value.trim());
    let xArr = [], yArr = [];
    for (let i = 1; i <= pointsCount; i++) {
      let x = parseFloat(document.getElementById("x" + i).value.trim());
      let y = parseFloat(document.getElementById("y" + i).value.trim());
      xArr.push(x);
      yArr.push(y);
    }
  
    // Get the value of x to solve P(x)
    let xValue = parseFloat(document.getElementById("xValue").value.trim());
  
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
    document.getElementById("result").innerHTML = "P(" + xValue + ") = " + p;
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
      polyStr += fArr[i].toFixed(2) + term;
    }
    document.getElementById("polynomial").innerHTML = polyStr;
  }

//Clear Fields
  function clearFields(){
    document.getElementById("polynomial").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("xValue").value = "";

    generateFields();
  }