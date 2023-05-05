function cov_1g9ootjdvq() {
  var path = "C:\\NTNU\\matsmartfrontend4\\smartmat-frontend\\src\\services\\models\\index.ts";
  var hash = "261fa895fdfcd475c557ed074a3715bb5db84bc7";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\NTNU\\matsmartfrontend4\\smartmat-frontend\\src\\services\\models\\index.ts",
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "261fa895fdfcd475c557ed074a3715bb5db84bc7"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1g9ootjdvq = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_1g9ootjdvq();
export * from "./allergen-request";
export * from "./create-household";
export * from "./create-shopping-list-entry";
export * from "./create-user";
export * from "./household";
export * from "./household-member";
export * from "./household-member-key";
export * from "./household-recipe-dto";
export * from "./household-user-type";
export * from "./id-inventory-body";
export * from "./id-users-body";
export * from "./inline-response200";
export * from "./inline-response2001";
export * from "./inventory-items";
export * from "./inventory-items-inner";
export * from "./inventory-waste-response";
export * from "./item";
export * from "./item-state";
export * from "./item-type";
export * from "./item-type-dto";
export * from "./login-user";
export * from "./recipe";
export * from "./recipe-category";
export * from "./recipe-dto";
export * from "./recipe-dtopage";
export * from "./recipe-dtopage-pageable";
export * from "./recipe-dtopage-pageable-sort";
export * from "./recipe-ingredient";
export * from "./recipe-ingredient-dto";
export * from "./recipe-ingredient-request";
export * from "./recipe-ingredient-response";
export * from "./recipe-request";
export * from "./shopping-list-entry";
export * from "./update-household-user-type";
export * from "./update-item";
export * from "./update-shopping-list-entry";
export * from "./update-user";
export * from "./user-full";
export * from "./wasted-item-dto";
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMWc5b290amR2cSIsImFjdHVhbENvdmVyYWdlIl0sInNvdXJjZXMiOlsiaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vYWxsZXJnZW4tcmVxdWVzdFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9jcmVhdGUtaG91c2Vob2xkXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NyZWF0ZS1zaG9wcGluZy1saXN0LWVudHJ5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2NyZWF0ZS11c2VyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2hvdXNlaG9sZFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9ob3VzZWhvbGQtbWVtYmVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2hvdXNlaG9sZC1tZW1iZXIta2V5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2hvdXNlaG9sZC1yZWNpcGUtZHRvXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2hvdXNlaG9sZC11c2VyLXR5cGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vaWQtaW52ZW50b3J5LWJvZHlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vaWQtdXNlcnMtYm9keVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9pbmxpbmUtcmVzcG9uc2UyMDBcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vaW5saW5lLXJlc3BvbnNlMjAwMVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnZlbnRvcnktaXRlbXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vaW52ZW50b3J5LWl0ZW1zLWlubmVyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludmVudG9yeS13YXN0ZS1yZXNwb25zZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9pdGVtXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2l0ZW0tc3RhdGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vaXRlbS10eXBlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2l0ZW0tdHlwZS1kdG9cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbG9naW4tdXNlclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9yZWNpcGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcmVjaXBlLWNhdGVnb3J5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3JlY2lwZS1kdG9cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcmVjaXBlLWR0b3BhZ2VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcmVjaXBlLWR0b3BhZ2UtcGFnZWFibGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcmVjaXBlLWR0b3BhZ2UtcGFnZWFibGUtc29ydFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9yZWNpcGUtaW5ncmVkaWVudFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9yZWNpcGUtaW5ncmVkaWVudC1kdG9cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vcmVjaXBlLWluZ3JlZGllbnQtcmVxdWVzdFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9yZWNpcGUtaW5ncmVkaWVudC1yZXNwb25zZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9yZWNpcGUtcmVxdWVzdFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zaG9wcGluZy1saXN0LWVudHJ5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3VwZGF0ZS1ob3VzZWhvbGQtdXNlci10eXBlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3VwZGF0ZS1pdGVtXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3VwZGF0ZS1zaG9wcGluZy1saXN0LWVudHJ5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3VwZGF0ZS11c2VyXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3VzZXItZnVsbFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi93YXN0ZWQtaXRlbS1kdG9cIjtcclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLGNBQWMsb0JBQW9CO0FBQ2xDLGNBQWMsb0JBQW9CO0FBQ2xDLGNBQWMsOEJBQThCO0FBQzVDLGNBQWMsZUFBZTtBQUM3QixjQUFjLGFBQWE7QUFDM0IsY0FBYyxvQkFBb0I7QUFDbEMsY0FBYyx3QkFBd0I7QUFDdEMsY0FBYyx3QkFBd0I7QUFDdEMsY0FBYyx1QkFBdUI7QUFDckMsY0FBYyxxQkFBcUI7QUFDbkMsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxzQkFBc0I7QUFDcEMsY0FBYyx1QkFBdUI7QUFDckMsY0FBYyxtQkFBbUI7QUFDakMsY0FBYyx5QkFBeUI7QUFDdkMsY0FBYyw0QkFBNEI7QUFDMUMsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsY0FBYztBQUM1QixjQUFjLGFBQWE7QUFDM0IsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxjQUFjO0FBQzVCLGNBQWMsVUFBVTtBQUN4QixjQUFjLG1CQUFtQjtBQUNqQyxjQUFjLGNBQWM7QUFDNUIsY0FBYyxrQkFBa0I7QUFDaEMsY0FBYywyQkFBMkI7QUFDekMsY0FBYyxnQ0FBZ0M7QUFDOUMsY0FBYyxxQkFBcUI7QUFDbkMsY0FBYyx5QkFBeUI7QUFDdkMsY0FBYyw2QkFBNkI7QUFDM0MsY0FBYyw4QkFBOEI7QUFDNUMsY0FBYyxrQkFBa0I7QUFDaEMsY0FBYyx1QkFBdUI7QUFDckMsY0FBYyw4QkFBOEI7QUFDNUMsY0FBYyxlQUFlO0FBQzdCLGNBQWMsOEJBQThCO0FBQzVDLGNBQWMsZUFBZTtBQUM3QixjQUFjLGFBQWE7QUFDM0IsY0FBYyxtQkFBbUIifQ==