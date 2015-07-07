<?php


namespace OCA\Welcome\Controller;

use \OCP\AppFramework\Controller;
use \OCP\AppFramework\Http\TemplateResponse;
use \OCP\IRequest;

/**
 * Controller class for main page.
 */
class AdminController extends Controller {
	
	private $userId;
	private $l10n;
	private $CoreConfig;
	
	

	public function __construct($appName, IRequest $request,$CoreConfig, $userId, $l10n) {
		parent::__construct($appName, $request);
		$this -> userId = $userId;
		$this->l10n = $l10n;
		$this->CoreConfig=$CoreConfig;
	}

	
	public function index() {
		
		\OCP\Util::addscript('welcome','admin');
		
		$themes = Array();
		$dir = \OC::$SERVERROOT.'/themes';
		if(is_dir($dir)){
		    if($dh = opendir($dir)){
		        while(($subdir = readdir($dh)) !== false){
		            if(is_dir($dir.'/'.$subdir) && $subdir != '..' && $subdir != '.'){
		            	$themes[] = filter_var($subdir,FILTER_SANITIZE_STRING);
		            }
		        }
		        closedir($dh);
		    }
		}
		//$this->CoreConfig
		
		$current = trim($this->CoreConfig->getSystemValue('theme', '0'));
		if($current==''){
			$current = '0';
		}
		$currentApp=$this->CoreConfig->getSystemValue('defaultapp', '');
		//$aEnabledApps=\OC_App::getEnabledApps();
		$aAppsNav=\OC::$server->getNavigationManager()->getAll();
		$appsForSelect=array();
		
			$appsForSelect['welcome']= 'Welcome';	
			foreach($aAppsNav as $appInfo){
			   if(strstr($appInfo['id'],'_index')){
			   	 $temp=explode('_index',$appInfo['id']);
				  $appsForSelect[$temp[0]]=$appInfo['name'];
			   }else{
			   	$appsForSelect[$appInfo['id']]= $appInfo['name'];
			   }
			}
		
		
		$data=array('current' => $current,'themes'=>$themes,'currentApp' => $currentApp,'aEnabledApps' => $appsForSelect);
		
		$response = new TemplateResponse($this->appName, 'admin',$data,'blank');

		return $response;
	}
	
	public function updateTheme(){
		$theme = $this -> params('theme');	
	
		if($theme=='0'){
			$theme='';
		}
		
		$this->CoreConfig->setSystemValue('theme', $theme);
	}
	
	public function updateDefaultApp(){
		$app = $this -> params('app');
		if($app=='0'){
			$app='files';
		}
		$this->CoreConfig->setSystemValue('defaultapp', $app);
	}
	
}