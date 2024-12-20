document.getElementById('calc').addEventListener('click', function(event) {
    event.preventDefault(); //prevent default form submission

    //debugging
    console.log("Button Clicked");

    //getting the input values and changing them to numbers
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);
    let num3 = parseFloat(document.getElementById('num3').value);

    //check to see if each input is valid
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        alert("Please enter valid numbers.");
        return;
    }

    //storing the numbers in an array
    let numbers = [num1, num2, num3];

    //calculating the median
    numbers.sort((a, b) => a - b);
    let median = numbers[1];
    
    //calculating the maximum, minimum, range, and average
    let max = Math.max(...numbers);
    let min = Math.min(...numbers);
    let range = max - min;
    let sum = numbers.reduce((acc, num) => acc + num, 0);
    let avg = sum / numbers.length;
    
    //calculating the mode with a function
    function calculateMode(arr) {
        const frequency = {};  // Object to store frequency of each number
        let maxFreq = 0;       // Maximum frequency
        let mode = [];         // Mode value(s)

        //counting the occurrences of each number
        arr.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
            if (frequency[num] > maxFreq) {
                maxFreq = frequency[num];
            }
        });

        //finding any numbers who have a frequency
        for (let num in frequency) {
            if (frequency[num] === maxFreq) {
                mode.push(Number(num));
            }
        }

        return mode.length === arr.length ? "No Mode" : mode.join(", ");
    }

    let mode = calculateMode(numbers);

    //displaying the results
    document.getElementById('result').innerHTML = `
        Maximum: ${max}<br>
        Minimum: ${min}<br>
        Average: ${avg.toFixed(2)}<br>
        Median: ${median}<br>
        Range: ${range}<br>
        Mode: ${mode}
    `;
});


