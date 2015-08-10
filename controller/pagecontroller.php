<?php


namespace OCA\Welcome\Controller;

use \OCP\AppFramework\Controller;
use \OCP\AppFramework\Http\JSONResponse;
use \OCP\AppFramework\Http\TemplateResponse;
use \OCP\IRequest;

/**
 * Controller class for main page.
 */
class PageController extends Controller {
	
	private $userId;
	private $l10n;
	
	

	public function __construct($appName, IRequest $request, $userId, $l10n) {
		parent::__construct($appName, $request);
		$this -> userId = $userId;
		$this->l10n = $l10n;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function index() {
		\OCP\Util::addStyle('welcome', '3rdparty/fontello/css/animation');
		\OCP\Util::addStyle('welcome', '3rdparty/fontello/css/fontello');	
		\OCP\Util::addscript('welcome','gridify');
		\OCP\Util::addscript('welcome','MetroJs');
		\OCP\Util::addscript('welcome','welcome');
		\OCP\Util::addscript('welcome','header-color');
		
		\OCP\Util::addStyle('welcome','style');
		\OCP\Util::addStyle('welcome','MetroJs');
		
		//$imagesInfo=$this->getImagesFromGallery();
		$csp = new \OCP\AppFramework\Http\ContentSecurityPolicy();
		$csp->addAllowedImageDomain('data:');
		
		$response = new TemplateResponse('welcome', 'index');
		$response->setContentSecurityPolicy($csp);
		$response->setParams(array());

		return $response;
	}
	/**
	 * @NoAdminRequired
	 * 
	 */
	public function getCalEventsToday(){
		if(\OC::$server->getAppManager()->isEnabledForUser('calendarplus')) {	
			$resultSearch = \OC::$server->getSearch()->searchPaged('today',['calendarplus'], 1, 10);
			$result='';
			if(is_array($resultSearch)){
				$counter=0;
				foreach($resultSearch as $key => $val){
					if($val->{'type'} === 'calendar'){
						if($counter === 5){
							break;
						}	
						$result[] = array('name' => $val->{'name'}, 'link' => $val->{'link'});
						$counter++;
					}
				}
				if(is_array($result)){
					$response = new JSONResponse();
					$response -> setData($result);
					return $response;
				}
			}
		}
	}
	/**
	 * @NoAdminRequired
	 * 
	 */
	public function getCalTodosToday(){
		if(\OC::$server->getAppManager()->isEnabledForUser('tasksplus')) {	
			$resultSearch = \OC::$server->getSearch()->searchPaged('today',['tasksplus'], 1, 10);
			$result='';
			if(is_array($resultSearch)){
				$counter=0;	
				foreach($resultSearch as $key => $val){
					if($val->{'type'} === 'tasks'){
						if($counter === 5){
							break;
						}	
						$result[] = array('name' => $val->{'name'}, 'link' => $val->{'link'});
						$counter++;
					}
				}
				
				if(is_array($result)){
					$response = new JSONResponse();
					$response -> setData($result);
					return $response;
				}
			}
		}
	}
	/**
	 * @NoAdminRequired
	 * 
	 */
	public function getImagesFromGallery(){
		
		if(\OC::$server->getAppManager()->isEnabledForUser('gallerydeluxe')) {
		
			$view = new \OC\Files\View('/' . $this->userId . '/files');
			$images=$view->searchRaw('cover.jpg');
				
			$counter=0;
			if(is_array($images)){
				$result = null;
				foreach ($images as $image) {
					if($counter === 5){
						break;
					}
					$title = $image['name'];
					
					$local = $view -> getLocalFile($image['path']);
								
					$size = getimagesize($local, $info);
					
					if(isset($info['APP13'])){
						$iptc = iptcparse($info["APP13"]);
						if (is_array($iptc)) { 
							if (array_key_exists('2#105', $iptc)) {
								$title = $iptc['2#105'][0];
							}
						}
					}
					
					
					$mtime = $image['mtime'];
					$imagePath = trim($image['path'], '/');
					
					$result[] = array('path' => $imagePath, 'title' => $title, 'mtime' => $mtime);
					$counter++;
				}
			
			$response = new JSONResponse();
			$params=[
				'status' => 'success',
				'data' => $result
			];
			$response -> setData($params);
		}else{
			$result=[
			'status' => 'error'
			];	
			$response = new JSONResponse();
			$response -> setData($result);
		}
			return $response;
		}
	}
	
}