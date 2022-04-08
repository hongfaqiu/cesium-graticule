import * as Cesium from 'cesium';

import type { Color, Ellipsoid, LabelCollection, PolylineCollection, Rectangle, Scene, Viewer } from "cesium";

const mins = [
  0.00675,
  0.0125,
  0.025,
  0.05,
  0.1,
  0.2,
  0.5,
  1.0,
  2.0,
  5.0,
  10.0
].map(Cesium.Math.toRadians);

function gridPrecision(dDeg: number) {
  if (dDeg < 0.01) return 3;
  if (dDeg < 0.1) return 2;
  if (dDeg < 1) return 1;
  return 0;
}

function convertDEGToDMS(deg: number, isLat: boolean) {
  const absolute = Math.abs(deg);

  const degrees = ~~absolute;
  const minutesNotTruncated = Math.round((absolute - degrees) * 600) / 10;
  const minutes = ~~minutesNotTruncated;
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);

  let minSec = "";
  if (minutes || seconds !== "0.00") minSec += minutes + "'";
  if (seconds !== "0.00") minSec += seconds + '"';

  return `${degrees}°${minSec.padStart(2, '0')}${isLat ? (deg >= 0 ? "N" : "S") : deg >= 0 ? "E" : "W"}`;
}

type GraticulesOptions = {
  color?: Color;
  debounce?: number;
  gridCount?: number;
}
export default class Graticules {
  #color: Color;
  #viewer: Viewer;
  #scene: Scene;
  #labels: LabelCollection;
  #polylines: PolylineCollection;
  #ellipsoid: Ellipsoid;
  #currentExtent: any;
  #visible: boolean;
  #lastRefresh: number;
  #debounce = 500;
  #gridCount: number;
  #granularity = Cesium.Math.toRadians(3)

  /**
   * Create a Graticules Object
   * @param viewer cesium viewer
   * @param options - Object with the following properties:
   * @param [options.color = Cesium.Color.WHITE.withAlpha(.5)] - The line color. Defaults to Cesium.Color.WHITE.withAlpha(.5)
   * @param [options.gridCount = 15] - Lines in screen, defaults to 15
   */
  constructor(viewer: Viewer, options: GraticulesOptions = {}) {
    this.#viewer = viewer;
    this.#scene = viewer.scene;
    this.#color = options.color || Cesium.Color.WHITE.withAlpha(.5);
    this.#gridCount = options.gridCount || 15;

    this.#labels = new Cesium.LabelCollection();
    viewer.scene.primitives.add(this.#labels);
    this.#polylines = new Cesium.PolylineCollection();
    viewer.scene.primitives.add(this.#polylines);
    this.#ellipsoid = viewer.scene.globe.ellipsoid;
    this.#lastRefresh = 0;
    this.start();
    this.#visible = true;
  }

  get visible() {
    return this.#visible;
  }

  #getExtentView() {
    const camera = this.#scene.camera;
    const canvas = this.#scene.canvas;
    const corners = [
        camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), this.#ellipsoid),
        camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, 0), this.#ellipsoid),
        camera.pickEllipsoid(new Cesium.Cartesian2(0, canvas.height), this.#ellipsoid),
        camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), this.#ellipsoid)
    ];
    for(let index = 0; index < 4; index++) {
        if(corners[index] === undefined) {
            return Cesium.Rectangle.MAX_VALUE;
        }
    }
    return Cesium.Rectangle.fromCartographicArray(this.#ellipsoid.cartesianArrayToCartographicArray(corners as Cesium.Cartesian3[]));
  }

  #screenCenterPosition() {
    let canvas = this.#scene.canvas;
    let center = new Cesium.Cartesian2(
      Math.round(canvas.clientWidth / 2),
      Math.round(canvas.clientHeight / 2)
    );
    let cartesian = this.#scene.camera.pickEllipsoid(center);

    if (!cartesian) cartesian = Cesium.Cartesian3.fromDegrees(0, 0, 0);
    return cartesian;
  }

  #makeLabel(lng: number, lat: number, text: string, isLat: boolean, color = "white", meridians = false) {
    if (meridians) {
      if (text === "0°N") text = "Equator";
      if (text === "0°E") text = "Prime Meridian";
      if (text === "180°E") text = "Antimeridian";
    }
    let center = Cesium.Cartographic.fromCartesian(this.#screenCenterPosition());
    let carto = new Cesium.Cartographic(lng, lat);
    if (isLat) carto.longitude = center.longitude;
    else carto.latitude = center.latitude;
    let position = this.#ellipsoid.cartographicToCartesian(carto);
    let label = this.#labels.add({
      position,
      text,
      font: `bold 1rem Arial`,
      fillColor: color,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 4,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian2(isLat ? 0 : 4, isLat ? -6 : 0),
      eyeOffset: Cesium.Cartesian3.ZERO,
      horizontalOrigin: isLat
        ? Cesium.HorizontalOrigin.CENTER
        : Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: isLat
        ? Cesium.VerticalOrigin.BOTTOM
        : Cesium.VerticalOrigin.TOP,
      scale: 1,
      scaleByDistance: new Cesium.NearFarScalar(1, 0.85, 8.0e6, .75)
    });
    label["isLat"] = isLat;
  }

  #updateLabelPositions() {
    let center = Cesium.Cartographic.fromCartesian(this.#screenCenterPosition());
    const len = this.#labels.length;
    for (let i = 0; i < len; ++i) {
      const b = this.#labels.get(i);
      let carto = Cesium.Cartographic.fromCartesian(b.position);
      if (b["isLat"]) carto.longitude = center.longitude;
      else carto.latitude = center.latitude;
      b.position = this.#ellipsoid.cartographicToCartesian(carto);
    }
  }

  #drawGrid(extent: Rectangle) {
    if (!extent) extent = this.#getExtentView();
    const { MAX_VALUE } = Cesium.Rectangle;
    extent = Object.assign({}, extent);
    let wrapLng = undefined;
    if (extent.east < extent.west) {
      wrapLng = MAX_VALUE.east + Math.abs(-MAX_VALUE.east - extent.east);
    };

    this.#polylines.removeAll();
    this.#labels.removeAll();

    let dLat = mins[0],
      dLng = mins[0],
      index;

    // get the nearest to the calculated value
    for (
      index = 0;
      index < mins.length && dLat < (extent.north - extent.south) / this.#gridCount;
      index++
    ) {
      dLat = mins[index];
    }

    for (
      index = 0;
      index < mins.length && dLng < ((wrapLng === undefined ? extent.east : wrapLng) - extent.west) / this.#gridCount;
      index++
    ) {
      dLng = mins[index];
    }
    const center = Cesium.Cartographic.fromCartesian(this.#screenCenterPosition());
    if (center.latitude > Cesium.Math.toRadians(75) || center.latitude < Cesium.Math.toRadians(-75)) {
    } else
      if (dLng !== dLat) {
        dLng = dLat = Math.min(dLat, dLng);
      }
    // round iteration limits to the computed grid interval
    let minLng =
      (extent.west < 0
        ? Math.ceil(extent.west / dLng)
        : ~~(extent.west / dLng)) * dLng;
    let minLat =
      (extent.south < 0
        ? Math.ceil(extent.south / dLat)
        : ~~(extent.south / dLat)) * dLat;
    let maxLng =
      (extent.east < 0
        ? Math.ceil(extent.east / dLat)
        : ~~(extent.east / dLat)) * dLat;
    let maxLat =
      (extent.north < 0
        ? Math.ceil(extent.north / dLng)
        : ~~(extent.north / dLng)) * dLng;

    // extend to make sure we cover for non refresh of tiles
    minLng = Math.max(minLng - 2 * dLng, -Math.PI);
    maxLng = Math.min(maxLng + 2 * dLng, Math.PI);
    minLat = Math.max(minLat - 2 * dLat, -Math.PI / 2);
    maxLat = Math.min(maxLat + 2 * dLng, Math.PI / 2);

    let lat,
      lng;

    const lineGraphicsObj = (positions: any, color: Cesium.Color) => {
      return {
        positions,
        width: .5,
        material: Cesium.Material.fromType("Color", {
          color: color
        })
      }
    };

    // labels positions
    const latitudeText = minLat + ~~((maxLat - minLat) / dLat / 2) * dLat;
    let tLng = (wrapLng === undefined ? maxLng : wrapLng);

    let countLng = 0;

    for (let _lng = minLng; _lng < tLng - dLng; _lng += dLng) {
      if (maxLng > MAX_VALUE.east) {
        // @ts-ignore
        lng = extent._east - (_lng - MAX_VALUE.east);
      } else {
        lng = _lng;
      }
      // draw meridian
      const path = [];
      for (lat = minLat; lat < maxLat; lat += this.#granularity) {
        path.push(new Cesium.Cartographic(lng, lat));
      }
      path.push(new Cesium.Cartographic(lng, maxLat));
      const degLng = Cesium.Math.toDegrees(lng);
      const text = convertDEGToDMS(+degLng.toFixed(gridPrecision(dLng)), false);
      const color =
        text === "0°E" || text === "180°E"
          ? Cesium.Color.YELLOW
          : this.#color;
      if (text !== "180°W") {
        this.#polylines.add(lineGraphicsObj(this.#ellipsoid.cartographicArrayToCartesianArray(path), color));
        if (countLng % 2) {
          this.#makeLabel(lng, latitudeText, text, false);
        }
        countLng++;
      }
    }

    // lats
    const longitudeText =
      minLng + ~~((tLng - minLng) / dLng / 2) * dLng;

    let countLat = 0;
    for (lat = minLat; lat < maxLat; lat += dLat) {
      // draw parallels
      const path = [];
      for (lng = minLng; lng < tLng; lng += this.#granularity) {
        path.push(new Cesium.Cartographic(lng, lat));
      }
      path.push(new Cesium.Cartographic(maxLng, lat));
      const degLat = Cesium.Math.toDegrees(lat);
      const text = convertDEGToDMS(+degLat.toFixed(gridPrecision(dLat)), true);
      const color = text === "0°N" ? Cesium.Color.YELLOW : Cesium.Color.WHITE.withAlpha(.5);
      this.#polylines.add(lineGraphicsObj(this.#ellipsoid.cartographicArrayToCartesianArray(path), color));
      if (countLat % 2) {
        this.#makeLabel(longitudeText, lat, text, true);
      }
      countLat++;
    }
  }

  #render = () => {
    let lr = this.#lastRefresh;
    let now = new Date().getTime();
    if (now - lr < this.#debounce) return;
    this.#updateLabelPositions();
    let extent = this.#getExtentView();
    let shouldRefresh = true;
    if (this.#currentExtent) {
      let w = Math.abs(extent.west - this.#currentExtent.west),
        s = Math.abs(extent.south - this.#currentExtent.south),
        e = Math.abs(extent.east - this.#currentExtent.east),
        n = Math.abs(extent.north - this.#currentExtent.north);
      let m = 0.0001;
      if (w < m && s < m && e < m && n < m) shouldRefresh = false;
    }
    if (!shouldRefresh && this.#labels.length) return;
    this.#currentExtent = extent;
    this.#drawGrid(extent);
  }

  start() {
    this.#viewer.camera.percentageChanged = 0.03;
    this.#viewer.scene.camera.changed.addEventListener(this.#render);
    this.#viewer.container.addEventListener("resize", this.#render);
    this.#render();
    this.#visible = true;
    this.#scene.requestRender();
  }

  remove() {
    this.#polylines.removeAll();
    this.#labels.removeAll();
    this.#viewer.scene.camera.changed.removeEventListener(this.#render);
    this.#viewer.container.removeEventListener("resize", this.#render);
    this.#visible = false;
    this.#scene.requestRender();
  }

}