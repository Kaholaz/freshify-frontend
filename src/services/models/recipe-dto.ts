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
import { AllergenRequest } from "./allergen-request";
import { RecipeCategory } from "./recipe-category";
import { RecipeIngredientResponse } from "./recipe-ingredient-response";
/**
 *
 * @export
 * @interface RecipeDTO
 */
export interface RecipeDTO {
  /**
   *
   * @type {number}
   * @memberof RecipeDTO
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof RecipeDTO
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof RecipeDTO
   */
  description?: string;
  /**
   *
   * @type {number}
   * @memberof RecipeDTO
   */
  estimatedTime?: number;
  /**
   *
   * @type {string}
   * @memberof RecipeDTO
   */
  steps?: string;
  /**
   *
   * @type {number}
   * @memberof RecipeDTO
   */
  totalIngredientsInFridge?: number;
  /**
   *
   * @type {Array<RecipeIngredientResponse>}
   * @memberof RecipeDTO
   */
  recipeIngredients?: Array<RecipeIngredientResponse>;
  /**
   *
   * @type {Array<RecipeCategory>}
   * @memberof RecipeDTO
   */
  categories?: Array<RecipeCategory>;
  /**
   *
   * @type {Array<AllergenRequest>}
   * @memberof RecipeDTO
   */
  allergens?: Array<AllergenRequest>;
  /**
   *
   * @type {string}
   * @memberof RecipeDTO
   */
  image?: string;
}
