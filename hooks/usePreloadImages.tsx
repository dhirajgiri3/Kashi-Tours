"use client";

import { useEffect, useState } from 'react';
import { preloadImages } from '../utils/preloadImages';

export const usePreloadImages = (selector: string) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    preloadImages(selector).then(() => {
      setImagesLoaded(true);
      document.body.classList.remove('loading');
    });
  }, [selector]);

  return imagesLoaded;
};