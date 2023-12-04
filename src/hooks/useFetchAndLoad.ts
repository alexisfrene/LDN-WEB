/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
interface Call {
  call: any;
  controller?: AbortController;
}
export const useFetchAndLoad = () => {
  const [loading, setLoading] = useState(false);
  let controller: AbortController;

  const callEndpoint = async (axiosCall: Call) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    setLoading(true);
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
    } catch (err: any) {
      setLoading(false);
      throw err;
    }
    setLoading(false);
    return result;
  };

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { loading, callEndpoint };
};
