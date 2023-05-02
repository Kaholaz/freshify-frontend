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
import { RecipeIngredient } from "./recipe-ingredient";
/**
 *
 * @export
 * @interface Recipe
 */
export interface Recipe {
  /**
   *
   * @type {number}
   * @memberof Recipe
   */
  id?: number;
  /**
   *
   * @type {string}
   * @memberof Recipe
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof Recipe
   */
  description?: string;
  /**
   *
   * @type {number}
   * @memberof Recipe
   */
  estimatedTime?: number;
  /**
   *
   * @type {string}
   * @memberof Recipe
   */
  steps?: string;
  /**
   *
   * @type {Array<RecipeIngredient>}
   * @memberof Recipe
   */
  recipeIngredients?: Array<RecipeIngredient>;
  /**
   *
   * @type {Array<RecipeCategory>}
   * @memberof Recipe
   */
  categories?: Array<RecipeCategory>;
  /**
   *
   * @type {Array<AllergenRequest>}
   * @memberof Recipe
   */
  allergens?: Array<AllergenRequest>;
  /**
   *
   * @type {string}
   * @memberof Recipe
   */
  image?: string;
}
