//Bauen des Spielfeldes
function createTable()
{
	for(var i=0; i<yMax; i++)
	{
		var tmp = "";
		for(var e=0; e<xMax; e++)
		{
			var tmp_id = ((i*xMax)+e);
			tmp += ('<td id="tfield_' + tmp_id + '" class="game_td"><div id="dfield_' + tmp_id + '" class="dfield"><img src="res/empty.png" width="70px" height="70px" id="ifield_' + tmp_id + '"></img></div></td>');
		}
		$("#game_tb").append('<tr class="gamerow" id="gr' + (i+1) + '">' + tmp +'</tr>');
	}
}

//Initialisierung des Spiels
function initGame()
{
	for(var i = 0; i<(xMax*yMax); i++)
	{
		f_building[i] = "none";		//Kein Feld ist bebaut
		f_res[i] = 200 + Math.floor((501)*Math.random()); //Alle Felder haben zwischen 200 und 700 Res.
		f_elec[i] = false;		//Kein Feld ist unter Strom
		f_reach[i] = false;		//Kein Feld ist erreichbar;
		f_active[i] = true;		//Alle Felder sind aktiv;
	}
	
	cur_res = startRes;			//Startkapital festlegen
	
	for(var i = 0; i<((xMax*yMax))/10; i++)		//Berge versetzten ;>
	{
		var rnd;
		do
		{
			rnd = Math.floor((xMax*yMax)*Math.random());
		}
		while(f_building[rnd] != "none");
		f_building[rnd] = "mount";
		f_res[rnd] = 999;
	}
	
	for(var i = 0; i<((xMax*yMax))/3; i++)			//Bäume pflanzen;
	{
	var rnd;
		do
		{
			rnd = Math.floor((xMax*yMax)*Math.random());
		}
		while(f_building[rnd] != "none");
		f_building[rnd] = "tree";
		f_res[rnd] = 750;
	}
	
	$(".tool").click(function(){chooseTool(this)});
	$(".toolremover").click(function(){removeTool()});
	
	refreshImages();
	refreshRes();
}

//Alle Bilder im Spielfeld erneuern
function refreshImages()
{
	for(var i = 0; i<(xMax*yMax); i++)
	{
		$("#ifield_"+i).attr("src","res/"+f_building[i]+".png");
	}
}

//.click-Funktion der Felder
function fieldClick(clicked)
{
	if(cur_tool = "none")
	{
		
	}
}

//Farben aller Felder berechnen und setzen
function calcColors()
{
	for(var i = 0; i<(xMax*yMax); i++)
	{
		
	}
}

//Aktualisierung der Ressourcenanzeigen
function refreshRes()
{
	$("#tx_res").text(cur_res);
	$("#tx_elec").text(cur_elec);
	$("#tx_people").text(cur_people);
	$("#tx_smog").text(cur_smog);
}

//.click-Funktion der Toolbar
function chooseTool(clicked)
{
	var tool_id = $(clicked).attr("id");
	cur_tool = tool_id.replace("tool_","");
	$("#current_tool").attr("src","res/" + cur_tool + ".png");
}

//Zweite .click-Funktion der Toolbar
function removeTool()
{
	cur_tool = "none";
	$("#current_tool").attr("src","res/none.png");
}
