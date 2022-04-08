import Graticules from './utils/Graticules';
import CesiumMap from './utils/map';

// initialization
const MapObj = new CesiumMap('app')

MapObj.addRasterLayer({
  layerName: 'ESRI全球底图',
  id: '底图-ESRI全球底图',
  method: 'arcgis',
  url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
})

MapObj.zoomToViewPort([116.3, 39.9, 15000000]);

// 开启抗锯齿
MapObj.antiAliasing(true);

// 添加经纬网
const GraticulesObj = new Graticules(MapObj.viewer);
