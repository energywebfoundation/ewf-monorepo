import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { allDevicesMock } from '../../__mocks__/allDeviceMock';
import { DeviceCard } from '../../containers';
import { useStyles } from './AllDevicesPage.styles';

export const AllDevicesPage: FC = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.wrapper}>
      {allDevicesMock.map((device) => (
        <Grid key={`device-${device.id}`} item>
          <DeviceCard device={device} />
        </Grid>
      ))}
    </Grid>
  );
};
