'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'pascalprecht.translate',
  'myApp.index',
  'myApp.advanced'
]).
config(['$locationProvider', '$routeProvider', '$translateProvider', function($locationProvider, $routeProvider, $translateProvider) {
  $translateProvider.translations('en', {
    'dir': 'ltr',
    'lang_code': 'en',
    'login':'Signin',
    'en': 'English',
    'fa': 'Persian',
    'change_language': 'تغییر زبان',
    'id': 'I.D',
    'password': 'Password',

    'students': 'Students',
    'teachers': 'Teachers',
    'classes': 'Classes',
    'terms': 'Terms',
    'payments': 'Payments',
    'reports': "Reports",
    'settings': "Settings"
  });
  $translateProvider.translations('fa', {
    'dir': 'rtl',
    'lang_code': 'fa',
    'login': 'ورود',
    'en': 'انگلیسی',
    'fa': 'فارسی',
    'change_language': 'Switch Language',
    'id': 'شماره شناسنامه',
    'password': 'رمز عبور',

    'students': 'دانش آموزان',
    'teachers': 'معلمان',
    'classes': 'کلاس ها',
    'terms': 'ترم ها',
    'payments': 'پرداخت ها',
    'reports': "گزارشات",
    'settings': "تنظیمات"
  });
  if(localStorage['ng-lang'] == undefined || ['en','fa'].indexOf(localStorage['ng-lang']) == -1){
    // Set the default language
    localStorage['ng-lang'] = 'en';
  }
  $translateProvider.preferredLanguage(localStorage['ng-lang']);
  $translateProvider.useSanitizeValueStrategy('escape');
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/index'});
}]);
