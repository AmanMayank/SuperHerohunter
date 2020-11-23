var favourite = JSON.parse(localStorage.getItem("FavHeroList"));
if(favourite==null){
    favourite=[];
}

const notification = document.getElementById('Notification');
const profile = document.getElementById('profile');

const params = new URLSearchParams(window.location.search);
var id = params.get('id');

fetch('https://superheroapi.com/api.php/1760114794162949/' + id)
    .then(res => res.json())
    .then(data => createProfile(data, id))
    .catch(err => console.log(err))


function createProfile(data, Id){
    
    var heroProfile = document.createElement('div');
    var profilepic = document.createElement('img');
    var name = document.createElement('div');
    var power = document.createElement('div');
    var bio = document.createElement('div');
    var favBtn = document.createElement('div');

    heroProfile.classList.add('heroProfile')
    profilepic.classList.add('profilepic');
    name.classList.add('myName');
    power.classList.add('power');
    bio.classList.add('bio');

    heroProfile.appendChild(profilepic);
    heroProfile.appendChild(name);
    heroProfile.appendChild(power);
    heroProfile.appendChild(bio);
    heroProfile.appendChild(favBtn);
    profile.appendChild(heroProfile);

    profilepic.src = data.image.url;

    name.innerHTML = data.name;
   
    power.innerHTML = "Intelligence : " + data.powerstats.intelligence
                      +"<br>Strength : "+data.powerstats.strength
                      +"<br>Speed : "+data.powerstats.speed
                      +"<br>Durability : "+data.powerstats.durability
                      +"<br>Power : "+data.powerstats.power
                      +"<br>Combat : "+data.powerstats.combat;

    bio.innerHTML= "Full Name : " + data.biography['full-name']
                      +"<br>Alter-Egos : " + data.biography['alter-egos']
                      +"<br>Aliases : " + data.biography.aliases
                      +"<br>Place-of-Birth : " + data.biography['place-of-birth']
                      +"<br>First-appearance : " + data.biography['first-appearance']
                      +"<br>Publisher : " + data.biography['publisher']
                      +"<br>Alignment : " + data.biography['alignment'];

    if(favourite.includes(id)){
        favBtn.innerHTML = "Remove from favourites";
        favBtn.classList.add('bg-red');
    }else{
        favBtn.innerHTML = "Add to my favourites";
        favBtn.classList.add('bg-green');
    }
    favBtn.setAttribute('type','fav');
    favBtn.setAttribute('_id',data.id)

}

profile.onclick = function(event) {
    var Id = event.target.getAttribute('_id');
    var type = event.target.getAttribute('type');

    if(type === 'fav'){
        if(Id===null){
            return;
        }

        if(favourite.includes(Id)){
            var index = favourite.indexOf(Id);
            favourite.splice(index,1);
            event.target.innerHTML = "Add to my favourites";
            event.target.classList.remove('bg-red');
            event.target.classList.add('bg-green');
            showNotification(false);
        }else{
            favourite.push(Id);
            event.target.innerHTML = "Remove";
            event.target.classList.remove('bg-green');
            event.target.classList.add('bg-red');
            showNotification(true);
        }
        localStorage.setItem("FavHeroList", JSON.stringify(favourite));   
    }
}

function showNotification(view){
    notification.classList.add('alert');
     
    if(view){
        notification.innerHTML = "Added to Favourites";
    }else{
        notification.innerHTML = "Removed from Favourites";
    }

    setTimeout(function(){
        notification.classList.remove("alert");
    },3000);
}