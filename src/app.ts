import Graticules from './utils/Graticules';
import CesiumMap from './utils/map';

// initialization
const MapObj = new CesiumMap('app')

MapObj.addRasterLayer({
  layerName: 'esri-global',
  id: 'esri-global',
  method: 'arcgis',
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
})

MapObj.zoomToViewPort([0, 0, 15000000]);

// enable FXAA
MapObj.antiAliasing(true);

// add graticules
const GraticulesObj = new Graticules(MapObj.viewer);