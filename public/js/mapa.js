/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/mapa.js":
/*!*******************************!*\
  !*** ./src/assets/js/mapa.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n    // const lat = 20.67444163271174;       guadalajara\r\n    // const lng = -103.38739216304566;\r\n    const lat = 24.0239822;\r\n    const lng = -104.6721137;\r\n    const mapa = L.map('mapa').setView([lat, lng ], 16);\r\n    let market;\r\n\r\n    // Utilizar Provider y Geocoder\r\n    const geocodeService = L.esri.Geocoding.geocodeService();\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    // pin\r\n    market = new L.marker([lat, lng], {\r\n      draggable: true,\r\n      autoPan: true,\r\n    })\r\n    .addTo(mapa)\r\n\r\n    // detectar lat y lng de la posicion del pin\r\n    market.on('moveend', function(e){\r\n      market = e.target\r\n\r\n      const posicion = market.getLatLng();\r\n      // console.log(posicion)\r\n\r\n      // despues de soltar el pin se centra el mapa\r\n      mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));\r\n\r\n      //obtner información de la calle al mover el PIN\r\n      geocodeService.reverse().latlng(posicion, 13).run(function(error, resultado){\r\n        console.log(resultado)\r\n\r\n        market.bindPopup(resultado.address.LongLabel)\r\n      })\r\n\r\n    })\r\n\r\n})()\n\n//# sourceURL=webpack://bienes-raices/./src/assets/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;