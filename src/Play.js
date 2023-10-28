class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    preload() {
        this.load.path = './assets/img/'
        this.load.image('grass', 'grass.jpg')
        this.load.image('cup', 'cup.jpg');
        this.load.image("ball", "ball.png")
        this.load.image("wall", "wall.png")
        this.load.image("oneway", "one_way_wall.png")
      
    }

    create() {
        // add background grass
        this.grass = this.add.image(0, 0, 'grass').setOrigin(0)
        this.cup = this.physics.add.sprite(width/2, height/10, "cup");
        this.cup.body.setCircle(this.cup.width/4);
        this.cup.body.setOffset(this.cup.width/4);
        this.cup.body.setImmovable(true);

        this.ball = this.physics.add.sprite(
            width/2,
            height- height/10,
            "ball"
        );



        // add cup
        
        this.ball.body.setCircle(this.ball.width/2);
        this.ball.body.setCollideWorldBounds(true);
        this.ball.setBounce(0.5);
        this.ball.setDamping(true).setDrag(0.5);

        this.SHOT_VELOCITY_X = 200;
        this.SHOT_VELOCITY_Y_MIN = 700;
        this.SHOT_VELOCITY_Y_MAX = 1100;
        let shotcount = 0;
        this.shotcountertext = this.add.text(width/2.5, height*2/height/1.5, "shot count: "+shotcount, {
            font: '30px Times new Roman'
        });
        let holein = 0;
        this.holecountertext = this.add.text(width/1.5, height*2/height/1.5, "hole in:"+ holein, {
            font: '30px Times new Roman'
        });

        let shotpercent = 0;
        this.shotpercenttexx = this.add.text(width/20.5, height*2/height/1.5, "shot percent: "+ shotpercent+"%", {
            font: '30px Times new Roman'
        });
        
        this.input.on("pointerdown", (pointer)=>{
            let shotDirection
            shotcount++;
            console.log(shotcount);
            if (shotcount === 0) {
                shotpercent = 0;
            } else {
               shotpercent= Math.round((holein / shotcount) * 100);
                console.log(shotpercent);
            }
        
            
            if (shotpercent == NaN){
                shotpercent = 0;
            }
           
            this.shotpercenttexx.setText("shot percent: "+ shotpercent+"%" );
            this.shotcountertext.setText("shot count: "+ shotcount );


            pointer.y <= this.ball.y ? shotDirection = 1: shotDirection=-1
            pointer.x <= this.ball.x ? shotDirection = 2: shotDirection=-2
            
            this.ball.body.setVelocityX(Phaser.Math.Between(-this.SHOT_VELOCITY_X, this.SHOT_VELOCITY_X) * shotDirection);
            this.ball.body.setVelocityY(Phaser.Math.Between(this.SHOT_VELOCITY_Y_MIN, this.SHOT_VELOCITY_Y_MAX) * shotDirection);
        });
    
    
    
    
        this.physics.add.collider(this.ball, this.cup,  (ball, cup) =>{
            holein++;
            this.holecountertext.setText("hole in: "+ holein );
            shotcount = 0;
            this.ballReset(ball);

        });
    
    
        let wallA = this.physics.add.sprite(0, height/4, "wall");
        wallA.setX(
            Phaser.Math.Between(0+wallA.width/2, width-wallA.width/2)
        );  
    
        wallA.body.setImmovable(true);
        let wallB = this.physics.add.sprite(0,height/2, "wall");
        wallB.setX(
            Phaser.Math.Between(0+wallB.width/2, width-wallB.width/2)
        );
        wallB.body.setImmovable(true);

        this.walls = this.add.group([wallA, wallB]);
        this.physics.add.collider(this.ball, this.walls);

        this.oneWay = this.physics.add.sprite(
            width/2,
            (height/4) * 3,
            "oneway"
        );

        this.oneWay.setX(
            Phaser.Math.Between(
                0+this.oneWay.width/2,
                width-this.oneWay.width/2
            )
        );

        this.oneWay.body.checkCollision.down = false;
        this.physics.add.collider(this.ball, this.oneWay)








    }
    update() {
    }


    ballReset(ball){
        this.shotcount = 0;
        ball.setVelocityX = 0;
        ball.setVelocityY = 0;
        ball.x = width/2;
        ball.y = height - height/10;
        this.shotcount = 0;
    }
}