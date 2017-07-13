//namespace to rule them all

var Minecraft = {};
//function that clears counters during reset
Minecraft.clear = function() {
	//counters for tiles in inventory
Minecraft.dirtCounter = 0;
Minecraft.grassCounter = 0;
Minecraft.rockCounter = 0;
Minecraft.treeCounter = 0;
Minecraft.leafCounter = 0;
//start with six fence tiles to place but they are unremovable
Minecraft.fenceCounter = 6;

$("#counterDirt").html(Minecraft.dirtCounter);
$("#counterGrass").html(Minecraft.grassCounter);
$("#counterRock").html(Minecraft.rockCounter);
$("#counterLeaf").html(Minecraft.leafCounter);
$("#counterFence").html(Minecraft.fenceCounter);
$("#counterTree").html(Minecraft.treeCounter);
};
//clear the counters in beggining
Minecraft.clear();

var tool = "";
Minecraft.inventory = "";
//tool and inventory item creation and selection
$("#tool1").on("click",shovel)
        function shovel(event){
        	//assign border to selected tool and remove borders from everything else
			$("#tool2").css("border", "3px solid #493615");
			$("#tool3").css("border","3px solid #493615");
            $("#tool1").css("border","5px solid rgb(129, 14, 5)");
			$("#tool1").css("border-radius ", "15px");
			$(".storage").css("border","3px solid #493615");
			//set tool and remove anything from inventory placement variable
			tool = "shovel";
			Minecraft.inventory = "";
			console.log(tool);
        };
$("#tool2").on("click",pickaxe)
        function pickaxe(event){
			$("#tool1").css("border","3px solid #493615");
			$("#tool3").css("border","3px solid #493615");
            $("#tool2").css("border","5px solid rgb(129, 14, 5)");
			$("#tool2").css("border-radius ", "15px");
			$(".storage").css("border","3px solid #493615");
			tool="pickaxe";
			Minecraft.inventory = "";
			console.log(tool);
        }
$("#tool3").on("click",axe)
        function axe(event){
			$("#tool1").css("border","3px solid #493615");
			$("#tool2").css("border","3px solid #493615");
            $("#tool3").css("border","5px solid rgb(129, 14, 5)");
			$("#tool3").css("border-radius ", "15px");
			$(".storage").css("border","3px solid #493615");
			tool="axe";
			Minecraft.inventory = "";
			console.log(tool);
        }
        //selection of inventory items - deselect everything else
 $(".storage").on("click", function (event) {
			$("#tool1").css("border","3px solid #493615");
			$("#tool2").css("border","3px solid #493615");
			$("#tool3").css("border","3px solid #493615");
			$(".storage").css("border", "3px solid #493615");
			tool = "";
			Minecraft.inventory = "";
			var target = this;
			$(target).css("border", "5px solid rgb(129, 14, 5)");
			var id = target.id;
			//place selected inventory tile type into inventory for placement
			if (id == "storage1") {
				Minecraft.inventory = "grass";
			} else if (id == "storage2") {
				Minecraft.inventory = "dirt";
			}else if (id == "storage3") {
				Minecraft.inventory = "rock";
			}else if (id == "storage4") {
				Minecraft.inventory = "tree";
			}else if (id == "storage5") {
				Minecraft.inventory = "leaf";
			}else if (id == "storage6") {
				Minecraft.inventory = "fence";
			}
			console.log(Minecraft.inventory);
});
//storage function which will increment or decrement the counter depending on whether a tile is selected or replaced
Minecraft.storage = function (el, direction){
	if(el=="dirt"){
		Minecraft.dirtCounter += direction;
		$("#counterDirt").html(Minecraft.dirtCounter);
	}else if(el=="grass"){
		Minecraft.grassCounter += direction;
		$("#counterGrass").html(Minecraft.grassCounter);
	}else if(el=="rock"){
		Minecraft.rockCounter += direction;
		$("#counterRock").html(Minecraft.rockCounter);
	}else if(el=="leaf"){
		Minecraft.leafCounter += direction;
		$("#counterLeaf").html(Minecraft.leafCounter);
	}else if(el=="tree"){
		Minecraft.treeCounter += direction;
		$("#counterTree").html(Minecraft.treeCounter);
	}else if(el=="fence"){
		Minecraft.fenceCounter += direction;
		$("#counterFence").html(Minecraft.fenceCounter);
	}
};

//create the board
Minecraft.createMatrix = function() {
	// create game rows to hold tiles
	Minecraft.grid = new Array (20);
	// create 20 tiles within each row
	for (var i = 0 ; i < Minecraft.grid.length; i++){
		Minecraft.grid[i] = new Array (20);
		//make sure tiles are populated with nothing
		for( var j = 0; j < Minecraft.grid[i].length; j++) {
			Minecraft.grid[i][j] = "";
		}
	}
	//append tiles
	for (var i = 0; i < Minecraft.grid.length; i++) {
		//create new rows to create stable 20 x 20 grid
		var row = $("<div>");
		$("#board").append(row);
		row.addClass("mrow");
		//create the tiles within each rows and add keys and classes for future reference
		for (var j = 0; j < Minecraft.grid[i].length; j++) {
			row.append(
				$('<div/>')
					.addClass("tile")
					.data('r', i)
					.data('c', j)
					.attr("id", 20*i+j)
					);
		}
	}
};
//build the matrix
Minecraft.createMatrix();

//creating tile names - will be assigned as classes later
Minecraft.createDirt = function(r,c) {
	Minecraft.grid[r][c] = "dirt";
}

Minecraft.createGrass = function(r,c) {
	Minecraft.grid[r][c] = "grass";
}

Minecraft.createRock = function(r,c) {
	Minecraft.grid[r][c] = "rock";
}

Minecraft.createTree = function(r,c) {
	Minecraft.grid[r][c] = "tree";
}

Minecraft.createSky = function(r,c) {
	Minecraft.grid[r][c] = "sky";
}

Minecraft.createCloud = function(r,c) {
	Minecraft.grid[r][c] = "cloud";
}

Minecraft.createFence = function(r,c) {
	Minecraft.grid[r][c] = "fence";
}
//function for hill creation given a single point
Minecraft.createHill = function(r,c) {
	Minecraft.grid[r][c] = "rock";
	Minecraft.grid[r][c-1] = "rock";
	Minecraft.grid[r][c+1] = "rock";
	Minecraft.grid[r-1][c] = "rock";
	Minecraft.grid[r][c-2] = "grass";
	Minecraft.grid[r][c+2] = "grass";
	Minecraft.grid[r-1][c-1] = "grass";
	Minecraft.grid[r-1][c+1] = "grass";
	Minecraft.grid[r-2][c] = "grass";
}
//for a bush
Minecraft.createBush = function(r,c) {
	Minecraft.grid[r][c] = "leaf";
	Minecraft.grid[r][c-1] = "leaf";
	Minecraft.grid[r][c+1] = "leaf";
	Minecraft.grid[r-1][c] = "leaf";
}
//for a tree
Minecraft.createArbol = function(r,c) {
	Minecraft.grid[r][c] = "tree";
	Minecraft.grid[r-1][c] = "tree";
	Minecraft.grid[r-2][c] = "tree";
	Minecraft.grid[r-3][c] = "tree";
	Minecraft.grid[r-3][c-1] = "leaf";
	Minecraft.grid[r-3][c+1] = "leaf";
	Minecraft.grid[r-4][c] = "leaf";
	Minecraft.grid[r-4][c-1] = "leaf";
	Minecraft.grid[r-4][c+1] = "leaf";
	Minecraft.grid[r-5][c] = "leaf";
	Minecraft.grid[r-5][c-1] = "leaf";
	Minecraft.grid[r-5][c+1] = "leaf";
	Minecraft.grid[r-6][c] = "leaf";
	Minecraft.grid[r-6][c-1] = "leaf";
	Minecraft.grid[r-6][c+1] = "leaf";
}
//for a cloud
Minecraft.createCloud = function(r,c) {
	Minecraft.grid[r][c] = "cloud";
	Minecraft.grid[r][c+1] = "cloud";
	Minecraft.grid[r][c+2] = "cloud";
	Minecraft.grid[r][c+3] = "cloud";
	Minecraft.grid[r][c+4] = "cloud";
	Minecraft.grid[r][c+5] = "cloud";
	Minecraft.grid[r][c+6] = "cloud";
	Minecraft.grid[r][c+7] = "cloud";
	Minecraft.grid[r][c+8] = "cloud";
	Minecraft.grid[r-1][c+1] = "cloud";
	Minecraft.grid[r-1][c+2] = "cloud";
	Minecraft.grid[r-1][c+3] = "cloud";
	Minecraft.grid[r-1][c+4] = "cloud";
	Minecraft.grid[r-1][c+5] = "cloud";
	Minecraft.grid[r-2][c+4] = "cloud";
	Minecraft.grid[r+1][c+5] = "cloud";
	Minecraft.grid[r+1][c+6] = "cloud";
	Minecraft.grid[r-1][c+7] = "cloud";
	Minecraft.grid[r-1][c+8] = "cloud";
}

//adding images to the board
Minecraft.populateBoard = function() {
	//going over right part of grid
	 for (var i = 12; i < Minecraft.grid.length; i++) {
	 	for (var j = 6; j < Minecraft.grid[i].length; j++)
	 		if (i != 12) {
	 			//dirt below ground
	 		Minecraft.createDirt(i,j);	 
	 	} else {
	 		//grass on top
	 		Minecraft.createGrass(i,j);
	 	}
	 }
	 //goingover left partof grid
	 for (var i = 12; i < Minecraft.grid.length; i++) {
	 	for (var j = 0; j < 3; j++)
	 		if (i != 12) {
	 		Minecraft.createDirt(i,j);	 
	 	} else {
	 		Minecraft.createGrass(i,j);
	 	}
	 }
	 //vein of stone in ground between right and left part
	 for (var i = 12; i < Minecraft.grid.length; i++) {
	 	for (var j = 3; j < 6; j++) {
	 		Minecraft.createRock(i,j);
	 	}
	 }
	 //adding hill, tree, fence, and cloud
	Minecraft.createHill(11,4);
	Minecraft.createBush(11,10);
	Minecraft.createArbol(11,16);
	Minecraft.createFence(11,19);
	Minecraft.createFence(11,18);
	Minecraft.createFence(11,14);
	Minecraft.createFence(11,13);
	Minecraft.createCloud(4,4);

//creating sky where grid element is blank and unfilled
	for(var i = 0; i < Minecraft.grid.length; i++) {
		for(var j = 0; j < Minecraft.grid[i].length; j++) {
			if(Minecraft.grid[i][j] == "") {
				Minecraft.createSky(i,j);
			}
		}
	}
//ensuring that the grid elements link to classes with the right images
	 for (var i = 0; i < Minecraft.grid.length; i++){
	 	for (var j = 0; j < Minecraft.grid[i].length; j++){
		 $(".tile").eq(20*i+j).addClass(Minecraft.grid[i][j]);
	 	}
	 }
}
//runngin function
Minecraft.populateBoard();

//reset button with bring back to default
Minecraft.resetMatrix = function() {
	//remove all classes for all tiles
	$(".tile").removeClass("dirt")
			.removeClass("rock")
			.removeClass("leaf")
			.removeClass("grass")
			.removeClass("tree")
			.removeClass("sky")
			.removeClass("cloud")
			.removeClass("fence");
	Minecraft.clear();
//set values in the grid array to blank
		for(var i = 0; i < Minecraft.grid.length; i++) {
			for(var j = 0; j < Minecraft.grid[i].length; j++) {
				Minecraft.grid[i][j] = "";
			}
		}
		//repopulate the board
	Minecraft.populateBoard();
};
//alter tile function, takes the tile's type, the click, and the coordinates and changes it to sky while placing the tile in storage
Minecraft.alterTile = function(tiletype, evt, r, c) {
	$(evt).removeClass(tiletype);
	Minecraft.grid[r][c] = "sky";
	$(evt).addClass(Minecraft.grid[r][c]);
	Minecraft.storage(tiletype, 1);
};

//when a player clicks on the board, other highlighted tiles are unhighlited
$("#board").on("click", function(event){
	//any tile borders are removed
	$(".tile").css("border", "");
	//row and column are taken from selected tile
	var target = event.target
	var r = $(target).data("r");
	var c = $(target).data("c");
	//tile's class name is taken from corresponding string in grid
	var box = Minecraft.grid[r][c];
	console.log(Minecraft.grid[r][c]);
	//class name compared with tool, if the match makes sense the tile will be alterd
	if (tool == "shovel" && box == "dirt") {
		Minecraft.alterTile("dirt", target, r, c);
	} else if (tool == "shovel" && box == "grass") {
		Minecraft.alterTile("grass", target, r, c);
	} else if (tool == "pickaxe" && box == "rock") {
		Minecraft.alterTile("rock", target, r, c);
	} else if (tool == "axe" && box == "leaf") {
		Minecraft.alterTile("leaf", target, r, c);
	} else if (tool == "axe" && box == "tree") {
		Minecraft.alterTile("tree", target, r, c);
		//placement function, tests the inventory item selected against its counter and places if counter is above zero and the tile is a sky tile
	} else if(Minecraft.inventory != "" && Minecraft.grid[r][c] == "sky" &&  Minecraft[Minecraft["inventory"] + "Counter" ] > 0){
		console.log("inventory", Minecraft[Minecraft["inventory"] + "Counter" ]);
		Minecraft.storage(Minecraft.inventory, -1);
			Minecraft.grid[r][c] = Minecraft.inventory;
			$(target).removeClass("sky");
			$(target).addClass(Minecraft.grid[r][c]);
			//if the tool cant do anything with the tile, it gets a red border
	} else {
		$(target).css("border", "1px solid red");
	}
});



