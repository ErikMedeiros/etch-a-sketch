function createCells(n, line) {
    for (let j = 0; j < n; j++) {
        const cell = document.createElement("div")

        cell.className = "cell"
        cell.addEventListener("mouseenter", () => {
            cell.style.backgroundColor = color

            if (!cellsPainted.includes(cell))
                cellsPainted.push(cell)
        })

        line.append(cell)
    }
}

function resizeCanvas(canvas, length) {
    const lines = canvas.childNodes
    const numLines = lines.length

    if (numLines < length) {
        for(let i = 0; i < length; i++) {
            if(i < numLines) {
                createCells(length - numLines, lines[i])
            } else {
                const line = document.createElement("div")
                line.className = "line"

                createCells(length, line)

                canvas.append(line)
            }
        }
    }
    else if (numLines > length) {
        for (let i = numLines - 1; i >= 0; i--) {
            if (i < length) {
                for (let j = numLines - 1; j >= length; j--) {
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
let color = "black"

for (let i = 0; i < 16; i++) {
    const line = document.createElement("div")
    line.className = "line"

    createCells(16, line)

    canvas.append(line)
}

const btnClear = document.querySelector("#clear")
btnClear.addEventListener("click", () => {
    for (let i = cellsPainted.length - 1; i >= 0; i--) {
        cellsPainted[i].style.backgroundColor = "white"
        cellsPainted.pop()
    }
})

const sizeSlider = document.querySelector("#slider")
sizeSlider.oninput = () => {
    const gridSize = Number(sizeSlider.value)

    const sliderLabel = document.querySelector("#slider-label")
    sliderLabel.textContent = `${gridSize}x${gridSize}`

    btnClear.click()
    resizeCanvas(canvas, gridSize)
}

