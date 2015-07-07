<?php

namespace OCA\Welcome\AppInfo;


use \OCA\Welcome\AppInfo\Application;

$application = new Application();
	
$application->registerRoutes($this, array('routes' => array(
	array('name' => 'page#index', 'url' => '/', 'verb' => 'GET'),
	array('name' => 'page#getImagesFromGallery', 'url' => '/getimagesfromgallery', 'verb' => 'GET'),
	array('name' => 'page#getCalEventsToday', 'url' => '/getcaleventstoday', 'verb' => 'GET'),
	array('name' => 'page#getCalTodosToday', 'url' => '/getcaltodostoday', 'verb' => 'GET'),
	array('name' => 'page#getImage', 'url' => '/getimage/{path}/', 'verb' => 'GET'),
	array('name' => 'admin#updateTheme', 'url' => '/updatetheme', 'verb' => 'POST'),
	array('name' => 'admin#updateDefaultApp', 'url' => '/updatedefaultapp', 'verb' => 'POST'),
	array('name' => 'image#getThumbnail', 'url' => '/getthumbnailfromgallery', 'verb' => 'GET'),
)));

//$config = $application->getAppConfig();
//$application->registerAll();
