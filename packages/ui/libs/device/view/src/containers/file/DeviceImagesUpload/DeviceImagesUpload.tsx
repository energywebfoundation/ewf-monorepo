import { FileUpload } from '@energyweb/origin-ui-core';
import { Box, Button } from '@material-ui/core';
import { DeviceImagesFormValues } from 'libs/device/logic/src/registerForm/types';
import React, { FC } from 'react';
import { useDeviceImagesUploadEffects } from './DeviceImagesUpload.effects';

interface DeviceImagesUploadProps {
  submitHandler: (values: DeviceImagesFormValues) => void;
}

export const DeviceImagesUpload: FC<DeviceImagesUploadProps> = ({
  submitHandler,
}) => {
  const {
    values,
    uploadText,
    uploadFunction,
    onDeviceImageChange,
    deviceImagesHeading,
    buttonDisabled,
    buttonText,
  } = useDeviceImagesUploadEffects();

  return (
    <Box>
      <FileUpload
        dropzoneText={uploadText}
        heading={deviceImagesHeading}
        apiUploadFunction={uploadFunction}
        onChange={onDeviceImageChange}
      />
      <Box mt={1} display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          name="submit"
          size="large"
          variant="contained"
          disabled={buttonDisabled}
          onClick={() => submitHandler(values)}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};