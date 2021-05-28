class Game {
  constructor(){
    this.logoImage ="logo.png";
    this.logo = createImg(this.logoImage);
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(20,370);
    car1.addImage("car1",car1_img);
    car1.scale=0.2;
    car2 = createSprite(20,450);
    car2.addImage("car2",car2_img);
    car2.scale=0.2;
    car3 = createSprite(20,530);
    car3.addImage("car3",car3_img);
    car3.scale=0.2;
    // car4 = createSprite(700,200);
    // car4.addImage("car4",car4_img);
    cars = [car1, car2, car3];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, displayWidth/8,0,displayWidth*5, displayHeight);
     // image(logoImg, displayWidth/2,20,150,50);
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x; //edited
      var y=400; //edited
      //ct++;

      this.logo.position(width /2.5, 10);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
      index = index + 1 ;
        // if(ct===1){
        //   //position the cars a little away from each other in y direction
        //   y =y +100; //edited
        // }
        // else{
          //position the cars a little away from each other in y direction
          y =y +100; //edited
       // }
        
        //use data form the database to display the cars in x direction
        x =450 + allPlayers[plr].distance;//edited
       // console.log("x"+x);
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x-5,y-2,55,55);
          cars[index - 1].shapeColor = "red";

           camera.position.x = cars[index-1].x+500;//edited
           camera.position.y = displayHeight/2;//edited
        }
       
        
      
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
     

    }
  
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=100
      player.update();
    }

    if(player.distance > 6700){
      gameState = 2;
      player.rank +=1
      Player.updateCarsAtEnd(player.rank);
      sweetAlert({
        title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
        text: "You reached the finish line successfully",
        imageUrl:
          "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
        imageSize: "100x100",
        confirmButtonText: "Ok",
      });
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
    //gameState=0;
    //game.update(gameState);
  }
}
