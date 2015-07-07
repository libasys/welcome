var iWelcome = function(container,itemsApp,itemsPersonal) {
	this.container=$(container);
	this.itemsApp=$(itemsApp);	
	this.itemsPersonal=$(itemsPersonal);	
	this.columnWidth=200;
	this.columnHeight=150;
	this.maxPerRow=4;
	this.marginItem=2;
	this.fontSize=20;
	this.fontSizeI=(this.columnHeight/2);
	this.sLang={
		'files':t('welcome','You can access your ownCloud files with the ownCloud web interface and create, preview, edit, delete, share, and re-share files!'),
		'documents': t('welcome','The Documents application supports editing documents within ownCloud, without the need to launch an external application!'),
		'activity': t('welcome','The Activity application shows you several information about activities from you and other users (e.g. Shared a File with you)'),
		'personal' : t('welcome','Here you can edit your personal settings e.g. User pictures, E-Mail address etc'),
		'help' : t('welcome','Here you can find help for all topics needed working with owncloud'),
		'logout' :t('welcome', 'Logout from your ownCloud web interface!'),
		'gallerydeluxe' : t('welcome','Upload your pictures to your ownCloud and share it with other users!'),
		'galleryplus' : t('welcome','Upload your pictures to your ownCloud and share it with other users!'),
		'gallery' : t('welcome','Upload your pictures to your ownCloud and share it with other users!'),
		'pinit' : t('welcome','Create social bookmarks to your ownCloud and share it with other users!'),
		'calendar':t('welcome','The ownCloud Calendar app enables you to create and edit events, synchronize to other calendars you might use, and create new, personalized calendars!'),
		'contacts':t('welcome','The ownCloud Contacts app is similar to other mobile contact applications, but with more functionality.'),
		'kontakte':t('welcome','The ownCloud Contacts app is similar to other mobile contact applications, but with more functionality.'),
		'apps-management':t('welcome','Add new apps to your ownCloud!'),
		'admin':t('welcome','Manage your general Settings working with owncloud (e-Mail, Security, etc)'),
		'users':t('welcome','Manage Users'),
		'tasks':t('welcome','Plan and create your Tasks, share it with public'),
		'sharees':t('welcome','Gives you an overview of all shares'),
		'videos':t('welcome','Watch your videos online in your cloud'),
		'audios':t('welcome','Hear your favourite songs online in your cloud'),
		'mail':t('welcome','Check your E-Mails online'),
		'calendarplus':t('welcome','The ownCloud Calendar app enables you to create and edit events, synchronize to other calendars you might use, and create new, personalized calendars!'),
		'tasksplus':t('welcome','Plan and create your Tasks, share it with public'),

	};
	this.sIcon={
		'files':'folder',
		'documents':'doc-text',
		'activity':'flash',
		'personal':'user',
		'help':'info',
		'logout':'logout',
		'gallerydeluxe':'picture',
		'galleryplus':'picture',
		'gallery':'picture',
		'pinit':'location',
		'calendar':'calendar',
		'kontakte':'book',
		'contacts':'book',
		'tasks':'tasks',
		'apps-management':'star-empty',
		'admin':'cog-alt',
		'users':'users',
		'sharees':'share',
		'videos':'video-alt',
		'audios':'music',
		'mail':'mail',
		'calendarplus':'calendar',
		'tasksplus':'tasks',
	};
};

iWelcome.prototype.init = function() {
	 this.calcDimension();
	 var aApps=[];
	
	
	 this.itemsApp.each(function(i,el){
	  	  aApps[i]=this.loadElement(el,'apps');
	}.bind(this));
	
	this.container.append(aApps);
	
	var aPersonal=[];
	
	this.itemsPersonal.each(function(i,el){
	  aPersonal[i]=this.loadElement(el,'personal');
	}.bind(this));  
	this.container.append(aPersonal);	 
	
	this.gridify();

	
};


iWelcome.prototype.loadElementInfoPersonal = function(element) {
	   var ElemInfo=[];
        if($(element).attr('id') == undefined){
			var tmp = $(element).attr('href').split('/');
	 		ElemInfo['id']=tmp[(tmp.length-1)];
	 	}
	 	if($(element).attr('id') == 'logout'){
	 		ElemInfo['id']='logout';
	 	}
	 	ElemInfo['text']=$(element).text();
	 	ElemInfo['href']=$(element).attr('href');
	 	ElemInfo['icon']=this.sIcon[ElemInfo['id']];
	    ElemInfo['descr']=this.sLang[ElemInfo['id']];
	
	 	return ElemInfo;
};
iWelcome.prototype.loadElementInfoApps = function(element) {
	   var ElemInfo=[];
        if($(element).attr('data-id') != undefined){
        	if (/_index/i.test($(element).attr('data-id'))){
        		var tmp = $(element).attr('data-id').split('_index');
	 		    ElemInfo['id']=tmp[0];
        	}else{
        		ElemInfo['id']=$(element).attr('data-id');
        	}
	 	}else{
	 		ElemInfo['id']='apps-management';
	 	}
	 	ElemInfo['descr']=this.sLang[ElemInfo['id']];
	 	ElemInfo['text']=$(element).find('a span').text();
	 	ElemInfo['href']=$(element).find('a').attr('href');
	 	ElemInfo['icon']=this.sIcon[ElemInfo['id']];
	 	
	 	return ElemInfo;
};

iWelcome.prototype.loadGallery = function(metroDiv,href) {
	  
	   metroDiv.attr({
		 		 	'data-start-now':true,
		 		 	'data-delay':3000
		 		 });
		 		  var $this=this;
	   $.getJSON(OC.generateUrl('apps/welcome/getimagesfromgallery'), {},function(jsondata){
		 			if(jsondata.status == 'success'){
		 				var aImages=[];
		 				$(jsondata.data).each(function(i,el){
		 					//.css({'margin-left':'0px','max-height':(($this.columnHeight*2)+($.marginItem * 2))+'px','overflow':'hidden','display':'block','width':($this.columnWidth)+'px'})
		 					aImages[i]=$('<div/>').click(function(){
							 		window.location=href+'#'+encodeURIComponent(el.path);
							 });
							
		 					var img =$('<img/>')
		 					.attr({
		 						'class':'full',
			 					'src':OC.generateUrl('apps/welcome/getthumbnailfromgallery?path={path}',{'path':encodeURIComponent(el.path)}),
		 					});
		 					aImages[i].append(img);
		 					var span=$('<span/>').attr('class','pin-title').text(el.title);
		 					aImages[i].append(span);
		 				});
		 				metroDiv.append(aImages);
		 				metroDiv.liveTile({pauseOnHover: true});
		 			}else{
		 				return false;
		 			}
		 		});
		 			
},
iWelcome.prototype.loadPins = function(metroDiv,minHeight,href) {
	  
	   metroDiv.attr({
		 		 	'data-start-now':true,
		 		 	'data-delay':3000,
		 		 	'data-direction':'vertical',
		 		 });
		 		  var $this=this;
	   $.getJSON(OC.generateUrl('apps/pinit/getallpinsuser?limit={limit}',{'limit':5}), {},function(jsondata){
		 			if(jsondata){
		 			
		 				var aPins=[];
		 				$(jsondata).each(function(i,el){
		 					
		 					if (el.image != '') {
		 						aPins[i]=$('<div/>').click(function(){
							 		window.location=href+'#'+el.id;
							 	});
			 					var img = new Image();
							
								 $(img).load(function(){
								 	
								 	 $(img).width=$this.columnWidth;
								 	 $(img).height=minHeight;
								 	
								 	
								 })
								.attr({
									'src' : 'data:' + el.imageMimeType + ';base64,' + el.image,
									 'width':$this.columnWidth,
									 'height':minHeight,
									 'class':'full',
								});
								aPins[i].append(img);
							
		 					 if (el.media_url != '') {
		 					
					 			var divPinMedia = $('<div/>')
					 			.css({
									'background': 'url(' + OC.imagePath('pinit', 'play.png') + ') no-repeat center',
									'left':(($this.columnWidth / 2) -28)+'px',
									'top':((minHeight / 2) -24)+'px',
									'width':'56px',
									'height':'56px',
									'position':'absolute',
									'z-index':12,
									});
									aPins[i].append(divPinMedia);
								}
								
					            var span=$('<span/>').attr('class','pin-title').text(el.title);
					            aPins[i].append(span);
							}
							
		 				}.bind(this));
		 				metroDiv.append(aPins);
		 				metroDiv.liveTile({pauseOnHover: true});
		 					return true;
		 			}else{
		 				return false;
		 			}
		 		});
		 			
},
iWelcome.prototype.loadCalendarEvents = function(metroDiv,href) {
	  metroDiv.attr({
		 		 	'data-start-now':true,
		 		 	'data-delay':2000,
		 		 	'data-direction':'vertical',
		 		 });
	 $.getJSON(OC.generateUrl('apps/welcome/getcaleventstoday'), {},function(jsondata){
		 			if(jsondata){
		 			
		 				var aCalEvents=[];
		 				var mainDiv =$('<div/>').attr({'class':'full'}).html('<span class="descriptionEventTitle">'+t('welcome','Today')+'</span>');
		 				metroDiv.append(mainDiv);
		 				$(jsondata).each(function(i,el){
		 					
						  aCalEvents[i] =$('<span/>').attr({'class':'descriptionEvents'}).text(el.name).click(function(){
							 		window.location=el.link;
							 });
		 					
						});
						
						mainDiv.append(aCalEvents);
						metroDiv.liveTile({pauseOnHover: true});
		 			}else{
		 				
		 				var mainDiv =$('<div/>').attr({'class':'full'}).html('<span class="descriptionEventTitle">'+t('welcome','Today')+'</span>');
		 				var spanNoevents = $('<span/>').attr({'class':'descriptionEvents'}).text(t('welcome','No Events today found')).click(function(){
							 		window.location=OC.generateUrl('apps/calendar/');
							 });
		 				
		 				mainDiv.append(spanNoevents);
						metroDiv.append(mainDiv);
						metroDiv.liveTile({pauseOnHover: true});
		 			}
		 });
},
iWelcome.prototype.loadCalendarTodos = function(metroDiv,href) {
	  metroDiv.attr({
		 		 	'data-start-now':true,
		 		 	'data-delay':2000,
		 		 	'data-direction':'horizontal',
		 		 });
		 		
	 $.getJSON(OC.generateUrl('apps/welcome/getcaltodostoday'), {},function(jsondata){
		 			
		 			if(jsondata){
		 				var aCalEvents=[];
		 				var mainDiv =$('<div/>').attr({'class':'full'}).html('<span class="descriptionEventTitle">'+t('welcome','Today')+'</span>');
		 				
		 				$(jsondata).each(function(i,el){
		 				
						  aCalEvents[i] =$('<span/>').attr({'class':'descriptionEvents'}).text(el.name).click(function(){
							 		window.location=el.link;
							 });
		 					
						});
						
						mainDiv.append(aCalEvents);
						metroDiv.append(mainDiv);
						metroDiv.liveTile({pauseOnHover: true});
		 			}else{
		 					
		 				var mainDiv =$('<div/>').attr({'class':'full'}).html('<span class="descriptionEventTitle">'+t('welcome','Today')+'</span>');
		 				var spanNoevents = $('<span/>').attr({'class':'descriptionEvents'}).text(t('welcome','No Events today found')).click(function(){
							 		window.location=OC.generateUrl('apps/aufgaben/');
							 });
		 				
		 				mainDiv.append(spanNoevents);
						metroDiv.append(mainDiv);
						metroDiv.liveTile({pauseOnHover: true});
		 			}
		 });
},
iWelcome.prototype.loadElement = function(element,modus) {
	        var infoElem;
	        
	        if(modus=='personal'){
	        	 infoElem=this.loadElementInfoPersonal(element);
	        }
	        if(modus=='apps'){
	         	infoElem=this.loadElementInfoApps(element);
	        }
	        var tileMode='flip';
	        var minHeight=this.columnHeight;
	       
		 	if(infoElem['id']=='gallerydeluxe' || infoElem['id']=='pinit' || infoElem['id']=='calendarplus' || infoElem['id']=='tasksplus'){
		 		tileMode='carousel';
		 		if(infoElem['id']=='gallerydeluxe'){
		 			 minHeight=(minHeight*1.5)+  (this.marginItem * 2);
		 		}
		 		if(infoElem['id']=='pinit'){
		 			 minHeight=minHeight*1.5 + (this.marginItem * 2);
		 		}
		 		if(infoElem['id']=='calendarplus' || infoElem['id']=='tasksplus'){
		 			 minHeight=(minHeight*1.2)+  (this.marginItem * 2);
		 		}
		 	}
		 	
		 	
		 	var metroDiv=$('<div/>').attr({
		 		'class':'live-tile welcome-app a-app-'+infoElem['id'],
		 		'data-direction':'horizontal',
		 		'data-mode':tileMode,
		 		'data-appid':infoElem['id'],
		 		'id':'appLive-'+infoElem['id'],
		 	})
		 	.css({'height':minHeight+'px'});
		 	
		 	if(infoElem['id']=='gallerydeluxe'){
		 		 this.loadGallery(metroDiv,infoElem['href']);
		 	}
		 	if(infoElem['id']=='pinit' ){
		 		this.loadPins(metroDiv,minHeight,infoElem['href']);
		 	
		 	}
		 	
		 	if(infoElem['id']== 'calendarplus' ){
		 		this.loadCalendarEvents(metroDiv,infoElem['href']);
		 	}
		 	
		 	if(infoElem['id']== 'tasksplus' ){
		 		
		 		this.loadCalendarTodos(metroDiv,infoElem['href']);
		 	}
		 	
		 	
		 	
		 	var metroFrontDiv=$('<div/>')
		 	.attr('class','front-div')
		 	.css({
		  	   		'font-size':this.fontSize+'px',
		  	   		'text-align':'center',
		  	   		
		  	   		
		  	   })
		  	   .click(function(){
		 		window.location=infoElem['href'];
		 	});
		 	
		 	var italic=$('<i/>').attr('class',' ioc ioc-'+infoElem['icon']).css({
		  	   		'font-size':this.fontSizeI+'px',
		  	   		'line-height':minHeight+'px',
		  	   		'text-align':'center',
		  	   });
		  	metroFrontDiv.append(italic);
		  	
		 	var span=$('<div/>').text(infoElem['text']).attr('class','app-name');
		  	metroFrontDiv.append(span);
		 	metroDiv.append(metroFrontDiv);
		 	
		 	
		 	
		 	if(infoElem['id']!='calendarplus' && infoElem['id']!='tasksplus'){
			 	var metroBackDiv=$('<div/>')
			 	.attr('class','back-div full')
			 	.click(function(){
			 		window.location=infoElem['href'];
			 	})
			 	.text(infoElem['descr']);
			 	
			 	metroDiv.append(metroBackDiv);
		 	}
		 	
		 	metroDiv.liveTile({'playOnHover':true,startNow:false,repeatCount: 0,});
		 	
		 
		  return metroDiv;
};

iWelcome.prototype.gridify = function() {
	var options ={
			srcNode: '.welcome-app', // grid items (class, node)
			width:this.columnWidth,
			margin: this.marginItem+'px', // margin in pixel, default: 0px
			resizable: false, // re-layout if window resize
			transition: 'all 0.5s ease', // support transition for CSS3, default: all 0.5s ease
		};
			
		this.container.gridify(options);
		
	
	if(this.maxPerRow>2){
		var  maxHeight=$(window).height()-150;
		
		for(var i=0; i<this.maxPerRow; i++){
			var saveHeight=0;
			$('[data-grid="column-'+i+'"]').each(function(el){
				
				if($(this).data('appid')=='gallerydeluxe'){
					//$('.column-'+i).width(400);
					//$('.column-'+(i+1)).css({'left':$('.column-'+(i+1)).offset().left+144});
				}
				saveHeight+=$(this).height()+2;
			
			});
			
			if(saveHeight < maxHeight){
			var newHeight=$('[data-grid="column-'+i+'"]').last().height()+(maxHeight-saveHeight);	
			$('[data-grid="column-'+i+'"]').last().height(newHeight);
			 $('[data-grid="column-'+i+'"] i').last().css({'font-size':(newHeight/2)+'px','line-height':newHeight+'px'});
			 
            }
            
			if(saveHeight >= maxHeight){
			var newHeight=$('[data-grid="column-'+i+'"]').last().height()-(saveHeight-maxHeight);
            
                if(newHeight < 50){
                    var iCount=$('[data-grid="column-'+i+'"]').length;
                    prevLastHeight=$('[data-grid="column-'+i+'"]').eq(iCount-2).height();
                    var DiffHeight= (newHeight + prevLastHeight) / 2;
                    
                    $('[data-grid="column-'+i+'"]').eq(iCount-2).height(DiffHeight);
                    $('[data-grid="column-'+i+'"] i').eq(iCount-2).css({'font-size':(DiffHeight/2)+'px','line-height':DiffHeight+'px'});
                    $('[data-grid="column-'+i+'"]').last().height(DiffHeight+1).css({
	                   	'margin-top': '-'+((DiffHeight/2)+3)+'px',
	                 });
                   $('[data-grid="column-'+i+'"] i').last().css({'font-size':(DiffHeight/2)+'px','line-height':DiffHeight+'px'});
                   
                }else{
                   
                     $('[data-grid="column-'+i+'"]').last().height(newHeight);
                     $('[data-grid="column-'+i+'"] i').last().css({'font-size':(newHeight/2)+'px','line-height':newHeight+'px'});
                }
			
			
			
			}
		}
	}
		
};
iWelcome.prototype.calcDimension = function() {
	if ($(window).width() > 768) {
		this.maxPerRow=4;
	}else{
		this.maxPerRow=2;
	}
   	var ElementsRow=Math.ceil((this.itemsApp.length+this.itemsPersonal.length)/this.maxPerRow);
	this.columnWidth = (this.container.width()-20) /this.maxPerRow;
	this.columnWidth = Math.round(this.columnWidth);
	this.columnWidth = (this.columnWidth - (this.marginItem*2));
	this.fontSize=Math.round(this.columnWidth/100) + 14;
	
	if(this.maxPerRow==4){
		this.columnHeight= Math.round(($(window).height()-150-(ElementsRow*(this.marginItem*2)))/ElementsRow);
	}else{
		this.columnHeight= 150;
	}
	this.fontSizeI=Math.round(this.columnHeight/2);
	
};

var ocWelcome=null;
$(window).resize(_.throttle(function() {
	   ocWelcome.calcDimension();
	   
	  ocWelcome.container.find('.welcome-app').each(function(el){
	  	  if($(this).attr('data-appid') == 'gallerydeluxe'){
	  	  	 $(this).height(ocWelcome.columnHeight * 1.5 + ocWelcome.marginItem);
	  	  }
	  	  else if($(this).attr('data-appid') == 'pinit'){
	  	  	 $(this).height(ocWelcome.columnHeight * 1.5 + ocWelcome.marginItem);
	  	  }else if($(this).attr('data-appid') == 'calendarplus'){
	  	  	 $(this).height(ocWelcome.columnHeight * 1.2 + ocWelcome.marginItem);
	  	  }else if($(this).attr('data-appid') == 'tasksplus'){
	  	  	 $(this).height(ocWelcome.columnHeight * 1.2 + ocWelcome.marginItem);
	  	  }else{
	  	  	 $(this).height(ocWelcome.columnHeight);
	  	  }
	  	 
	  });
	 
	   ocWelcome.container.find('.front-div i').css({
	   	'font-size':ocWelcome.fontSizeI+'px',
	   	'line-height':ocWelcome.columnHeight+'px'
	   	});
	   	ocWelcome.container.find('.front-div div.app-name').css({
	   	'font-size':ocWelcome.fontSize+'px'
	   	});
	   //ocWelcome.container.find('a').height(ocWelcome.columnHeight);
	   ocWelcome.gridify();
}, 500));

$(document).ready(function() {
	
	ocWelcome=new iWelcome('#loadedAppsWelcome','#navigation li','#expanddiv li a');
	ocWelcome.init();
	 
});