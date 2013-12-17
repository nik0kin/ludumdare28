//ludumdare28.js
//coded by @nikpoklitar

var GAME = {};
GAME.SIZE = { x: 1280, y: 720 };

var DEBUG = {showClickArea: true};

var STARTING_SCENE = "scene2";


define(["Scene/Scene", "Scene/SceneManager", "animations", "Player", "StoryTimeline"],
    function(Scene, SceneManager, animations, Player, StoryTimeline){

  var STATES = {pregame: 0, ingame: 1, loading: 2};

  var scene = SceneManager.getScene(STARTING_SCENE);

  GAME.fps = 30;
  GAME.state;
  GAME.gameplayObject;


  GAME.controls = {
    //for moving map
    enter: false
  };

  //temporary
  GAME.currentScene;
  var preContainer;


  GAME.init = function(canvas){
    GAME.stage = new createjs.Stage(canvas);
    GAME.state = STATES.pregame;

    //load shit?


    GAME.player = Player();

    //GAME.state = STATES.pregame;
    preContainer = new createjs.Container();

    var rectangle = new createjs.Shape();
    rectangle.graphics.beginFill("black").drawRect(0,0,GAME.SIZE.x,GAME.SIZE.y);
    preContainer.addChild(rectangle);

  /*
    var spritesheet = animations.get("menuBG");
    tempPic = new createjs.Sprite(spritesheet,"afk");
    tempPic.x = 200;
    tempPic.y = 100;

    preContainer.addChild(tempPic);
  */

    GAME.stage.addChild(preContainer);
    //GAME.stage.update();
    createjs.Ticker.addEventListener("tick", GAME.stage);

    setInterval(GAME.update, 1000 / GAME.fps);

  };

  var tempPic;

  GAME.update = function(){

    switch(GAME.state){

      case STATES.pregame:
        if(true || GAME.controls.enter){
          GAME.state = STATES.ingame;
          GAME.startStory();
          preContainer.visible = false;
          console.log("end pregame state");
        }
        break;
      case STATES.ingame:



        break;
    }

    GAME.prevControls = GAME.controls;
  };

  GAME.startStory = function(){
    GAME.story = StoryTimeline({parentStage: GAME.stage});
    //GAME.currentScene = new Scene( {sceneDef: scene, parentStage: GAME.stage} );
    //GAME.currentScene.startScene();

  };
  GAME.resetGame = function(){
    console.log("reseting game");
    init();
    console.log("reset State: "+GAME.state)
  }

  GAME.click = function (loc){
    //can be delt with thru http://www.createjs.com/Docs/EaselJS/classes/DisplayObject.html#event_click
  }

  //process key presses
  GAME.keyPressed = function (evt){
    if(!evt) return;
    switch(evt.keyCode){
      case 13://enter
        GAME.controls.enter = true;
        break;
    }
  };
  //process key releases
  GAME.keyReleased = function (evt){
    if(!evt) return
    switch(evt.keyCode){
      case 13://enter
        GAME.controls.enter = false;
        break;

      case 82://r
        GAME.resetGame();
        break;
      case 77://m
//    togglemusic();
        break;
      case 27://esc
        //   gameplayobject.stopPlacing();
        break;
    }
  };





  function drawStuff(stage){
    //Create a stage by getting a reference to the canvas
    // stage = new createjs.Stage("demoCanvas");
    //Create a Shape DisplayObject.
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    stage.addChild(circle);

    var container = new createjs.Container();
    container.x = 20;
    container.y = 20;
    stage.addChild(container);

    circle = new createjs.Shape();
    circle.graphics.beginFill("black").drawCircle(2,2,10);
    container.addChild(circle);


    circle = new createjs.Shape();
    circle.graphics.beginFill("blue").drawCircle(0, 0, 25);

    circle.x = circle.y = 60;
    stage.addChild(circle);




    //Update stage will render next frame
    stage.update();
  }



  var canvas;
  var stage;
  function init() {
    canvas = document.getElementById('myCanvas');

    GAME.init(canvas);

    document.onkeydown = GAME.keyPressed;
    document.onkeyup = GAME.keyReleased;
  }

  console.log("loading resources");
  animations.loadAnimations(["rickglobal","ricka1s1","alarmclock","switch","poster"],function(){
    console.log("resources loaded");
    init();
  });
});
