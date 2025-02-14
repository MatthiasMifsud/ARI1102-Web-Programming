
const lat = "46.2044";
const lon = "6.1432";
const username = "matthiasmifsud";

var map = L.map('map').setView([lat, lon], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Creating a custom icon
var customIcon = L.icon({
    iconUrl: 'https://cdn4.iconfinder.com/data/icons/essentials-72/24/025_-_Location-1024.png',
    iconSize: [35, 35] // Size of the icon
});

//Lake Geneva
var marker1 = L.marker([46.4414, 6.5295], { icon: customIcon }).addTo(map);
marker1.bindPopup("<b>Lake Geneva</b><br><br>Lake Geneva, surrounded by the Alps, offers stunning scenery, boat cruises, and lakeside promenades. Key attractions include Geneva’s Jet d’Eau and the Château de Chillon near Montreux, making it a popular destination for nature and culture lovers.<br><br><i><u><a href='attractions.html#LakeGeneva'>Go to Section</a></i></u>").openPopup();


//Cern Gateway
var marker2 = L.marker([46.2336, 6.0566], { icon: customIcon }).addTo(map);
marker2.bindPopup("<b>Cern Gateway</b><br><br>The CERN Science Gateway is a world-class attraction for tourists visiting Geneva, Switzerland. Opened in 2023, it serves as an educational and inspirational hub, inviting visitors to explore the wonders of particle physics and the mysteries of the universe in an engaging and accessible way.<br><br><i><u><a href='attractions.html#CERN'>Go to Section</a></i></u>").openPopup();


//Jet d'Eau
var marker3 = L.marker([46.2074, 6.1559], { icon: customIcon }).addTo(map);
marker3.bindPopup("<b>Jet d'Eau</b></br><br>The Jet d’Eau is an iconic fountain in Geneva, shooting water 140 meters into the air from Lake Geneva. It’s one of the city’s most famous landmarks, symbolizing its connection to the lake and offering stunning views.<br><br><i><u><a href='attractions.html#JetDeau'>Go to Section</a></i></u>").openPopup();


//Old Town
var marker4 = L.marker([46.2003, 6.1487], { icon: customIcon }).addTo(map);
marker4.bindPopup("<b>Old Town</b><br><br>Geneva’s Old Town (Vieille Ville) is the city’s historic heart, a picturesque maze of cobblestone streets, ancient landmarks, and cultural treasures. Perched on a hill overlooking the Rhône River, it offers visitors a delightful blend of history, architecture, and atmosphere.<br><br><i><u><a href='attractions.html#OldTown'>Go to Section</a></i></u>").openPopup();


//UN Building
var marker5 = L.marker([46.2267, 6.1403], { icon: customIcon }).addTo(map);
marker5.bindPopup("<b>United Nations Building</b><br><br>The United Nations Office at Geneva (UNOG), housed in the historic Palace of Nations (Palais des Nations), is one of the most iconic landmarks in the city. It serves as a hub for international diplomacy, hosting meetings, negotiations, and activities that shape global policy.<br><br><i><u><a href='history.html#UnitedNations'>Go to Section</a></i></u>").openPopup();


function getHotspot() {
    //AJAX calls
    var request = new XMLHttpRequest();
    let url = `http://api.geonames.org/findNearbyWikipediaJSON?lat=${lat}&lng=${lon}&maxRows=499&username=${username}`;

    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var jsonHotspot = JSON.parse(request.responseText);
            console.log(jsonHotspot);
            displayHotspots(jsonHotspot);
        }
    };

    request.open("GET", url, true); //Asynchronous request
    request.send();
}

function displayHotspots(jsonHotspot) {
    if (jsonHotspot.geonames && jsonHotspot.geonames.length > 0) {
        for (let i = 0; i < jsonHotspot.geonames.length; i++) {
            if(jsonHotspot.geonames[i].rank > 95){
                let latitude = jsonHotspot.geonames[i].lat;
                let longitude = jsonHotspot.geonames[i].lng;
                let title = jsonHotspot.geonames[i].title;
                let summary = jsonHotspot.geonames[i].summary;
                let wikiLink = jsonHotspot.geonames[i].wikipediaUrl;

                // Ensuring the wikiLink is properly formatted
                if (wikiLink && !wikiLink.startsWith("http")) {
                    wikiLink = "https://" + wikiLink;
                }

                // Creating a marker and popup for each wiki link
                var marker = L.marker([latitude, longitude]).addTo(map);
                marker.bindPopup(`
                    <b>${title}</b><br>${summary}<br><br><i><u><a href="${wikiLink}" target="_blank">Read more...</a></u></i>
                `);
            }
        }
    }
}
getHotspot();

