import bboxPolygon from '@turf/bbox-polygon';
import intersects from '@turf/boolean-intersects';

// Clip the viewport with the tile and transform to tile coordinates [0..1]
function prepareViewport(bbox, viewport) {
  const { west, south, east, north } = bbox;

  // Clip viewport with the tile
  const minX = Math.max(west, viewport[0]);
  const minY = Math.max(south, viewport[1]);
  const maxX = Math.min(east, viewport[2]);
  const maxY = Math.min(north, viewport[3]);

  // Transform to tile coordinates, between 0..1
  const tMinX = (minX - west) / (east - west);
  const tMaxX = (maxX - west) / (east - west);
  const tMinY = (minY - north) / (south - north);
  const tMaxY = (maxY - north) / (south - north);

  return [tMinX, tMinY, tMaxX, tMaxY];
}

function getFeatureUniqueId(feature, uniqueIdProperty) {
  if (uniqueIdProperty in feature.properties) {
    return feature.properties[uniqueIdProperty];
  }

  if ('geoid' in feature.properties) {
    return feature.properties.geoid;
  }

  if ('id' in feature) {
    return feature.id;
  }

  return -1;
}

function addIntersectedFeaturesInTile({ map, tile, viewport, uniqueIdProperty }) {
  const viewportIntersection = bboxPolygon(prepareViewport(tile.bbox, viewport));
  const indices = getIndices(tile);
  const { positions } = tile.data.polygons;

  for (let i = 0; i < indices.length - 1; i++) {
    const startIndex = indices[i];
    const endIndex = indices[i + 1];
    const featureId = getFeatureId(tile, startIndex);

    if (!map.has(featureId)) {
      // const coordinates =  positions.value.slice(startIndex * positions.size, endIndex * positions.size);
      const ringCoordinates = [];

      for (let j = startIndex; j < endIndex; j++) {
        ringCoordinates.push(
          Array.from(
            positions.value.subarray(j * positions.size, (j + 1) * positions.size)
          )
        );
      }

      if (
        intersects(
          {
            type: 'Polygon',
            coordinates: [ringCoordinates]
          },
          viewportIntersection
        )
      ) {
        map.set(featureId, getPropertiesFromTile(tile, startIndex));
      }
    }
  }
}

function getIndices(tile) {
  return tile.data.polygons.primitivePolygonIndices.value;
}

function getFeatureId(tile, startIndex) {
  return tile.data.polygons.featureIds.value[startIndex];
}

function getPropertiesFromTile(tile, startIndex) {
  const featureId = getFeatureId(tile, startIndex);
  const { properties, numericProps } = tile.data.polygons;
  // TODO better performance if not clone
  const propertiesCloned = Object.assign(properties[featureId]);
  for (const key in numericProps) {
    propertiesCloned[key] = numericProps[key].value[startIndex];
  }

  return propertiesCloned;
}

function isTileFullVisible(bbox, viewport) {
  // const [minX, maxX, maxY, minY] = viewport;
  // TODO alassar check if ok
  const [minX, minY, maxX, maxY] = viewport;
  return (
    bbox.west >= minX && bbox.east <= maxX && bbox.north <= maxY && bbox.south >= minY
  );
}

export function viewportFeatures({ tiles, viewport, uniqueIdProperty }) {
  const map = new Map();

  for (const tile of tiles) {
    //   // Discard if it's not a visible tile or tile has not data
    if (!tile.isVisible || !tile.data) {
      continue;
    }

    const { bbox } = tile;
    tile.fullVisible = isTileFullVisible(bbox, viewport);

    if (tile.fullVisible) {
      // All the features of the tile are visible
      const indices = getIndices(tile);
      for (let i = 0; i < indices.length - 1; i++) {
        const startIndex = indices[i];
        const featureId = getFeatureId(tile, startIndex);
        if (!map.has(featureId)) {
          map.set(featureId, getPropertiesFromTile(tile, startIndex));
        }
      }
    } else {
      addIntersectedFeaturesInTile({ map, tile, viewport, uniqueIdProperty });
    }
  }

  return Array.from(map.values());
}