		$(document).ready(function()
		 {
			var canvas = null;
			var ctx = null;
			var canvasHeight =600;
			var canvasWidth =600;
			var frameRate = 1000/30;
			var frameCounter = 0;
			var canvasColCount = canvasWidth/30;
			var canvasRowCount = canvasHeight/30;
			var startXPos = 0;
			var startYPos = canvasWidth/2;
				 
			var frameArray= [];
			var jsonAssets =null;
			// To fetch data from array
		    var dataArray = [];
			var spirtesArray = new Array();
			var imgSpriteSheetPage = new Image();
			
			function Init () {
				//Setting Canvas 
				canvas = document.getElementById("canvas");
				ctx = canvas.getContext('2d');
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;
				
				loadSpriteSheet();
			};
			
			// Load the sprite sheet
			loadSpriteSheet = function () {
				// Loading sprite sheet
				imgSpriteSheetPage.onload = onImageLoad;
				imgSpriteSheetPage.src = "http://192.168.0.102:8080/asset.png";
			}
			// Loading the SpriteSheet Json file
			onImageLoad = function() {
				parseSpriteJsonFile()
			}
			
			//Extract the Sprites from Sprite sheet		
			function parseSpriteJsonFile () 
			{
				var req = new XMLHttpRequest();
				req.open("GET", "http://192.168.0.102:8080/assets.json", true);
				req.onload = function () {
					jsonAssets = JSON.parse(this.responseText);
					//Removing all elements
					spirtesArray = [];
					for (var key in jsonAssets.frames)
					{
						var sprite = jsonAssets.frames[key];
						var x = sprite.frame.w ;
						var y = sprite.frame.h ;
						
						var obj = {
						"name" : key,
						"x" : sprite.frame.x,
						"y" : sprite.frame.y,
						"w" : sprite.frame.w,
						"h" : sprite.frame.h,
						"cx" : sprite.sourceSize.w,
						"cy" : sprite.sourceSize.h,
						};
						spirtesArray.push(obj);
					}
					drawBackGround();
				}
				req.send();
			};
			
			//Drawing the Sprite
			drawSprite = function (indexPositionOfSprite, posX, posY)
			{
				if(spirtesArray.length > indexPositionOfSprite)
				{
				    var obj = spirtesArray[indexPositionOfSprite];
					if(obj == undefined)
					return;
					ctx.drawImage(imgSpriteSheetPage,
									obj.x,
									obj.y,
									obj.w,
									obj.h,
									posX, 
									posY,
									obj.cx,
									obj.cy
									);
				}
			}
			//Creating the Background
			function drawBackGround()
			{
				var block = null;
				var spriteIndex=0;
				for (var i=0; i< spirtesArray.length; i++)
				{
					if(spirtesArray[i].name == "bloc.png")
					{
						block = spirtesArray[i];
						break
					}
					spriteIndex++;
				}
				for(var row =0; row < canvasRowCount; row++)
				{
					for(var col=0; col < canvasColCount; col++)
					{
						ctx.drawImage(imgSpriteSheetPage,
									block.x ,
									block.y ,
									block.w,
									block.h,
									row*block.cx,
									col*block.cy,
									block.cx,
									block.cy
						);
					}
				}
			}
			
			//Clear the Canvas
			function clear() {
				ctx.fillStyle = "black";
				ctx.fillRect(0,0,canvasWidth, canvasHeight);
			}
			
			// Hold the position of animals in the Canvas.
			function initDataArray()
			{
				dataArray = [];
				for(var i=0; i <canvasRowCount; i++)
				{
					dataArray[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
				}
			}
			
			//Selecting the animal randomly
			function drawNewAnimal()
			{
				rand = Math.round(Math.random()*6);
				drawSprite(rand, 0, canvasColCount/2 );
				
			}
			 $("#left").on("click", function(e) {
          
			})
			$("#right").on("click", function(e) {
         
			})
			$("#down").on("click", function(e) {
         
			})
			// Heart of the appplication
			function AnimationArea() 
			{
				var timer = 0;
				var interval = 70;
				var levelUp = 50;
				animate = setInterval( function() {
				   clear();
				   drawBackGround();
				   drawAnimal();
				  timer++;
				 },1)
			}  // end of MainAnimation function
			
			Init();
			
		});
