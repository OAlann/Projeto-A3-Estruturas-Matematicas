function generateInputs() {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    const container = document.getElementById("matrices");
    container.innerHTML = "";
  
    container.appendChild(createMatrixInput("A", rows, cols));
    container.appendChild(createMatrixInput("B", rows, cols));
  }
  
  function createMatrixInput(name, rows, cols) {
    const col = document.createElement("div");
    col.className = "col-md-6";
    col.innerHTML = `<div class="matrix-title">Matriz ${name}</div>`;
  
    for (let i = 0; i < rows; i++) {
      const row = document.createElement("div");
      for (let j = 0; j < cols; j++) {
        const input = document.createElement("input");
        input.type = "number";
        input.className = "form-control d-inline mx-1 my-1";
        input.id = `${name}-${i}-${j}`;
        input.value = 0;
        row.appendChild(input);
      }
      col.appendChild(row);
    }
  
    return col;
  }
  
  function getMatrix(name, rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
      matrix[i] = [];
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = parseFloat(document.getElementById(`${name}-${i}-${j}`).value) || 0;
      }
    }
    return matrix;
  }
  
  function calculate(operation) {
    const rows = parseInt(document.getElementById("rows").value);
    const cols = parseInt(document.getElementById("cols").value);
    const A = getMatrix("A", rows, cols);
    const B = getMatrix("B", rows, cols);
    let result = [];
  
    if (operation === "sum" || operation === "sub") {
      for (let i = 0; i < rows; i++) {
        result[i] = [];
        for (let j = 0; j < cols; j++) {
          result[i][j] = operation === "sum" ? A[i][j] + B[i][j] : A[i][j] - B[i][j];
        }
      }
    } else if (operation === "mul") {
      if (A[0].length !== B.length) {
        return showResult("❌ Multiplicação inválida! Colunas de A ≠ Linhas de B.");
      }
  
      const resultRows = A.length;
      const resultCols = B[0].length;
      const common = A[0].length;
      for (let i = 0; i < resultRows; i++) {
        result[i] = [];
        for (let j = 0; j < resultCols; j++) {
          let sum = 0;
          for (let k = 0; k < common; k++) {
            sum += A[i][k] * B[k][j];
          }
          result[i][j] = sum;
        }
      }
    }
  
    showResultMatrix(result);
  }
  
  function showResultMatrix(matrix) {
    let html = "<h4>Resultado:</h4>";
    matrix.forEach(row => {
      row.forEach(val => {
        html += `<input type="text" value="${val}" disabled class="form-control d-inline m-1" style="width:60px;">`;
      });
      html += "<br>";
    });
    document.getElementById("result").innerHTML = html;
  }
  
  function showResult(msg) {
    document.getElementById("result").innerHTML = `<div class="alert alert-danger">${msg}</div>`;
  }
  