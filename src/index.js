// write your code here
document.addEventListener('DOMContentLoaded', init())

function init () {
    fetch ('http://localhost:3000/ramens')
        .then (res => res.json())
        .then (data => {
            //call functions here
            //load ramen images into the navigation and make clickable
            ramenMenu(data)
            //load individual ramen information
            loadRamen(data[0])
            //create new ramen elements on form submit
            newRamen()
        })
}

function ramenMenu (ramensObj) {
    const menu = document.getElementById('ramen-menu')
    ramensObj.forEach(ramen => {
        const menuItem = document.createElement('img')
        const menuImgSrc = ramen.image
        menuItem.src = menuImgSrc
        menu.appendChild(menuItem)
        //add click listener
        menuItem.addEventListener('click', () => {
            loadRamen(ramen)
        })
    })
}

function loadRamen (ramenObj) {
    const displayImg = document.querySelector('#ramen-detail .detail-image')
    const displayName = document.querySelector('#ramen-detail .name')
    const displayRestaurant = document.querySelector('#ramen-detail .restaurant')
    const displayRating = document.querySelector('#rating-display')
    const displayComment = document.querySelector('#comment-display')


    const {id, name, restaurant, image, rating, comment} = ramenObj
    displayImg.src = image
    displayImg.alt = name
    displayName.textContent = name
    displayRestaurant.textContent = restaurant
    displayRating.textContent = rating
    displayComment.textContent = comment
}

function newRamen () {
    const ramenForm = document.querySelector('#new-ramen')
    const newName = ramenForm.querySelector('#new-name')
    const newRestaurant = ramenForm.querySelector('#new-restaurant')
    const newImage = ramenForm.querySelector('#new-image')
    const newRating = ramenForm.querySelector('#new-rating')
    const newComment = ramenForm.querySelector('#new-comment')
    //add event listener for form submit
    ramenForm.addEventListener('submit', (e) => {
        //create a new object with data from the form
        const submission = {
            name: newName.value,
            restaurant: newRestaurant.value,
            image: newImage.value,
            rating: newRating.value,
            comment: newComment.value
        }
        //post request
        fetch ('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submission)
        })
    })
}