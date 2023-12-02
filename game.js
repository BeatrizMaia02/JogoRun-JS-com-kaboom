// Inicialize o Kaboom
kaboom({
    width:1280,
    height:720,
    background: [ 200, 255, 255, ],
    //global:true,
    //fullscreen:true,
    //scale:1,
    //debug: true,
})

loadSprite("dog", "assets/WalkingDog.gif")


scene("game", () => {
setGravity(2400)

const player = add([
	sprite("dog"),   // sprite() component makes it render as a sprite
	pos(120, 80),     // pos() component gives it position, also enables movement
    body(),
    area(),
    scale(0.2),
 
])

const JUMP_FORCE = 810
onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump(JUMP_FORCE)
    }
})



const floor= add([
    rect(width(), 48),
    outline(4),
    area(),
    pos(0, height() - 48),
    body({ isStatic: true }),
    "floor"
]);
let lastPObjectY = height() - 70;

function spawnPObjects() {
  
    add([
        rect(48, 70),  // Defina a largura e altura dos objetos
        outline(4),
        area(),
        pos(player.pos.x + width(), floor.pos.y - 70),  // Ajuste a posição x para acompanhar o jogador e a posição y para ficar acima dele
        move(LEFT, 500),
        offscreen({ destroy: true }),
        "object"
    ]);

    // Ajuste a velocidade de movimento dos objetos
    wait(rand(0.5, 1.5), () => {
        spawnPObjects();
    });
}

spawnPObjects();

player.onCollide("object", () => {
    // go to "lose" scene and pass the score
    go("lose", score)
})

let score = 0

const scoreLabel = add([
    text(score),
    pos(24, 24),
])

// increment score every frame
onUpdate(() => {
    score++
    scoreLabel.text = score

})

})


scene("lose", (score) => {

	// display score
	add([
		text(score),
		pos(width() / 2, height() / 2 + 80),
		scale(2),
	])

	// go back to game with space is pressed
	onKeyPress("space", () => go("game"))
	onClick(() => go("game"))

})

go("game")