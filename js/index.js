const BASE_URL = "http://localhost:3000"
const MONST_URL = "http://localhost:3000/monsters?_limit=50&_page="
let PAGE = "1";
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    console.log('DOM fully loaded and parsed');
    createMosterForm();
    getMonsters();

    const forward = document.getElementById("forward")
    forward.addEventListener("click", (event) => {
        event.preventDefault();
        PAGE++;
        console.log("Forward Clicked, PAGE = ", PAGE);
        getMonsters();
    })

    const back = document.getElementById("back")
    back.addEventListener("click", (event) => {
        event.preventDefault();
        PAGE--;
        console.log("Back Clicked, PAGE = ", PAGE);
        if(PAGE > 0) {
            getMonsters();
        }

    })


});


function getMonsters() {
    fetch(MONST_URL + PAGE)
    .then((res) => {
        return res.json();
    }).then((json) => {
        console.log(json);
        createMonsterList(json);
    });

}


function createMonsterList(json) {
  const monster_container = document.getElementById('monster-container');
  monster_container.innerHTML = "";
  json.forEach(monster => {
      const mosnter_card = document.createElement("div");
      const h2 = document.createElement("h2");
      h2.innerText = monster.name;
      const strong =  document.createElement("strong");
      strong.innerText = "Age: " + monster.age;

      const p = document.createElement("p");
      p.innerText = "Bio: " + monster.description;

      mosnter_card.appendChild(h2);
      mosnter_card.appendChild(strong);
      mosnter_card.appendChild(p);
      monster_container.appendChild(mosnter_card);


  });

}


function createMosterForm() {
    const create_monster = document.getElementById('create-monster');

    const label_name = document.createElement("label");
    label_name.for = "input-name"
    label_name.innerText = "Name: "
    const input_name = document.createElement("input");
    input_name.id = "input-name"
    input_name.type = "text"

    const label_age = document.createElement("label");
    label_age.for = "input-age"
    label_age.innerText = "Age: "
    const input_age = document.createElement("input");
    input_age.id = "input-age";
    input_age.type = "text";

    const label_bio = document.createElement("label");
    label_bio.for = "input-bio"
    label_bio.innerText = "Bio: "
    const input_bio = document.createElement("input");
    input_bio.id = "input-bio";
    input_bio.type = "text";

    const submit_button = document.createElement("button");
    submit_button.innerText = "Submit";
    

    create_monster.appendChild(label_name);
    create_monster.appendChild(input_name);

    create_monster.appendChild(label_age);
    create_monster.appendChild(input_age);

    create_monster.appendChild(label_bio);
    create_monster.appendChild(input_bio);

    create_monster.appendChild(submit_button);

    submit_button.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("submit_button clicked");
        const name = input_name.value;
        const age = input_age.value;
        const bio =  input_bio.value;


        if(name != "" && age != "" && bio != "") {
            console.log("Name: ", name)
            console.log("Age: ", age)
            console.log("Bio: ", bio)
            postMonster(name, age, bio);
        }

    });
}


function postMonster(name, age, bio) {

    fetch("http://localhost:3000/monsters",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          age: age,
          bio: bio,
        })
    }).then((res) => {
        return res.json();
    }).then((json) => {
        console.log("Monster Succesfully Posted")
    }).catch((err) => {
        console.error("Posting Monster error", err);
    });

}