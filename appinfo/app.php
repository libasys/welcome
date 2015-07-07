<?php

namespace OCA\Welcome\AppInfo;


\OCP\App::registerAdmin('welcome', 'admin/admin');
if (\OCP\User::isLoggedIn()) {
	\OCP\Util::addScript('welcome','jquery.ui.touch-punch.min');
}
