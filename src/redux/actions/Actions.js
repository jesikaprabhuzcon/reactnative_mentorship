import {
  PROJECTDETAILS,
  CLIENTDETAILS,
  PROJECTFILTER,
  CLIENTFILTER,
  REFRESH,
} from "../constants/Constants";

export const setProjectDetails = (data) => ({
  type: PROJECTDETAILS,
  payload: data,
});

export const setClientDetails = (data) => ({
  type: CLIENTDETAILS,
  payload: data,
});

export const setProjectFilter = (data) => ({
  type: PROJECTFILTER,
  payload: data,
});

export const setClientFilter = (data) => ({
  type: CLIENTFILTER,
  payload: data,
});

export const setRefresh = (data) =>({
  type: REFRESH,
  payload: data,
})
