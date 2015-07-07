$(document).ready(function(){
	$('#tm_switcher').bind('change', function(){
		$.ajax({
			type:'POST',
			url:OC.generateUrl('apps/welcome/updatetheme'),
			data:{theme:$(this).val()},
			success:function(s){
				document.location.reload(true);
			}
		});
	});
	
	$('#defaultApp').bind('change', function(){
		$.ajax({
			type:'POST',
			url:OC.generateUrl('apps/welcome/updatedefaultapp'),
			data:{app:$(this).val()},
			success:function(s){
				 $('.defaultApp.msg').css({'background':'green','color':'white','float':'left','width':'80px','line-height':'40px','text-align':'center'}).text('Success!');
				 $('.defaultApp.msg').show('fast').delay(1000).hide('slow');
			}
		});
	});
});