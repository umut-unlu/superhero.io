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
	redGroup;
	purpleGroup;
	fire;
	collader;
	enemies;
	container;
	sword;
	sssword;
	level = 0;
	speed = 100;
	uiGrid;
	dumy = 0 ;
	swordAngle = 30;
	overlapAction;
	
	
	
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
		this.ePlayer.setScale(2);
		this.ePlayer.setCollideWorldBounds(true);		
	}

	createBackground(){
		this.background = this.add.image(0, 0, "background");
		this.background.setOrigin(0,0);
		this.background.setInteractive();
		this.background.on('pointermove', this.backgroundTouching, this);	
	}
	
	backgroundTouching(){
		/*let tx = this.background.input.localX*this.background.scaleX;
		let ty = this.background.input.localY*this.background.scaleY;
		let angle = this.physics.moveTo(this.player, tx, ty, this.speed);
		this.player.angle = this.toDegrees(angle)+180;
		let angle2 = this.physics.moveTo(this.sword, this.player.x, this.player.y, this.speed);
		this.sword.angle = this.toDegrees(angle2)+180;*/
		//let angle2 = this.physics.moveTo(this.container, tx, ty, 100);
		//this.player.angle2 = this.toDegrees(angle2)+180;

		let tx = this.background.input.localX*this.background.scaleX;
		let ty = this.background.input.localY*this.background.scaleY;
		let angle = this.physics.moveTo(this.container, tx, ty, this.speed);
		this.container.angle = this.toDegrees(angle)+180;

	}

	destroyEnemy(){
		console.log("destroEnemy")
		if(this.dumy > 0 && this.dumy < 6)
		{
			console.log("destroEnemy2222")
			this.ePlayer.destroy();
		}
	}

	update() {
		/*if(this.dumy > 0 && this.dumy < 6 && this.sword.body.touching.none)
		{
			console.log("update")
			this.destroyEnemy();
		}*/

		//console.log();
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
	
		const keys = [ 'walk', 'kick'];




		
		/*this.anims.create({
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
        });*/
		//this.container = this.add.container(tx-32,ty-32);

		this.player = this.physics.add.sprite(0, 0,'characters');
		this.player.angle += 180;
		this.player.setFrame(this.level);
		this.player.setScale(3);
		this.player.setCollideWorldBounds(true);
        //this.player.play('walk');
		//this.player.setCollideWorldBounds(true);
		

		//this.sword =  this.physics.add.image(tx, ty, 'sword');
		//this.sword.setScale(0.8);
		//this.sword.angle += 270;
		//this.container.add(this.player);

		//this.container = this.add.container(tx-32, ty-32, [this.player, this.sword]);
		//this.container.setScrollFactor(tx,ty,true);
		//this.container.setSize(128, 64);
		//this.physics.world.enableBody(this.container);
		//var physicsContainer = this.matter.add.gameObject(this.container);
		console.log("deneme");

		this.sword = this.physics.add.sprite(0, 0,'sword');
		this.sword.angle += 180;
		this.sword.setScale(2);
		this.sword.setCollideWorldBounds(true);


		this.container = this.add.container(tx,ty);
		
		
		
		this.container.add(this.player);
		this.container.add(this.sword);

		this.container.setSize(160, 160);

		this.physics.world.enableBody(this.container);

		this.container.body.setCollideWorldBounds(true);
		/*this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('sword', { frames: [ 12, 13, 14, 15, 16, 17, 12 ] }),
            frameRate: 8,
            repeat: 1,
            repeatDelay: 2000
        })*/
		this.input.on('pointerdown',  () => {
			//this.player.play('kick');
			 this.attackSword();
			 //this.player.playAfterDelay('walk', 400);
		 }, this);
		
		 
	
		this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
		this.cameras.main.startFollow(this.container, true);
		this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
		
		//Burada rastgele pozisyonlara daireler ekleniyor.
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

		this.redGroup = this.physics.add.group({
			key: 'red',
			frame: [0,1,2],
			frameQuantity: 3,
			bounceX: 0,
			bounceY: 0,	
			collideWorldBounds: true	
		});

		this.redGroup.children.iterate((child) =>{
			let xx = Math.floor(Math.random() * this.background.displayWidth);
			let yy = Math.floor(Math.random() * this.background.displayHeight);
			child.x = xx;
			child.y = yy;
			child.setCircle(15);
			child.scale = 0.02;	
		});

		this.purpleGroup = this.physics.add.group({
			key: 'purple',
			frame: [0,1,2],
			frameQuantity: 3,
			bounceX: 0,
			bounceY: 0,	
			collideWorldBounds: true	
		});

		this.purpleGroup.children.iterate((child) =>{
			let xx = Math.floor(Math.random() * this.background.displayWidth);
			let yy = Math.floor(Math.random() * this.background.displayHeight);
			child.x = xx;
			child.y = yy;
			child.setCircle(15);
			child.scale = 0.01;	
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

		this.physics.add.overlap(this.blueGroup, this.player, this.destroyBlue, null, this);
		this.physics.add.overlap(this.redGroup, this.player, this.destroyRed, null, this);
		this.physics.add.overlap(this.purpleGroup, this.player, this.destroyPurple, null, this);
		


		this.physics.add.collider(this.blueGroup, this.ePlayer, this.destroyBlue, null, this);

		//this.levelUp = this.physics.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'levelup');
		//this.levelUp.setScale(0.1);


		/*var gridConfig = {
            'scene': this,
            'cols': 5,
            'rows': 5
        }
		this.aGrid = new AlignGrid(gridConfig);
		this.aGrid.showNumbers();*/



		/*this.anims.create({
            key: 'levelChange',
            frames: this.anims.generateFrameNumbers('coin', { frames: [ 0, 1, 2, 3, 4 ] }),
            frameRate: 8,
            repeat: -1
        });
		this.container = this.physics.add.sprite(tx, ty,'coin');
		this.container.play('levelChange');*/

		
		//let player = this.player;
		/*this.input.on('pointerdown',  () => {
           //this.player.play('kick');
			this.attackSword();
			//this.player.playAfterDelay('walk', 400);
        }, this);*/

		/*if (this.player.anims.getName() === 'kick')
        {
            this.collader = this.physics.add.collider(this.player, this.ePlayer, this.destroyEnemy, null, this);
        }
		else{
			this.collader.active = false;
		}*/

		
	
	}
	/*circleCollision()
	{
		this.physics.add.collider(this.blueGroup, this.player);
		this.physics.add.overlap(
			this.player,
			this.chests,
			this.collectChest,
			null,
			this
		);
	}*/
	attackSword()
	{
		if(this.dumy<6)
		{
			this.physics.add.overlap(this.sword, this.ePlayer, this.destroyEnemy);
	 		this.sword.angle += this.swordAngle;
			this.dumy++;
			let timedEvent = this.time.delayedCall(30, this.attackSword, [], this); 
			//this.overlapAction = this.physics.add.overlap(this.player, this.ePlayer, this.destroyEnemy, null, this);
		}
		else if (this.dumy == 6)
		{
			this.swordAngle = -this.swordAngle ;
			this.dumy++;
			let timedEvent = this.time.delayedCall(30, this.attackSword, [], this);
		}		
		else if (this.dumy > 6 && this.dumy < 13) 
		{
			this.sword.angle += this.swordAngle;
			this.dumy++;
			let timedEvent = this.time.delayedCall(30, this.attackSword, [], this); 
			console.log("else girdi");
		}	
		else if (this.dumy == 13)
		{
			console.log("else girdi2222");
			this.dumy = 0;
			this.swordAngle = -this.swordAngle 
			//this.overlapAction = this.physics.add.overlap(this.player, this.ePlayer, this.destroyEnemy, null, this);
			//this.physics.world.removeCollider(this.overlapAction);
			if(this.sword.body.touching.down )
			{
				console.log("touchbody")
				this.destroyEnemy();
			}
			console.log("overlap222")
			//this.inactiveOverlap();
			return;
		}
		/*sss*/
	}


	//Overlap işlemi inactive yapılıyor.
	inactiveOverlap()
	{
		console.log("overlap");
		this.physics.world.removeCollider(this.overlapAction);
	}
	
	
	//Daireler yok ediliyor.
	destroyBlue(player, blue)
	{
		blue.destroy();
		this.score += 10;
		this.events.emit("updateScore", this.score);
		if(this.score>((this.level+1)/5)*100)
		{
			this.score = 0;
			this.events.emit("updateScore", this.score);
			this.level++;
			this.speed -= 10;
			this.player.setFrame(this.level);
			this.events.emit("showLevel");
			
		}
		this.makeBlue();
	}

	destroyRed(player, red)
	{
		red.destroy();
		this.score += 8;
		this.events.emit("updateScore", this.score);
		if(this.score> ((this.level+1)/5)*100)
		{
			this.score = 0;
			this.events.emit("updateScore", this.score);
			this.level++;
			this.speed -= 10;
			this.player.setFrame(this.level);
			this.events.emit("showLevel");
			
		}
		this.makeRed();
	}

	destroyPurple(player, purple)
	{
		purple.destroy();
		this.score += 12;
		this.events.emit("updateScore", this.score);
		if(this.score> ((this.level+1)/5)*100)
		{
			this.score = 0;
			this.events.emit("updateScore", this.score);
			this.level++;
			this.speed -= 10;
			this.player.setFrame(this.level);
			this.events.emit("showLevel");
		
		}
		this.makePurple();
	}

	//Kaybolan daireler yerine yenisi ekleniyor.
	makeBlue()
	{
		let tx = Math.random()*this.background.displayWidth;
		let ty = Math.random()*this.background.displayHeight;
		let rrr = this.physics.add.sprite(tx,ty,'blue').setCircle(15);
		rrr.scale = 0.03;
		this.blueGroup.add(rrr);
	}

	makeRed()
	{
		let tx = Math.random()*this.background.displayWidth;
		let ty = Math.random()*this.background.displayHeight;
		let rrr = this.physics.add.sprite(tx,ty,'red').setCircle(15);
		rrr.scale = 0.02;
		this.redGroup.add(rrr);
	}

	makePurple()
	{
		let tx = Math.random()*this.background.displayWidth;
		let ty = Math.random()*this.background.displayHeight;
		let rrr = this.physics.add.sprite(tx,ty,'purple').setCircle(15);
		rrr.scale = 0.01;
		this.redGroup.add(rrr);
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
