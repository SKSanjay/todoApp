//Initial Bootstrapping of core components
window.$ = require('jquery');
global.jQuery = require("jquery");
window.angular = require('angular');
window.moment = require('moment');

//Styling
var fontAwesomeCss = require('./node_modules/font-awesome/css/font-awesome.min.css');
var bootstrap = require('bootstrap');
var bootstrapCss = require('./node_modules/bootstrap/dist/css/bootstrap.min.css');

//ngTagsInput
var ngTagsInput = require('ng-tags-input');
var ngTagInputCss = require('./node_modules/ng-tags-input/build/ng-tags-input.min.css');
var ngTagInputBootstrapCss = require('./node_modules/ng-tags-input/build/ng-tags-input.bootstrap.min.css');

//Angular Rating Icons
var angularRatingIcons = require('angular-rating-icons');
var angularRatingsIconsCss = require('./node_modules/angular-rating-icons/dist/angular-rating-icons.min.css');

//Angular Clock
var angularClock = require('angular-clock');
var angularClockCss = require('./node_modules/angular-clock/dist/angular-clock.css');

//Angular Material Stuff (Need to uninstall)
var angularMaterial = require('angular-material');
var angularMaterialCss = require('./node_modules/angular-material/angular-material.min.css');
var angularMaterialAccordianCss = require('./node_modules/angular-material-accordion/css/ang-accordion.css');

//Angular Date Time Picker (Need to uninstall)
var angularMaterialDateTimePicker = require('ng-material-datetimepicker');
var angularMaterialAccordion = require('angular-material-accordion');
var angularMaterialDateTimePickerCss = require('./node_modules/ng-material-datetimepicker/dist/material-datetimepicker.min.css');

//Angular UI Bootstrap
var angularUIBootstrap = require('angular-ui-bootstrap');
var angularUIBootstrapCss = require('./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css');

//Vanilla Datetime Picker
var dateTimePicker = require('bootstrap-daterangepicker');
var dateTimePickerCss = require('./node_modules/bootstrap-daterangepicker/daterangepicker.css');

//Angular Datetime Picker
var angularBootstrapDateTimePicker = require('angular-daterangepicker');
var angularBootstrapDateTimePickerCss = require('./node_modules/bootstrap-daterangepicker/daterangepicker.css');

//Angular Advanced Searchbox
var angularAdvancedSearchBox = require('angular-advanced-searchbox');
var angularAdvancedSearchBoxCss = require('./node_modules/angular-advanced-searchbox/dist/angular-advanced-searchbox.min.css');
var angularAdvancedSearchBoxTpls = require('./node_modules/angular-advanced-searchbox/dist/angular-advanced-searchbox-tpls.min.js');

//Custom Css
var customCss = require('./src/main.css');