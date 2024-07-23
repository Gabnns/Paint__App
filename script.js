const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const inputColor = document.querySelector(".input__color");
const tools = document.querySelectorAll(".button__tool");
const sizeButtons = document.querySelectorAll(".button__size");
const buttonClear = document.querySelector(".button__clear");

let brushSize = 20;

let isPainting = false;

let activeTool = "brush"


// Esse envento funciona quando acessamos o input de seleção de cor. Pegamos o valor da cor selecionado e tranfesrimos ele para o ctx.fillStyle que é chamado quando desenhamos.
inputColor.addEventListener("change", ({ target }) => {
    ctx.fillStyle = target.value;
})

// Evento de quando precionamos o mouse na tela.
canvas.addEventListener("mousedown", ({ clientX, clientY }) => {
  isPainting = true;

  // função pra saber se estou com o pincel ou com a borracha
  if(activeTool === "brush"){
    draw(clientX, clientY);
  }

  if(activeTool === "rubber"){
    erase(clientX, clientY)
  }

});
// Evento de quando mover o mouse pressionado, acionar a variável isPainting(true).
canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
  if (isPainting) {
    // função pra saber se estou com o pincel ou com a borracha
    if(activeTool === "brush"){
        draw(clientX, clientY);
      }

      if(activeTool === "rubber"){
        erase(clientX, clientY)
      }
  }
});
// Essa função faz com que, assim que soltamos o botão do mouse, ele retorna a variavel isPaint(false).
canvas.addEventListener("mouseup", ({ clientX, clientY }) => {
    isPainting = false;
});

const draw = (x, y) => {
    ctx.globalCompositeOperation = "source-over"

  ctx.beginPath();
  // Calcula a posição de onde começa o objeto inserido em relação ao topo e lado da página.
  // === (brushSize) é o tamanho escolhido do "pincel", porém o tamanho escolhido é de acordo com o raio, ou seja, o dobro do valor. Por isso dividimos por 2 para obtermos o valor do tamho total do circulo que queremos. Exemplo: tamanho - 20, se não dividir, será 40(soma do raio do circulo), divindo por 2, obteremos o valor de 20, que é o tamanho desejado. ===
  ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 90);
  // ctx.fill é a função que selecionamos para que seja preenchido o objeto inserido na tela. Podemos inserir apenas o contorno com ctx.stroke().
  ctx.fill();
};

const erase = (x, y) => {
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath();
    // Calcula a posição de onde começa o objeto inserido em relação ao topo e lado da página.
    // === (brushSize) é o tamanho escolhido do "pincel", porém o tamanho escolhido é de acordo com o raio, ou seja, o dobro do valor. Por isso dividimos por 2 para obtermos o valor do tamho total do circulo que queremos. Exemplo: tamanho - 20, se não dividir, será 40(soma do raio do circulo), divindo por 2, obteremos o valor de 20, que é o tamanho desejado. ===
    ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 90);
    // ctx.fill é a função que selecionamos para que seja preenchido o objeto inserido na tela. Podemos inserir apenas o contorno com ctx.stroke().
    ctx.fill();
  };


const selectTool = ({ target }) => {
    const selectedTool = target.closest("button");
    const action = selectedTool.getAttribute("data-action")

    if(action){
        tools.forEach((tool) => tool.classList.remove("active"))

        activeTool = action
        selectedTool.classList.add("active")
    }
}

const selectSize = ({ target }) => {
    const selectedTool = target.closest("button");
    const size = selectedTool.getAttribute("data-size")

        sizeButtons.forEach((tool) => tool.classList.remove("active"))
        selectedTool.classList.add("active")
        brushSize = size

}

// Percorre a div de ferramentas e aplica um evento de click pra cada uma.
tools.forEach((tool) => {
    tool.addEventListener("click", selectTool)
})

sizeButtons.forEach((button) => {
    button.addEventListener("click", selectSize)
})


buttonClear.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})