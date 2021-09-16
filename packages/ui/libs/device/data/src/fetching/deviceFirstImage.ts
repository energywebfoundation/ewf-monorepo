import { useEffect, useRef, useState } from 'react';
import { ComposedPublicDevice } from '../types';
import { publicFileDownloadHandler } from './file';

export const useDeviceFirstImageUrl = (
  imageIds: ComposedPublicDevice['imageIds']
) => {
  const isMountedRef = useRef(false);
  const [imageUrl, setImageUrl] = useState('');

  const getAndSetImage = async (id: string) => {
    const response = await publicFileDownloadHandler(id);
    const imageType = (response as any).headers['content-type'];
    const blob = new Blob(
      [Buffer.from((response.data as any).data as unknown as string)],
      {
        type: imageType,
      }
    );
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    setImageUrl(imageUrl);
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (imageIds?.length > 0) {
      getAndSetImage(imageIds[0]);
    }
    return () => {
      isMountedRef.current = false;
    };
  }, [imageIds]);

  return imageUrl;
};
