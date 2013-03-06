const elePrice = 2000;
const kondPrice = 500;
const housePrice = 2000;
const mudPrice = 6000;
const sitePrice = 5000;
const axePrice = 1000;
const eleElec = 1000;
const kondElec = 100;
const houseElec = -75;
const siteElec = -100;
const mountElec = -50;
const hqElec = -100;
const housePeople = 20;
const mountPeople = -5;
const treePeople = -5;
const sitePeople = -9;
const eleRes = -14;
const houseRes = -7;
const kondRes = -5;
const mountRes = 5;
const treeRes = 3;
const siteRes = 2;
const eleSelf = -3;
const kondSelf = -1;
const houseSelf = -2;
const treeSelf = 1;
const mudSelf = -7;
const hqSmog = 10;
const eleSmog = 20;
const kondSmog = 4;
const houseSmog = 10;
const mudSmog = 20;
const siteSmog = 20;
const skullSmog = 25;
const treeSmog = -1;



//Bauen des Spielfeldes
function createTable()
{
	for(var i=0; i<yMax; i++)
	{
		var tmp = "";
		for(var e=0; e<xMax; e++)
		{
			var tmp_id = ((i*xMax)+e);
			tmp += ('<td id="tfield_' + tmp_id + '" class="game_td"><div id="dfield_' + tmp_id + '" class="dfield"><img src="res/empty.png" width="70px" height="70px" class= "ifield" id="ifield_' + tmp_id + '"></img></div></td>');
		}
		$("#game_tb").append('<tr class="gamerow" id="gr' + (i+1) + '">' + tmp +'</tr>');
	}
	
	$("#game_div").css("width",77*xMax);
	$("#tooltip_div").css("height",75*yMax);
	
	var tmp_pos = $("#game_tb").position();
	$("#tooltip_div").css("position","absolute");
	$("#tooltip_div").css("top", tmp_pos.top);
	$("#tooltip_div").css("left", tmp_pos.left + 75*xMax);
	
	$("#upper_tooltip").css("height",(60/100)*75*yMax);
	$("#bottom_tooltip").css("height",(39/100)*75*yMax);
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
	
	for(var i = 0; i<((xMax*yMax))/20; i++)			//Teiche ausheben;
	{
	var rnd;
		do
		{
			rnd = Math.floor((xMax*yMax)*Math.random());
		}
		while(f_building[rnd] != "none");
		f_building[rnd] = "lake";
	}
	
	var rnd;							//Headquarter bauen;
	do
	{
		rnd = Math.floor((xMax*yMax)*Math.random());
	}
	while(f_building[rnd] != "none");
	f_building[rnd] = "hq";
	f_res[rnd] = 0;
	hq_pos = rnd;
	
	$("#invis").load("text/"+loc+"/field.txt",function(msg)
	{
		texts = msg.split("\n");
	});
	
	$(".tool").click(function(){chooseTool(this)});
	$(".toolremover").click(function(){removeTool()});
	$(".ifield").click(function(){fieldClick(this)});
	/*DEBUG*/$("#border").click(function(){tick()});
	
	refreshImages();
	refreshRes();
	calcColors();
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
	var this_id = $(clicked).attr("id");
	this_id = this_id.replace("ifield_","");
	var this_bd = f_building[this_id];
	
	if(cur_tool == "none")		//Wenn kein Werkzeug gewählt ist, zeige Informationen im Tooltip
	{
		cur_field = this_id;
		refreshTooltip();
		return "";
	}
	else if(cur_tool == "ele")
	{
		if(this_bd != "none") return "Das kann da nicht hin!";
		if(cur_res < elePrice) return "Du hast zu wenig Ressourcen!";
		f_building[this_id] = cur_tool;
		cur_res -= elePrice;
		refreshImages();
		refreshRes();
		refreshTooltip();
		return "";
	}
	else if(cur_tool == "kond")
	{
		if(this_bd != "none") return "Das kann da nicht hin!";
		if(cur_res < kondPrice) return "Du hast zu wenig Ressourcen!";
		f_building[this_id] = cur_tool;
		cur_res -= kondPrice;
		refreshImages();
		refreshRes();
		refreshTooltip();
		return "";
	}
	else if(cur_tool == "house")
	{
		if(this_bd != "none") return "Das kann da nicht hin!";
		if(cur_res < housePrice) return "Du hast zu wenig Ressourcen!";
		f_building[this_id] = cur_tool;
		cur_res -= housePrice;
		refreshImages();
		refreshRes();
		refreshTooltip();
		return "";
	}
	else if(cur_tool == "site")
	{
		if(this_bd != "none") return "Das kann da nicht hin!";
		if(cur_res < sitePrice) return "Du hast zu wenig Ressourcen!";
		f_building[this_id] = cur_tool;
		cur_res -= sitePrice;
		refreshImages();
		refreshRes();
		refreshTooltip();
		return "";
	}
	else if(cur_tool == "mud")
	{
		if((this_bd != "none") && (this_bd != "lake")) return "Das kann da nicht hin!";
		if(cur_res < mudPrice) return "Du hast zu wenig Ressourcen!";
		if(this_bd == "lake") f_res[this_id] *= 2; else f_res[this_id] /= 2;
		f_building[this_id] = cur_tool;
		cur_res -= mudPrice;
		calcColors();
		refreshImages();
		refreshRes();
		refreshTooltip();
		return "";
	}
	else if(cur_tool == "axe")
	{
		if(this_bd != "tree") return "Das geht nur in Wäldern!";
		if(cur_res < sitePrice) return "Du hast zu wenig Ressourcen!";
		f_building[this_id] = "none";
		cur_res -= axePrice;
		f_res[this_id] /= 3;
		calcColors();
		refreshImages();
		refreshRes();
		refreshTooltip();
		return "";
	}
	else if(cur_tool == "bomb")
	{
		if((this_bd == "tree") || (this_bd == "mount") || (this_bd == "lake") || (this_bd == "mud") || (this_bd == "none") || (this_bd == "hq") || (this_bd == "skull")) return "Das kannst du nicht sprengen!";
		f_building[this_id] = "none";
		refreshImages();
		refreshRes();
		refreshTooltip();
		return "";
	}
}

//Tooltip aktualisieren
function refreshTooltip()
{
	if (cur_field >= 0) {
		var this_bd = f_building[cur_field];
		$("#ut_img").attr("src","res/" + this_bd + ".png");
		var tmp_line = texts.indexOf(this_bd+"\r");
		$("#ut_head").text(texts[tmp_line+1]);
		$("#ut_txt").text(texts[tmp_line+2]);
		//<----- Tabelleninfos abfragen!
		var tmp_color = "#123456";
		if(f_res[cur_field] > 666) tmp_color = "#00c060";
			else if(f_res[cur_field] > 333) tmp_color = "#b0ffb0";
				else tmp_color = "#e0ffe0";
		$("#td_this_res").css("color",tmp_color).text(f_res[cur_field]);
		if(f_elec[cur_field] == true) tmp_color = "#ffff00"; else tmp_color = "#222222";
		$("#td_this_elec").css("color",tmp_color);
		if(f_reach[cur_field] == true) tmp_color = "#ff0000"; else tmp_color = "#222222";
		$("#td_this_reach").css("color",tmp_color);
		if(f_elec[cur_field] == true) tmp_color = "On"; else tmp_color = "Off";
		$("#td_this_elec").text(tmp_color);
		if(f_reach[cur_field] == true) tmp_color = "Ja"; else tmp_color = "Nein";
		$("#td_this_reach").text(tmp_color);
	}
}

//Farben aller Felder berechnen und setzen
function calcColors()
{
	for(var i = 0; i<(xMax*yMax); i++)
	{
		if(f_elec[i] == true)
		{
			if(f_reach[i] == true)
			{
				if(f_res[i] > 666)
				{
					$("#tfield_"+i).css("background-color","#ff8000");
				}
				else if(f_res[i] > 333)
				{
					$("#tfield_"+i).css("background-color","#c06000");
				}
				else
				{
					$("#tfield_"+i).css("background-color","#ffc060");
				}
			}
			else
			{
				if(f_res[i] > 666)
				{
					$("#tfield_"+i).css("background-color","#c0ff00");
				}
				else if(f_res[i] > 333)
				{
					$("#tfield_"+i).css("background-color","#ffff00");
				}
				else
				{
					$("#tfield_"+i).css("background-color","#ffff80");
				}
			}
		}
		else
		{
			if(f_reach[i] == true)
			{
				if(f_res[i] > 666)
				{
					$("#tfield_"+i).css("background-color","#ff00ff");
				}
				else if(f_res[i] > 333)
				{
					$("#tfield_"+i).css("background-color","#ff0000");
				}
				else
				{
					$("#tfield_"+i).css("background-color","#ffc0c0");
				}
			}
			else
			{
				if(f_res[i] > 666)
				{
					$("#tfield_"+i).css("background-color","#00c060");
				}
				else if(f_res[i] > 333)
				{
					$("#tfield_"+i).css("background-color","#b0ffb0");
				}
				else
				{
					$("#tfield_"+i).css("background-color","#e0ffe0");
				}
			}
		}
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

//Ein Tick
function tick()
{
	console.log("Tick!");
	//Zerstörung von ausgebeutetem Land;
	for(var i = 0; i<(xMax*yMax); i++)
	{
		if((f_res[i] < 1) && (f_building[i] != "hq"))
		{
			f_building[i] = "skull";
			f_res[i] = 0;
		}
	}
	//Reset der Eigenschaften
	for(var i = 0; i<(xMax*yMax); i++)
	{
		f_elec[i] = false;
		f_reach[i] = false;
	};
	
	//E-Werke anlaufen lassen
	for(var i = 0; i<(xMax*yMax); i++){
		if(f_building[i] == "ele"){
			for(var e = i-3-(3*xMax); e<(i+3+(3*xMax)); e++){
				if(( Math.abs((e % xMax) - (i % xMax)) + Math.abs(Math.floor(e / xMax) - Math.floor(i / xMax))) <=3) f_elec[e] = true;}}}
				
	//KonduktorKugeln anlaufen lassen
	do{
		var retry = false;
		for(var i = 0; i<(xMax*yMax); i++){
			if((f_building[i] == "kond")&&(f_elec[i] == true)){
				for(var e = i-2-(2*xMax); e<(i+2+(2*xMax)); e++){
					if(( Math.abs((e % xMax) - (i % xMax)) + Math.abs(Math.floor(e / xMax) - Math.floor(i / xMax))) <=2){
						if(f_elec[e] == false){
							f_elec[e] = true;
							retry = true;}}}}}}
	while(retry == true);
	
	//Häuser berechnen
	for(var i = 0; i<(xMax*yMax); i++){
		if((f_building[i] == "house") && (f_elec[i] == true)){
			for(var e = i-2-(2*xMax); e<(i+2+(2*xMax)); e++){
				if(( Math.abs((e % xMax) - (i % xMax)) + Math.abs(Math.floor(e / xMax) - Math.floor(i / xMax))) <=2) f_reach[e] = true;}}}
						
	//Hauptquartier überprüfen
	if((f_elec[hq_pos] == true) && (f_reach[hq_pos] == true))
	{
		$("#warn_hq").css("display","none");
	}
	else
	{
		$("#warn_hq").css("display","inline");
		for(var i = 0; i<(xMax*yMax); i++) //Totalausfall
			{
				f_elec[i] = false;
				f_reach[i] = false;
			};
	}
	
	//Strom berechnen
	cur_elec = 0;
	for(var i = 0; i<(xMax*yMax); i++){
		if(f_building[i] == "house") cur_elec += houseElec;
		else if(f_building[i] == "site") cur_elec += siteElec;
		else if(f_building[i] == "kond") cur_elec += kondElec;
		else if(f_building[i] == "ele") cur_elec += eleElec;
		else if((f_building[i] == "mount") && (f_reach[i] == true)) cur_elec += mountElec;
		else if(f_building[i] == "hq") cur_elec += hqElec;
	}
	if(cur_elec < 0)
	{
		for(var i = 0; i<(xMax*yMax); i++)
		{
			f_elec[i] = false;
		};
		$("#warn_elec").css("display","inline");
	} else {$("#warn_elec").css("display","none");}
	
	//Menschen berechnen
	cur_people = 0;
	for(var i = 0; i<(xMax*yMax); i++){
		if((f_building[i] == "house") && (f_reach[i] == true) && (f_elec[i] == true)) cur_people += housePeople;
		else if((f_building[i] == "mount") && (f_reach[i] == true) && (f_elec[i] == true)) cur_people += mountPeople;
		else if((f_building[i] == "tree") && (f_reach[i] == true) && (f_elec[i] == true)) cur_people += treePeople;
		else if((f_building[i] == "site") && (f_reach[i] == true) && (f_elec[i] == true)) cur_people += sitePeople;
	}
	if(cur_people < 0)
	{
		for(var i = 0; i<(xMax*yMax); i++)
		{
			f_reach[i] = false;
		};
		$("#warn_people").css("display","inline");
	} else {$("#warn_people").css("display","none");}
	
	
	//Ressourcenänderungen
	for(var i = 0; i<(xMax*yMax); i++){
		if(f_building[i] == "ele")
		{
			cur_res += eleRes;
			f_res[i] += eleSelf;
		}
		else if(f_building[i] == "house")
		{
			cur_res += houseRes;
			f_res[i] += houseSelf;
		}
		else if(f_building[i] == "kond")
		{
			cur_res += kondRes;
			f_res[i] += kondSelf;
		}
		else if((f_building[i] == "mount") && (f_reach[i] == true) && (f_elec[i] == true))
		{
			cur_res += mountRes;
			f_res[i] -= mountRes;
		}
		else if((f_building[i] == "tree") && (f_reach[i] == true))
		{
			cur_res += treeRes;
			f_res[i] -= treeRes;
		}
		else if((f_building[i] == "tree") && (f_reach[i] == false))
		{
			f_res[i] += treeSelf;
		}
		else if((f_building[i] == "site") && (f_reach[i] == true) && (f_elec[i] == true))
		{
			cur_res += siteRes;
			f_res[i] -= siteRes;
			if((i-1 >= 0) && (f_building[i-1] != "hq"))
			{
				cur_res += siteRes;
				f_res[i-1] -= siteRes;
			}
			if((i+1 < xMax*yMax) && (f_building[i+1] != "hq"))
			{
				cur_res += siteRes;
				f_res[i+1] -= siteRes;
			}
			if((i-xMax >= 0) && (f_building[i-xMax] != "hq"))
			{
				cur_res += siteRes;
				f_res[i-xMax] -= siteRes;
			}
			if((i+xMax < xMax*yMax) && (f_building[i+xMax] != "hq"))
			{
				cur_res += siteRes;
				f_res[i+xMax] -= siteRes;
			}
		}
	}
		
		
		//Smog berechnen;
		for(var i = 0; i<(xMax*yMax); i++){
			if(f_building[i] == "hq") cur_smog += hqSmog;
			else if(f_building[i] == "ele") cur_smog += eleSmog;
			else if(f_building[i] == "kond") cur_smog += kondSmog;
			else if(f_building[i] == "house") cur_smog += houseSmog;
			else if(f_building[i] == "mud") cur_smog += mudSmog;
			else if(f_building[i] == "skull") cur_smog += skullSmog;
			else if(f_building[i] == "tree") cur_smog += treeSmog;
		}
	
		//You lose Abfrage hier rein! (Res < 0);
		//Ach ja, und ne Gewinn-Abfrage ;)
		
	
	refreshImages();
	refreshTooltip();
	refreshRes();
	calcColors();
	
}

