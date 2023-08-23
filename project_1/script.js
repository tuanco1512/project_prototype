const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'red'

function draw(x, y) {
    const circle = new Path2D();
    circle.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill(circle)
}

let isMouseDown = false;

canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true
})

canvas.addEventListener('mouseup', (e) => {
    isMouseDown = false
    console.log('mouseup')
})

canvas.addEventListener('mousemove', (e) => {
    // console.log('mousemove')
    if (!isMouseDown) {
        return
    }

    const {
        clientX,
        clientY
    } = e

    const react = canvas.getBoundingClientRect()
    draw(clientX - react.left, clientY - react.top)
})

const colorPickers = [...document.querySelectorAll('.color-picker')]
colorPickers.forEach(colorPicker => {
    colorPicker.addEventListener('click', (e) => {
        ctx.fillStyle = e.target.style.backgroundColor
    })
})

$('#btn-clear').addEventListener('click', (e) => {
    ctx.clearRect(0 , 0, 600, 600)
})