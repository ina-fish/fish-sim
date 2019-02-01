

	var viewWidth = window.innerWidth;
	var viewHeight = window.innerHeight;


	// Create a pixi renderer
	var renderer = PIXI.autoDetectRenderer(viewWidth, viewHeight);
	renderer.view.className = "rendererView";
	renderer.plugins.interaction.defaultCursorStyle = 'inherit';
	// add render view to DOM
	document.body.appendChild(renderer.view);

	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0xFFFFFF);
//speed up the process, because OVERLAY and HARD_LIGHT will use copyTex instead of readPixels
stage.filters = [new PIXI.filters.VoidFilter()];
stage.filterArea = new PIXI.Rectangle(0, 0, viewWidth, viewHeight);
	// create a background texture
	
	var pondFloorTexture = PIXI.Texture.fromImage("images/bg.png");
	// create a new background sprite
	var pondFloorSprite = new PIXI.Sprite(pondFloorTexture);
	pondFloorSprite.width=viewWidth;
	pondFloorSprite.height=viewHeight;
	pondFloorSprite.interactive = true; 
	stage.addChild(pondFloorSprite);
	
	
	// create an array to store a refference to the fish in the pond
	var fishArray = [];
	 
	var totalFish = 20;
	for (var i = 0; i < totalFish; i++) 
	{

		// generate a fish id betwen 0 and 3 using the modulo operator
		var fishId = i % 4;
		fishId += 1;

		// genrate an image name based on the fish id
		var imagePath = "/images/fish.png";
		// create a new Texture that uses the image name that we just generated as its source
		var fishTexture = PIXI.Texture.fromImage(imagePath);
		// create asprite that uses our new sprite texture
		var fish =  new PIXI.Sprite(fishTexture);

		// set the anchor point so the the fish texture is centerd on the sprite
		fish.anchor.x = fish.anchor.y = 0.5;

		// set a random scale for the fish - no point them all being the same size!
		fish.scale.x = fish.scale.y = 1.6 + Math.random() * 0.2;
		
		// finally let's set the fish to be a random position..
		fish.position.x = Math.random() * viewWidth;
		fish.position.y = Math.random() * viewHeight;
		fish.blendMode = Math.random()>0.5? PIXI.BLEND_MODES.OVERLAY:PIXI.BLEND_MODES.HARD_LIGHT;
		// time to add the fish to the pond container!
		

		// create some extra properties that will control movment

		// create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
		fish.direction = Math.random() * Math.PI * 2;

		// this number will be used to modify the direction of the fish over time
		fish.turningSpeed = Math.random() - 0.8;

		// create a random speed for the fish between 0 - 2
		fish.speed = 2 + Math.random() * 2;	


		stage.addChild(fish);
		fishArray.push(fish);

	}
	// pondFloorSprite.on('click', ripple =>{
	// 	fish.position.x = 100;			
	// });
	// stage.addChild(fish);




	var fishBoundsPadding = 100;
	var fishBounds = new PIXI.Rectangle(-fishBoundsPadding,
										-fishBoundsPadding, 
										viewWidth + fishBoundsPadding * 2, 
										viewHeight + fishBoundsPadding * 2);

	
	var tick = 0;
	requestAnimationFrame(animate);

	function animate() 
	{
		// iterate through the fish and update the positiond
		// for (var i = 0; i < fishArray.length; i++) 
		// {
		// 	var fish = fishArray[i];

		// 	fish.direction += fish.turningSpeed * 0.01;
		// 	fish.position.x += Math.sin(fish.direction) * fish.speed;
		// 	fish.position.y += Math.cos(fish.direction) * fish.speed;
		// 	fish.rotation = -fish.direction - Math.PI/2;

		// 	// wrap the fish by testing there bounds..
		// 	if(fish.position.x < fishBounds.x)fish.position.x += fishBounds.width;
		// 	else if(fish.position.x > fishBounds.x + fishBounds.width)fish.position.x -= fishBounds.width
			
		// 	if(fish.position.y < fishBounds.y)fish.position.y += fishBounds.height;
		// 	else if(fish.position.y > fishBounds.y + fishBounds.height)fish.position.y -= fishBounds.height
		// }
		fishArray.forEach(item => {
			var fish = item;
			fish.interactive = true; 
			fish.interactionFrequency = 100;



		// 	var yq = 1;
		// 	var xq = 1;

			fish.direction += fish.turningSpeed * 0.01;
			fish.position.x += Math.sin(fish.direction) * fish.speed;
			fish.position.y += Math.cos(fish.direction) * fish.speed;
			fish.rotation = -fish.direction - Math.PI/2;

			// wrap the fish by testing there bounds..
			if(fish.position.x < fishBounds.x)fish.position.x += fishBounds.width;
			else if(fish.position.x > fishBounds.x + fishBounds.width)fish.position.x -= fishBounds.width
			
			if(fish.position.y < fishBounds.y)fish.position.y += fishBounds.height;
			else if(fish.position.y > fishBounds.y + fishBounds.height)fish.position.y -= fishBounds.height
		fish.mouseover = function(){
			console.log('over');
			fish.speed += 11;
			// fish.position.x += 10;
			// fish.position.y += 10;
			fish.direction += .2;
		}
		fish.mouseout = function(){
			console.log('out');
			fish.speed -= 11;
		}


		})
		
   			// fishArray[i].position.y += .5;



		// increment the ticker
		tick += 0.1;
		
		// scroll the wave sprite

		// time to render the state!
	    renderer.render(stage);
	    
	    // request another animation frame..

	    requestAnimationFrame( animate );
	}
	
