import http from "../httpCommon";

const getAll = () => {
  return http.get("/character");
};

const get = (searchText: string) => {
  return http.get(`/character/?name=${searchText}`);
};

const Service = {
  getAll,
  get,
};

export default Service;
