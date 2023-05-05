/* tslint:disable */
/* eslint-disable */
/**
 * Freshify API Documentation
 * An API for creating and managing a household inventory and shopping list. The API is written in Java using the Spring Boot framework. The API uses a MySQL database. The API is documented using Swagger. The API is hosted using Apache. Some useful links: - [The GitLab repository](https://gitlab.stud.idi.ntnu.no/idatt2106-v23-10/smartmat-backend)
 *
 * OpenAPI spec version: 2.2.1
 * Contact: vkbugge@hotmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Configuration } from "../configuration";
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, BaseAPI, COLLECTION_FORMATS, RequestArgs, RequiredError } from "../base";
import { AllergenRequest } from "../models";

/**
 * AllergenApi - axios parameter creator
 * @export
 */
export const AllergenApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Returns a list of allergens containing all allergens from database
     * @summary Get all allergens
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAllergens: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/allergens`;
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
  };
};

/**
 * AllergenApi - functional programming interface
 * @export
 */
export const AllergenApiFp = function (configuration?: Configuration) {
  return {
    /**
     * Returns a list of allergens containing all allergens from database
     * @summary Get all allergens
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllergens(
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<AllergenRequest>>>
    > {
      const localVarAxiosArgs = await AllergenApiAxiosParamCreator(configuration).getAllergens(
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
 * AllergenApi - factory interface
 * @export
 */
export const AllergenApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     * Returns a list of allergens containing all allergens from database
     * @summary Get all allergens
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllergens(
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<AllergenRequest>>> {
      return AllergenApiFp(configuration)
        .getAllergens(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * AllergenApi - object-oriented interface
 * @export
 * @class AllergenApi
 * @extends {BaseAPI}
 */
export class AllergenApi extends BaseAPI {
  /**
   * Returns a list of allergens containing all allergens from database
   * @summary Get all allergens
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AllergenApi
   */
  public async getAllergens(
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<AllergenRequest>>> {
    return AllergenApiFp(this.configuration)
      .getAllergens(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
