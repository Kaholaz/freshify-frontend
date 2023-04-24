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
import { CreateShoppingListEntry } from "../models";
import { ShoppingListEntry } from "../models";
import { ShoppinglistBuyBody } from "../models";
import { UpdateShoppingListEntry } from "../models";
/**
 * ShoppingListApi - axios parameter creator
 * @export
 */
export const ShoppingListApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Adds a selected item to shopping list, user has to be validated. Both ItemType id and amount should be sent in request body.
     * @summary Add item to shopping list
     * @param {number} id ID of household&#x27;s shopping list to add items to
     * @param {CreateShoppingListEntry} [body] Item to be added to shopping list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addItem: async (
      id: number,
      body?: CreateShoppingListEntry,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling addItem."
        );
      }
      const localVarPath = `/household/{id}/shoppinglist`.replace(
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

      localVarHeaderParameter["Content-Type"] = "applicatin/json";

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
     * Delete an item from shopping list of a household, both ItemType and count of the item should be passed
     * @summary Delete item from shopping list
     * @param {number} id ID of household&#x27;s shopping list to delete items from
     * @param {number} listEntryId ID of shopping list entry to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteShoppingListEntry: async (
      id: number,
      listEntryId: number,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling deleteShoppingListEntry."
        );
      }
      // verify required parameter 'listEntryId' is not null or undefined
      if (listEntryId === null || listEntryId === undefined) {
        throw new RequiredError(
          "listEntryId",
          "Required parameter listEntryId was null or undefined when calling deleteShoppingListEntry."
        );
      }
      const localVarPath = `/household/{id}/shoppinglist/{listEntryId}`
        .replace(`{${"id"}}`, encodeURIComponent(String(id)))
        .replace(`{${"listEntryId"}}`, encodeURIComponent(String(listEntryId)));
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
     * Gets a shopping list with item id from shopping list
     * @summary Get the shopping list of a household
     * @param {number} id ID of household&#x27;s shopping list to get items from
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getShoppingList: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling getShoppingList."
        );
      }
      const localVarPath = `/household/{id}/shoppinglist`.replace(
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
     * Mark items as bought. Items are removed from shopping list.
     * @summary Mark items as bought
     * @param {number} id ID of household&#x27;s shopping list to mark items as bought
     * @param {ShoppinglistBuyBody} [body] Items to be marked as bought
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    markItemsAsBought: async (
      id: number,
      body?: ShoppinglistBuyBody,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling markItemsAsBought."
        );
      }
      const localVarPath = `/household/{id}/shoppinglist/buy`.replace(
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
     * Updates an entry in the shopping list of a household
     * @summary Update shopping list entry
     * @param {number} id ID of household&#x27;s shopping list to mark items as bought
     * @param {UpdateShoppingListEntry} [body] ItemType and count to change in shopping list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateShoppingListEntry: async (
      id: number,
      body?: UpdateShoppingListEntry,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling updateShoppingListEntry."
        );
      }
      const localVarPath = `/household/{id}/shoppinglist`.replace(
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
 * ShoppingListApi - functional programming interface
 * @export
 */
export const ShoppingListApiFp = function (configuration?: Configuration) {
  return {
    /**
     * Adds a selected item to shopping list, user has to be validated. Both ItemType id and amount should be sent in request body.
     * @summary Add item to shopping list
     * @param {number} id ID of household&#x27;s shopping list to add items to
     * @param {CreateShoppingListEntry} [body] Item to be added to shopping list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addItem(
      id: number,
      body?: CreateShoppingListEntry,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<ShoppingListEntry>>
    > {
      const localVarAxiosArgs = await ShoppingListApiAxiosParamCreator(configuration).addItem(
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
     * Delete an item from shopping list of a household, both ItemType and count of the item should be passed
     * @summary Delete item from shopping list
     * @param {number} id ID of household&#x27;s shopping list to delete items from
     * @param {number} listEntryId ID of shopping list entry to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteShoppingListEntry(
      id: number,
      listEntryId: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
      const localVarAxiosArgs = await ShoppingListApiAxiosParamCreator(
        configuration
      ).deleteShoppingListEntry(id, listEntryId, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Gets a shopping list with item id from shopping list
     * @summary Get the shopping list of a household
     * @param {number} id ID of household&#x27;s shopping list to get items from
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getShoppingList(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<ShoppingListEntry>>>
    > {
      const localVarAxiosArgs = await ShoppingListApiAxiosParamCreator(
        configuration
      ).getShoppingList(id, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Mark items as bought. Items are removed from shopping list.
     * @summary Mark items as bought
     * @param {number} id ID of household&#x27;s shopping list to mark items as bought
     * @param {ShoppinglistBuyBody} [body] Items to be marked as bought
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async markItemsAsBought(
      id: number,
      body?: ShoppinglistBuyBody,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
      const localVarAxiosArgs = await ShoppingListApiAxiosParamCreator(
        configuration
      ).markItemsAsBought(id, body, options);
      return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Updates an entry in the shopping list of a household
     * @summary Update shopping list entry
     * @param {number} id ID of household&#x27;s shopping list to mark items as bought
     * @param {UpdateShoppingListEntry} [body] ItemType and count to change in shopping list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateShoppingListEntry(
      id: number,
      body?: UpdateShoppingListEntry,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
      const localVarAxiosArgs = await ShoppingListApiAxiosParamCreator(
        configuration
      ).updateShoppingListEntry(id, body, options);
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
 * ShoppingListApi - factory interface
 * @export
 */
export const ShoppingListApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     * Adds a selected item to shopping list, user has to be validated. Both ItemType id and amount should be sent in request body.
     * @summary Add item to shopping list
     * @param {number} id ID of household&#x27;s shopping list to add items to
     * @param {CreateShoppingListEntry} [body] Item to be added to shopping list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addItem(
      id: number,
      body?: CreateShoppingListEntry,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<ShoppingListEntry>> {
      return ShoppingListApiFp(configuration)
        .addItem(id, body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Delete an item from shopping list of a household, both ItemType and count of the item should be passed
     * @summary Delete item from shopping list
     * @param {number} id ID of household&#x27;s shopping list to delete items from
     * @param {number} listEntryId ID of shopping list entry to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteShoppingListEntry(
      id: number,
      listEntryId: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return ShoppingListApiFp(configuration)
        .deleteShoppingListEntry(id, listEntryId, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Gets a shopping list with item id from shopping list
     * @summary Get the shopping list of a household
     * @param {number} id ID of household&#x27;s shopping list to get items from
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getShoppingList(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<ShoppingListEntry>>> {
      return ShoppingListApiFp(configuration)
        .getShoppingList(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Mark items as bought. Items are removed from shopping list.
     * @summary Mark items as bought
     * @param {number} id ID of household&#x27;s shopping list to mark items as bought
     * @param {ShoppinglistBuyBody} [body] Items to be marked as bought
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async markItemsAsBought(
      id: number,
      body?: ShoppinglistBuyBody,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return ShoppingListApiFp(configuration)
        .markItemsAsBought(id, body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Updates an entry in the shopping list of a household
     * @summary Update shopping list entry
     * @param {number} id ID of household&#x27;s shopping list to mark items as bought
     * @param {UpdateShoppingListEntry} [body] ItemType and count to change in shopping list
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateShoppingListEntry(
      id: number,
      body?: UpdateShoppingListEntry,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return ShoppingListApiFp(configuration)
        .updateShoppingListEntry(id, body, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * ShoppingListApi - object-oriented interface
 * @export
 * @class ShoppingListApi
 * @extends {BaseAPI}
 */
export class ShoppingListApi extends BaseAPI {
  /**
   * Adds a selected item to shopping list, user has to be validated. Both ItemType id and amount should be sent in request body.
   * @summary Add item to shopping list
   * @param {number} id ID of household&#x27;s shopping list to add items to
   * @param {CreateShoppingListEntry} [body] Item to be added to shopping list
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ShoppingListApi
   */
  public async addItem(
    id: number,
    body?: CreateShoppingListEntry,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<ShoppingListEntry>> {
    return ShoppingListApiFp(this.configuration)
      .addItem(id, body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Delete an item from shopping list of a household, both ItemType and count of the item should be passed
   * @summary Delete item from shopping list
   * @param {number} id ID of household&#x27;s shopping list to delete items from
   * @param {number} listEntryId ID of shopping list entry to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ShoppingListApi
   */
  public async deleteShoppingListEntry(
    id: number,
    listEntryId: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return ShoppingListApiFp(this.configuration)
      .deleteShoppingListEntry(id, listEntryId, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Gets a shopping list with item id from shopping list
   * @summary Get the shopping list of a household
   * @param {number} id ID of household&#x27;s shopping list to get items from
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ShoppingListApi
   */
  public async getShoppingList(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<ShoppingListEntry>>> {
    return ShoppingListApiFp(this.configuration)
      .getShoppingList(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Mark items as bought. Items are removed from shopping list.
   * @summary Mark items as bought
   * @param {number} id ID of household&#x27;s shopping list to mark items as bought
   * @param {ShoppinglistBuyBody} [body] Items to be marked as bought
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ShoppingListApi
   */
  public async markItemsAsBought(
    id: number,
    body?: ShoppinglistBuyBody,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return ShoppingListApiFp(this.configuration)
      .markItemsAsBought(id, body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Updates an entry in the shopping list of a household
   * @summary Update shopping list entry
   * @param {number} id ID of household&#x27;s shopping list to mark items as bought
   * @param {UpdateShoppingListEntry} [body] ItemType and count to change in shopping list
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof ShoppingListApi
   */
  public async updateShoppingListEntry(
    id: number,
    body?: UpdateShoppingListEntry,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return ShoppingListApiFp(this.configuration)
      .updateShoppingListEntry(id, body, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
