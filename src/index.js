// write your code here
let currentRamen;
const displayComment = document.querySelector('#comment-display');

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
            //advanced deliverable
            //delete ramen elements
            deleteRamen()
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
    currentRamen = ramenObj
    const displayImg = document.querySelector('#ramen-detail .detail-image')
    const displayName = document.querySelector('#ramen-detail .name')
    const displayRestaurant = document.querySelector('#ramen-detail .restaurant')
    const displayRating = document.querySelector('#rating-display')

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
    let submission = {}
    //add event listener for form submit
    ramenForm.addEventListener('submit', (e) => {
        //add data to the submission object
        submission.name = newName.value
        submission.restaurant = newRestaurant.value
        submission.image = newImage.value
        submission.rating = newRating.value
        submission.comment = newComment.value
        //check to see that form is filled out
        submission.name.length == 0 ? alert('Please fill out all form fields.') : newRamenSubmit(submission)
    })

    function newRamenSubmit(submitObj) {
        fetch ('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submitObj)
        })
    }
}

function deleteRamen () {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'DELETE'
    deleteButton.id = 'delete-button'
    deleteButton.className = 'button'
    displayComment.after(deleteButton)

    deleteButton.addEventListener('click', () => {
        fetch (`http://localhost:3000/ramens/${currentRamen.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then (location.reload())
    })
}