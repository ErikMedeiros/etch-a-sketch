function createCells(n, line) {
    for (let j = 0; j < n; j++) {
        const cell = document.createElement("div")

        cell.className = "cell"
        cell.addEventListener("mouseenter", () => {
            if(useRandomColors) {
                const randColor = Math.floor(Math.random()*16777215).toString(16);
                cell.style.backgroundColor = `#${randColor}`
            } else {
                cell.style.backgroundColor = color
            }
            
            if(limitOpacity && (opacity = Number(cell.style.opacity)) < 1) {                
                cell.style.opacity = opacity + 0.1
            }

            if(color === "#ffffff") {
                if(cellsPainted.includes(cell)) {
                    const index = cellsPainted.indexOf(cell);
                    cellsPainted.splice(index, index + 1);
                }
            }
            else if (!cellsPainted.includes(cell))
                cellsPainted.push(cell)
        })

        line.append(cell)
    }
}

function resizeCanvas(canvas, size) {
    const lines = canvas.childNodes
    const numLines = lines.length

    if (numLines < size) {
        for(let i = 0; i < size; i++) {
            if(i < numLines) {
                createCells(size - numLines, lines[i])
            } else {
                const line = document.createElement("div")
                line.className = "line"

                createCells(size, line)

                canvas.append(line)
            }
        }
    }
    else if (numLines > size) {
        for (let i = numLines - 1; i >= 0; i--) {
            if (i < size) {
                for (let j = numLines - 1; j >= size; j--) {
                    lines[i].removeChild(lines[i].childNodes[j])
                }
            } else {
                canvas.removeChild(lines[i])
            }
        }
    }
}

const canvas = document.querySelector("#canvas")
const cellsPainted = []
let color = "#000000"

for (let i = 0; i < 16; i++) {
    const line = document.createElement("div")
    line.className = "line"

    createCells(16, line)

    canvas.append(line)
}

const btnClear = document.querySelector("#clear")
btnClear.addEventListener("click", () => {
    for (let i = cellsPainted.length - 1; i >= 0; i--) {
        cellsPainted[i].removeAttribute("style")
        cellsPainted.pop()
    }
})

const sizeSlider = document.querySelector("#slider")
sizeSlider.addEventListener("input", () => {
    const gridSize = Number(sizeSlider.value)

    const sliderLabel = document.querySelector("#slider-label")
    sliderLabel.textContent = `${gridSize}x${gridSize}`

    btnClear.click()
    resizeCanvas(canvas, gridSize)
})

const colorPicker = document.querySelector("#color-picker")
colorPicker.addEventListener("input", () => {
    color = colorPicker.value
})

let useRandomColors = false
const randomCheckbox = document.querySelector("#random-colors")
randomCheckbox.addEventListener("input", () => {
    useRandomColors = randomCheckbox.checked
})

let limitOpacity = false
const opacityCheckbox = document.querySelector("#opacity")
opacityCheckbox.addEventListener("input", () => {
    limitOpacity = opacityCheckbox.checked
    btnClear.click()
})