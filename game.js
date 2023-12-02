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

setGravity(2400)

const player = add([
	sprite("dog"),   // sprite() component makes it render as a sprite
	pos(120, 80),     // pos() component gives it position, also enables movement
    body(),
    area(),
    scale(0.2),
 
])

const JUMP_FORCE = 800
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
    ]);

    // Ajuste a velocidade de movimento dos objetos
    wait(rand(0.5, 1.5), () => {
        spawnPObjects();
    });
}

spawnPObjects();