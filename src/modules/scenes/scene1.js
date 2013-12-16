/**
 * Created by niko on 12/14/13.
 *
 *  scene 1 definitions
 *    list of scene:
 *      - background
 *      - Scene Animations
 *        - location + animationID
 *      - objects
 *        - with actions list
 *          - ObjectAction
 *    RickAction State Animations:
 *      - list of transitions and oa animations
 *        - see Classes Doc
 *
*     http://www.json.org/
 *
 */


define(["../animations", "scenes/scripts/scene1"],function(animations, script){
  var scene1 = function (){
    var scene = {};

    scene.name = "Bedroom";

    scene.startingIdle = {
      spritesheet: animations.get("ricka1s1"),
      starting: "sleep",
      location: {x:500, y:200}
    };

    //new createjs.Sprite(spritesheet,"afk");
    scene.background = {
      path: "assets/a1s1/background.png"
    };

    //Scene Animations
    //animations that are during the haunting phase
    scene.animations = {};
    scene.animations["turnoffAlarmClock"] = {
      spritesheet: animations.get("alarmclock"),
      starting: "reaction-broken",
      location: {x:100, y:100} // ??
    };
    scene.animations["setAlarmClockEarly"] = {
      spritesheet: animations.get("alarmclock"),
      starting: "reaction-activated",
      location: {x:100, y:100} // ??
    };

    //light switch
    scene.animations["turnLightsOn"] = {
      spritesheet: animations.get("switch"),
      starting: "idleoffbroken",
      location: {x:100, y:100} // ??
    };
    scene.animations["breakLightSwitch"] = {
      spritesheet: animations.get("switch"),
      starting: "reaction-break",
      location: {x:100, y:100} // ??
    };
    //poster
    scene.animations["unfoldPoster"] = {
      spritesheet: animations.get("poster"),
      starting: "reaction-unfold",
      location: {x:100, y:100} // ??
    };
    scene.animations["markPoster"] = {
      spritesheet: animations.get("poster"),
      starting: "reaction-mark",
      location: {x:100, y:100} // ??
    };

    //Scene Objects
    scene.objects = {};

    //////////// ALARMCLOCK /////////////
    scene.objects["alarmclock"] = {
      tag: "alarmclock",
      name: "Alarm Clock",
      clickBounds: {x:900, y:310, w:60, h:60},//to click it
      idleAnimation: {
        spritesheet: animations.get("alarmclock"),
        starting: "idle",
        location: {x:720,y:200}
      },

      actionList: [
        { //action 1
          description: "break the alarm clock",
          meterStatAffected: {
            goodday: -4
          },
          postAnimation: scene.animations["turnoffAlarmClock"],  //from scene.animations, optional
          oaDef: {//action def
            type: "wait",
            wait: 1000, //ms
            timerDef: [
              {
                type: "rickdialog",
                location: {x: 200, y:200},
                offset: 100,  //timer
                script: "..maybe in my next dream I'll be a king",
                displayLength: 3000
              }
            ]
          }
        },
        { //action 2
          description: "set the alarm clock early",
          meterStatAffected: {
            goodday: -8,
            suspense: +3
          },
          postAnimation: scene.animations["setAlarmClockEarly"],  //from scene.animations, optional
          oaDef: {
            type: "animation",
            animation: {  //animation for during RickAction phase
              spritesheet: animations.get("alarmclock"),
              starting: "objectaction-interactl",
              location: {x:720,y:200}
            },
            timerDef: {
              type: "rickdialog",
              location: {x: 200, y:200},
              offset: 100,
              script: "And the award for latest work goes to: Rick",
              displayLength: 2500
            }
          }
        },
        {//action 3
          description: "do nothing",
          oaDef: {
            type: "animation",
            animation: {  //animation for during RickAction phase
              spritesheet: animations.get("alarmclock"),
              starting: "objectaction-interactl",
              location: {x:720,y:200}
            },
            timerDef: {
              type: "rickdialog",
              location: {x: 200, y:200},
              offset: 100,
              script: "*cough cough*",
              displayLength: 2000
            }
          }
        }
      ]
    };
    //////////// SWITCH /////////////
    scene.objects["switch"] = {
      tag: "switch",
      name: "Switch",
      clickBounds: {x:1210, y:290, w:40, h:60},//to click it
      idleAnimation: {
        spritesheet: animations.get("switch"),
        starting: "idleoff",
        location: {x:1010,y:201}
      },

      actionList: [
        { //action 1
          description: "Turn lights on",
          meterStatAffected: {
            goodday: -5,
            suspense: +7
          },
          postAnimation: scene.animations["turnLightsOn"],  //from scene.animations, optional
          oaDef: {//new oa def {animation, wait, skip}
            type: "wait",
            wait: 5000, //ms
            rickDialog: script.alarm
          }//TODO queue lights on animation
        },
        { //action 2
          description: "Break Switch",
          meterStatAffected: {
            goodday: -5,
            suspense: +7,
            scared: +5
          },
          postAnimation: scene.animations["breakLightSwitch"],  //from scene.animations, optional
          oaDef: {
            type: "animation",
            animation: {  //animation for during RickAction phase
              spritesheet: animations.get("switch"),
              starting: "objectaction-turnonbroken",
              location: {x:1010,y:200}
            }
          }
        },
        {//action 3
          description: "do nothing",
          oaDef: {
            type: "animation",
            animation: {  //animation for during RickAction phase
              spritesheet: animations.get("switch"),
              starting: "objectaction-turnon",
              location: {x:1010,y:200}
            }
          }
        }
      ]
    };
    //////////// POSTER /////////////
    scene.objects["poster"] = {
      tag: "poster",
      name: "Poster",
      clickBounds: {x:120, y:45, w:120, h:260},//to click it
      idleAnimation: {
        spritesheet: animations.get("poster"),
        starting: "idlefold",
        location: {x:122,y:45}
      },

      actionList: [
        { //action 1
          description: "Mark Poster",
          meterStatAffected: {
            goodday: -2,
            suspense: +3,
            scared: +2
          },
          postAnimation: scene.animations["markPoster"],  //from scene.animations, optional
          oaDef: {
            type: "wait",
            wait: 5000, //ms
            rickDialog: script.alarm
          }
        },
        { //action 2
          description: "Fold Poster",
          meterStatAffected: {
            goodday: +2,
            suspense: +2
          },
          postAnimation: scene.animations["unfoldPoster"],  //from scene.animations, optional
          oaDef: {
            type: "wait",
            wait: 5000, //ms
            rickDialog: script.alarm
          }
        },
        {//action 3
          description: "do nothing",
          oaDef: {
            type: "wait",
            wait: 1000 //ms
          }
        }
      ]
    };

    //RickAction Phase Animations
    scene.animationTimeline = [];

    ///////////TIME BLOCKS/////////////

    scene.animationTimeline.push({
      type: "intro",
      name: "getup from bed",
      facing: "left",

      introAnim: {
        spritesheet: animations.get("ricka1s1"),
        starting: "wake",
        location: {x:500, y:200}
      },
      timerDef: {
        type: "fade",
        offset: 10,
        opaque: "in",
        displayLength: 2500
      }
    });

    scene.animationTimeline.push({
      type: "transition",
      //walking somewhere
      name: "walking from to alarmclock",

      facing: "right",
      length: 220, //timelength til rick stops and goes to his idle

      rickDialog: {
        script: script.introtalk,
        time: 50 // 50ms after this animation starts
      }
    });

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      tag: "alarmclock",//link to scene.objects

      rickDialog: {
        script: script.alarm,
        time: 25 // 25ms after this animation starts
      }
    });

    scene.animationTimeline.push({
      type: "transition",
      //walking somewhere
      name: "walking from to alarmclock",

      facing: "right",
      length: 300, //timelength til rick stops and goes to his idle

      rickDialog: {
        script: script.introtalk,
        time: 50 // 50ms after this animation starts
      }
    });

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      tag: "switch",//link to scene.objects

      rickDialog: {
        script: script.alarm,
        time: 25 // 25ms after this animation starts
      }
    });

    scene.animationTimeline.push({
      type: "transition",
      //walking somewhere
      name: "walking from to the poster from the lights",

      facing: "left",
      length: 850, //timelength til rick stops and goes to his idle

      rickDialog: {
        script: script.introtalk,
        time: 50
      }
    });

    scene.animationTimeline.push({
      type: "oa", //objectaction animation
      tag: "poster",

      timerDef: {
        type: "fade",
        offset: 5000,
        opaque: "out",
        exit: true,
        displayLength: 10000
      }
    });

    return scene;
  }

  return scene1;
});