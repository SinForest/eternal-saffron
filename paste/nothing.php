<!DOCTYPE html>
<html>
	<head>
		<title>BlueTest</title>
		<style type="text/css">
			body {background-color:#120a8f;}
			p {color:white;}
			h1 {text-align:center;}
		</style>
	</head>
	<body>
		<div id="header" style="background-color:blue; width:100%; height:50px; border:3px;">
		<h1>Willkommen auf dieser Testseite!</h1>
		</div>
		<div id="menu" style="background-color:cyan;width:20%;height:500px;float:left;text-align:center;">
		</div>
		<div id="content" style="background-color:blue;width:80%;height:500px;float:left;">
			<div style="margin:15px;">
				<?php echo $_POST["i_text"];?>
			</div>
		</div>
		<div style="clear:both"></div>
		<div id="footer" style="background-color:blue; width:100%; height:50px">
		test
		</div>
	</body>
</html>