import {menuArray} from "/data.js"

let orderItemsArray = []
const payForm = document.getElementById("pay-form")

payForm.addEventListener("submit", function(e){
    e.preventDefault()
})



document.addEventListener("click", function(e){
    if(e.target.dataset.add){
       handleAddItemBtn(e.target.dataset.add)
    } else if(e.target.dataset.remove){
        handleRemoveItemBtn(e.target.dataset.remove)
    } else if(e.target.className === "order-btn"){
        handleCompleteOrderBtn()
    } else if(e.target.className === "pay-btn")
        handlePayBtn() 
})

function handleAddItemBtn(itemId){
    const targetItemObj = menuArray.filter(function(item){
        return item.id == itemId
    })[0]
    orderItemsArray.push(targetItemObj)
    renderMenu()
    renderOrder()
    updateOrderTotal()
}

function handleRemoveItemBtn(orderItemIndex){
   orderItemsArray.splice(orderItemIndex, 1)
    renderOrder();
    updateOrderTotal();
}

function handleCompleteOrderBtn(){
    document.getElementById("pay-modal").classList.remove("hidden")
}

function handlePayBtn(e){
    document.getElementById("pay-modal").classList.add("hidden")
    document.getElementById("order-container").classList.add("hidden")
    const payFormData = new FormData(payForm)
    const name = payFormData.get("name")
    const thanksMessage = document.getElementById("thanks-message")
    thanksMessage.classList.remove("hidden")
    thanksMessage.innerHTML = `
        <p>Thanks, ${name}! Your order is on its way!</p>`
}


// RENDER ORDER

function getOrderHtml(){
    let orderHtml = ``
    orderItemsArray.forEach(function(item, index){
        orderHtml +=`
            <div class="order-item">
                <p class="order-item-name">${item.name}</p>
                <button class="remove-btn" data-remove="${index}">remove</button>
                <p class="order-item-price">$${item.price}</p>
            </div>
    `
    })
    return orderHtml  
}

function updateOrderTotal(){
    let orderTotal = 0
    orderItemsArray.forEach(function(orderItem){
        orderTotal += orderItem.price
    })
    document.getElementById("order-sum").innerHTML = "$" + orderTotal
}


function renderOrder(){
    document.getElementById("inner-order-container").innerHTML = getOrderHtml()
     if(orderItemsArray.length > 0){
        document.querySelector("#order-container").classList.remove("hidden")
    }else {
        document.querySelector("#order-container").classList.add("hidden")
    }
}




// RENDER MENU ITEMS
function getMenuHtml(){
    let menuHtml = ""
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="item-container">
            <div class="item-info">
                <i class="item-emoji">${item.emoji}</i>
                <div class="item-text-container">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-ingredients">${item.ingredients}</p>
                    <p class="item-price">$${item.price}</p>
                </div>
            </div>
            <button class="add-btn" data-add="${item.id}">+</button>
        </div>
    `
    })
    return menuHtml
}

function renderMenu(){
    document.getElementById("menu-container").innerHTML = getMenuHtml()    
}

renderMenu()