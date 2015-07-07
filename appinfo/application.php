<?php

namespace OCA\Welcome\AppInfo;

use \OCP\AppFramework\App;

use \OCA\Welcome\Controller\PageController;
use \OCA\Welcome\Controller\AdminController;
use \OCA\Welcome\Controller\ImageController;

class Application extends App {
	
	public function __construct (array $urlParams=array()) {
		
		parent::__construct('welcome', $urlParams);
        $container = $this->getContainer();
	
	
		$container->registerService('PageController', function($c) {
			return new PageController(
			$c->query('AppName'),
			$c->query('Request'),
			$c->query('UserId'),
			$c->query('L10N')
			);
		});
		
		$container->registerService('ImageController', function($c) {
			return new ImageController(
			$c->query('AppName'),
			$c->query('Request'),
			$c->query('UserId')
			);
		});
		
		$container->registerService('AdminController', function($c) {
			return new AdminController(
			$c->query('AppName'),
			$c->query('Request'),
			$c->query('CoreConfig'),
			$c->query('UserId'),
			$c->query('L10N')
			);
		});
		
		$container->registerService('CoreConfig', function($c) {
			return $c->query('ServerContainer')->getConfig();
		});
		
        /**
		 * Core
		 */
		$container -> registerService('UserId', function($c) {
			return \OCP\User::getUser();
		});
		
		$container -> registerService('L10N', function($c) {
			return $c -> query('ServerContainer') -> getL10N($c -> query('AppName'));
		});
		
		
	}
  
    
}

