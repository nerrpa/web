function validateForm() {
    //const xSelect = document.querySelector('.x-input');
    const yInput = document.getElementById('yInput');
    const rCheckboxes = document.querySelectorAll('input[name="r"]:checked');
    const errorMessage = document.getElementById('error-message');


    var selectElement = document.getElementById('x');
    var xValue = selectElement.options[selectElement.selectedIndex].value;

    if (xValue === "choose") {
        errorMessage.textContent = 'Пожалуйста, выберите значение X.';
        errorMessage.style.display = 'block';
        return false;
    }

    //const yValue = yInput.value.replace('/,/g', '.');
  
    const yValue = parseFloat(yInput.value);
    //const yValue = yYValue.toFixed(5);
    //const yValue = parseFloat(yInput.value.replace(',', '.')).toFixed(2);
    

    if (isNaN(yValue) || yValue < -5 || yValue > 5) {
      errorMessage.textContent = 'Неверное значение Y. Пожалуйста, введите число от -5 до 5.';
      errorMessage.style.display = 'block';
      return false;
    }
  
    if (rCheckboxes.length === 0) {
      errorMessage.textContent = 'Пожалуйста, выберите хотя бы одно значение R.';
      errorMessage.style.display = 'block';
      return false;
    }
  
    errorMessage.style.display = 'none';
    return true;
  }
  
  
  // Функция для обработки отправки формы
  function handleSubmit(event) {
    event.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    const xSelect = document.querySelector('.x-input');
    const yInput = document.getElementById('yInput');
    const rCheckboxes = document.querySelectorAll('input[name="r"]:checked');
  
    let xValue = null;
    for (const selected of xSelect) {
      if (selected.classList.contains('selected')) {
        xValue = parseFloat(selected.value);
        break;
      }
    };
    const yValue = parseFloat(yInput.value);
    const rValues = Array.from(rCheckboxes).map((checkbox) => checkbox.value);
  
    for (let rValue of rValues){
      const requestData = {
        x: xValue,
        y: yValue,
        r: rValue,
      };
    
      const url = 'script.php?' + new URLSearchParams(requestData);
    
      const startTime = performance.now();
      if (requestData.x, requestData.y, requestData.r){
        fetch(url)
          .then((response) => response.json())
          .then((result) => {
            const endTime = performance.now();
            const requestTime = endTime - startTime;
            console.log(result);
            let savedResults = getSavedResults() || [];
  
            let resultData = {
              x: result.x,
              y: result.y,
              r: result.r,
              timeNow: new Date().toLocaleString(),
              time: parseFloat(result.extime),
              result: JSON.stringify(result.isInArea)
            };
  
            savedResults.push(resultData);
            localStorage.setItem('results', JSON.stringify(savedResults));
          })
          .catch((error) => {
            console.error('Ошибка:', error);
          });
      }
    };
  }
  
  function getSavedResults() {
    let savedResults = localStorage.getItem('results');
    return savedResults ? JSON.parse(savedResults) : [];
  }
  
  function displayPreviousResults(previousResults) {
    const previousResultsTable = document.getElementById('previous-results');
  
    // Делаем новую строку
    const headerRow = previousResultsTable.insertRow(0);
    const headers = ['X', 'Y', 'R', 'Time', 'Current Time', 'Hit'];
  
    headers.forEach((headerText, index) => {
      const headerCell = document.createElement('th');
      headerCell.textContent = headerText;
      headerRow.appendChild(headerCell);
    });
  
    previousResults.forEach((result, index) => {
      const newRow = previousResultsTable.insertRow(index + 1);
      const xCell = newRow.insertCell(0);
      const yCell = newRow.insertCell(1);
      const rCell = newRow.insertCell(2);
      const timeCell = newRow.insertCell(3);
      const currentTimeCell = newRow.insertCell(4);
      const hitCell = newRow.insertCell(5);
  
      xCell.textContent = result.x;
      yCell.textContent = result.y;
      rCell.textContent = result.r;
      timeCell.textContent = result.time;
      currentTimeCell.textContent = new Date().toLocaleString();
      hitCell.textContent = result.result;
    });
  }
  
  
  
  // Функция для обновления блока с результатами
  function updateResults() {
  
    window.location.href = 'results.html';
  }
  
  // Добавляем прослушиватель событий на кнопку отправки формы
  const form = document.getElementById('data-form');
  form.addEventListener('submit', handleSubmit);
  var resultButton = document.querySelector('button[type="result"]');

  yInput.addEventListener('change', function() {
    const newValue = yInput.value.replace(',', '.');
    yInput.value = newValue;
  });
  
  resultButton.addEventListener('click', updateResults);
  
  function showError(message) {
    const errorDiv = document.getElementById('error_div');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(function () {
        errorDiv.style.display = 'none';
    }, 3000);
  }
  