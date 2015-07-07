<div class="section">
<h2>Themes Manager - Switcher</h2>
		
Theme:&nbsp;<select id="tm_switcher">
			<option value='0'<?php $_['current']=='0'?' selected':'' ?>>Default</option>
			<?php foreach($_['themes'] as $theme): ?>
			<option value='<?php p(strtolower($theme)); ?>'<?php p($_['current']==strtolower($theme)?' selected':''); ?>><?php p(ucfirst($theme)); ?></option>
			<?php endforeach;?>
		</select>
	
</div>
<div class="section">
<h2>Default App on Start</h2>
<select id="defaultApp" style="float:left;">
	<?php foreach($_['aEnabledApps'] as $key => $val): ?>
			<option value="<?php p($key); ?>"<?php print($_['currentApp']==$key?' selected':''); ?>><?php p($val) ?></option>
			<?php endforeach;?>
	
	
</select>
<div class="defaultApp msg"></div><br style="clear:both;" />
<span class="setupwarning">Make sure the app is for all user available! (User/Group restriction!)</span>
</div>