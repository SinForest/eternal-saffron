function memInit()
{
	//Initaialisierung der Arrays auf 0; (Bei cards[] überflüssig?)
	for(var i = 0; i<(xMax*yMax); i++)
	{
		cards[i] = 0;
		if (i < (xMax*yMax*0.5)) used[i] = 0;
	}
	
	//Verteilung der Karten. Keine darf öfter als 2 mal vorkommen
	for(var i = 0; i<(xMax*yMax); i++)
	{
		var rnd = 0;
		do
		{
			rnd = Math.floor((xMax*yMax*0.5)*Math.random());
		}
		while(used[rnd] == 2);
		cards[i] = rnd;
		used[rnd]++;
	}
}

function createTable()
{
	for(var i=0; i<yMax; i++)
	{
		var tmp = "";
		for(var e=0; e<xMax; e++)
		{
			var tmp_id = ((i*xMax)+e);
			tmp += ('<td id="tfield_' + tmp_id + '" class="game_td"><div id="dfield_' + tmp_id + '" class="dfield"><img src="cards/backside.png" width="70px" height="70px" id="ifield_' + tmp_id + '"></img></div></td>');
		}
		$("#game_tb").append('<tr class="gamerow" id="gr' + (i+1) + '">' + tmp +'</tr>');
	}
}

function clickIt(ref)
{
	var card_id = $(ref).attr("id");
	card_id = card_id.replace("tfield_","");
	
	if(card_id == openCard) //Die selbe Karte wurde 2 mal angeklickt;
	{
		if(lastGuess) onePoint();
	}
	else if((openCard > -1) && (openCard2 == -1)) //Es ist genau eine Karte aufgedeckt
	{
		//Merke Karte:
			openCard2 = card_id;
		//Zeige Karte:
		$("#ifield_"+card_id).attr("src","cards/"+cards[card_id]+".png");
		//Überprüfe:
		if(cards[card_id] == cards[openCard])
		{
			points++;
			$("#points").html(points);
			lastGuess = true;
		}
		else
		{
			lastGuess = false;
		}
		trys++;
		$("#trys").html(trys);
	}
	else if(openCard == -1) //Es ist noch keine Karte aufgedeckt
	{
		//Zeige Karte:
		$("#ifield_"+card_id).attr("src","cards/"+cards[card_id]+".png");
		//Merke offene Karte:
		openCard = card_id;
	}
	else //Es sind 2 Karten aufgedeckt
	{
		if(lastGuess)
			onePoint();
		else
		{
			//Verdecke Karten:
			$("#ifield_"+openCard).attr("src","cards/backside.png");
			$("#ifield_"+openCard2).attr("src","cards/backside.png");
			openCard = -1;
			openCard2 = -1;
		}
	}
}

function onePoint()
{
	$("#ifield_"+openCard).hide();
	$("#ifield_"+openCard2).hide();
	$("#tfield_"+openCard).unbind('click');
	$("#tfield_"+openCard2).unbind('click');
	lastGuess = false;
	if(points == (xMax*yMax*0.5))
		alert("Du hast mit "+trys+" Versuchen gewonnen!");
	openCard = -1;
	openCard2 = -1;
}