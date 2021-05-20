import React, { FC } from 'react';
import {
  LoadScriptNext,
  GoogleMap,
  GoogleMapProps,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { CircularProgress } from '@material-ui/core';
import { useGenericMapEffects } from './GenericMap.effects';
import { useStyles } from './GenericMap.styles';

export interface GenericMapProps {
  apiKey: string;
  allItems: any[];
  infoWindowContent: FC;
  containerClassName?: string;
  zoom?: number;
  mapProps?: GoogleMapProps;
}

export const GenericMap: FC<GenericMapProps> = ({
  apiKey,
  allItems,
  infoWindowContent: InfoWindowContent,
  containerClassName,
  zoom,
  mapProps,
}) => {
  const {
    defaultCenter,
    updateBounds,
    showWindowForItem,
    itemHighlighted,
    setItemHighllighted,
  } = useGenericMapEffects(allItems);
  const classes = useStyles();
  return (
    <LoadScriptNext
      googleMapsApiKey={apiKey}
      loadingElement={<CircularProgress />}
    >
      <GoogleMap
        center={defaultCenter}
        zoom={zoom ?? 10}
        mapTypeId="hybrid"
        onLoad={(mapObject) => updateBounds(mapObject)}
        mapContainerClassName={containerClassName ?? classes.map}
        {...mapProps}
      >
        {allItems.map((item) => (
          <React.Fragment key={item.id}>
            <Marker
              position={{
                lat: parseFloat(item.latitude),
                lng: parseFloat(item.longitude),
              }}
              onClick={() => showWindowForItem(item)}
            />
          </React.Fragment>
        ))}

        {itemHighlighted && (
          <InfoWindow
            position={{
              lat: parseFloat(itemHighlighted.latitude),
              lng: parseFloat(itemHighlighted.longitude),
            }}
            onCloseClick={() => setItemHighllighted(null)}
          >
            <InfoWindowContent {...itemHighlighted} />
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};