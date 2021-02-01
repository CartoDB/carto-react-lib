function isFeature(value) {
  return typeof value === 'object' && 'properties' in value;
}

function isValidFeature(feature, column) {
  if (!isFeature(feature)) {
    return 0;
  }

  const value = feature.properties[column];
  const isValidValue = Number.isFinite(value);
  return isValidValue ? value : 0;
}

export function pickValuesFromFeatures(features, column) {
  return features.map((feat) => isValidFeature(feat, column));
}
