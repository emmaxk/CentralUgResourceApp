// Application Configuration
const CONFIG = {
    // Map settings
    map: {
        center: [0.3476, 32.5825], // Kampala center
        zoom: 9,                   // Wider view of central region
        minZoom: 8,               // Moderate zoom-out while maintaining focus
        maxZoom: 18,
        defaultLayer: 'street'
    },
    
    // Map tile layers
    tileLayers: {
        street: {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '© OpenStreetMap contributors'
        },
        satellite: {
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: '© Esri'
        },
        terrain: {
            url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            attribution: '© OpenTopoMap contributors'
        }
    },
    
    // Marker icons configuration
    markerIcons: {
        Hospital: {
            emoji: '🏥',
            color: '#e74c3c',
            size: 22
        },
        'Health Center': {
            emoji: '⚕️',
            color: '#3498db',
            size: 20
        },
        Clinic: {
            emoji: '💊',
            color: '#2ecc71',
            size: 18
        },
        School: {
            emoji: '🎓',
            color: '#f39c12',
            size: 20
        },
        'Police Station': {
            emoji: '👮',
            color: '#34495e',
            size: 20
        }
    },
    
    // Application metadata
    app: {
        name: 'UgandaGIS',
        version: '1.0.0',
        author: 'Central Uganda GIS Team',
        description: 'Professional GIS platform for community resource mapping'
    },
    
    // District styling
    districtStyle: {
        default: {
            color: '#2c3e50',
            weight: 2,
            opacity: 0.7,
            fillColor: '#3498db',
            fillOpacity: 0.1,
            dashArray: '3'
        },
        hover: {
            color: '#2980b9',
            weight: 3,
            opacity: 1,
            fillColor: '#3498db',
            fillOpacity: 0.2,
            dashArray: null
        },
        selected: {
            color: '#e74c3c',
            weight: 3,
            opacity: 1,
            fillColor: '#e74c3c',
            fillOpacity: 0.15,
            dashArray: null
        }
    }
};

// Export config
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG };
}
