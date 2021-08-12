mapboxgl.accessToken = 'pk.eyJ1IjoiZG90bHkiLCJhIjoiY2tpbnA0YjljMTVhcTM0cGVzYjZibzEyMSJ9.fmuvKLVnmue6RxfqZjeLPQ';
const bounds = [
    [-122.276284,37.862629], // Southwest coordinates
    [-122.266383,37.871718] // Northeast coordinates
    ];
    
// Create a map
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/dotly/cks70umfn8csj17o6on8pcnsr', // style URL
    center: [-122.27139538124986,37.86716711208095], // starting position [lng, lat]
    zoom: 16, // starting zoom
    maxBounds: bounds // max bounds
});

var modal = document.getElementById("aboutPopup");

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
};

function aboutMap() {
    if(modal.style.display == "block"){
      modal.style.display = "none";
    }
    else {
      modal.style.display = "block";
    };
};

class AboutControl { 
    onAdd(map) {
    this._map = map;
    this._container = document.createElement('div');
    this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
    this._container.innerHTML = '<div> <button class="custom-icon" type="button" title="About" aria-label="About" aria-pressed="false"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 600 600"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/> </svg> </button> </div>';
    this._container.addEventListener('click', function(e) {
      aboutMap();
    }, false)
  
    return this._container;
    }
     
    onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
    }
};

const aboutControl = new AboutControl();

const sidepanel = document.getElementById('sidepanel');

const sidepanel_header = document.getElementById('sidepanel-header');

const sidepanel_body = document.getElementById('sidepanel-body');

function closeSidepanel() {
    sidepanel.style.marginLeft = '-500px'
};

map.on('load', () => {   

    // add geolocate control
    map.addControl(new mapboxgl.GeolocateControl({
        position: 'top-right'
    }));
    
    // add navigation control
    map.addControl(new mapboxgl.NavigationControl());

    // add about control
    map.addControl(aboutControl);

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