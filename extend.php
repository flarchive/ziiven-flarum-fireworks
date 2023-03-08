<?php

use Flarum\Extend;

$extend = [
    (new Extend\Frontend('admin'))->js(__DIR__.'/js/dist/admin.js')->css(__DIR__.'/less/admin.less'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__.'/less/forum.less'),

    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Settings())
        ->serializeToForum('fireworksOptionShowFireworks', 'ziven-fireworks.fireworksOptionShowFireworks', 'boolVal')
        ->serializeToForum('fireworksOptionOptionBrightnessMin', 'ziven-fireworks.fireworksOptionOptionBrightnessMin', 'intval')
        ->serializeToForum('fireworksOptionOptionBrightnessMax', 'ziven-fireworks.fireworksOptionOptionBrightnessMax', 'intval')
        ->serializeToForum('fireworksOptionOptionDecayMin', 'ziven-fireworks.fireworksOptionOptionDecayMin', 'intval')
        ->serializeToForum('fireworksOptionOptionDecayMax', 'ziven-fireworks.fireworksOptionOptionDecayMax', 'intval')
        ->serializeToForum('fireworksOptionOptionDelayMin', 'ziven-fireworks.fireworksOptionOptionDelayMin', 'intval')
        ->serializeToForum('fireworksOptionOptionDelayMax', 'ziven-fireworks.fireworksOptionOptionDelayMax', 'intval')
        ->serializeToForum('fireworksOptionOptionRocketsPointMin', 'ziven-fireworks.fireworksOptionOptionRocketsPointMin', 'intval')
        ->serializeToForum('fireworksOptionOptionRocketsPointMax', 'ziven-fireworks.fireworksOptionOptionRocketsPointMax', 'intval')
        ->serializeToForum('fireworksOptionOpacity', 'ziven-fireworks.fireworksOptionOpacity', 'intval')
        ->serializeToForum('fireworksOptionAcceleration', 'ziven-fireworks.fireworksOptionAcceleration', 'intval')
        ->serializeToForum('fireworksOptionFriction', 'ziven-fireworks.fireworksOptionFriction', 'intval')
        ->serializeToForum('fireworksOptionGravity', 'ziven-fireworks.fireworksOptionGravity', 'intval')
        ->serializeToForum('fireworksOptionTraceLength', 'ziven-fireworks.fireworksOptionTraceLength', 'intval')
        ->serializeToForum('fireworksOptionTraceSpeed', 'ziven-fireworks.fireworksOptionTraceSpeed', 'intval')
        ->serializeToForum('fireworksOptionExplosion', 'ziven-fireworks.fireworksOptionExplosion', 'intval')
        ->serializeToForum('fireworksOptionIntensity', 'ziven-fireworks.fireworksOptionIntensity', 'intval')
        ->serializeToForum('fireworksOptionFlickering', 'ziven-fireworks.fireworksOptionFlickering', 'intval')
        ->serializeToForum('fireworksOptionLineStyle', 'ziven-fireworks.fireworksOptionLineStyle', 'strval')
        ->serializeToForum('fireworksOptionHueMin', 'ziven-fireworks.fireworksOptionHueMin', 'intval')
        ->serializeToForum('fireworksOptionHueMax', 'ziven-fireworks.fireworksOptionHueMax', 'intval')
        ->serializeToForum('fireworksOptionOptionLineWidthExplosionMin', 'ziven-fireworks.fireworksOptionOptionLineWidthExplosionMin', 'intval')
        ->serializeToForum('fireworksOptionOptionLineWidthExplosionMax', 'ziven-fireworks.fireworksOptionOptionLineWidthExplosionMax', 'intval')
        ->serializeToForum('fireworksOptionOptionLineWidthTraceMin', 'ziven-fireworks.fireworksOptionOptionLineWidthTraceMin', 'intval')
        ->serializeToForum('fireworksOptionOptionLineWidthTraceMax', 'ziven-fireworks.fireworksOptionOptionLineWidthTraceMax', 'intval'),
];

return $extend;