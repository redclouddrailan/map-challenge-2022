const mapListdata = [
  {
    label: 'Point',
    description:
      'A map showing all the operating healthsites in the Philippines. The data used comes from the https://data.humdata.org/ ',
    url: '/map/point',
  },
  {
    label: 'Line',
    description:
      'A map showing all the river networks of the Philippines. Data source: NAMRIA',
    url: '/map/line',
  },
  {
    label: 'Polygons',
    description:
      'A map showing the poverty indexes of different provinces for years 2006, 2009 and 2012. Data was from https://data.humdata.org',
    url: '/map/polygons',
  },
  {
    label: 'Colour Friday: Green',
    description:
      'This layer contains information about the changes in tree cover density - by second-level administrative area - estimated during the Integrated Context Analysis (ICA) run in the Philippines in 2014. Data source: Landsat Vegetation Continuous Fields (VCF), 2000-2010. It should be noted that, in absence of livelihood data, land cover was used as a proxy for rural livelihoods. The main indicator used for the analysis was the average provincial trend of tree cover change in the last ten years. Data from: https://data.humdata.org/dataset/wfp-geonode-ica-philippines-tree-cover-change',
    url: '/map/green',
  },
  {
    label: 'Ukraine',
    description:
      'Ukraine number of Deaths from 2014-2021 (Pre Ukraine Russia War) Data from: https://ucdp.uu.se/country/369',
    url: '/map/ukraine',
  },
  {
    label: 'Network',
    description:
      'A map showing all the river networks of the Philippines, but with added styling, played with line-styles of mapbox GL. Data source: NAMRIA',
    url: '/map/network',
  },
  {
    label: 'Raster',
    description: 'A map showcasing Diwata-2 capture around Ilocos Norte',
    url: '/map/raster',
  },
  {
    label: 'Data: OpenStreetMap',
    description: 'Road networks of Camarines Norte from OSM',
    url: '/map/osm',
  },
  {
    label: 'Space',
    description: 'Meteor impacts from all around the world',
    url: '/map/space',
  },
  {
    label: 'A Bad Map',
    description:
      'This is an example of a bad map for me, the data represented by the circles in the Philippines is the poverty index in year 2012. Using circles is not appropriate for this kind of data, I believe  using the choropleth map is more suitable and the data is easily understood by the user.',
    url: '/map/bad-map',
  },
  {
    label: 'Colour Friday: Red',
    description: 'Raster layer showing the Philippines elevation model',
    url: '/map/red',
  },
  {
    label: 'Scale',
    description:
      'Using the same point map, I have added a scale control to show the ratio of a distance on the map to the corresponding distance on the ground. ',
    url: '/map/scale',
  },
  {
    label: '5 minute map',
    description:
      'The 5-minute walk, also known as the “pedestrian shed” is considered to be the distance people are willing to walk before opting to drive. Based on the average walking speed a five-minute walk is represented by a radius measuring ¼ of a mile or about 400 meters. This rule of thumb is used to calculate public transport catchment areas or to determine access to destinations within neighborhoods.',
    url: '/map/minute-map',
  },
  {
    label: 'Hexagons',
    description: 'Put interesting map description here',
    url: '/map/hexagons',
  },
  {
    label: 'Food/drink',
    description:
      'Location of resturants for food/drink in the province of Camarines Norte, data extracted from Open Street Map',
    url: '/map/food-drink',
  },
  {
    label: 'Minimal',
    description:
      'This is my take on a minimal map, this is a custom vector tileset on mapbox.',
    url: '/map/minimal',
  },
  {
    label: 'A map without a computer',
    description: 'Put interesting map description here',
    url: '/map/map-without-computer',
  },
  {
    label: 'Colour Friday: blue',
    description:
      'The Mapbox Isochrone API allows you to request polygon or line features that show areas that are reachable within a specified amount of time from a location. In this map, I got the 15 minute distance interval from our home in Daet Camarines Norte.',
    url: '/map/blue',
  },
  {
    label: 'Globe',
    description: `Here's a 3D representation of the Earth, this was made by the globe api of mapbox.`,
    url: '/map/globe',
  },
  {
    label: '"My Favourite"',
    description:
      'My favourite place - Camarines Norte, Im currently residing in Metro manila, so everytime I see a map of my hometown I feel elated.',
    url: '/map/favourite',
  },
  {
    label: 'Data: Kontur Population Dataset',
    description:
      'This is a geotiff image from HDX World Population data resolution of 30 arc-seconds (approximately 1km at the equator). Population density of the Philippines year 2020.',
    url: '/map/kontur',
  },
  {
    label: 'NULL',
    description: `Null Island is the point on the Earth's surface at zero degrees latitude and zero degrees longitude (0°N 0°E), i.e., where the prime meridian and the equator intersect. Null Island is located in international waters in the Atlantic Ocean, roughly 600 km off the coast of West Africa, in the Gulf of Guinea.[1] The exact point, using the WGS84 datum, is marked by the Soul buoy (named after the musical genre), a permanently-moored weather buoy.`,
    url: '/map/null',
  },
  {
    label: 'Movement',
    description: 'Put interesting map description here',
    url: '/map/movement',
  },
  {
    label: 'Fantasy',
    description: `Here's my take on the fantasy map, a map of Hyrule! This map is from Legend of Zelda Breath of the wild game.`,
    url: '/map/fantasy',
  },
  {
    label: 'Colour Friday: 2 colours',
    description:
      'Black and red, using the poverty data of the Philippines year 2020, I have identified the provinces who are below the poverty class line 4, I have used the expression feature of mapbox to achieve this feat.',
    url: '/map/two-colours',
  },
  {
    label: 'Island(s)',
    description:
      'A map showing the Islands of the Philippines, using Stamen tiles vector style.',
    url: '/map/islands',
  },
  {
    label: 'Music',
    description: 'Locations of music stores in the Philippines',
    url: '/map/music',
  },
  {
    label: '3D',
    description:
      'A 3D representation of buildings and establishments in Iloilo City.',
    url: '/map/3D',
  },
  {
    label: 'Out of my comfort zone',
    description:
      'Interpolation is one of the things that I dont quite understand, In this map I used interpolation to get the color way I want based on the square areas of the buildings in Iloilo.',
    url: '/map/out-of-my-comfort-zone',
  },
  {
    label: 'Remix',
    description:
      'Combining the different technologies, such as 3d map rendering, controlling the map camera, interpolation and dynamically setting the height of the buildings based on the data, heres my take on the Remix map challenge.',
    url: '/map/remix',
  },
];

export default mapListdata;
