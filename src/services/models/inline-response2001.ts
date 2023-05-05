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
import { HouseholdMemberKey } from "./household-member-key";
import { HouseholdUserType } from "./household-user-type";
import { UserFull } from "./user-full";

/**
 *
 * @export
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {
  /**
   *
   * @type {HouseholdMemberKey}
   * @memberof InlineResponse2001
   */
  id?: HouseholdMemberKey;
  /**
   *
   * @type {UserFull}
   * @memberof InlineResponse2001
   */
  user?: UserFull;
  /**
   *
   * @type {HouseholdUserType}
   * @memberof InlineResponse2001
   */
  userType?: HouseholdUserType;
}
