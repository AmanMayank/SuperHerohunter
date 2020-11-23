var favourite = JSON.parse(localStorage.getItem("FavHeroList"));
if(favourite==null){
    favourite=[];
}

const notification = document.getElementById('Notification');
const favhero = document.getElementById('favhero');

if(favourite.length === 0){
    favhero.innerHTML='Its really difficult to choose your favourite..'
    favhero.classList.add('default');
}

for(let Id of favourite){
    console.log(Id);
    fetch('https://superheroapi.com/api.php/1760114794162949/' + Id)
    .then(res => res.json())
    .then(data => createList(data, Id))
    .catch(err => console.log(err))
}

function createList(data, Id){
    var hero = document.createElement('div');
    var heroImg = document.createElement('img');
    var heroUni = document.createElement('div')
    var heroName = document.createElement('div')
    var favBtn = document.createElement('div');
    var detailsBtn = document.createElement('div'); 

    hero.classList.add('hero');
    heroImg.classList.add('profile');
    heroUni.classList.add('uni');
    heroName.classList.add('heroName');
    favBtn.classList.add('favBtn');
    detailsBtn.classList.add('detailsBtn');

    favBtn.innerHTML='Remove';
    detailsBtn.innerHTML = 'Details';
    heroName.innerHTML = data.name;
    heroUni.innerHTML = data.biography.publisher;
    heroImg.src = data.image.url;

    heroImg.setAttribute('id', 'heroPic');
    detailsBtn.setAttribute('id', 'details');
    favBtn.setAttribute('id', 'favBtn');
    hero.setAttribute('id', Id);

    hero.appendChild(heroImg);
    hero.appendChild(heroUni);
    hero.appendChild(heroName);
    hero.appendChild(favBtn);
    hero.appendChild(detailsBtn);
    favhero.appendChild(hero);
}

favhero.onclick = function(event){
    var target = event.target;
    console.log("target", target)

    if(target.id === 'details'){
        var _id = target.parentNode.getAttribute('id');
        window.open("details.html?id=" + _id, "_self");
    }

    if(target.id === 'favBtn'){
        target.parentNode.remove();
        showNotification();

        var index = favourite.indexOf(_id);
        favourite.splice(index,1);
    }

    localStorage.setItem("FavHeroList", JSON.stringify(favourite));

    if(favourite.length === 0){
        favhero.innerHTML='Its really difficult to choose your favourite..'
        favhero.classList.add('default');
    }
}

function showNotification(){
    notification.classList.add('alert');
    notification.innerHTML = "Removed from Favourites";

    setTimeout(function () { notification.classList.remove('alert'); }, 3000);
}

