const items = [
    { name: 'Piazza 001', price: 5.9, quantity: 1 },
    { name: 'Piazza 001', price: 6.9, quantity: 1 },
    { name: 'Piazza 001', price: 7.9, quantity: 1 },
]

const SHIPPING = 2

function remove(index) {
    items.splice(index, 1)
    render();
}

function updateQuantity(index, quantity) {
    if (quantity < 1) {
        return
    }

    items[index].quantity = quantity
    render()
}

function render() {
    let subTotal = 0;
    items.forEach(item => {
        subTotal += item.quantity * item.price
    })
    const total = subTotal + SHIPPING;

    const html = items.map(item => `
    <li class="order-item">
                <span class="item-name">${item.name}</span>
                <span class="item-quantity">
                    <button class="dec">-</button>
                    <input type="number" class="quantity" value="${item.quantity}">
                    <button class="inc">+</button>
                </span>

                <span class="item-price">
                    <span>${item.quantity * item.price.toFixed(2)}</span>
                    <button class=" delete btn-delete">X</button>
                </span>
            </li>`).join('')
    $('#order-items').innerHTML = html

    const deleteButtons = [...$$('.delete')]
    const decButtons = [...$$('.dec')]
    const incButtons = [...$$('.inc')]
    for (let i = 0; i < deleteButtons.length; i++) {
        decButtons[i].addEventListener('click', () => {
            updateQuantity(i, items[i].quantity - 1)
        })
        incButtons[i].addEventListener('click', () => {
            updateQuantity(i, items[i].quantity + 1)
        })
        deleteButtons[i].addEventListener('click', () => {
            remove(i);
        })
    }

    $('#sub-total').innerText = `$${subTotal.toFixed(2)}`
    $('#shipping').innerText = `$${SHIPPING}`
    $('#total').innerText = `$${total.toFixed(2)}`
}

function add() {
    items.push({
        name: `Pizza ${Math.random().toFixed(3)}`,
        quantity: 1,
        price: Math.random() * 10
    })

    render()
}

$('#btn-add').addEventListener('click', () => {
    add()
})

render();