function request(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.timeout = 2000
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject(xhr.status)
                }
            }
        }
        xhr.ontimeout = function () {
            reject('timeout')
        }

        xhr.open('get', url, true)
        xhr.send()
    })
}

function carrousel() {
    var randNames = ["house%20of%20cards", "scarface", "pulp%20fiction"]
    //console.log(randNames[Math.floor(Math.random() * 2)])
    let rand = 'https://api.themoviedb.org/3/movie/550?api_key=e9d8b222a57983dac6baa7919533097e&language=en-US'
    //https://api.themoviedb.org/3/movie/550/images?api_key=e9d8b222a57983dac6baa7919533097e&language=en-US
    console.log(rand)
    const randPromise = request(rand)
    randPromise
        .then(function printRand(json){

            let movie = JSON.parse(json)
            console.log(movie)
            console.log(movie.homepage.poster_path)
            var img = '<img src="https://image.tmdb.org/t/p/original' + movie.poster_path + '" class="card-img-top">'
            var text = movie.overview
            document.getElementById("show").innerHTML = img
            /*
            let div = document.createElement("div")
            div.className = "carousel-item active"
            let img = document.createElement("img")
            img.src = movie.poster_path
            img.className = "d-block w-100"
            div.appendChild(img)
            document.getElementById("carousel").appendChild(div)*/
        })
        .catch(function handleErrors(error) {
            console.log("Error here!!")
        })
}

window.onload = carrousel()
/*
const postGet = 'http://www.omdbapi.com/?apikey=83d6daf5&t=house%20of%20cards'
const myPromise = request(postGet)
//console.log("Will be pending when logged", myPromise)

myPromise
    .then(function printPosts(json) {
        console.log('Resolve Found!!')
        
        var list = JSON.parse(json)
        //posts.forEach(post => console.log(post));
        console.log(list)
        var img = '<img src="' + list.Poster + '" class="card-img-top" alt="' + list.Title + '">';
        document.getElementById("img").innerHTML = img
        document.getElementById("card-title").textContent = list.Title
        document.getElementById("card-title").textContent += " (" +list.Year+ ")"
        document.getElementById("card-text").textContent = list.Plot
    })
    .catch(function handleErrors(error) {
        console.log("Error here!!")
    })


*/