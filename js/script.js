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

function carousel() {
    //console.log(randNames[Math.floor(Math.random() * 2)])
    
    let movie = 'https://api.themoviedb.org/3/movie/popular?api_key=e9d8b222a57983dac6baa7919533097e&language=en-US&page=1'
    //console.log(movie)
    const moviePromise = request(movie)
    moviePromise
        .then(function printRand(json){

            let movie = JSON.parse(json)
            console.log(movie.results)
            
            const result = movie.results[0];
            let div = document.createElement("div")
            div.className = "carousel-item active"
            let img = document.createElement("img")
            img.src = "https://image.tmdb.org/t/p/original" + result.backdrop_path
            img.className = "d-block w-100"
            let caption = document.createElement("div")
            caption.className = "carousel-caption d-none d-md-block"
            let h5 = document.createElement("h5")
            h5.textContent = result.original_title
            h5.className = "bg-light text-dark"
            caption.appendChild(h5)
            div.appendChild(caption)
            div.appendChild(img)
            document.getElementById("carousel-inner").appendChild(div)

            for (let i = 1; i < movie.results.length; i++) {
                const result = movie.results[i];
                let div = document.createElement("div")
                div.className = "carousel-item"
                let img = document.createElement("img")
                img.src = "https://image.tmdb.org/t/p/original" + result.backdrop_path
                img.className = "d-block w-100"
                let caption = document.createElement("div")
                caption.className = "carousel-caption d-none d-md-block"
                let h5 = document.createElement("h5")
                h5.textContent = result.original_title
                h5.className = "bg-light text-dark"
                caption.appendChild(h5)
                div.appendChild(caption)
                div.appendChild(img)
                document.getElementById("carousel-inner").appendChild(div)
            }
            

        })
        .catch(function handleErrors(error) {
            console.log("Error here!!")
        })
}



window.onload = carousel()

function search(movieName) {
    let movieSearch = 'https://api.themoviedb.org/3/search/movie/?api_key=e9d8b222a57983dac6baa7919533097e&language=es-ES&query='
    let movie = movieSearch + movieName    
    const moviePromise = request(movie)

    moviePromise
        .then(function printPosts(json) {
            console.log('Resolve Found!!')
            var search = JSON.parse(json)

            console.log(search.results[0])
            
            var img = '<img src="https://image.tmdb.org/t/p/original' + search.results[0].poster_path + '" class="card-img-top">';
            document.getElementById("img").innerHTML = img
            document.getElementById("card-title").textContent = search.results[0].title
            let date = search.results[0].release_date
            document.getElementById("card-title").textContent += " (" + date.slice(0, 4) + ")"
            document.getElementById("card-text").textContent = search.results[0].overview
        })
        .catch(function handleErrors(error) {
            console.log("Error here!!")
        })
}


document.getElementById("search").onsubmit = function () {
    let searchText = document.getElementById("searchText").value
    search(searchText)
}