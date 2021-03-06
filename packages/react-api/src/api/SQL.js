import { encodeParameter, getRequest, postRequest } from '@carto/react-core';
import { REQUEST_GET_MAX_URL_LENGTH } from '@carto/react-core';
import { API_VERSIONS } from '@deck.gl/carto';

import { dealWithApiError, generateApiUrl } from './common';

/**
 * Executes a SQL query
 *
 * @param { Object } credentials - CARTO user credentials
 * @param { string } credentials.username - CARTO username
 * @param { string } credentials.apiKey - CARTO API Key
 * @param { string } credentials.serverUrlTemplate - CARTO server URL template
 * @param { string } query - SQL query to be executed
 * @param { string } connection - connection name required for CARTO cloud native
 * @param { Object } opts - Additional options for the HTTP request
 */
export const executeSQL = async ({ credentials, query, connection, opts }) => {
  let response;

  if (!credentials) {
    throw new Error('No credentials provided');
  }

  try {
    const request = createRequest({ credentials, connection, query, opts });
    response = await fetch(request);
  } catch (error) {
    if (error.name === 'AbortError') throw error;

    throw new Error(`Failed to connect to SQL API: ${error}`);
  }

  const data = await response.json();

  if (!response.ok) {
    dealWithApiError({ credentials, response, data });
  }

  const { apiVersion = API_VERSIONS.V2 } = credentials;

  if (apiVersion === API_VERSIONS.V3) {
    return data;
  }

  return opts && opts.format === 'geojson' ? data : data.rows; // just rows portion of result object
};

/**
 * Create an 'SQL query' request
 * (using GET or POST request, depending on url size)
 */
function createRequest({ credentials, connection, query, opts = {} }) {
  const { abortController, ...otherOptions } = opts;

  const { apiVersion = API_VERSIONS.V2 } = credentials;

  const rawParams = {
    client: 'carto-react',
    q: query?.trim(),
    ...otherOptions
  };

  if (apiVersion === API_VERSIONS.V3) {
    rawParams.access_token = credentials.accessToken;
  } else if (apiVersion === API_VERSIONS.V1 || apiVersion === API_VERSIONS.V2) {
    rawParams.api_key = credentials.apiKey;
  }

  const requestOpts = { ...otherOptions };
  if (abortController) {
    requestOpts['signal'] = abortController.signal;
  }

  // Get request
  const encodedParams = Object.entries(rawParams).map(([key, value]) =>
    encodeParameter(key, value)
  );

  const getUrl = generateApiUrl({ credentials, connection, parameters: encodedParams });
  if (getUrl.length < REQUEST_GET_MAX_URL_LENGTH) {
    return getRequest(getUrl, requestOpts);
  }

  // Post request
  const postUrl = generateApiUrl({ credentials });
  return postRequest(postUrl, rawParams, requestOpts);
}
