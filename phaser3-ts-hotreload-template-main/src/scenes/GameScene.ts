import Player from "../prefabs/Player";
import Chest from "../prefabs/Chest";
import { Game, Scale } from "phaser";


export default class GameScene extends Phaser.Scene {
	score: number;

	player;
	ePlayer;
	keys: object;
	wall: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
	chests: Phaser.Physics.Arcade.Group;
	goldPickupAudio: Phaser.Sound.BaseSound;
	//
	//
	//
	background;
	tx: number;
	ty: number;
	blueGroup;
	purpleGroup;
	fire;
	collader;
	enemies;
	
	
	constructor() {
		super("Game"); // Name of the scene
	}

	init() {
		this.score = 0;
		this.scene.launch("UI");
	}

	create() {
		//
		//
		//
		this.createBackground();
		this.createEnemies();
		//
		//
		//
		this.createAudio();
		this.createWalls();
		this.createChests();
		this.createPlayer();
		this.addCollisions();
		this.createInput();
	}

	createEnemies(){
		let tx = Math.random()*this.background.displayWidth;
		let ty = Math.random()*this.background.displayHeight;
		this.ePlayer =  this.physics.add.sprite(tx, ty,'eship');
		this.ePlayer.setScale(0.5);
		this.ePlayer.setCollideWorldBounds(true);		
	}

	createBackground(){
		this.background = this.add.image(0, 0, "background");
		this.background.setOrigin(0,0);
		this.background.setInteractive();
		this.background.on('pointermove', this.backgroundTouching, this);	
	}
	
	backgroundTouching(){
		let tx = this.background.input.localX*this.background.scaleX;
		let ty = this.background.input.localY*this.background.scaleY;
		let angle = this.physics.moveTo(this.player, tx, ty, 100);
		this.player.angle = this.toDegrees(angle)+180;
		this.tx = tx;
		this.ty = ty;		
	}

	destroyEnemy(){
		this.ePlayer.destroy();
	}

	update() {
		/*let pointer = this.input.activePointer;

		if(pointer.isDown){
			this.collader = this.physics.add.collider(this.player, this.ePlayer, this.destroyEnemy, null, this);
		}
		else if (!pointer.isDown){
			//this.collader.active = false;
		}*/
		/*if (this.player.play('kick'))
        {
            this.physics.add.collider(this.player, this.ePlayer, this.destroyEnemy, null, this);
        }*/
		/*this.sword.angle = this.player.angle+315;*/
		/*this.sword.x = this.player.x;
		this.sword.y = this.player.y; 
		this.sword.rotation = this.physics.angleBetween(this.player, this.sword);*/
		/*let distX = Math.abs(this.player.x - this.tx);
		let distY = Math.abs(this.player.y - this.ty);
		if(distX<20 && distY<20)
		{
			this.player.body.setVelocity(0,0);
		}*/
	}
	

	createPlayer() {

		let tx = Math.random()*this.background.displayWidth;
		let ty = Math.random()*this.background.displayHeight;

		//this.container = this.add.container(tx,ty);

		const keys = [ 'walk', 'kick'];

		this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('brawler', { frames: [ 0, 1, 2, 3 ] }),
            frameRate: 8,
            repeat: -1
        });
		this.anims.create({
            key: 'kick',
            frames: this.anims.generateFrameNumbers('brawler', { frames: [ 10, 11, 12, 13, 10 ] }),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 2000
        });

		this.player = this.physics.add.sprite(tx, ty,'brawler');
		this.player.setScale(1);
        this.player.play('walk');

		this.player.setCollideWorldBounds(true);
		
		this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
		this.cameras.main.startFollow(this.player, true);
		this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
		
		
		this.blueGroup = this.physics.add.group({
			key: 'blue',
			frame: [0,1,2],
			frameQuantity: 3,
			bounceX: 0,
			bounceY: 0,	
			collideWorldBounds: true	
		});

		this.blueGroup.children.iterate((child) =>{
			let xx = Math.floor(Math.random() * this.background.displayWidth);
			let yy = Math.floor(Math.random() * this.background.displayHeight);
			child.x = xx;
			child.y = yy;
			child.setCircle(15);
			child.scale = 0.03;	
		});

		/*
		let purple = this.add.circle(400, 200, 80, 0x9966ff);
		this.purpleGroup = this.add.group();
		for(let i = 0; i<10; i++){
			this.purpleGroup.push = purple;
		}
		
		this.purpleGroup.children.iterate((child) =>{
			let xx = Math.floor(Math.random() * this.background.displayWidth);
			let yy = Math.floor(Math.random() * this.background.displayHeight);
			child.x = xx;
			child.y = yy;
			child.scale = 0.03;
					
		});
		*/

		/*this.purpleGroup = this.add.group();
		this.purpleGroup.enableBody = true;

		for (var i = 0; i < 1; i++)
		{
			let ball = this.purpleGroup.create(Math.floor(Math.random() * this.background.displayWidth), Math.floor(Math.random() * this.background.displayHeight), 'blue');
		}*/



		this.physics.add.collider(this.blueGroup, this.player, this.destroyRock, null, this);
		this.physics.add.collider(this.blueGroup, this.ePlayer, this.destroyRock, null, this);
		
		let player = this.player;
		this.input.on('pointerdown',  () => {
            player.play('kick');
			player.playAfterDelay('walk', 400);
        }, this);

		/*if (this.player.anims.getName() === 'kick')
        {
            this.collader = this.physics.add.collider(this.player, this.ePlayer, this.destroyEnemy, null, this);
        }
		else{
			this.collader.active = false;
		}*/
	}
	
	//Daireler yok ediliyor.
	destroyRock(player, rock)
	{
		rock.destroy();
		this.makeRocks();
	}

	//Kaybolan daireler yerine yenisi ekleniyor.
	makeRocks()
	{
		let tx = Math.random()*this.background.displayWidth;
		let ty = Math.random()*this.background.displayHeight;
		let rrr = this.physics.add.sprite(tx,ty,'blue').setCircle(15);
		rrr.scale = 0.03;

		this.blueGroup.add(rrr);
	}

	//Radyan değerini açı değerine değiştiren fonksiyon.
	toDegrees(angle){
		return angle * (180 / Math.PI);
	}

	//ggg
	getDirfromAngle(angle){
		let rads = angle * Math.PI / 180;
		let tx = Math.cos(rads);
		let ty = Math.sin(rads);
		return {
			tx,
			ty
		}
	}

	createInput() {
		this.keys = this.input.keyboard.addKeys({
			up: Phaser.Input.Keyboard.KeyCodes.W,
			down: Phaser.Input.Keyboard.KeyCodes.S,
			left: Phaser.Input.Keyboard.KeyCodes.A,
			right: Phaser.Input.Keyboard.KeyCodes.D,
		});
	}

	createWalls() {
		this.wall = this.physics.add.image(100, 100, "button1");
		this.wall.setCollideWorldBounds(true);
		this.wall.setImmovable();
	}

	addCollisions() {
		this.physics.add.collider(this.player, this.wall);
		this.physics.add.overlap(
			this.player,
			this.chests,
			this.collectChest,
			null,
			this
		);
	}

	createAudio() {
		this.goldPickupAudio = this.sound.add("goldSound");
	}

	createChests() {
		let tx = Math.random()*this.background.displayWidth;
		let ty = Math.random()*this.background.displayHeight;
		let tx2 = Math.random()*this.background.displayWidth;
		let ty2 = Math.random()*this.background.displayHeight;
		let tx3 = Math.random()*this.background.displayWidth;
		let ty3= Math.random()*this.background.displayHeight;
		this.chests = this.physics.add.group();
		let maxChests = 3;
		let chestLocations = [
			[tx, ty],
			[tx2, ty2],
			[tx3, ty3],
		];
		for (let i = 0; i < maxChests; i++) {
			this.spawnChest(chestLocations[i]);
		}
	}

	spawnChest(location) {
		let chest = this.chests.getFirstDead();
		if (chest) {
			chest.setPosition(location[0], location[1]);
			chest.makeActive();
			this.chests.add(chest);
		} else {
			this.chests.add(
				new Chest(this, location[0], location[1], "items", 0)
			);
		}
	}

	collectChest(player, chest) {
		this.score += chest.coins;
		this.goldPickupAudio.play();
		this.events.emit("updateScore", this.score);
		this.time.delayedCall(
			1000,
			() => {
				this.spawnChest([chest.x, chest.y]);
			},
			[],
			this
		);
		chest.makeInactive();
	}
}
