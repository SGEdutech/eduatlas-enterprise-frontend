const stand = $('svg .stand');
const whatsappLikeCilcle = $('svg #whatsapp_like_cilcle');
const standBottom = $('svg #stand_bottom');
const bottomSupportRound = $('svg #bottom_support_round');
const sideSupportRound = $('svg #side_support_round');
const sideSupportEdge = $('svg #side_support_edge');
const bottomSupportEdge = $('svg #bottom_support_edge');
const supportNeck = $('svg #support_neck');
const book = $('svg #book');
const searchThingy = $('svg #search_thingy');
const supportBottom = $('svg .support-bottom');
const supportSide = $('svg .support-side');
const support = supportBottom.add(supportSide);
const bottomStandAndNeck = standBottom.add(supportNeck);
const whatsappLikeCilcleAndInsideContent = whatsappLikeCilcle.add(book)
	.add(searchThingy);

function initYoyoThingy() {
	idealTimeline.play();
}

introTimeline = new TimelineMax({ onComplete: initYoyoThingy })

introTimeline.from(searchThingy, 1, {
		scale: 4,
		xPercent: -100,
		yPercent: -200,
		ease: Power4.easeOut
	})
	// .from(book, 1, {
	// 	autoAlpha: 0,
	// 	ease: Power4.easeOut
	// })
	.from(whatsappLikeCilcle, 0.6, {
		autoAlpha: 0,
		rotation: 180,
		transformOrigin: 'center',
		ease: Power4.easeOut
	}, )
	.add('stand-animation')
	.from(support, 0.6, {
		xPercent: 30,
		yPercent: 30,
		autoAlpha: 0
	}, 'stand-animation')
	.from(supportNeck, 0.6, {
		autoAlpha: 0,
		rotation: 90,
		transformOrigin: 'center',
	}, 'stand-animation')
	.from(standBottom, 0.6, {
		autoAlpha: 0
	}, 'stand-animation');

const idealTimeline = new TimelineMax({ paused: true });

idealTimeline.to(whatsappLikeCilcleAndInsideContent, 1, {
	x: -0.03,
	y: -0.03,
	yoyo: true,
	repeat: -1
})
