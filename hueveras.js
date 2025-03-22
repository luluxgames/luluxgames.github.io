let canvas_w = 800;
let canvas_h = 450;

let config = {
    width: canvas_w,
    height: canvas_h,
    scene: {
        preload: precarga,
        create: crea,
        update: actualiza
    }
};

// Creación del juego
let game = new Phaser.Game(config);

let field_center = canvas_w / 2 + canvas_w / 8;
let huevera_x = 128;

let canvas_bg, huevera_b, huevera_m, huevera_d;
let huevo_shadow;
let sprite_scale = 0.6;

// Contadores
let countdown = 20;
let countdown_text;
let countdown_interval;
let puntuacion = 0;
let puntuacion_text;
let juegoTerminado = false;

let huevos = [];
let huevos_speed = 1;
let huevo_spawn_interval;

// Música
let music = {
    background: null,
    game_over: null
};

let fx = {
    mouseclick: null,
    bad: null,
    good: null
};

// !!!!PRELOAD!!!!
function precarga() {
    this.load.image('fondo', 'recursos/fondo.png');
    this.load.image('huevera', 'recursos/huevera.png');
    this.load.image('huevo', 'recursos/huevo.png');

    this.load.audio('background_music', 'recursos/dream.mp3');
    this.load.audio('game_over_music', 'recursos/gameover.mp3');
    this.load.audio('mouseclick_fx', 'recursos/mouseclick.mp3');
    this.load.audio('good_fx', 'recursos/good.mp3');
    this.load.audio('bad_fx', 'recursos/bad.mp3');
}

// !!!!CREATE!!!!
function crea() {
    let blanco = Phaser.Display.Color.GetColor(255, 255, 255);
    let marron = Phaser.Display.Color.GetColor(192, 128, 16);
    let dorado = Phaser.Display.Color.GetColor(255, 215, 0);

    // Fondo
    canvas_bg = this.add.image(canvas_w / 2, canvas_h / 2, 'fondo');

    // Creación de hueveras
    huevera_d = this.add.image(huevera_x, canvas_h / 2 - 128, 'huevera')
        .setScale(sprite_scale)
        .setTint(dorado);
    huevera_d.huevera_type = "d";

    huevera_m = this.add.image(huevera_x, canvas_h / 2, 'huevera')
        .setScale(sprite_scale)
        .setTint(marron);
    huevera_m.huevera_type = "m";

    huevera_b = this.add.image(huevera_x, canvas_h / 2 + 128, 'huevera')
        .setScale(sprite_scale);
    huevera_b.huevera_type = "b";

    // Sombra del huevo
    huevo_shadow = this.add.image(-10000, -10000, 'huevo')
        .setTint(0x000000)
        .setAlpha(0.5)
        .setScale(1.3);

    // Contadores
	countdown_text = this.add.text(field_center, 16, `Tiempo: ${countdown}`, {
		fontSize: "28px",
		fontFamily: "Comic Sans MS", // Puedes cambiarla por la que prefieras
		fontStyle: "bold",
		color: "#ff69b4", // Rosa
		stroke: "#ffffff", // Borde blanco
		strokeThickness: 4
	});

	puntuacion_text = this.add.text(field_center, 50, `Puntuación: ${puntuacion}`, {
		fontSize: "28px",
		fontFamily: "Comic Sans MS",
		fontStyle: "bold",
		color: "#ff69b4",
		stroke: "#ffffff",
		strokeThickness: 4
	});

    // Música
    music.background = this.sound.add('background_music', { loop: true, volume: 0.5 });
    music.background.play();
    music.game_over = this.sound.add('game_over_music');

    fx.mouseclick = this.sound.add('mouseclick_fx');
    fx.good = this.sound.add('good_fx');
    fx.bad = this.sound.add('bad_fx');

    // Generación escalonada de huevos
    huevo_spawn_interval = setInterval(() => {
        if (!juegoTerminado) {
            generarHuevo(this);
        }
    }, Phaser.Math.Between(500, 1500));

    // Iniciar el temporizador correctamente
    countdown_interval = setInterval(() => {
        if (!juegoTerminado) {
            countdown--;
            countdown_text.setText(`Tiempo: ${countdown}`);

            if (countdown <= 0) {
                finDelJuego(this);
            }
        }
    }, 1000);

    // Habilitar eventos de arrastre
    this.input.on('drag', function (pointer, objeto, x, y) {
        if (!juegoTerminado) {
            objeto.x = x;
            objeto.y = y;
            huevo_shadow.setPosition(x + 8, y + 8);
        }
    });

    this.input.on('dragend', function (pointer, objeto) {
        if (!juegoTerminado) {
            objeto.setScale(1);
            huevo_shadow.setPosition(-10000, -10000);

            let enHuevera = false;

            [huevera_b, huevera_m, huevera_d].forEach(huevera => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(huevera.getBounds(), objeto.getBounds())) {
                    enHuevera = true;

                    if (huevera.huevera_type === objeto.huevo_type) {
                        countdown += 5;
                        puntuacion += objeto.puntos;
                        fx.good.play();
                    } else {
                        countdown -= 5;
                        puntuacion -= 10;
                        fx.bad.play();
                    }

                    countdown_text.setText(`Tiempo: ${countdown}`);
                    puntuacion_text.setText(`Puntuación: ${puntuacion}`);
                    objeto.destroy();
                }
            });

            if (!enHuevera) {
                countdown -= 5;
                puntuacion -= 5;
                countdown_text.setText(`Tiempo: ${countdown}`);
                puntuacion_text.setText(`Puntuación: ${puntuacion}`);
                fx.bad.play();
                objeto.destroy();
            }
        }
    });
}

// !!!!GENERAR HUEVO!!!!
function generarHuevo(scene) {
    let colores = {
        b: { color: Phaser.Display.Color.GetColor(255, 255, 255), puntos: 10 },
        m: { color: Phaser.Display.Color.GetColor(192, 128, 16), puntos: 20 },
        d: { color: Phaser.Display.Color.GetColor(255, 215, 0), puntos: 30 }
    };

    let x = Phaser.Math.Between(field_center - 224, field_center + 224);
    let y = -64;

    let huevo = scene.add.image(x, y, 'huevo').setInteractive({ draggable: true });

    let tipo = Object.keys(colores)[Phaser.Math.Between(0, 2)];
    huevo.setTint(colores[tipo].color);
    huevo.huevo_type = tipo;
    huevo.puntos = colores[tipo].puntos;
    huevo.falling = true;

    huevo.on('pointerdown', function () {
        this.falling = false;
        huevo_shadow.setPosition(this.x + 8, this.y + 8);
        fx.mouseclick.play();
        this.setScale(1.3);
    });

    huevos.push(huevo);
}

// !!!!ACTUALIZACIÓN DEL JUEGO!!!!
function actualiza() {
    if (juegoTerminado) return;

    huevos.forEach(huevo => {
        if (huevo.falling) {
            huevo.y += huevos_speed;

            if (huevo.y > canvas_h) {
                huevo.destroy();
                countdown -= 5;
                puntuacion -= 5;
                countdown_text.setText(`Tiempo: ${countdown}`);
                puntuacion_text.setText(`Puntuación: ${puntuacion}`);
                fx.bad.play();
            }
        }
    });
}

// !!!!GAME OVER!!!!
function finDelJuego(scene) {
    juegoTerminado = true;
    clearInterval(countdown_interval);
    clearInterval(huevo_spawn_interval);
    music.background.stop();
    music.game_over.play();

	scene.add.text(canvas_w / 2 - 100, canvas_h / 2, "GAME OVER!!", {
		fontSize: "48px",
		fontFamily: "Comic Sans MS",
		fontStyle: "bold",
		color: "#ff69b4",
		stroke: "#ffffff",
		strokeThickness: 6
	});
}