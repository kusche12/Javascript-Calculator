let currentAmount = '0'; // Current user input (number or a math operation)
let totalAmount = '';    // Total function that the user is inputting
let prevAnswer = '';     // Previously inputted solution
let isInt = true;        // Returns true when number is an integer

function appendNumber(num) {    // Allows user to append digits to a number
    if (totalAmount.includes("=")) {
        totalAmount = currentAmount;
        currentAmount = "0";
    }

    if (currentAmount == '0') {
        currentAmount = num;
        totalAmount = num;
    } else {
        currentAmount += num;
        totalAmount += num;
    }
    document.getElementById('display-current').innerHTML = currentAmount;
    document.getElementById('display-total').innerHTML = totalAmount;
}

function appendDecimal() {  // Allows user to append one decimal per number
    if (isInt) {
        currentAmount += '.';
        totalAmount += '.';
    }
    isInt = false;
    document.getElementById('display-current').innerHTML = currentAmount;
    document.getElementById('display-total').innerHTML = totalAmount;
}

function clearDisplay() {   // Clears the display
    currentAmount = '0';
    totalAmount = '';
    isInt = true;
    document.getElementById('display-current').innerHTML = currentAmount;
    document.getElementById('display-total').innerHTML = totalAmount;
}

function doMath(mathType) { // Allows user to input mathematical operation
    if (totalAmount.includes("=")) {
        totalAmount = prevAnswer;
        currentAmount = "0";
    }

    if (currentAmount != '' && mathType != '-') {
        totalAmount += mathType;
        currentAmount = '';
        isInt = true;
    } else if (currentAmount != '' && mathType == '-') { // User wants to subtract to positive numbers
        totalAmount += mathType;
        currentAmount = '';
        isInt = true;
    } else if (currentAmount == '' && mathType == '-') { // User has a number and an operator and want to make a negative number
        totalAmount += mathType;
        currentAmount = '';
        isInt = true;
    }
    document.getElementById('display-current').innerHTML = mathType;
    document.getElementById('display-total').innerHTML = totalAmount;
}

function equals() { // Performs order of operations to return answer in formula logic (PEMDAS)
    let totalFunction = [];
    let num = '';

    for (let i = 0; i < totalAmount.length; i++) {
        if (["x","+","/"].indexOf(totalAmount[i]) == -1) { 
            if (totalAmount[i] == '-' && ["x","+","/"].indexOf(totalAmount[i-1]) == -1) {
                totalFunction.push(parseFloat(num));
                totalFunction.push("+");
                num = totalAmount[i];
            } else {
                num += totalAmount[i];
            } 

        } else {
            totalFunction.push(parseFloat(num));
            totalFunction.push(totalAmount[i]);
            num = '';
        }
    }
    totalFunction.push(parseFloat(num));

    while(totalFunction.includes('/') || totalFunction.includes('x') || totalFunction.includes('+')) {
        while(totalFunction.includes('/')) {
            for (let i = 0; i < totalFunction.length; i++) {
                if (totalFunction[i] == "/") {
                    var combined = totalFunction[i-1] / totalFunction[i+1];
                    totalFunction[i-1] = combined;
                    totalFunction.splice((i), (i+1));
                }
            }
        }
        while(totalFunction.includes('x')) {
            for (let i = 0; i < totalFunction.length; i++) {
                if (totalFunction[i] == "x") {
                    var combined = totalFunction[i-1] * totalFunction[i+1];
                    totalFunction[i-1] = combined;
                    totalFunction.splice((i), (i+1));
                }
            }
        }
        while(totalFunction.includes('+')) {
            for (let i = 0; i < totalFunction.length; i++) {
                if (totalFunction[i] == "+") {
                    var combined = totalFunction[i-1] + totalFunction[i+1];
                    totalFunction[i-1] = combined;
                    totalFunction.splice((i), (i+1));
                }
            }
        }
    }

    currentAmount = totalFunction[0];
    totalAmount += "=" + currentAmount;
    prevAnswer = currentAmount;

    document.getElementById('display-current').innerHTML = currentAmount;
    document.getElementById('display-total').innerHTML = totalAmount;
}