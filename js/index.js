BASE_URL = 'http://localhost:3000/monsters'
URL_LIMIT = 'http://localhost:3000/monsters/?_limit=3'

document.addEventListener("DOMContentLoaded", () => {
    getMonsters();
    createMonsterForm();
});

function getMonsters(){
    fetch(URL_LIMIT)
    .then(res=>res.json())
    .then(monsters=>monsters.forEach(showMonster))
    .catch(err=>console.log(err))
}

function createMonsterForm(){
    const createMonsterForm = document.getElementById('create-monster')
    const monsterForm = document.createElement('form')
    monsterForm.id = 'monster-form'

    const inputName = document.createElement('input')
    inputName.type = 'text'
    inputName.name = 'name'
    inputName.placeholder = "name..."
    inputName.value = ""
    const inputAge = document.createElement('input')
    inputAge.type = 'number'
    inputAge.name = 'age'
    inputAge.placeholder = "age..."
    inputAge.value = ""
    const inputDesc = document.createElement('input')
    inputDesc.type = 'text'
    inputDesc.name = 'description'
    inputDesc.placeholder = "description..."
    inputDesc.value = ""
    const monsterBtn = document.createElement('button')
    monsterBtn.innerText = "Create Monster"
    monsterBtn.addEventListener('click', event => {
        event.preventDefault();
        createMonster(event);
    })

    monsterForm.appendChild(inputName)
    monsterForm.appendChild(inputAge)
    monsterForm.appendChild(inputDesc)
    monsterForm.appendChild(monsterBtn)
    createMonsterForm.appendChild(monsterForm)
}

function showMonster(monster){
    console.log(monster)

    const monsterContainer = document.getElementById('monster-container')
    const monsterName = document.createElement('h2')
    monsterName.innerText = monster.name 
    const monsterAge = document.createElement('h4')
    monsterAge.innerText = monster.age 
    const monsterDesc = document.createElement('p')
    monsterDesc.innerText = monster.description
    
    monsterContainer.appendChild(monsterName)
    monsterContainer.appendChild(monsterAge)
    monsterContainer.appendChild(monsterDesc)
}

function createMonster(event){
    fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(event)
        // ({ 
        //     name: event.target.name.value,
        //     age: event.target.age.value, 
        //     description: event.target.description.value })
    })
    .then(res=>res.json())
    .then(newMonster=>console.log(newMonster))
    .catch(err=>console.log(err))
}