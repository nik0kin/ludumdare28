/**
 * Created by niko on 12/14/13.
 */


define([ "storys/RatG/scenes/scene1/scene", "storys/RatG/scenes/scene2/scene", "storys/RatG/scenes/scene4/scene"],function(scene1, scene2, scene4){
  var that = {};

  that.getScene = function(sceneName){
    //debugger;
    switch(sceneName){
      case "scene1":
        return scene1;
      case "scene2":
        return scene2;
      case "scene4":
        return scene4;
      default:
        throw "We don't have that scene";
    }
  };

  return that;
});