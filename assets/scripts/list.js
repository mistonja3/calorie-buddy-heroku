var sumButton = document.querySelector('#sum_it');
var sumCal = document.querySelector('.calc-food');

sumButton.addEventListener('click', sumCalories);

function sumCalories(){
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    let fat = 0;
    let salt = 0;
    let sugar = 0;
    let boxes = document.querySelectorAll('input[type=checkbox]:checked')    
    
    
    for(let i = 0; i < boxes.length; i++){
        let fieldVal = boxes[i].value;
        calories += parseFloat(document.getElementById("amount"+fieldVal).value) * parseFloat(document.getElementById("calories"+fieldVal).innerHTML);
        carbs += parseFloat(document.getElementById("amount"+fieldVal).value) * parseFloat(document.getElementById("carbs"+fieldVal).innerHTML);
        protein += parseFloat(document.getElementById("amount"+fieldVal).value) * parseFloat(document.getElementById("protein"+fieldVal).innerHTML);
        fat += parseFloat(document.getElementById("amount"+fieldVal).value) * parseFloat(document.getElementById("fat"+fieldVal).innerHTML);
        salt += parseFloat(document.getElementById("amount"+fieldVal).value) * parseFloat(document.getElementById("salt"+fieldVal).innerHTML);
        sugar += parseFloat(document.getElementById("amount"+fieldVal).value) * parseFloat(document.getElementById("sugar"+fieldVal).innerHTML);
    }

    if(boxes.length > 0){
        sumCal.classList.remove('hidden');
        document.getElementById("calories_sum").innerHTML = calories;
        document.getElementById("carbs_sum").innerHTML = parseFloat(carbs).toFixed(2) + "g";
        document.getElementById("protein_sum").innerHTML = parseFloat(protein).toFixed(2) + "g";
        document.getElementById("fat_sum").innerHTML = parseFloat(fat).toFixed(2) + "g";
        document.getElementById("salt_sum").innerHTML = parseFloat(salt).toFixed(2) + "g";
        document.getElementById("sugar_sum").innerHTML = parseFloat(sugar).toFixed(2) + "g";
    }
    else{
        alert("Please check the boxes for selected foods")
    }

}