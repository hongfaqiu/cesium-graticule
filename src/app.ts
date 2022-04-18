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

MapObj.zoomToViewPort([0, 0, 15000000]);

// 开启抗锯齿
MapObj.antiAliasing(true);

// 添加经纬网
const GraticulesObj = new Graticules(MapObj.viewer);

const switchBtn = document.getElementById('switch');
let mode = 3;

const labels = {
  '1': '2.5D',
  '2': '2D',
  '3': '3D',
}

const nextMode = (val: number, total: number = 3) => {
  const next = (val + 1) % total;
  return next ? next : total;
}

if (switchBtn) {
  switchBtn.onclick = () => {
    mode = nextMode(mode);
    MapObj.switchDisplayMode(mode as any);
    switchBtn.innerHTML = labels[mode];
    switchBtn.title = 'Switch to ' + labels[nextMode(mode)];
  }
  
}