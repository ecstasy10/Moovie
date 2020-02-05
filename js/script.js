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
    
    let movie = 'https://api.themoviedb.org/3/movie/popular?api_key=e9d8b222a57983dac6baa7919533097e&language=en-US&page=1'
    const moviePromise = request(movie)
    moviePromise
        .then(function printMovies(json){
            let movie = JSON.parse(json)

            for (let i = 0; i < movie.results.length; i++) {
                let result = movie.results[i];
                let div = document.createElement("div")
                if (i == 0)
                    div.className = "carousel-item active"
                else
                    div.className = "carousel-item"
                let img = document.createElement("img")
                img.src = "https://image.tmdb.org/t/p/original" + result.backdrop_path
                img.className = "d-block w-100"
                let caption = document.createElement("div")
                caption.className = "carousel-caption d-none d-md-block"
                let h5 = document.createElement("h5")
                h5.textContent = result.original_title
                h5.className = "bg-light text-dark rounded-lg"
                caption.appendChild(h5)
                div.appendChild(caption)
                div.appendChild(img)
                document.getElementById("carousel-innerMovies").appendChild(div)
            }
            

        })
        .catch(function handleErrors(error) {
            console.log("Error in the Movies Carousel Promise")
        })
    
    let tvShow = 'https://api.themoviedb.org/3/tv/popular?api_key=e9d8b222a57983dac6baa7919533097e&language=en-US&page=1'
    const tvPromise = request(tvShow)
    tvPromise
        .then(function printTv(json){
            let tvShow = JSON.parse(json)

            for (let i = 0; i < tvShow.results.length; i++) {
                let result = tvShow.results[i];
                let div = document.createElement("div")
                if (i == 0)
                    div.className = "carousel-item active"
                else
                    div.className = "carousel-item"
                let img = document.createElement("img")
                img.src = "https://image.tmdb.org/t/p/original" + result.backdrop_path
                img.className = "d-block w-100"
                let caption = document.createElement("div")
                caption.className = "carousel-caption d-none d-md-block"
                let h5 = document.createElement("h5")
                h5.textContent = result.original_name
                h5.className = "bg-light text-dark rounded-lg"
                caption.appendChild(h5)
                div.appendChild(caption)
                div.appendChild(img)
                document.getElementById("carousel-innerTv").appendChild(div)
            }
            

        })
        .catch(function handleErrors(error) {
            console.log("Error in the Tv-Shows Carousel Promise")
        })
}

function trending() {
    let trend = 'https://api.themoviedb.org/3/trending/all/day?api_key=e9d8b222a57983dac6baa7919533097e'
    const trendPromise = request(trend)

    trendPromise
        .then(function printTrendy(json){
            var trendy = JSON.parse(json)

        })
}

window.onload = carousel()

function search(name) {
    let multiSearch = 'https://api.themoviedb.org/3/search/multi?api_key=e9d8b222a57983dac6baa7919533097e&language=en-US&page=1&include_adult=false&query='
    
    let movie = multiSearch + name    
    const searchPromise = request(movie)

    searchPromise
        .then(function printPosts(json) {
            console.log('Resolve Found!!')
            var search = JSON.parse(json)

            console.log(search.results)
            for (let i=0; i< search.results.length; i++) {
                if (search.results[i].poster_path) {
                    document.getElementById("trendy").style.display = "none"
                    document.getElementById("carousels").style.display = "none"

                    let col = document.createElement("div")
                    col.className = "col-md-auto"
                    let div = document.createElement("div")
                    div.className = "card border border-0 shadow-lg p-4 mb-4 bg-dark"
                    div.style.width = "18rem"
                    let img = document.createElement("img")
                    img.src = "https://image.tmdb.org/t/p/original" + search.results[i].poster_path
                    img.className = "card-img-top"
                    let textDiv = document.createElement("div")
                    textDiv.className = "card-body"
                    let h5 = document.createElement("h5")
                    h5.className = "card-title text-white"
                    let date = search.results[i].release_date
                    if (date)
                        date = " (" + date.slice(0, 4) + ")"
                    h5.textContent = search.results[i].title + date
                    let p = document.createElement("p")
                    p.className = "card-text text-white"
                    let overView = search.results[i].overview
                    if (overView.length > 10){
                        overView = overView.slice(0, 100)
                        overView += " ..."
                    }
                    p.textContent = overView
                    let a = document.createElement("a")
                    a.className = "btn btn-outline-info text-white"
                    a.textContent = "More info"
                    
                    div.appendChild(img)
                    div.appendChild(textDiv)
                    div.appendChild(h5)
                    div.appendChild(p)
                    div.appendChild(a)
                    col.appendChild(div)
                    console.log(col)
                    document.getElementById("found").appendChild(col)
                }
                    
            }
        })
        .catch(function handleErrors(error) {
            console.log("Error in the Search!!")
        })
}


document.getElementById("search").onsubmit = function () {
    let searchText = document.getElementById("searchText").value
    search(searchText)
}