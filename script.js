
document.cookie = "Set-Cookie: SameSite=None; Secure"

// Points to JSON file of genres
var mydata = data

// adds these to global variable
var selectedId = ""
var input = ""
var trackName = ""
// makes the selected default 5
var selectedRecords = 5

// Event listener for genre drop down 
$("#genre-list").change(function () {
    // console.log(this.value)
    selectedId = this.value
});

// Event listener for number of results drop down
$("#num-records").change(function () {
    selectedRecords = this.value
    console.log(selectedRecords)

})

// Submit button event listener
$("#submit").click(function (event) {
    event.preventDefault()

    // Grabs the city name from input
    input = $('input').val()

    // Searches for an image based on city input
    var imgUrl = `https://pixabay.com/api/?key=19570887-9ab24a9c116677c7d4d20872b&q=${input}&image_type=photo`
    $.ajax({
        url: imgUrl,
        method: "GET"
    }).then(function (img) {
        var randomImg = img.hits // gets array 
        var ran = Math.floor(Math.random() * randomImg.length) // randomizes length of array. outputs a number 
        console.log(ran)
        var newImage = img.hits[ran].largeImageURL //inputs number into array with image url
        console.log(newImage)
        //appending to doc 
        var imgDiv = $("<img>")
        imgDiv.attr("src", newImage)
        $(".img").html(imgDiv)

    })


    // Adds a map to the DOM based on the URL
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHJvbWFuMDkiLCJhIjoiY2tpcGFzbm1nMGJkazJxbzFsOGg3dW5ueCJ9.nKYluwYKT0XqFDXaafIJTQ';
    // var city = input
    var queryUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + input + ".json?access_token=pk.eyJ1IjoiZHJvbWFuMDkiLCJhIjoiY2tpcGFzbm1nMGJkazJxbzFsOGg3dW5ueCJ9.nKYluwYKT0XqFDXaafIJTQ"

    $.ajax({
        url: queryUrl,
        method: "Get"
    }).then(function (response) {
        // console.log(response)
        var lng = response.features[0].center[0];
        var lat = response.features[0].center[1];
        // console.log(lng, lat)


        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [lng, lat], // starting position [lng, lat]
            zoom: 8 // starting zoom
        });
        // console.log(map)

    })


    $.ajax({
        type: "GET",
        data: {
            apikey: "4d79a850d35d2e78003074885fedf889",
            // Input is from the form
            q_lyrics: input,
            // Selected from the genre drop down
            f_music_genre_id: selectedId,
            // Selected from the number of records drop down
            page_size: selectedRecords,
            s_track_rating: "desc",
            format: "jsonp",
            page: '1',
            callback: "jsonp_callback"
        },
        url: "https://api.musixmatch.com/ws/1.1/track.search",
        dataType: "jsonp",
        jsonpCallback: 'jsonp_callback',
        contentType: 'application/json',
        success: function (data) {
            console.log(data);
            console.log(selectedRecords)

            // Loops through the number selected for 
            for (var i = 0; i < Number(selectedRecords); i++) {

                // console.log(data.message.body.track_list[i])
                // Gets track name, artist, URL of lyrics
                trackName = JSON.stringify(data.message.body.track_list[i].track.track_name)
                artistName = JSON.stringify(data.message.body.track_list[i].track.artist_name)
                lyricsUrl = JSON.stringify(data.message.body.track_list[i].track.track_share_url)

                trackNameParse = JSON.parse(trackName)
                artistNameParse = JSON.parse(artistName)
                lyricsParse = JSON.parse(lyricsUrl)

                // Appends the artist, URL, track name to DOM
                $('h4').append($(`<p>${artistNameParse}</p>`));
                $('h4').append($(`<a href=${lyricsParse} target="_blank">${trackNameParse}</a>`));

            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }

    });

})

// Creates a drop down list of genres
for (var i = 0; i < 360; i++) {

    if (mydata.message.body.music_genre_list[i].music_genre.music_genre_parent_id === 34) {


        var genres = mydata.message.body.music_genre_list[i].music_genre.music_genre_name

        var genreID = mydata.message.body.music_genre_list[i].music_genre.music_genre_id

        $('.genres').append($(`<option value="${genreID}">${genres}</option>`));

    }
}

// David

// city image



// var key = "55ad3984ce14bc14559d41e350f4290e"
// var quryUrl = "https://api.musixmatch.com/ws/1.1/chart.artists.get?format=jsonp&callback=callback&country=us&apikey=55ad3984ce14bc14559d41e350f4290e"
// $.ajax({
//     url: quryUrl,
//     method: "GET"
// }).then(function (response) {
//     console.log(response)
// })






// Music APIs
// In order to get locations from song lyrics
// Use the MusixMatch API
// track.search API 
// "https://api.musixmatch.com/ws/1.1/track.search"

// And be able to filter by genre
// Use the MusixMatch API
// Select from genre list using the 
// music.genres.get
// "https://api.musixmatch.com/ws/1.1/music.genres.get"


// http://www.songsterr.com/a/ra/songs.json?pattern=Marley





