export let keyboard = {
    "up": false,
    "down": false,
    "left": false,
    "right": false,
    "number": -1,
    "p": false
};

export let mouse = {
    "leftClick": false,
    "middleClick": false,
    "rightClick": false,
    "x": 0,
    "y": 0,
    "width": 0,
    "height": 0
}

export function addEventListeners(canvas) {
    /* Connect keyboard/mouse/touch events to canvas */
    canvas.addEventListener("touchstart", touchStartHandler, false);
    canvas.addEventListener("touchend", touchEndHandler, false);
    canvas.addEventListener("touchmove", touchMoveHandler, false);
    canvas.addEventListener("mouseup", mouseUpHandler, false);
    canvas.addEventListener("mousedown", mouseDownHandler, false);
    canvas.addEventListener("mousemove", mouseMoveHandler, false);
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    }, false);
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}

const gamediv = document.getElementById("game");

function touchStartHandler(e) {
    touchMoveHandler(e);
    mouse.leftClick = true;
    e.preventDefault();
}

function touchEndHandler(e) {
    mouse.leftClick = false;
    e.preventDefault();
}

function touchMoveHandler(e) {
    // get relative (to canvas) coords of touch
    let touch = e.changedTouches[0];
    mouse.x = touch.pageX - gamediv.offsetLeft;
    mouse.y = touch.pageY - gamediv.offsetTop;
    e.preventDefault();
}

document.getScroll = function () {
    // https://stackoverflow.com/revisions/2481776/3
    if (window.scrollY != undefined) {
        return [scrollX, scrollY];
    } else {
        let sx, sy, d = document,
            r = d.documentElement,
            b = d.body;
        sx = r.scrollLeft || b.scrollLeft || 0;
        sy = r.scrollTop || b.scrollTop || 0;
        return [sx, sy];
    }
}

function mouseMoveHandler(e) {
    // Get relative (to canvas and scroll position) coords of mouse
    let scroll_position = document.getScroll();
    mouse.x = e.clientX - gamediv.offsetLeft + scroll_position[0]
    mouse.y = e.clientY - gamediv.offsetTop + scroll_position[1];
}

function mouseUpHandler(e) {
    mouse.leftClick = false;
}

function mouseDownHandler(e) {
    if (e.button == 0) {
        mouse.leftClick = true;
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        keyboard.right = true;
    } else if (e.keyCode == 37) {
        keyboard.left = true;
    } else if (e.keyCode == 38) {
        keyboard.up = true;
        e.preventDefault();
    } else if (e.keyCode == 40) {
        keyboard.down = true;
        e.preventDefault();
    } else if (e.keyCode == 80) {
        keyboard.p = true;
    } else if (e.keyCode > 47 && e.keyCode < 58) {
        keyboard.number = e.keyCode - 48;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        keyboard.right = false;
    } else if (e.keyCode == 37) {
        keyboard.left = false;
    } else if (e.keyCode == 38) {
        keyboard.up = false;
    } else if (e.keyCode == 40) {
        keyboard.down = false;
    } else if (e.keyCode == 80) {
        keyboard.p = false;
    } else if (e.keyCode > 47 && e.keyCode < 58) {
        keyboard.number = -1;
    }
    e.preventDefault()
}