<?php

namespace OCA\Welcome\Admin;
use OCA\Welcome\AppInfo\Application;
$app = new Application();
$container = $app->getContainer();
$response = $container->query('AdminController')->index();
return $response->render();