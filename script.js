document.cookie = "Set-Cookie: SameSite=None; Secure"
// Points to JSON file of genres
var mydata = data

// Create parallax automation with background images
document.addEventListener('imgLoaded',()=>{
    const parallaxEffect = document.querySelectorAll('.parallax');
    M.parallax.init(parallaxEffect, {});

})
$(document).ready(function () {
    console.log($('.parallax'))
    console.log($('.parallax').parallax())
});


// Hide the results block until search is done
$('#results').attr("style", "display:none")


// adds these to global variable
var selectedId = ""
var input = ""
var trackName = ""
// makes the selected default 5
var selectedRecords = 5

// Event listener for genre drop down 
$("#genre-list").change(function () {
    selectedId = this.value
});

// Event listener for number of results drop down
$("#num-records").change(function () {
    selectedRecords = this.value
    // console.log(selectedRecords)
})

// Submit button event listener
$("#submit").click(function (event) {
    event.preventDefault()
    $('#results').attr("style", "display:inline-block")

    $('html, body').animate({
        scrollTop: $(".body").offset().top
    }, 1000);
    $('p').remove()
    // Grabs the city name from input
    input = $('#city-input').val()
    if (input === "") {
        // alert("Please enter a city")
        return
    } else {
        // Searches for an image based on city input
        var imgUrl = `https://pixabay.com/api/?key=19570887-9ab24a9c116677c7d4d20872b&q=${input}&image_type=photo`
        $.ajax({
            url: imgUrl,
            method: "GET"
        }).then(function (img) {
            var randomImg = img.hits // gets array 
            var ran = Math.floor(Math.random() * randomImg.length) // randomizes length of array. outputs a number 
            // console.log(ran)
            var newImage = img.hits[ran].largeImageURL //inputs number into array with image url
            // console.log(newImage)
            //appending to doc 
            var imgDiv = $(`<img>`)
            imgDiv.attr("src", newImage)
            // .attr('width','100%')
            $(".img").html(imgDiv)

            document.addEventListener('imgLoaded',()=>{
                const parallaxEffect = document.querySelectorAll('.parallax');
                M.parallax.init(parallaxEffect, {});
            
            })
            $(document).ready(function () {
                console.log($('.parallax'))
                console.log($('.parallax').parallax())
            });
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
                style: 'mapbox://styles/mapbox/satellite-streets-v11', // stylesheet location
                center: [lng, lat], // starting position [lng, lat]
                zoom: 8 // starting zoom
                
            });
            // console.log(map)

        })

        $.ajax({
            type: "GET",
            data: {
                apikey: "bdcef4737b8ea3d831700911e2db6e95",
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
                // console.log(selectedRecords)
                // var trackArray = []
                

                // Loops through the number selected for 
                function looping() {
                for (var i = 0; i < Number(selectedRecords); i++) {

                    // Gets track name, artist, URL of lyrics
                    var trackName = JSON.stringify(data.message.body.track_list[i].track.track_name )
                    var artistName = JSON.stringify(data.message.body.track_list[i].track.artist_name)
                    var lyricsUrl = JSON.stringify(data.message.body.track_list[i].track.track_share_url)
                    var trackId = JSON.stringify(data.message.body.track_list[i].track.track_id)
                    var trackIdforLyrics = data.message.body.track_list[i].track.track_id

                    console.log(trackName)

                    // 
                    // lyricsSnippet()

                    ////getting lyrics Snippet: commenting out for now, possible enhancement option
                    // function lyricsSnippet() {
                    //     $.ajax({
                    //         type: "GET",
                    //         data: {
                    //             apikey: "bdcef4737b8ea3d831700911e2db6e95",
                    //             track_id: trackIdforLyrics,
                    //             format: "jsonp",
                    //             // callback: "jsonp_callback",
                    //         },
                    //         url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
                    //         dataType: "jsonp",
                    //         // jsonpCallback: 'jsonp_callback',
                    //         contentType: 'application/json',
                    //         success: function (lyricsData) {

                    //             if (lyricsData) {
                    //                 var lyrics = JSON.stringify(lyricsData.message.body.lyrics.lyrics_body)
                    //                 // var lyricsP = $("<p>").text((lyrics))
                    //                 // div2.append(lyricsP)
                    //             }
                    //         },
                    //         error: function (jqXHR, textStatus, errorThrown) {
                    //             console.log(jqXHR);
                    //             console.log(textStatus);
                    //             console.log(errorThrown);
                    //         }
                    //     })

                    // }
                    // lyricsSnippet()

                    lyricsParse = JSON.parse(lyricsUrl)
                    trackNameParse = JSON.parse(trackName)
                    artistNameParse = JSON.parse(artistName)

                    // Appends the artist, URL, track name to DOM
                    $('h4').append($(`<p class="artist"
                    >${artistNameParse}
                    </p>`));

                    $('h4').append($(`
                    <p>
                    <a class="song" href=${lyricsParse} target="_blank">${trackNameParse}</a>
                    </p>`));

                }}
                
                looping()
     
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }

        });
    }
})

// Creates a drop down list of genres
for (var i = 0; i < 360; i++) {
    if (mydata.message.body.music_genre_list[i].music_genre.music_genre_parent_id === 34) {
        var genres = mydata.message.body.music_genre_list[i].music_genre.music_genre_name
        // genres = genres.sort()
        var genreID = mydata.message.body.music_genre_list[i].music_genre.music_genre_id
        $('.genres').append($(`<option value="${genreID}">${genres}</option>`));
    }
}
