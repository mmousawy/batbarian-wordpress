(function() {
	'use strict';

	var header = document.querySelector('header');
	var pip = document.querySelector('.header__pip');
	var spotlight = document.querySelector('.header__spotlight');
	var logo = document.querySelector('.header__logo');
	var barbarian = document.querySelector('.header__barbarian');
	var decals = document.querySelector('.header__decals');
	var torches = document.querySelectorAll('.header__torch');
	var torchLights = document.querySelectorAll('.header__torch-light');
	var animationDone = false;
	var introEnd = false;
	var spotlightScaleStart = 8;
	var spotlightScaleEnd = 30;
	var spotlightScale = spotlightScaleStart;
	var centerScreenX = window.innerWidth * .5;
	var blendingAvailable = (window.getComputedStyle(document.body).mixBlendMode !== undefined);

	pip.addEventListener('animationend', function() {
		spotlight.classList.add('is-revealed');
		logo.classList.add('is-visible');
		barbarian.classList.add('is-active');

		logo.addEventListener('transitionend', function() {
			header.classList.add('shake');
		});

		setTimeout(function() {
			torches[0].classList.add('is-lit');
			torchLights[0].classList.add((blendingAvailable ? 'is-lit' : 'is-lit-ie'));
		}, 350);

		setTimeout(function() {
			torches[1].classList.add('is-lit');
			torchLights[1].classList.add((blendingAvailable ? 'is-lit' : 'is-lit-ie'));
		}, 550);

		animationDone = true;
	});

	function animationStep(timestamp) {
		var locationX;
		var locationY;

		if (!animationDone) {
			locationX = pip.offsetLeft + 'px';
			locationY = pip.offsetTop + 'px';
			spotlightScale = spotlightScaleStart + (Math.random() - Math.random()) * .3;
		} else {
			locationX = centerScreenX + 'px';
			locationY = '60%';
			spotlightScale += (spotlightScaleEnd - spotlightScale) * .1;

			if (spotlightScale > spotlightScaleEnd - 1) {
				introEnd = true;
			}
		}

		spotlight.style.backgroundImage =
			'radial-gradient(circle at ' +
			locationX + ' ' +
			locationY + ',' +
			'transparent ' + (spotlightScale * .3) + 'rem,' +
			'rgba(0, 0, 0, 0.15) ' + (spotlightScale * .6) + 'rem,' +
			'rgba(0, 0, 0, 0.85) ' + spotlightScale + 'rem)';

		if (!introEnd) {
			window.requestAnimationFrame(animationStep);
		}
	}

	window.addEventListener('resize', function() {
		centerScreenX = window.innerWidth * .5;
		animationStep();
	});

	window.requestAnimationFrame(animationStep);

	placeDecals({
		amount: Math.max(5, Math.ceil(centerScreenX * 0.01)),
		variations: 25,
		prefix: window.themeUri + '/assets/img/decal',
		suffix: '.png',
		x: function() { return Math.round(Math.random() * centerScreenX * 2 - centerScreenX) + 'px' },
		y: '20%'
	});

	function pickDecal(arr) {
		var picked = Math.floor(Math.random() * arr.length);
		var nr = arr.splice(picked, 1);
		return nr[0];
	}

	function placeDecals(args) {
		var arr = Array.apply(null, {length: args.variations}).map(Number.call, Number);

		for(var i = 0; i < args.amount; i++) {
			var decal = document.createElement('img');
			decal.src = args.prefix + pickDecal(arr) + args.suffix;
			decal.style.marginLeft = args.x();
			decal.style.bottom = args.y;
			decals.appendChild(decal);
		}
	}

	document.querySelector('.trailer-button').addEventListener('click', function() {
		document.querySelector('.trailer-video-holder').classList.add('is-open');
		document.querySelector('.trailer-video-holder iframe').contentWindow.postMessage(JSON.stringify({
			'event': 'command',
			'func': 'playVideo'
		}), "*");
	});
})();
