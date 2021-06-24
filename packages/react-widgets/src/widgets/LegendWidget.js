import React from 'react';
import { updateLayer } from '@carto/react-redux/';
import { LegendWidgetUI } from '@carto/react-ui';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function LegendWidget({ className }) {
  const dispatch = useDispatch();
  const layers = useSelector((state) =>
    Object.values(state.carto.layers).filter((layer) => !!layer.legend)
  );

  const onChangeVisibility = ({ id, visible }) => {
    dispatch(
      updateLayer({
        id,
        layerAttributes: { visible }
      })
    );
  };

  return (
    <LegendWidgetUI
      className={className}
      layers={layers}
      onChangeVisibility={onChangeVisibility}
    />
  );
}
