jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend(jQuery.easing, {
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInCubic: function (x, t, b, c, d) {
		return c * (t /= d) * t * t + b;
	}
});
samResize()
function samResize() {
	var samWidth = $(window).width(),
		samHeight = $(window).height(),
		wvh = samWidth / samHeight,
		sambottom = samHeight - samWidth / 2,
		footerHeight = 0,
		siz = 1920 / 804,
		samZoom = samWidth / 1920;
	$('.slide').width(samWidth);
	$('.wrapper').css('height', samWidth / siz + 'px');
	if (sambottom < 0) {
		sambottom = 0;
	}
	if (wvh < 2) {
		$('.wrapper').addClass('samsize');
		$('.container').css('bottom', sambottom + 'px');
	} else {
		$('.wrapper').removeClass('samsize');
		$('.container').css('bottom', sambottom + 'px');
	}
	var conZoom = (samHeight - footerHeight) / 960;
	if (milo.browser.msie) {
		$('.pulse-blur').remove();
		$('.zoom').css('zoom', samZoom);
		$('.conzoom').css('zoom', conZoom);
	} else {
		$('.zoom').css('transform', 'scale(' + samZoom + ')');
		$('.conzoom').css('transform', 'scale(' + conZoom + ')');
	}
}

$('.page .lol-zoom').each(function () {
	var $this = $(this),
		w = $this.data('w') / 19.2,
		t = $this.data('t') / 9.6,
		ml = $this.data('ml') / 19.2;
	if (w > 0) {
		$this.css('width', w + '%');
	}
	$this.css({
		'margin-left': ml + "%",
		'top': t + "%"
	});
})

$(window).on('resize', samResize);

function getUrlParam(param) {
	var m = new RegExp("(?:&|/?)" + param + "=([^&$]+)").exec(window.location.search);
	return m ? m[1] : '';
};


function move(i) {
	mousem = false;
	if (i == 0) {
		$('.container').removeClass('lol-index');
		$('.past-nav').stop().animate({
			right: '-200px'
		}, {
			easing: 'easeInCubic',
			duration: 500
		});
	} else {
		$('.container').addClass('lol-index');
		$('.past-nav').stop().animate({
			right: '0'
		}, {
			easing: 'easeInCubic',
			duration: 500
		});
	}
	if (i == 19) {
		if (splayer == null) {
			txLive('q0510u9znu6');
		} else {
			if (!splayend) {
				splayer.play();
			}
		}
		$('.fix-main li').removeClass('on');
	} else {
		if (splayer != null) {
			splayer.pause();
		}
		$('.fix-main li').eq(i - 1).addClass('on').siblings().removeClass('on');
	}

	var $obj = $('#page-box');
	$obj.find('.page').eq(i).addClass('active');
	pgvSendClick({
		hottag: 'a20171123honor.page.page' + i
	})
	$obj.stop().animate({
		top: -i * 100 + '%'
	}, {
		easing: 'easeInCubic',
		duration: 500,
		complete: function () {
			mousem = true;
			$obj.find('.page').eq(i).siblings().removeClass('active');
		}
	});
}

function parallax() {
	var scene1 = $('.scene1'),
		scene2 = $('.scene2'),
		scene3 = $('.scene3'),
		scene4 = $('.scene4'),
		scene5 = $('.scene5'),
		scene6 = $('.scene6');
	scene7 = $('.scene7');
	scene1.parallax();
	scene2.parallax();
	scene3.parallax();
	scene4.parallax();
	scene5.parallax();
	scene6.parallax();
	scene7.parallax();
}

if (milo.browser.msie) {
	if (parseInt(milo.browser.version) > 8) {
		parallax();
	}
} else {
	parallax();
}