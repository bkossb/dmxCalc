var switchButtons = document.getElementsByClassName("switch");
var flag = [];
var addressCount = 0;
var ledDisplay = document.getElementById("dmxActiveIcon");
var ledIconInterval;
var inputDipDisplay = document.getElementById("dipCounter");

inputDipDisplay.addEventListener("change", function () {
    calculateBinaryDipSwitch(Number(inputDipDisplay.value));
});


function initializeButtons() {
    for (var i = 0; i < switchButtons.length; i++) {
        flag[i] = true;
        switchButtons[i].addEventListener("click", function () {
            var value = Number(this.getAttribute('value'));
            calculateAddress(value);
        })
    }
}

initializeButtons();

function sumAddress(value) {
    if (flag[value] === true) {
        flag[value] = !flag[value];
        return Math.pow(2, value);
    }

    else {
        flag[value] = !flag[value];
        return (-1) * Math.pow(2, value);
    }

}

function calculateAddress(value) {
    if (value === 9) {
        flag[value] = !flag[value];
        dmxOnDisplay(flag[value]);
        switchButtons[9].classList.toggle("switchClick")

    }
    else {
        addressCount += sumAddress(value);
        calculateBinaryDipSwitch(addressCount);
    }

}


function dmxOnDisplay(flag) {
    if (!flag) {
        ledIconInterval = setInterval(function () {
            ledDisplay.classList.toggle("ledOn");
        }, 200);
    }
    else {
        clearInterval(ledIconInterval);
        ledDisplay.classList.remove("ledOn");
    }
}

function setDisplayContent(addressCount) {
    inputDipDisplay.value = addressCount;
}

function calculateBinaryDipSwitch(value) {

    addressCount = value;
    var binaryAddress = dec2bin(value).split('').reverse().join('');
    for (var i = 0; i <= 9; i++) {
        if (binaryAddress[i] === "1") {
            flag[i]=false;
            switchButtons[i].classList.add("switchClick")
        }
        else {
            flag[i]=true;
            switchButtons[i].classList.remove("switchClick")
        }
    }
    setDisplayContent(value);
}


function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}
