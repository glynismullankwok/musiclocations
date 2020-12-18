
document.cookie = "Set-Cookie: SameSite=None; Secure"

var mydata = data
var selectedId = ""
var input = ""
var trackName = ""
var selectedRecords = "5"
$("#genre-list").change(function () {
    // console.log(this.value)
    selectedId = this.value
});

$("num-records").change(function(){
    selectedRecords = this.value
})

$("#submit").click(function (event) {
    input = $('input').val()
    // console.log(input)

    var imgUrl = `https://pixabay.com/api/?key=19570887-9ab24a9c116677c7d4d20872b&q=${input}&image_type=photo`
    $.ajax({
        url: imgUrl,
        method: "GET"
    }).then(function (img) {
        console.log(img)
        var imgCode = img.hits[0].largeImageURL
        console.log(imgCode)
        var imgDiv = $("<img>")
        imgDiv.attr("src", imgCode)
        // add image size
        $(".img").append(imgDiv)
    
    })


    // 
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHJvbWFuMDkiLCJhIjoiY2tpcGFzbm1nMGJkazJxbzFsOGg3dW5ueCJ9.nKYluwYKT0XqFDXaafIJTQ';
    // var city = input
    var queryUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + input + ".json?access_token=pk.eyJ1IjoiZHJvbWFuMDkiLCJhIjoiY2tpcGFzbm1nMGJkazJxbzFsOGg3dW5ueCJ9.nKYluwYKT0XqFDXaafIJTQ"

    $.ajax({
        url: queryUrl,
        method: "Get"
    }).then(function (response) {
        console.log(response)
        var lng = response.features[0].center[0];
        var lat = response.features[0].center[1];
        console.log(lng, lat)


        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [lng, lat], // starting position [lng, lat]
            zoom: 8 // starting zoom
        });
        console.log(map)

    })


    


    // 

    // event.preventDefault()
    $.ajax({
        type: "GET",
        data: {
            apikey: "4d79a850d35d2e78003074885fedf889",
            q_lyrics: input,
            f_music_genre_id: selectedId,
            page_size: selectedRecords,
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

            if (data.message.body.track_list[0]) {
                trackName = JSON.stringify(data.message.body.track_list[0].track.track_name)
                artistName = JSON.stringify(data.message.body.track_list[0].track.artist_name)
                lyricsUrl = JSON.stringify(data.message.body.track_list[0].track.track_share_url)

                trackNameParse = JSON.parse(trackName)
                artistNameParse = JSON.parse(artistName)
                lyricsParse = JSON.parse(lyricsUrl)

                // $('h2').append($(`<p>${trackNameParse}</p>`));
            
                $('h2').append($(`<p>${artistNameParse}</p>`));
                $('h2').append($(`<a href=${lyricsParse} target="_blank">${trackNameParse}</a>`));

                

            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }

    });

})

for (var i = 0; i < 360; i++) {

    if (mydata.message.body.music_genre_list[i].music_genre.music_genre_parent_id === 34) {
        // console.log(mydata.message.body.music_genre_list[i].music_genre.music_genre_name)

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






// Integrate the track-search and genre api on the term

// Music add-ons
    // Get song chords with songsterr
        // http://www.songsterr.com/a/ra/songs.json?pattern=Marley





