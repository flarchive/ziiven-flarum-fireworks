import app from 'flarum/forum/app';
import { extend } from 'flarum/extend';
import HeaderPrimary from 'flarum/common/components/HeaderPrimary';
import { Fireworks } from 'fireworks-js';

app.initializers.add('ziven-fireworks', () => {
  extend(HeaderPrimary.prototype, 'oncreate', function (){
    let fireworksOptionShowFireworks = app.forum.attribute("fireworksOptionShowFireworks");

    if(fireworksOptionShowFireworks===true){
      const fireworksContainer = document.createElement("div");
      fireworksContainer.className = "fireworksContainer";
      document.body.appendChild(fireworksContainer);

      const container = document.querySelector('.fireworksContainer');

      let fireworksOptionOptionBrightnessMin = app.forum.attribute("fireworksOptionOptionBrightnessMin") || 50;
      let fireworksOptionOptionBrightnessMax = app.forum.attribute("fireworksOptionOptionBrightnessMax") || 80;
      let fireworksOptionOptionDecayMin = app.forum.attribute("fireworksOptionOptionDecayMin") || 0.0150;
      let fireworksOptionOptionDecayMax = app.forum.attribute("fireworksOptionOptionDecayMax") || 0.0300;
      let fireworksOptionOptionDelayMin = app.forum.attribute("fireworksOptionOptionDelayMin") || 30;
      let fireworksOptionOptionDelayMax = app.forum.attribute("fireworksOptionOptionDelayMax") || 60;
      let fireworksOptionOptionRocketsPointMin = app.forum.attribute("fireworksOptionOptionRocketsPointMin") || 50;
      let fireworksOptionOptionRocketsPointMax = app.forum.attribute("fireworksOptionOptionRocketsPointMax") || 50;

      let optionOpacity = app.forum.attribute("fireworksOptionOpacity") || 0.5;
      let optionAcceleration = app.forum.attribute("fireworksOptionAcceleration") || 1.05;
      let optionFriction = app.forum.attribute("fireworksOptionFriction") || 0.97;
      let optionGravity = app.forum.attribute("fireworksOptionGravity") || 1.5;
      let optionParticles = app.forum.attribute("fireworksOptionParticles") || 50;
      let optionTraceLength = app.forum.attribute("fireworksOptionTraceLength") || 3;
      let optionTraceSpeed = app.forum.attribute("fireworksOptionTraceSpeed") || 10;
      let optionExplosion = app.forum.attribute("fireworksOptionExplosion") || 5;
      let optionIntensity = app.forum.attribute("fireworksOptionIntensity") || 5;
      let optionFlickering = app.forum.attribute("fireworksOptionFlickering") || 50;
      let optionLineStyle = app.forum.attribute("fireworksOptionLineStyle") || "round";
      let optionOptionHueMin = app.forum.attribute("fireworksOptionHueMin") || 0;
      let optionOptionHueMax = app.forum.attribute("fireworksOptionHueMax") || 345;
      let optionOptionLineWidthExplotionMin = app.forum.attribute("fireworksOptionOptionLineWidthExplosionMin") || 1;
      let optionOptionLineWidthExplotionMax = app.forum.attribute("fireworksOptionOptionLineWidthExplosionMax") || 4;
      let optionOptionLineWidthTraceMin = app.forum.attribute("fireworksOptionOptionLineWidthTraceMin") || 0.1;
      let optionOptionLineWidthTraceMax = app.forum.attribute("fireworksOptionOptionLineWidthTraceMax") || 1;

      const options = {
        autoresize: true,
        opacity: optionOpacity,
        acceleration: optionAcceleration,
        friction: optionFriction,
        gravity: optionGravity,
        particles: optionParticles,
        traceLength: optionTraceLength,
        traceSpeed: optionTraceSpeed,
        explosion: optionExplosion,
        intensity: optionIntensity,
        flickering: optionFlickering,
        lineStyle: optionLineStyle,
        hue: {
          min: optionOptionHueMin,
          max: optionOptionHueMax
        },
        delay: {
          min: fireworksOptionOptionDelayMin,
          max: fireworksOptionOptionDelayMax
        },
        rocketsPoint: {
          min: fireworksOptionOptionRocketsPointMin,
          max: fireworksOptionOptionRocketsPointMax
        },
        lineWidth: {
          explosion: {
            min: optionOptionLineWidthExplotionMin,
            max: optionOptionLineWidthExplotionMax
          },
          trace: {
            min: optionOptionLineWidthTraceMin,
            max: optionOptionLineWidthTraceMax
          }
        },
        brightness: {
          min: fireworksOptionOptionBrightnessMin,
          max: fireworksOptionOptionBrightnessMax
        },
        decay: {
          min: fireworksOptionOptionDecayMin,
          max: fireworksOptionOptionDecayMax
        },
        mouse: {
          click: false,
          move: false,
          max: 1
        }
      };
      const fireworks = new Fireworks(container, options)
      fireworks.start();
    }
  });
});