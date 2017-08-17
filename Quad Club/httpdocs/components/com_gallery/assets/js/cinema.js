//		-----------------------------------------------------------------		cinema		-----------------------------------------------------------------


//    starter

var start_cine = function(t) {
	disable_cine = false;
	t.addEventListener('touchstart', function() {
		if (disable_cine == false) {
			get_mouse_coords(t, this);
		}
	}, false);

	t.addEventListener('touchmove', function() {
		if (disable_cine == false) {
			check_swipe(t);
		}
	}, false);

	t.addEventListener('touchend', function() {
		if (disable_cine == false) {
			swap_now(t);
		}
	}, false);

};

//    work
var mouse_x, mouse_y,

	dist,
	threshold = 50; //required min distance traveled to be considered swipe

var old_img_pos;

var rc_dir = 0;

var randomId, sendoutId;

var slideimage_width = function() {
	return window.innerWidth / 2;
};

function get_mouse_coords(t) {

	var touchobj = event.changedTouches[0];
	dist = 0;

	mouse_x = touchobj.pageX;
	mouse_y = touchobj.pageY;

	old_img_pos = t.offsetLeft;

	rc_dir = 0;

}

function check_swipe(t) {

	if (event.touches.length > 1) {
		event.preventDefault();
		return false;
	}

	var touchobj = event.changedTouches[0];
	dist = Math.abs(touchobj.pageX - mouse_x);

	if (dist >= threshold && Math.abs(touchobj.pageY - mouse_y) <= 100) {

		event.preventDefault();

		var new_mouse_x = touchobj.pageX;
		var new_mouse_y = touchobj.pageY;

		//t.style.left = old_img_pos + (new_mouse_x - mouse_x) + 'px';
		t.style.left = old_img_pos + (new_mouse_x - mouse_x) + 'px';


		if ((new_mouse_x - mouse_x) > 100) {

			rc_dir = -1;

		}

		if ((new_mouse_x - mouse_x) < -100) {

			rc_dir = 1;

		}

		if ((new_mouse_x - mouse_x) <= 100 && (new_mouse_x - mouse_x) > -100) {

			rc_dir = 0;

		}

	}

}

function swap_now(t) {

	this.slid_end = function() {

		clearInterval(sendoutId);

		if (rc_dir != 0) {


			var nn = parseInt(t.children[1].src.slice(-7)) + rc_dir;

			if (nn > t.gal_max - 1) {
				nn = 1;
			}

			if (nn < 1) {
				nn = t.gal_max - 1;
			}

			t.children[1].src = t.children[1].src.substring(0, t.children[1].src.length - 7) + add_zeros(nn) + '.jpg';

		}

		t.style.left = 0 + 'px';

	};

	if (rc_dir != 0) {

		var pos = parseInt(t.style.left);

		sendoutId = setInterval(function() {

			pos = pos - rc_dir * 10

			t.style.left = pos - rc_dir * 10 + 'px';


			if (t.getBoundingClientRect().left > window.innerWidth + 60 || t.getBoundingClientRect().right < -60) {
				slid_end();
			}

		}, 5);


	} else {

		t.style.left = 0;

	}

}



//		-------------------------------------------------------------		end  cinema		-------------------------------------------------------------