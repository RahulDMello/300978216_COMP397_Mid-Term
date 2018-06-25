// handler for body.onload
function init() {
	var stage;  // main createjs stage
	var queue;  // createjs preload queue
	var dice1;  // bitmap for the random dice 1
	var dice2;  // bitmap for the random dice 2
	var txtDice1;  // text for the random dice 1
	var txtDice2;  // text for the random dice 2
	// list of required images with id to be loaded by the queue
	var assetData = [
		{id: "dice1", src: "/Assets/images/1.png"},
		{id: "dice2", src: "/Assets/images/2.png"},
		{id: "dice3", src: "/Assets/images/3.png"},
		{id: "dice4", src: "/Assets/images/4.png"},
		{id: "dice5", src: "/Assets/images/5.png"},
		{id: "dice6", src: "/Assets/images/6.png"},
		{id: "start", src: "/Assets/images/StartButton.png"}
	]
	
	preload();
	
	// preloads all the needed assets. on complete calls begin
	function preload() {
		queue = new createjs.LoadQueue();
		queue.on("complete", begin, this);
		queue.loadManifest(assetData);
	}
	
	// game starting handler. sets up the stage and ticker.
	function begin() {
		stage = new createjs.Stage(document.getElementById("canvas"));
		createjs.Ticker.setFPS(60);
		// create an event listener (update) to count off frames
		createjs.Ticker.on("tick", update, this);
		
		// setting up the start button and adding to the stage
		var imgStart = queue.getResult("start");
		var btnStart = new createjs.Bitmap(imgStart);
		btnStart.addEventListener("click", showNewRoll);
		btnStart.x = 320;
		btnStart.y = 430;
		stage.addChild(btnStart);
	}
	
	//update the roll
	function showNewRoll() {
		// remove previous children other then start button
		stage.removeChild(dice1);
		stage.removeChild(dice2);
		stage.removeChild(txtDice1);
		stage.removeChild(txtDice2);
		
		// choose the random dices
		var txt1 = (Math.floor(Math.random() * 6) + 1);
		var txt2 = (Math.floor(Math.random() * 6) + 1);
		var img1 = queue.getResult("dice" + txt1);
		var img2 = queue.getResult("dice" + txt2);
		
		// setup the dices
		dice1 = new createjs.Bitmap(img1);
		dice2 = new createjs.Bitmap(img2);
		dice1.x = 640 - (dice1.getBounds().width * 2) - 50;
		dice2.x = 640 - (dice1.getBounds().width) - 30;
		dice1.y = 100;
		dice2.y = 100;
		 
		// setup the text for the dices
		txtDice1 = new createjs.Text(txt1, "20px console", "#000");
		txtDice2 = new createjs.Text(txt2, "20px console", "#000");
		txtDice1.x = dice1.x + (dice1.getBounds().width * 0.5);
		txtDice2.x = dice2.x + (dice2.getBounds().width * 0.5);
		txtDice1.y = 100 + dice1.getBounds().height + 20;
		txtDice2.y = 100 + dice2.getBounds().height + 20;
		
		// add the text and dice to stage
		stage.addChild(dice1);
		stage.addChild(dice2);
		stage.addChild(txtDice1);
		stage.addChild(txtDice2);
	}
	
	// ticker handler
	function update() {
		stage.update();
	}
	
};

