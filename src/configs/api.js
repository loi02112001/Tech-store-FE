import axiosClient from './axios'

export function httpGet(path) {
  return axiosClient.get(path)
}

export function httpPost(path, data) {
  return axiosClient.post(path, data)
}

export function httpDelete(path) {
  return axiosClient.delete(path)
}

export function httpPut(path, data) {
  return axiosClient.put(path, data)
}
