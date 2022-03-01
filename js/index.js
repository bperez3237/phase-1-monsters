






function initMonsters() {
    const container = document.getElementById('monster-container')
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`)
    .then(res => res.json())
    .then(data => data.forEach(monster => {
        let d = document.createElement('div')
        d.innerHTML = `
        <h2>${monster['name']}</h2>
        <h4>${monster['age']}</h4>
        <p>
        ${monster['description']}
        </p>
        `
        container.appendChild(d)
    }))
}

function initForm() {
    const form = document.getElementById('create-monster')
    
    let f = document.createElement('form')
    f.id = 'monster-form'
    f.innerHTML = `
    <input id='name' placeholder='name...'>
    <input id='age' placeholder='age...'>
    <input id='description' placeholder='description...'>
    <button>Create</button>
    `
    form.appendChild(f)
    
    f.addEventListener('submit', (e) => {
        e.preventDefault()
        let ageInput = e.target.age.value
        let nameInput = e.target.name.value
        let descInput = e.target.description.value
        postMonster(ageInput,nameInput,descInput)
        f.reset()
    })
}

function postMonster(age,name,desc) {
    const container = document.getElementById('monster-container')
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({ 
            'name': name, 
            'age': age, 
            'description': desc
         })
    })
    .then(res => res.json())
    .then(monster => {
        let d = document.createElement('div')
        d.innerHTML = `
        <h2>${monster['name']}</h2>
        <h4>${monster['age']}</h4>
        <p>
        ${monster['description']}
        </p>
        `
        container.appendChild(d)
    })
}

function turnPage(page) {
    const container = document.getElementById('monster-container')
    container.querySelectorAll('div').forEach(element => {
        element.remove()
    })
    console.log(page)

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(data => data.forEach(monster => {
        let d = document.createElement('div')
        d.innerHTML = `
        <h2>${monster['name']}</h2>
        <h4>${monster['age']}</h4>
        <p>
        ${monster['description']}
        </p>
        `

        container.appendChild(d)
    }))
    .catch(e => alert(e))
}

window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('create-monster')
    

    initMonsters();
    initForm();

    let page = 1
    let backBttn = document.getElementById('back')
    let frdBttn = document.getElementById('forward')
    backBttn.addEventListener('click', () => {
        page -= 1
        turnPage(page)
    })
    frdBttn.addEventListener('click', () => {
        page += 1
        turnPage(page)
    })
})



