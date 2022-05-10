// все переменные на ввод //
const gender = document.querySelector('.switcher input:checked').value;
const age = document.querySelector('#age').value;
const height = document.querySelector('#height').value;
const weight = document.querySelector('#weight').value;
const heading = document.querySelector('.radios-group input:checked').value;


//расчет калорий норма для мужчины и женщины//
normalCalories((gender) => {
  const normal = 0;
  if (gender == 'male') {
    return  normal += (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } 
  return normal += (10 * weight) + (6.25 * height) - (5 * age) - 161;
  
 });

//расчет калорий по индексу нашрузки//
indexCalories((heading) => {
   const normalIndex = 0;
   if (heading == 'min') {
     normalIndex = normalCalories() * 1.2;
   } 
   if (heading == 'low') {
    normalIndex = normalCalories() * 1.375;
  } 
  if (heading == 'medium') {
    normalIndex = normalCalories() * 1.55;
  } 
  if (heading == 'high') {
    normalIndex = normalCalories() * 1.725;
  } 
  if (heading == 'max') {
    normalIndex = normalCalories() * 1.9;
  };
 });
 // Данные для вывода в итоговую форму (норма, набор веса и снижение веса)//
changeCalories = () =>{
  const normWeight = normalIndex;
  const persent = normalIndex * 0.15;
  const gainWeight = normWeight + persent;
  const lossWeight = normWeight - persent;
  
  return result = {
    normWeight,
    gainWeight,
    lossWeight
  };
}

// активная форма, после заполнения всех инпутов//
const inputGroups = document.querySelectorAll('.inputs-group input');
const buttonResult = document.querySelector('.form__submit-button');
const buttonReset = document.querySelector('.form__reset-button');
const counterResult = document.querySelector('.counter__result');

inputGroups.forEach((input) => {
    input.addEventListener('input', () => {
        checkInputHaveValue() ? buttonReset.disabled = false : buttonReset.disabled = true;
        checkAllInputsHaveValue() ? buttonResult.disabled = false : buttonResult.disabled = true;
    })
})

function checkInputHaveValue() {
    let checkInputs = [];
    inputGroups.forEach((input) => {
        if (input.value !== '') {
            checkInputs.push(input.value);
        }
    })
    return checkInputs.length >= 1 ? true : false;
}

function checkAllInputsHaveValue() {
    let allCheckInputs = [];
    inputGroups.forEach((input) => {
        if (input.value !== '') {
            allCheckInputs.push(input.value);
        }
    })
    return allCheckInputs.length === 3 ? true : false;
}

// возврат результатов//
function showResults(result) {
  const caloriesNorm = counterResult.querySelector('#calories-norm');
  const caloriesMin = counterResult.querySelector('#calories-minimal');
  const caloriesMax = counterResult.querySelector('#calories-maximal');

  function insertingResults() {
      caloriesNorm.textContent = result.normWeight;
      caloriesMin.textContent = result.lossWeight;
      caloriesMax.textContent = result.gainWeight;
  }

  if (!counterResult.classList.contains('counter__result--hidden')) {
      insertingResults();
  } else {
      insertingResults();
      counterResult.classList.remove('counter__result--hidden')
  }
}
  
form.addEventListener('submit', (event) => {
  event.preventDefault();
  let calories = changeCaloriess();
  showResults(calories);
  
})

form.addEventListener('reset', () => {
  counterResult.classList.add('counter__result--hidden');
  buttonResult.disabled = true;
  buttonReset.disabled = true;
})






