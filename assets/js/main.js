
function catpchaIsTrue() {
	var f = $('form'), e = $('.email');

	$('.defer-script').hide();
	f.trigger('submit');
	f.find('i').show();

	e.find('.container').hide();
	e.find('.alert').removeClass('hide');
};

$(document).ready(function() {
	var w = $(window), m = $('#menu nav a'), r = 45, d = $('#intro h1'), f = $('form');

	w.scroll(function() {
		var t = $(this).scrollTop(), s = (r + t);

		// console.log(t);
		d.css('transform', 'rotate(' + s + 'deg)');
		d.find('span').css('transform', 'rotate(-' + s + 'deg)');

		if (f.visible(true) && !f.hasClass('built')) {
			f.addClass('built');
			$.getScript('https://www.google.com/recaptcha/api.js', function() {
				f.find('i').hide();
				$('.defer-script').html('<div class="g-recaptcha" data-callback="catpchaIsTrue" data-sitekey="6Le4B7oSAAAAAKhTCMBObLBBi1m_MV9P3x3k8H0a"></div>');
				// grecaptcha.render('.g-recaptcha');
			});
		}
	});

	$('section[data-image-src], div[data-image-src], article[data-image-src]').each(function() {
		var t = $(this), i = new Image(), s = t.data('image-src');

		i.onload = function() {
			t.css({
				'background-image': 'url(' + s + ')'
			});
		};
		i.src = s;
	});

	m.click(function() {
		var t = $(this);

		$('#menu nav a.active').removeClass('active');
		t.addClass('active');

		return false;
	});

	$('section').each(function() {
		var t = $(this);

		t.css('min-height', w.height());
	});

	$('nav').onePageNav();

	$('form').submit(function() {
		// window.open('mailto:hello@moxi9.com?subject=subject&body=body');

		$.ajax({
			url: 'http://localhost/moxi9/moxi9.com/send',
			type: 'POST',
			data: $(this).serialize(),
			success: function(e) {
				console.log(e);
			}
		});

		return false;
	});
});