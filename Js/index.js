var favourite = JSON.parse(localStorage.getItem("FavHeroList"));
if(favourite==null){
    favourite=[];
}

const notification = document.getElementById('Notification');
const inputSearch = document.getElementById('inputText');
const herolist = document.getElementById('list');
const noHero = document.getElementById('noHero');
//capturing the user input
inputSearch.onkeyup = function(){
    var hero = inputSearch.value;
    console.log(hero)
    //Fetching the Superheroes
    if(hero!==''){
        fetch('https://www.superheroapi.com/api.php/1760114794162949/search/' + hero.trim())
        .then(res => res.json()) 
        .then((data) => {
            createList(data);
        }).catch((e) => {
            console.log(e);
        })
    }
}

//Function to generate the superhero list
function createList(data){
    if(data.response==='error'){
        noHero.innerHTML = 'Please Enter a valid name..';
        noHero.classList.add('default');
        setTimeout(function() {
            noHero.innerHTML = null;
            noHero.classList.remove('default');
        }, 3000);
    }

    
    herolist.innerHTML = null;

    for(let i=0; i<data.results.length && i<7; i++){

        var herocard = document.createElement('div');
        var heroimg = document.createElement('img');
        var textContainer = document.createElement('div');
        var heroText = document.createElement('div');
        var favBtn = document.createElement('div');
        var detailsBtn = document.createElement('div');

        herocard.classList.add('HeroCard');
        heroimg.classList.add('HeroCard-Image');
        textContainer.classList.add('textContainer');
        favBtn.classList.add('fav-btn');
        detailsBtn.classList.add('details-btn');

        heroText.innerHTML = data.results[i].name;
        textContainer.appendChild(heroText);

        heroimg.src = data.results[i].image.url;
        herocard.appendChild(heroimg);

        detailsBtn.innerHTML = 'Click to know more';
        textContainer.appendChild(detailsBtn);

        let heroId = data.results[i].id;
        if(favourite.includes(heroId)){
            favBtn.innerHTML = "Remove";
            favBtn.classList.add('bg-red');
        }else{
            favBtn.innerHTML = "Add to my favourites";
            favBtn.classList.add('bg-green');
        }

        favBtn.setAttribute('_id',data.results[i].id)
        detailsBtn.setAttribute('_id',data.results[i].id)
        
        favBtn.setAttribute('type','fav')
        detailsBtn.setAttribute('type','details')

        textContainer.appendChild(favBtn);
        herocard.appendChild(textContainer);
        herolist.appendChild(herocard);

    }
}

herolist.onclick = function(event) {
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
    else if (type === 'details') {
        if (Id === null){
            return;
        }    
        window.open("details.html?id=" + Id, "_self");
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