export default class UIScene extends Phaser.Scene {
	gameScene: Phaser.Scene;
	scoreText: Phaser.GameObjects.Text;
	coinIcon: Phaser.GameObjects.Image;
	levelIcon;
	constructor() {
		super("UI"); // Name of the scene
	}

	init(): void {
		this.gameScene = this.scene.get("Game");
	}

	create(): void {
		this.setupUIElements();
		this.setupEvents();
	}

	setupUIElements(): void {
		this.scoreText = this.add.text(35, 8, "Coins: 0", {
			fontSize: "16px",
			color: "white",
		});

		this.coinIcon = this.add.image(15, 15, "items", 3);

		//Buraya level atlanınca çıkacak olan spritesheet gelecek. 
		this.levelIcon = this.physics.add.sprite(400, 100,'coin')
		this.levelIcon.visible = false;
		this.anims.create({
            key: 'levelChange',
            frames: this.anims.generateFrameNumbers('coin', { frames: [ 0, 1, 2, 3, 4 ] }),
            frameRate: 8,
            repeat: 4
        });	
	}

	setupEvents(): void {
		this.gameScene.events.on("updateScore", (score: number) => {
			this.scoreText.setText(`Coins: ${score}`);
		});
		//Level atlanınca yapılcak olan işlemler burada çalışıyor.
		this.gameScene.events.on("showLevel", () => {
			this.levelIcon.visible = true;
			this.levelIcon.play('levelChange');
			let timedEvent = this.time.delayedCall(3000, this.invisibleEvent, [], this);
		});
	}

	//Level atlandıktan 3 sn sonra levelIcon görünmez hale getirliyor.
	invisibleEvent()
	{
		this.levelIcon.visible = false;
	}



}
