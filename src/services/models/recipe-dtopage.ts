/* tslint:disable */
/* eslint-disable */
/**
 * Freshify API Documentation
 * An API for creating and managing a household inventory and shopping list. The API is written in Java using the Spring Boot framework. The API uses a MySQL database. The API is documented using Swagger. The API is hosted using Apache. Some useful links: - [The GitLab repository](https://gitlab.stud.idi.ntnu.no/idatt2106-v23-10/smartmat-backend)
 *
 * OpenAPI spec version: 2.1.2
 * Contact: vkbugge@hotmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { RecipeDTO } from "./recipe-dto";
import { RecipeDTOPagePageable } from "./recipe-dtopage-pageable";
import { RecipeDTOPagePageableSort } from "./recipe-dtopage-pageable-sort";
/**
 *
 * @export
 * @interface RecipeDTOPage
 */
export interface RecipeDTOPage {
  /**
   *
   * @type {Array<RecipeDTO>}
   * @memberof RecipeDTOPage
   */
  content?: Array<RecipeDTO>;
  /**
   *
   * @type {RecipeDTOPagePageable}
   * @memberof RecipeDTOPage
   */
  pageable?: RecipeDTOPagePageable;
  /**
   *
   * @type {boolean}
   * @memberof RecipeDTOPage
   */
  last?: boolean;
  /**
   *
   * @type {number}
   * @memberof RecipeDTOPage
   */
  totalElements?: number;
  /**
   *
   * @type {number}
   * @memberof RecipeDTOPage
   */
  totalPages?: number;
  /**
   *
   * @type {number}
   * @memberof RecipeDTOPage
   */
  size?: number;
  /**
   *
   * @type {number}
   * @memberof RecipeDTOPage
   */
  number?: number;
  /**
   *
   * @type {RecipeDTOPagePageableSort}
   * @memberof RecipeDTOPage
   */
  sort?: RecipeDTOPagePageableSort;
  /**
   *
   * @type {boolean}
   * @memberof RecipeDTOPage
   */
  first?: boolean;
  /**
   *
   * @type {number}
   * @memberof RecipeDTOPage
   */
  numberOfElements?: number;
  /**
   *
   * @type {boolean}
   * @memberof RecipeDTOPage
   */
  empty?: boolean;
}