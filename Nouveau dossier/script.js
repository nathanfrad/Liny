//****************************** snake ***************************//

//rotation
function rotate(element, radians) {
    radians += Math.PI / 2;
    var s = 'rotate(' + radians + 'rad)';
    $(element).css('-moz-transform', s).css('-webkit-transform', s).css('-o-transform', s).css('-ms-transform', s);
}
// on declare les variables
function initSnakes(container, numSnakes) {
    var snakeWidth = 20,
        snakeHeight = 150,
        snakeRadius = Math.max(snakeWidth, snakeHeight), // rayon
        maxDistance = 5.5 * snakeRadius,
        freqImages = 60,
        damping = 45 * freqImages / 30, // amortissement 9 x 60 /30 = 18
        width = container.width(),
        height = container.height(),
        border = parseInt(container.css('border-left-width'), 0),
        left = container.offset().left + border,
        top = container.offset().top + border,
        snakes = new Array(numSnakes), // snakes est l'élément
        mouse = {
            x: width / 50,
            y: height / 50,
            mouse: true
        };

//position
    function positionSnake(snake) {
        $(snake.element).css({
            left: snake.x - snakeWidth / 2,
            top: snake.y - snakeHeight / 2
        });
        rotate(snake.element, snake.angle);
    }
    for (var i = 0; i < numSnakes; ++i) {
        var snake = snakes[i] = {
            id: i,
            x: width * 4 / 5,
            y: height * 4 / 5,
            angle: Math.PI * 2 / 10, //add  angle: Math.PI * 2

            element: $.parseHTML('<div class="snakeSegment"></div>')
        };
        $(snake.element);
        container.append(snake.element); // ajoute un snake
        positionSnake(snake);
        follow(snake, mouse);

    }

    function follow(snake, leader) {
        function update() {
            var dx = leader.x - snake.x,
                dy = leader.y - snake.y,
                dd = Math.hypot(dx, dy), // renvoie la racine carrée de la somme des carrés de ses arguments
                angle = snake.angle = Math.atan2(dy, dx), //  renvoie l'arc tangente du quotient de ses arguments.
                direction = (dd < snakeRadius ? -1 : 1);

            /* // si il y a plusieurs serpents, cela créer le décalage
            if (dd > maxDistance && !leader.mouse) {
                snake.x += Math.cos(angle) * (dd - maxDistance);
                snake.y += Math.sin(angle) * (dd - maxDistance);
                dx = leader.x - snake.x;
                dy = leader.y - snake.y;
                dd = maxDistance;
            } */
            if (dd - snakeRadius < 0.5) {
                return;
            }
            snake.x += direction * Math.cos(angle) * dd / damping;
            snake.y += direction * Math.sin(angle) * dd / damping;
            positionSnake(snake);
        }
        update();
        snake.moveInterval = window.setInterval(update, 1500 / freqImages); // vitesse de poursuite
    }
// mettre a jour la position de la souri
    function mouseUpdate(event) {
        event = event || window.event;
        mouse.x = event.pageX - left;
        mouse.y = event.pageY - top;
    }
    container.mousemove(mouseUpdate);
}

//lancement de l'anim
function launch() {
    initSnakes($('#snakeShadowDemo'), 1);
}
$(document).ready(launch);
$(window).resize(function() {
    $('.snakeSegment').remove();
    launch();
});


