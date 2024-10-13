// const targetURLBase = window.location.protocol + '//' + window.location.host + '/claude/chat';
import {baseUrl}  from '../config/constants'

const baseURL = baseUrl;

const apiV1Url = baseURL + '/api/v1';

export function getQueryParam(key) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
}


export async function baseSendRequest(url, method, headers, queryParams = null, body = null) {
  url = apiV1Url + url;
  if (queryParams) {
    url += '?' + new URLSearchParams(queryParams).toString();
  }
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    });
    return response.json(); // Return the parsed JSON data
  } catch (error) {
    console.error('Error:', error);
  }
}



export async function sendRequest(url, method, queryParams = null, body = null) {
  const headers = {
    'Content-Type': 'application/json'
  };
  return baseSendRequest(url, method, headers, queryParams, body);
}

export async function getClientsStatus() {
  // const cardDataPromise = sendRequest('/clients_status', 'GET');
  return sendRequest('/clients_status', 'GET');
  // rendererCard(cardDataPromise); // Pass the promise to the renderer
}

