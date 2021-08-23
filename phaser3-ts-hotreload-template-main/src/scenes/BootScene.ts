export default class BootScene extends Phaser.Scene {
	constructor() {
		super("Boot"); // Name of the scene
	}

	preload(): void {
		this.loadImages();
		this.loadSpriteSheets();
		this.loadAudio();
	}

	create(): void {
		this.scene.start("Game");
	}

	// Utility functions:
	// Load Images
	loadImages(): void {
		this.load.image("button1", "assets/images/ui/blue_button01.png");
		this.load.image("button2", "assets/images/ui/blue_button02.png");
		this.load.image("background", "assets/images/background.jpg");
		this.load.image("player", "assets/images/player.png");
		this.load.image("sword", "assets/images/sword.png");

		//circle 
		this.load.image("blue", "assets/images/blue.png");
		this.load.image("red", "assets/images/red.png");
		this.load.image("purple", "assets/images/purple.png");
		//
		this.load.image("eship", "assets/images/eship.png");

		this.load.image("levelup", "assets/images/levelup.png");

		this.load.atlas('knight', 'assets/images/knight.png', 'assets/images/knight.json');

	}

	// Load SpriteSheets
	loadSpriteSheets(): void {
		this.load.spritesheet("items", "assets/images/items.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.spritesheet("characters", "assets/images/characters.png", {
			frameWidth: 32,
			frameHeight: 32,
		});
		this.load.spritesheet('rocks', 'assets/images/rocks.png',{
			frameWidth: 120, 
			frameHeight: 100
		});
		this.load.spritesheet('exp', 'assets/images/exp.png',{
			frameWidth: 64, 
			frameHeight: 64
		});
		this.load.spritesheet('coin', 'assets/images/coin.png',{
			frameWidth: 32, 
			frameHeight: 32,
			endFrame:5
		});
		this.load.spritesheet('brawler', 'assets/images/brawler48x48.png', { 
			frameWidth: 48,
			frameHeight: 48 
		});
		this.load.spritesheet('sssword', 'assets/images/sssword.png', { 
			frameWidth: 256,
			frameHeight: 194 
		});
	}

	// Load Audio
	loadAudio(): void {
		this.load.audio("goldSound", ["assets/audio/Pickup.wav"]);
	}
}
