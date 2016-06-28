/** Created by Aquariuslt on 4/3/16.*/
/** Services for html page such as Header */

var angular = require('angular');
//noinspection JSCheckFunctionSignatures
var $injector = angular.injector(['ng']);
var $log = $injector.get('$log');
var _ = require('lodash');

var siteVariables = require('../../../../../dist/siteConfig');

var pageService = function pageService(){
  var svc = this;
  svc.defaultTitle = siteVariables.siteName;
  svc.title = svc.defaultTitle;
  
  function getTitle(){
    return svc.title;
  }
  
  function getDefaultTitle(){
    return svc.defaultTitle;
  }
  
  function setTitle(newTitle){
    if(!_.isEmpty(newTitle)){
      svc.title = newTitle + ' - ' + svc.defaultTitle;
    }
    else{
      svc.title = svc.defaultTitle;
    }
    $log.info('set new title:',svc.title);
  }

  return{
    getTitle:getTitle,
    getDefaultTitle:getDefaultTitle,
    setTitle:setTitle
  };
};


module.exports = pageService;
