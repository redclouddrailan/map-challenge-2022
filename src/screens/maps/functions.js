import { centroid, multiPolygon } from '@turf/turf';

export const processPoints = (points) => {
  const stage = points.features;
  const pStage = stage.map((res) => {
    const poly = multiPolygon(res.geometry.coordinates);
    const getCenter = centroid(poly);
    delete getCenter.properties;
    return { ...res, ...getCenter };
  });
  return pStage;
};

export const dummy = () => {};
