<?php


namespace OCA\Welcome\Controller;

use \OCP\AppFramework\Controller;
use \OCP\IRequest;

/**
 * Controller class for main page.
 */
class ImageController extends Controller {
	
	private $userId;
	

	public function __construct($appName, IRequest $request, $userId) {
		parent::__construct($appName, $request);
		$this -> userId = $userId;
		
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function getThumbnail() {
			
		$pImg= $this->params('path');	
		$img = urldecode($pImg);

		\OC::$server->getSession()->close();
		
		$ownerView = new \OC\Files\View('/'. $this->userId.'/files/');
		$fileInfo = $ownerView ->getFileInfo($img);
		$mime = $ownerView -> getMimeType($img);
		
		$preview = new \OC\Preview($this->userId, 'files','/'.$img, 400 , 200 );
		$previewPath = $preview->getThumbnailsFolder() . '/' . $fileInfo->getId() . '/';
		$previewName = $previewPath . '200-200.png';
		$userView = new \OC\Files\View('/' . $this->userId);
		
		if($userView->file_exists($previewName)){
			\OCP\Response::setContentDispositionHeader(basename($img), 'inline');
				header('Content-Type: ' . $mime);
				$userView -> readfile('/' . $previewName);
		}else{
			 $preview->showPreview();
		}
		exit();
	}

	
}