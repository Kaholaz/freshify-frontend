function cov_17w0ikk4il() {
  var path = "C:\\NTNU\\matsmartfrontend4\\smartmat-frontend\\src\\main.ts";
  var hash = "065be952c5bb2b214bfd5e4381f5b023d61c2d9d";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "C:\\NTNU\\matsmartfrontend4\\smartmat-frontend\\src\\main.ts",
    statementMap: {
      "0": {
        start: {
          line: 12,
          column: 12
        },
        end: {
          line: 12,
          column: 26
        }
      },
      "1": {
        start: {
          line: 13,
          column: 16
        },
        end: {
          line: 13,
          column: 22
        }
      },
      "2": {
        start: {
          line: 15,
          column: 0
        },
        end: {
          line: 15,
          column: 23
        }
      },
      "3": {
        start: {
          line: 16,
          column: 0
        },
        end: {
          line: 16,
          column: 16
        }
      },
      "4": {
        start: {
          line: 17,
          column: 0
        },
        end: {
          line: 17,
          column: 21
        }
      },
      "5": {
        start: {
          line: 19,
          column: 0
        },
        end: {
          line: 19,
          column: 32
        }
      },
      "6": {
        start: {
          line: 20,
          column: 0
        },
        end: {
          line: 20,
          column: 18
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "065be952c5bb2b214bfd5e4381f5b023d61c2d9d"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_17w0ikk4il = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_17w0ikk4il();
import { createApp } from "vue";
import { createPinia } from "pinia";
import mitt from "mitt";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "./assets/main.css";
import "element-plus/dist/index.css";
const app = (cov_17w0ikk4il().s[0]++, createApp(App));
const emitter = (cov_17w0ikk4il().s[1]++, mitt());
cov_17w0ikk4il().s[2]++;
app.use(createPinia());
cov_17w0ikk4il().s[3]++;
app.use(router);
cov_17w0ikk4il().s[4]++;
app.use(ElementPlus);
cov_17w0ikk4il().s[5]++;
app.provide("emitter", emitter);
cov_17w0ikk4il().s[6]++;
app.mount("#app");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3ZfMTd3MGlrazRpbCIsImFjdHVhbENvdmVyYWdlIiwiY3JlYXRlQXBwIiwiY3JlYXRlUGluaWEiLCJtaXR0IiwiQXBwIiwicm91dGVyIiwiRWxlbWVudFBsdXMiLCJhcHAiLCJzIiwiZW1pdHRlciIsInVzZSIsInByb3ZpZGUiLCJtb3VudCJdLCJzb3VyY2VzIjpbIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHsgY3JlYXRlUGluaWEgfSBmcm9tIFwicGluaWFcIjtcbmltcG9ydCBtaXR0IGZyb20gXCJtaXR0XCI7XG5cbmltcG9ydCBBcHAgZnJvbSBcIi4vQXBwLnZ1ZVwiO1xuaW1wb3J0IHJvdXRlciBmcm9tIFwiLi9yb3V0ZXJcIjtcbmltcG9ydCBFbGVtZW50UGx1cyBmcm9tIFwiZWxlbWVudC1wbHVzXCI7XG5cbmltcG9ydCBcIi4vYXNzZXRzL21haW4uY3NzXCI7XG5pbXBvcnQgXCJlbGVtZW50LXBsdXMvZGlzdC9pbmRleC5jc3NcIjtcblxuY29uc3QgYXBwID0gY3JlYXRlQXBwKEFwcCk7XG5jb25zdCBlbWl0dGVyID0gbWl0dCgpO1xuXG5hcHAudXNlKGNyZWF0ZVBpbmlhKCkpO1xuYXBwLnVzZShyb3V0ZXIpO1xuYXBwLnVzZShFbGVtZW50UGx1cyk7XG5cbmFwcC5wcm92aWRlKFwiZW1pdHRlclwiLCBlbWl0dGVyKTtcbmFwcC5tb3VudChcIiNhcHBcIik7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBZVk7SUFBQUEsY0FBQSxZQUFBQSxDQUFBO01BQUEsT0FBQUMsY0FBQTtJQUFBO0VBQUE7RUFBQSxPQUFBQSxjQUFBO0FBQUE7QUFBQUQsY0FBQTtBQWZaLFNBQVNFLFNBQVMsUUFBUSxLQUFLO0FBQy9CLFNBQVNDLFdBQVcsUUFBUSxPQUFPO0FBQ25DLE9BQU9DLElBQUksTUFBTSxNQUFNO0FBRXZCLE9BQU9DLEdBQUcsTUFBTSxXQUFXO0FBQzNCLE9BQU9DLE1BQU0sTUFBTSxVQUFVO0FBQzdCLE9BQU9DLFdBQVcsTUFBTSxjQUFjO0FBRXRDLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sNkJBQTZCO0FBRXBDLE1BQU1DLEdBQUcsSUFBQVIsY0FBQSxHQUFBUyxDQUFBLE9BQUdQLFNBQVMsQ0FBQ0csR0FBRyxDQUFDO0FBQzFCLE1BQU1LLE9BQU8sSUFBQVYsY0FBQSxHQUFBUyxDQUFBLE9BQUdMLElBQUksQ0FBQyxDQUFDO0FBQUNKLGNBQUEsR0FBQVMsQ0FBQTtBQUV2QkQsR0FBRyxDQUFDRyxHQUFHLENBQUNSLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFBQ0gsY0FBQSxHQUFBUyxDQUFBO0FBQ3ZCRCxHQUFHLENBQUNHLEdBQUcsQ0FBQ0wsTUFBTSxDQUFDO0FBQUNOLGNBQUEsR0FBQVMsQ0FBQTtBQUNoQkQsR0FBRyxDQUFDRyxHQUFHLENBQUNKLFdBQVcsQ0FBQztBQUFDUCxjQUFBLEdBQUFTLENBQUE7QUFFckJELEdBQUcsQ0FBQ0ksT0FBTyxDQUFDLFNBQVMsRUFBRUYsT0FBTyxDQUFDO0FBQUNWLGNBQUEsR0FBQVMsQ0FBQTtBQUNoQ0QsR0FBRyxDQUFDSyxLQUFLLENBQUMsTUFBTSxDQUFDIn0=