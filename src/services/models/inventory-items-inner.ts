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
import { ItemState } from "./item-state";
import { ItemType } from "./item-type";
import { UserFull } from "./user-full";

/**
 *
 * @export
 * @interface InventoryItemsInner
 */
export interface InventoryItemsInner {
  /**
   *
   * @type {number}
   * @memberof InventoryItemsInner
   */
  id?: number;
  /**
   *
   * @type {ItemState}
   * @memberof InventoryItemsInner
   */
  state?: ItemState;
  /**
   *
   * @type {number}
   * @memberof InventoryItemsInner
   */
  remaining?: number;
  /**
   *
   * @type {string}
   * @memberof InventoryItemsInner
   */
  lastChanged?: string;
  /**
   *
   * @type {string}
   * @memberof InventoryItemsInner
   */
  addedDate?: string;
  /**
   *
   * @type {boolean}
   * @memberof InventoryItemsInner
   */
  suggested?: boolean;
  /**
   *
   * @type {ItemType}
   * @memberof InventoryItemsInner
   */
  type?: ItemType;
  /**
   *
   * @type {UserFull}
   * @memberof InventoryItemsInner
   */
  addedBy?: UserFull;
}
