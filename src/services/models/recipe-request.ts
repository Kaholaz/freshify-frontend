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
import {AllergenRequest} from "./allergen-request";
import {RecipeCategory} from "./recipe-category";
import {RecipeIngredientRequest} from "./recipe-ingredient-request";

/**
 *
 * @export
 * @interface RecipeRequest
 */
export interface RecipeRequest {
  /**
   *
   * @type {string}
   * @memberof RecipeRequest
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof RecipeRequest
   */
  description?: string;
  /**
   *
   * @type {string}
   * @memberof RecipeRequest
   */
  steps?: string;
  /**
   *
   * @type {number}
   * @memberof RecipeRequest
   */
  estimatedTime?: number;
  /**
   *
   * @type {Array<RecipeIngredientRequest>}
   * @memberof RecipeRequest
   */
  recipeIngredients?: Array<RecipeIngredientRequest>;
  /**
   *
   * @type {Array<RecipeCategory>}
   * @memberof RecipeRequest
   */
  categories?: Array<RecipeCategory>;
  /**
   *
   * @type {Array<AllergenRequest>}
   * @memberof RecipeRequest
   */
  allergens?: Array<AllergenRequest>;
  /**
   *
   * @type {string}
   * @memberof RecipeRequest
   */
  image?: string;
}
