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
import { WastedItemDTO } from './wasted-item-dto';
/**
 * 
 * @export
 * @interface WasteSortedListsResponse
 */
export interface WasteSortedListsResponse {
    /**
     * 
     * @type {Array<WastedItemDTO>}
     * @memberof WasteSortedListsResponse
     */
    wastedItemsByCount?: Array<WastedItemDTO>;
    /**
     * 
     * @type {Array<WastedItemDTO>}
     * @memberof WasteSortedListsResponse
     */
    wastedItemsByAverageAmount?: Array<WastedItemDTO>;
}
