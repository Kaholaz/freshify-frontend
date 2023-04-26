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
import { CreateUser } from "../models";
import { Household } from "../models";
import { InlineResponse200 } from "../models";
import { LoginUser } from "../models";
import { UpdateUser } from "../models";
import { UserFull } from "../models";
/**
 * AccountApi - axios parameter creator
 * @export
 */
export const AccountApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Creates a user
     * @summary Create a user
     * @param {CreateUser} [body] The user to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    createUser: async (
      body?: CreateUser,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/user`;
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
     * Deletes a user
     * @summary Delete user
     * @param {number} id ID of user to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteUser: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling deleteUser."
        );
      }
      const localVarPath = `/user/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
     * Gets a list of households of a given user
     * @summary Get a user's households
     * @param {number} id ID of user to get households from
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getHouseholds: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling getHouseholds."
        );
      }
      const localVarPath = `/user/{id}/households`.replace(
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
     * Returns the details of the logged in user, the details are extracted from the jwt token cookie.
     * @summary Get the user details from the jwt token cookie
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getLoggedInUser: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/user/loggedin`;
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
     * Returns a single user by email
     * @summary Get user by email
     * @param {string} email Email of user to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getUserByEmail: async (
      email: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'email' is not null or undefined
      if (email === null || email === undefined) {
        throw new RequiredError(
          "email",
          "Required parameter email was null or undefined when calling getUserByEmail."
        );
      }
      const localVarPath = `/user`;
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

      if (email !== undefined) {
        localVarQueryParameter["email"] = email;
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
     * Returns a single user
     * @summary Get user by id
     * @param {number} id ID of user to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getUserById: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          "id",
          "Required parameter id was null or undefined when calling getUserById."
        );
      }
      const localVarPath = `/user/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
     * Logs in a user
     * @summary Login user
     * @param {LoginUser} [body] The user to be logged in
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    loginUser: async (body?: LoginUser, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/user/login`;
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
     * Logs out a user
     * @summary Logout user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    logoutUser: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/user/logout`;
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
     * Updates a user
     * @summary Update user
     * @param {UpdateUser} [body] The user to be updated
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    updateUser: async (
      body?: UpdateUser,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/user`;
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
 * AccountApi - functional programming interface
 * @export
 */
export const AccountApiFp = function (configuration?: Configuration) {
  return {
    /**
     * Creates a user
     * @summary Create a user
     * @param {CreateUser} [body] The user to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createUser(
      body?: CreateUser,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserFull>>> {
      const localVarAxiosArgs = await AccountApiAxiosParamCreator(configuration).createUser(
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
     * Deletes a user
     * @summary Delete user
     * @param {number} id ID of user to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteUser(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
      const localVarAxiosArgs = await AccountApiAxiosParamCreator(configuration).deleteUser(
        id,
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
     * Gets a list of households of a given user
     * @summary Get a user's households
     * @param {number} id ID of user to get households from
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getHouseholds(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<Household>>>
    > {
      const localVarAxiosArgs = await AccountApiAxiosParamCreator(configuration).getHouseholds(
        id,
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
     * Returns the details of the logged in user, the details are extracted from the jwt token cookie.
     * @summary Get the user details from the jwt token cookie
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getLoggedInUser(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserFull>>> {
      const localVarAxiosArgs = await AccountApiAxiosParamCreator(configuration).getLoggedInUser(
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
     * Returns a single user by email
     * @summary Get user by email
     * @param {string} email Email of user to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getUserByEmail(
      email: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse200>>
    > {
      const localVarAxiosArgs = await AccountApiAxiosParamCreator(configuration).getUserByEmail(
        email,
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
     * Returns a single user
     * @summary Get user by id
     * @param {number} id ID of user to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getUserById(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserFull>>> {
      const localVarAxiosArgs = await AccountApiAxiosParamCreator(configuration).getUserById(
        id,
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
     * Logs in a user
     * @summary Login user
     * @param {LoginUser} [body] The user to be logged in
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async loginUser(
      body?: LoginUser,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserFull>>> {
      const localVarAxiosArgs = await AccountApiAxiosParamCreator(configuration).loginUser(
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
     * Logs out a user
     * @summary Logout user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async logoutUser(
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
      const localVarAxiosArgs = await AccountApiAxiosParamCreator(configuration).logoutUser(
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
     * Updates a user
     * @summary Update user
     * @param {UpdateUser} [body] The user to be updated
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateUser(
      body?: UpdateUser,
      options?: AxiosRequestConfig
    ): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<UserFull>>> {
      const localVarAxiosArgs = await AccountApiAxiosParamCreator(configuration).updateUser(
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
  };
};

/**
 * AccountApi - factory interface
 * @export
 */
export const AccountApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     * Creates a user
     * @summary Create a user
     * @param {CreateUser} [body] The user to be created
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async createUser(
      body?: CreateUser,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<UserFull>> {
      return AccountApiFp(configuration)
        .createUser(body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Deletes a user
     * @summary Delete user
     * @param {number} id ID of user to delete
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteUser(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
      return AccountApiFp(configuration)
        .deleteUser(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Gets a list of households of a given user
     * @summary Get a user's households
     * @param {number} id ID of user to get households from
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getHouseholds(
      id: number,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<Household>>> {
      return AccountApiFp(configuration)
        .getHouseholds(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns the details of the logged in user, the details are extracted from the jwt token cookie.
     * @summary Get the user details from the jwt token cookie
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getLoggedInUser(options?: AxiosRequestConfig): Promise<AxiosResponse<UserFull>> {
      return AccountApiFp(configuration)
        .getLoggedInUser(options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns a single user by email
     * @summary Get user by email
     * @param {string} email Email of user to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getUserByEmail(
      email: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<InlineResponse200>> {
      return AccountApiFp(configuration)
        .getUserByEmail(email, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Returns a single user
     * @summary Get user by id
     * @param {number} id ID of user to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getUserById(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<UserFull>> {
      return AccountApiFp(configuration)
        .getUserById(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Logs in a user
     * @summary Login user
     * @param {LoginUser} [body] The user to be logged in
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async loginUser(
      body?: LoginUser,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<UserFull>> {
      return AccountApiFp(configuration)
        .loginUser(body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Logs out a user
     * @summary Logout user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async logoutUser(options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
      return AccountApiFp(configuration)
        .logoutUser(options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Updates a user
     * @summary Update user
     * @param {UpdateUser} [body] The user to be updated
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async updateUser(
      body?: UpdateUser,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<UserFull>> {
      return AccountApiFp(configuration)
        .updateUser(body, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * AccountApi - object-oriented interface
 * @export
 * @class AccountApi
 * @extends {BaseAPI}
 */
export class AccountApi extends BaseAPI {
  /**
   * Creates a user
   * @summary Create a user
   * @param {CreateUser} [body] The user to be created
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  public async createUser(
    body?: CreateUser,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<UserFull>> {
    return AccountApiFp(this.configuration)
      .createUser(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Deletes a user
   * @summary Delete user
   * @param {number} id ID of user to delete
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  public async deleteUser(id: number, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
    return AccountApiFp(this.configuration)
      .deleteUser(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Gets a list of households of a given user
   * @summary Get a user's households
   * @param {number} id ID of user to get households from
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  public async getHouseholds(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<Household>>> {
    return AccountApiFp(this.configuration)
      .getHouseholds(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Returns the details of the logged in user, the details are extracted from the jwt token cookie.
   * @summary Get the user details from the jwt token cookie
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  public async getLoggedInUser(options?: AxiosRequestConfig): Promise<AxiosResponse<UserFull>> {
    return AccountApiFp(this.configuration)
      .getLoggedInUser(options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Returns a single user by email
   * @summary Get user by email
   * @param {string} email Email of user to return
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  public async getUserByEmail(
    email: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<InlineResponse200>> {
    return AccountApiFp(this.configuration)
      .getUserByEmail(email, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Returns a single user
   * @summary Get user by id
   * @param {number} id ID of user to return
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  public async getUserById(
    id: number,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<UserFull>> {
    return AccountApiFp(this.configuration)
      .getUserById(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Logs in a user
   * @summary Login user
   * @param {LoginUser} [body] The user to be logged in
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  public async loginUser(
    body?: LoginUser,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<UserFull>> {
    return AccountApiFp(this.configuration)
      .loginUser(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Logs out a user
   * @summary Logout user
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  public async logoutUser(options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
    return AccountApiFp(this.configuration)
      .logoutUser(options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   * Updates a user
   * @summary Update user
   * @param {UpdateUser} [body] The user to be updated
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AccountApi
   */
  public async updateUser(
    body?: UpdateUser,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<UserFull>> {
    return AccountApiFp(this.configuration)
      .updateUser(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
