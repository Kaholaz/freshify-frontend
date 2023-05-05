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
import { RecipeCategory } from "../models";

/**
 * RecipeCategoryApi - axios parameter creator
 * @export
 */
export const RecipeCategoryApiAxiosParamCreator = function (configuration?: Configuration) {
  return {
    /**
     * Returns a list of recipe categories containing all recipe categories from database
     * @summary Get all recipe categories
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAllRecipeCategories: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
      const localVarPath = `/recipecategory`;
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
 * RecipeCategoryApi - functional programming interface
 * @export
 */
export const RecipeCategoryApiFp = function (configuration?: Configuration) {
  return {
    /**
     * Returns a list of recipe categories containing all recipe categories from database
     * @summary Get all recipe categories
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllRecipeCategories(
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<RecipeCategory>>>
    > {
      const localVarAxiosArgs = await RecipeCategoryApiAxiosParamCreator(
        configuration
      ).getAllRecipeCategories(options);
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
 * RecipeCategoryApi - factory interface
 * @export
 */
export const RecipeCategoryApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     * Returns a list of recipe categories containing all recipe categories from database
     * @summary Get all recipe categories
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAllRecipeCategories(
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<RecipeCategory>>> {
      return RecipeCategoryApiFp(configuration)
        .getAllRecipeCategories(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * RecipeCategoryApi - object-oriented interface
 * @export
 * @class RecipeCategoryApi
 * @extends {BaseAPI}
 */
export class RecipeCategoryApi extends BaseAPI {
  /**
   * Returns a list of recipe categories containing all recipe categories from database
   * @summary Get all recipe categories
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RecipeCategoryApi
   */
  public async getAllRecipeCategories(
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<RecipeCategory>>> {
    return RecipeCategoryApiFp(this.configuration)
      .getAllRecipeCategories(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
