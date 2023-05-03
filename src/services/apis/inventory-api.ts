/* tslint:disable */
/* eslint-disable */
/**
 * Freshify API Documentation
 * An API for creating and managing a household inventory and shopping list. The API is written in Java using the Spring Boot framework. The API uses a MySQL database. The API is documented using Swagger. The API is hosted using Apache. Some useful links: - [The GitLab repository](https://gitlab.stud.idi.ntnu.no/idatt2106-v23-10/smartmat-backend)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: vkbugge@hotmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from "axios";
import { Configuration } from "../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from "../base";
import { IdInventoryBody } from "../models";
import { InventoryItems } from "../models";
import { Item } from "../models";
import { UpdateItem } from "../models";
import { WasteSortedListsResponse } from "../models";
/**
 * InventoryApi - axios parameter creator
 * @export
 */
export const InventoryApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Takes a list of entries, each entry contains an item type id and count. This way multiple items can be added.
     * @summary Add item to inventory
     * @param {number} id ID of the household to add items to.
     * @param {Array<IdInventoryBody>} [body] List of items to be added to inventory
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addInventoryItem: async (
      id: number,
      body?: Array<IdInventoryBody>,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling addInventoryItem."
        );
      }
      const localVarPath = `/household/{id}/inventory`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const needsSerialization =
        typeof body !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || "";

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * Takes a list of entries, each entry contains an item type id and count. These item types are added as suggestions to the inventory.
     * @summary Add suggestion to inventory
     * @param {number} id ID of the household to add items to.
     * @param {Array<IdInventoryBody>} [body] List of suggestions to be added to inventory
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addInventorySuggestion: async (
      id: number,
      body?: Array<IdInventoryBody>,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling addInventorySuggestion."
        );
      }
      const localVarPath = `/household/{id}/inventory/suggest`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const needsSerialization =
        typeof body !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || "";

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * Delete an item from inventory of a household.
     * @summary Delete item from inventory
     * @param {number} id ID of household&#x27;s inventory to delete the item from
     * @param {number} itemId ID of item to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteInventoryItem: async (
      id: number,
      itemId: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling deleteInventoryItem."
        );
      }
      // verify required parameter 'itemId' is not null or undefined
      if (itemId === null || itemId === undefined) {
        throw new RequiredError(
          "itemId",
          "Required parameter itemId was null or undefined when calling deleteInventoryItem."
        );
      }
      const localVarPath = `/household/{id}/inventory/{itemId}`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)))
        .replace(`{${"itemId"}}`, encodeURIComponent(String(itemId)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * Gets all items of a specific inventory
     * @summary Gets all items from inventory
     * @param {number} id ID of household&#x27;s shopping list to get items from
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getInventoryItems: async (
      id: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling getInventoryItems."
        );
      }
      const localVarPath = `/household/{id}/inventory`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * Returns lists of household waste sorted by number of items wasted and percentage of items wasted. The lists are sorted in descending order.
     * @summary Returns a list of household waste
     * @param {number} id ID of household to get waste from
     * @param {number} [limit] The number of items to return (maximum 50)
     * @param {string} [startDate] Start date for the time interval (YYYY-MM-DD)
     * @param {string} [endDate] End date for the time interval (YYYY-MM-DD)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    householdIdInventoryWasteGet: async (
      id: number,
      limit?: number,
      startDate?: string,
      endDate?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling householdIdInventoryWasteGet."
        );
      }
      const localVarPath = `/household/{id}/inventory/waste`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (limit !== undefined) {
        localVarQueryParameter["limit"] = limit;
      }

      if (startDate !== undefined) {
        localVarQueryParameter["start_date"] = startDate;
      }

      if (endDate !== undefined) {
        localVarQueryParameter["end_date"] = endDate;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     * Alters an item in inventory. Either the state or the remaining amount can be changed.
     * @summary Alters an item in inventory
     * @param {number} id ID of household&#x27;s inventory to update the item in
     * @param {UpdateItem} [body] The item to be updated
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateInventoryItem: async (
      id: number,
      body?: UpdateItem,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling updateInventoryItem."
        );
      }
      const localVarPath = `/household/{id}/inventory`.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, "https://example.com");
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: "PUT",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter["Content-Type"] = "application/json";

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const needsSerialization =
        typeof body !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || "";

      return {
        url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * InventoryApi - functional programming interface
 * @export
 */
export const InventoryApiFp = function (configuration?: Configuration) {
  return {
    /**
     * Takes a list of entries, each entry contains an item type id and count. This way multiple items can be added.
     * @summary Add item to inventory
     * @param {number} id ID of the household to add items to.
     * @param {Array<IdInventoryBody>} [body] List of items to be added to inventory
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addInventoryItem(
      id: number,
      body?: Array<IdInventoryBody>,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InventoryItems>>
    > {
      const localVarAxiosArgs = await InventoryApiAxiosParamCreator(configuration).addInventoryItem(
        id,
        body,
        options
      );
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Takes a list of entries, each entry contains an item type id and count. These item types are added as suggestions to the inventory.
     * @summary Add suggestion to inventory
     * @param {number} id ID of the household to add items to.
     * @param {Array<IdInventoryBody>} [body] List of suggestions to be added to inventory
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addInventorySuggestion(
      id: number,
      body?: Array<IdInventoryBody>,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InventoryItems>>
    > {
      const localVarAxiosArgs = await InventoryApiAxiosParamCreator(
        configuration
      ).addInventorySuggestion(id, body, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Delete an item from inventory of a household.
     * @summary Delete item from inventory
     * @param {number} id ID of household&#x27;s inventory to delete the item from
     * @param {number} itemId ID of item to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteInventoryItem(
      id: number,
      itemId: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
      const localVarAxiosArgs = await InventoryApiAxiosParamCreator(
        configuration
      ).deleteInventoryItem(id, itemId, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Gets all items of a specific inventory
     * @summary Gets all items from inventory
     * @param {number} id ID of household&#x27;s shopping list to get items from
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getInventoryItems(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<Item>>>> {
      const localVarAxiosArgs = await InventoryApiAxiosParamCreator(
        configuration
      ).getInventoryItems(id, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Returns lists of household waste sorted by number of items wasted and percentage of items wasted. The lists are sorted in descending order.
     * @summary Returns a list of household waste
     * @param {number} id ID of household to get waste from
     * @param {number} [limit] The number of items to return (maximum 50)
     * @param {string} [startDate] Start date for the time interval (YYYY-MM-DD)
     * @param {string} [endDate] End date for the time interval (YYYY-MM-DD)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async householdIdInventoryWasteGet(
      id: number,
      limit?: number,
      startDate?: string,
      endDate?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<WasteSortedListsResponse>>
    > {
      const localVarAxiosArgs = await InventoryApiAxiosParamCreator(
        configuration
      ).householdIdInventoryWasteGet(id, limit, startDate, endDate, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Alters an item in inventory. Either the state or the remaining amount can be changed.
     * @summary Alters an item in inventory
     * @param {number} id ID of household&#x27;s inventory to update the item in
     * @param {UpdateItem} [body] The item to be updated
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateInventoryItem(
      id: number,
      body?: UpdateItem,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
      const localVarAxiosArgs = await InventoryApiAxiosParamCreator(
        configuration
      ).updateInventoryItem(id, body, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * InventoryApi - factory interface
 * @export
 */
export const InventoryApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     * Takes a list of entries, each entry contains an item type id and count. This way multiple items can be added.
     * @summary Add item to inventory
     * @param {number} id ID of the household to add items to.
     * @param {Array<IdInventoryBody>} [body] List of items to be added to inventory
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addInventoryItem(
      id: number,
      body?: Array<IdInventoryBody>,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<InventoryItems>> {
      return InventoryApiFp(configuration)
        .addInventoryItem(id, body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Takes a list of entries, each entry contains an item type id and count. These item types are added as suggestions to the inventory.
     * @summary Add suggestion to inventory
     * @param {number} id ID of the household to add items to.
     * @param {Array<IdInventoryBody>} [body] List of suggestions to be added to inventory
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addInventorySuggestion(
      id: number,
      body?: Array<IdInventoryBody>,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<InventoryItems>> {
      return InventoryApiFp(configuration)
        .addInventorySuggestion(id, body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Delete an item from inventory of a household.
     * @summary Delete item from inventory
     * @param {number} id ID of household&#x27;s inventory to delete the item from
     * @param {number} itemId ID of item to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteInventoryItem(
      id: number,
      itemId: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return InventoryApiFp(configuration)
        .deleteInventoryItem(id, itemId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Gets all items of a specific inventory
     * @summary Gets all items from inventory
     * @param {number} id ID of household&#x27;s shopping list to get items from
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getInventoryItems(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<Item>>> {
      return InventoryApiFp(configuration)
        .getInventoryItems(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns lists of household waste sorted by number of items wasted and percentage of items wasted. The lists are sorted in descending order.
     * @summary Returns a list of household waste
     * @param {number} id ID of household to get waste from
     * @param {number} [limit] The number of items to return (maximum 50)
     * @param {string} [startDate] Start date for the time interval (YYYY-MM-DD)
     * @param {string} [endDate] End date for the time interval (YYYY-MM-DD)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async householdIdInventoryWasteGet(
      id: number,
      limit?: number,
      startDate?: string,
      endDate?: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<WasteSortedListsResponse>> {
      return InventoryApiFp(configuration)
        .householdIdInventoryWasteGet(id, limit, startDate, endDate, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Alters an item in inventory. Either the state or the remaining amount can be changed.
     * @summary Alters an item in inventory
     * @param {number} id ID of household&#x27;s inventory to update the item in
     * @param {UpdateItem} [body] The item to be updated
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateInventoryItem(
      id: number,
      body?: UpdateItem,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return InventoryApiFp(configuration)
        .updateInventoryItem(id, body, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * InventoryApi - object-oriented interface
 * @export
 * @class InventoryApi
 * @extends {BaseAPI}
 */
export class InventoryApi extends BaseAPI {
  /**
   * Takes a list of entries, each entry contains an item type id and count. This way multiple items can be added.
   * @summary Add item to inventory
   * @param {number} id ID of the household to add items to.
   * @param {Array<IdInventoryBody>} [body] List of items to be added to inventory
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof InventoryApi
   */
  public async addInventoryItem(
    id: number,
    body?: Array<IdInventoryBody>,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<InventoryItems>> {
    return InventoryApiFp(this.configuration)
      .addInventoryItem(id, body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Takes a list of entries, each entry contains an item type id and count. These item types are added as suggestions to the inventory.
   * @summary Add suggestion to inventory
   * @param {number} id ID of the household to add items to.
   * @param {Array<IdInventoryBody>} [body] List of suggestions to be added to inventory
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof InventoryApi
   */
  public async addInventorySuggestion(
    id: number,
    body?: Array<IdInventoryBody>,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<InventoryItems>> {
    return InventoryApiFp(this.configuration)
      .addInventorySuggestion(id, body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete an item from inventory of a household.
   * @summary Delete item from inventory
   * @param {number} id ID of household&#x27;s inventory to delete the item from
   * @param {number} itemId ID of item to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof InventoryApi
   */
  public async deleteInventoryItem(
    id: number,
    itemId: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return InventoryApiFp(this.configuration)
      .deleteInventoryItem(id, itemId, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Gets all items of a specific inventory
   * @summary Gets all items from inventory
   * @param {number} id ID of household&#x27;s shopping list to get items from
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof InventoryApi
   */
  public async getInventoryItems(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<Item>>> {
    return InventoryApiFp(this.configuration)
      .getInventoryItems(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Returns lists of household waste sorted by number of items wasted and percentage of items wasted. The lists are sorted in descending order.
   * @summary Returns a list of household waste
   * @param {number} id ID of household to get waste from
   * @param {number} [limit] The number of items to return (maximum 50)
   * @param {string} [startDate] Start date for the time interval (YYYY-MM-DD)
   * @param {string} [endDate] End date for the time interval (YYYY-MM-DD)
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof InventoryApi
   */
  public async householdIdInventoryWasteGet(
    id: number,
    limit?: number,
    startDate?: string,
    endDate?: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<WasteSortedListsResponse>> {
    return InventoryApiFp(this.configuration)
      .householdIdInventoryWasteGet(id, limit, startDate, endDate, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Alters an item in inventory. Either the state or the remaining amount can be changed.
   * @summary Alters an item in inventory
   * @param {number} id ID of household&#x27;s inventory to update the item in
   * @param {UpdateItem} [body] The item to be updated
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof InventoryApi
   */
  public async updateInventoryItem(
    id: number,
    body?: UpdateItem,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return InventoryApiFp(this.configuration)
      .updateInventoryItem(id, body, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
