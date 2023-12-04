/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';

export const useAsync = (
  asyncFn: () => Promise<AxiosResponse<any, any>>,
  successFunction: (data: any) => void,
  errorFunction?: (error: any) => void,
  returnFunction?: () => void,
  dependencies: [] = [],
) => {
  useEffect(() => {
    let isActive = true;
    asyncFn()
      .then((result) => {
        if (isActive) {
          successFunction(result.data);
        }
      })
      .catch((error) => {
        if (isActive) {
          errorFunction && errorFunction(error);
        }
      })
      .finally(() => {
        returnFunction && returnFunction();
        isActive = false;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};
