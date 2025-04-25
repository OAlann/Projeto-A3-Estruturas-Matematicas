function generateInputs() {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const container = document.getElementById("matrices");
  container.innerHTML = "";

  container.appendChild(createMatrixInput("A", rows, cols));
  container.appendChild(createMatrixInput("B", rows, cols));

  // Mostrar ou esconder botão de determinante
  const determinantBtns = document.getElementById("determinant-buttons");
  if (rows === cols) {
    determinantBtns.style.display = "block";
  } else {
    determinantBtns.style.display = "none";
  }
}

function createMatrixInput(name, rows, cols) {
  const wrapper = document.createElement("div");
  wrapper.className = "matrix-wrapper mb-4";

  const label = document.createElement("h5");
  label.textContent = `Matriz ${name}`;
  wrapper.appendChild(label);

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.className = "mb-2";
    for (let j = 0; j < cols; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.className = "matrix-input form-control d-inline-block m-1";
      input.style.width = "60px";
      input.id = `${name}-${i}-${j}`;
      row.appendChild(input);
    }
    wrapper.appendChild(row);
  }

  return wrapper;
}

function getMatrix(name, rows, cols) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const value = parseFloat(document.getElementById(`${name}-${i}-${j}`).value);
      row.push(isNaN(value) ? 0 : value);
    }
    matrix.push(row);
  }
  return matrix;
}

function calculate(operation) {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const A = getMatrix("A", rows, cols);
  const B = getMatrix("B", rows, cols);

  let result = [];

  if ((operation === "add" || operation === "subtract") && (rows !== parseInt(document.getElementById("rows").value) || cols !== parseInt(document.getElementById("cols").value))) {
    return showResult("As matrizes devem ter o mesmo tamanho.");
  }

  if (operation === "add") {
    for (let i = 0; i < rows; i++) {
      result[i] = [];
      for (let j = 0; j < cols; j++) {
        result[i][j] = A[i][j] + B[i][j];
      }
    }
  } else if (operation === "subtract") {
    for (let i = 0; i < rows; i++) {
      result[i] = [];
      for (let j = 0; j < cols; j++) {
        result[i][j] = A[i][j] - B[i][j];
      }
    }
  } else if (operation === "multiply") {
    if (A[0].length !== B.length) {
      return showResult("Para multiplicação, o número de colunas da matriz A deve ser igual ao número de linhas da matriz B.");
    }
    for (let i = 0; i < A.length; i++) {
      result[i] = [];
      for (let j = 0; j < B[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < A[0].length; k++) {
          sum += A[i][k] * B[k][j];
        }
        result[i][j] = sum;
      }
    }
  }

  showResultMatrix(result);
}

function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const transposed = [];

  for (let i = 0; i < cols; i++) {
    transposed[i] = [];
    for (let j = 0; j < rows; j++) {
      transposed[i][j] = matrix[j][i];
    }
  }

  return transposed;
}

function showTranspose(matrixName) {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const matrix = getMatrix(matrixName, rows, cols);
  const result = transpose(matrix);
  showResultMatrix(result);
}

function calculateDeterminantOf(matrix) {
  const size = matrix.length;

  if (size === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }

  if (size === 3) {
    return (
      matrix[0][0] * matrix[1][1] * matrix[2][2] +
      matrix[0][1] * matrix[1][2] * matrix[2][0] +
      matrix[0][2] * matrix[1][0] * matrix[2][1] -
      matrix[0][2] * matrix[1][1] * matrix[2][0] -
      matrix[0][0] * matrix[1][2] * matrix[2][1] -
      matrix[0][1] * matrix[1][0] * matrix[2][2]
    );
  }

  return "Determinante suportado apenas para matrizes 2x2 ou 3x3.";
}

function showDeterminant(matrixName) {
  const size = parseInt(document.getElementById("rows").value);
  const matrix = getMatrix(matrixName, size, size);
  const result = calculateDeterminantOf(matrix);
  showResult(`<strong>Determinante de ${matrixName}:</strong> ${result}`);
}

function showResultMatrix(matrix) {
  const container = document.getElementById("result");
  container.innerHTML = "<h5>Resultado:</h5>";
  const table = document.createElement("table");
  table.className = "table table-bordered w-auto";

  matrix.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(value => {
      const td = document.createElement("td");
      td.textContent = value.toFixed(2);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  container.appendChild(table);
}

function showResult(msg) {
  const container = document.getElementById("result");
  container.innerHTML = `<div class="alert alert-info mt-3">${msg}</div>`;
}

function displayMatrix(matrix, resultContainerId) {
  const container = document.getElementById(resultContainerId);
  container.innerHTML = ''; // Limpa o container antes de adicionar nova matriz

  // Criando a estrutura da matriz em quadrados
  matrix.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('matrix');
    row.forEach(value => {
      const valueDiv = document.createElement('div');
      valueDiv.textContent = value;
      rowDiv.appendChild(valueDiv);
    });
    container.appendChild(rowDiv);
  });
}
