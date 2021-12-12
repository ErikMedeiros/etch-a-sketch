const canvas = document.querySelector("#canvas")
const cellsPainted = []
let color = "black"

for(let i = 0; i < 16; i ++) {
    const line = document.createElement("div")
    line.className = "line"

    for(let j = 0; j < 16; j++) {
        const cell = document.createElement("div")
        
        cell.className = "cell"
        cell.addEventListener("mouseenter", () => {
            cell.style.backgroundColor = color

            if(!cellsPainted.includes(cell))
                cellsPainted.push(cell)
        })

        line.append(cell)
    }

    canvas.append(line)
}

const btnClear = document.querySelector("#clear")
btnClear.addEventListener("click", () => {
    for(let i = cellsPainted.length - 1; i >= 0; i--) {
        cellsPainted[i].style.backgroundColor = "white"
        cellsPainted.pop()
    }
})