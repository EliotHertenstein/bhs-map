mapboxgl.accessToken = 'pk.eyJ1IjoiZG90bHkiLCJhIjoiY2tpbnA0YjljMTVhcTM0cGVzYjZibzEyMSJ9.fmuvKLVnmue6RxfqZjeLPQ';
const bounds = [
    [-122.276284,37.862629], // Southwest coordinates
    [-122.266383,37.871718] // Northeast coordinates
    ];
    
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/dotly/cks70umfn8csj17o6on8pcnsr', // style URL
    center: [-122.27139538124986,37.86716711208095], // starting position [lng, lat]
    zoom: 16, // starting zoom
    maxBounds: bounds // max bounds
});

const sidepanel = document.getElementById('sidepanel');

const sidepanel_header = document.getElementById('sidepanel-header');

const sidepanel_body = document.getElementById('sidepanel-body');

function closeSidepanel() {
    sidepanel.style.marginLeft = '-500px'
};

map.on('load', () => {   
    // add directions

    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'imperial',
        profile: 'mapbox/walking',
        position: 'top-left',
        interactive: false,
        controls: {
            inputs: false,
            profileSwitcher: false
        }
      });

    // add geolocate control
    map.addControl(new mapboxgl.GeolocateControl({
        position: 'top-right'
    }));
    
    // add navigation control
    map.addControl(new mapboxgl.NavigationControl());

    // add directions control
    map.addControl(directions);


    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "hover",
        offset: 10
    });
    // change cursor on hover
    map.on('mouseenter', 'berkeley-high-campus-buildings', function(e) {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseenter', 'berkeley-high-campus-locations-and-gates', function(e) {
        map.getCanvas().style.cursor = 'pointer';
    });

    // change cursor on hover remove
    map.on('mouseleave', 'berkeley-high-campus-buildings', function(e) {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseleave', 'berkeley-high-campus-locations-and-gates', function(e) {
        map.getCanvas().style.cursor = '';
    });

    map.on('click', 'berkeley-high-campus-buildings', (e) => {
    });

    map.on('click', 'berkeley-high-campus-locations-and-gates', (e) => {
        // fly to element
        map.flyTo({
            center: e.features[0].geometry.coordinates,
            zoom: 18,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        var name = e.features[0].properties.name;

        var description = e.features[0].properties.description;

        var image_url = e.features[0].properties.image_url;

        if (e.features[0].properties.type === 'gate') {
            var name = 'Gate ' + name;
        };

        // set popup content

        if (image_url !== undefined) {
            sidepanel_header.innerHTML = `
                <button onclick="closeSidepanel()" class='close-button'>&times;</button>
                <img src="${image_url}" alt="Berkeley High" />
                <h3>${name}</h3>
            `;
        } else {
            sidepanel_header.innerHTML = `
                <button onclick="closeSidepanel()" class='close-button black-button'>&times;</button>
                <h3>${name}</h3>
            `;
        };
        
        if (description !== undefined) {
            sidepanel_body.innerHTML = `
                <a>${description}</a>
            `;
        } else {
            sidepanel_body.innerHTML = '';
        };

        // show sidepanel
        sidepanel.style.marginLeft = '0px';
    });

    map.on('click', (e) => {
    });
});