/*/ gamestate 0 = playing
gamestate 1 = win
gamestate 2 = lose
gamestate 3 = starting

/*/


var gameState = 3;
var paddle, ball, brick, brickGroup, edges;
var titleScreen, titleScreenIm, titleBall, titlePaddle;
var score = 0;



function preload() {
    titleScreenImg = loadImage("titleScreenImg.PNG")
}

function setup() {
    createCanvas(800,700)

    edges = createEdgeSprites()
   
    paddle = createSprite(400,600,150,10)
    paddle.visible = false;
    ball = createSprite(300,300,10,10)
    ball.visible = false;
    
    titleScreen = createSprite(550,400,100,100)
    titleScreen.addImage(titleScreenImg)
    titleScreen.scale = 0.5
        
    titleBall = createSprite(550,450,10,10)
    titleBall.visible = false;
      
    titlePaddle = createSprite(550, 470, 50,2.5)

    brickGroup = new Group()
    
    for (var i = 60; i < 770; i = i + 60){
        brick = createSprite(i,100,50,20)
        brick.shapeColor = "red"
        brick.velocityY=0.2
        brickGroup.add(brick)
    }

    for (var i = 60; i < 770; i = i + 60){
        brick = createSprite(i,125,50,20)
        brick.shapeColor = "orange"
        brick.velocityY=0.2
        brickGroup.add(brick)
    }

    for (var i = 60; i < 770; i = i + 60){
        brick = createSprite(i,150,50,20)
        brick.shapeColor = "yellow"
        brick.velocityY=0.2
        brickGroup.add(brick)
    }

    for (var i = 60; i < 770; i = i + 60){
        brick = createSprite(i,175,50,20)
        brick.shapeColor = "green"
        brick.velocityY=0.2
        brickGroup.add(brick)
    }

    brickGroup.setVisibleEach(false);
}

function draw() {
    background("black")
    drawSprites()

    if (gameState == 3) {
        fill("white")
        textSize(50)
        text("Breakout", 100,200)
        textSize(32)
        text("SPACE to Start", 120,600)

        brickGroup.setVisibleEach(false);
        paddle.visible = false;
        


        titleScreen.visible = true;
        fill("gray")
        ellipse(titleBall.x, titleBall.y, 10)
        titlePaddle.visible = true;
        

        if (keyWentDown("SPACE")) {
            gameState = 0
            ball.velocityY=8
            ball.velocityX=Math.round(random(-5,5))
            resetBricks()
        
            ball.x = 300
            ball.y = 300
            
            score = 0
        }
    }

    if (gameState == 0) {
        paddle.visible = true;


        brickGroup.setVisibleEach(true);
        
        titleScreen.visible = false;
        titleBall.visible = false;
        titlePaddle.visible = false;

    
        ellipse(ball.x, ball.y, 20)
        paddle.x = mouseX

        ball.bounceOff(edges[0])
        ball.bounceOff(edges[1])
        ball.bounceOff(edges[2])
        ball.bounceOff(paddle)
        ball.bounceOff(brickGroup, brickHit)


        fill("white")
        textSize(20)
        text("Score: " + score, 700,50)

        if (score == 8) {
            gameState = 1;
        }

        if (ball.y > 700) {
            gameState = 2
        }
    }

   

    if (gameState == 1) {
        ball.velocityX=0
        ball.velocityY=0
        textSize(43)
        fill("green")
        text("You Win", 400,400)
        fill("white")
        brickGroup.setVelocityYEach(0)
        textSize(20)
        text("Score: " + score, 700,50)

        if (keyDown("SPACE")) {
            gameState = 3
        }
    }
    if (gameState == 2){
        ball.velocityX=0
        ball.velocityY=0
        textSize(43)
        fill("red")
        text("You Lose", 400,400)
        fill("white")
        brickGroup.setVelocityYEach(0)
        textSize(20)
        text("Score: " + score, 700,50)

        
        if (keyDown("SPACE")) {
            gameState = 3
        }
    }
}

function brickHit(ball, brick) {
    brick.remove()
    score = score + 1
    if (score < 4) {
        ball.velocityY=8
    } else if (score < 8 && score > 4) {
        ball.velocityY = 9
    } else if (score < 12 && score > 8) {
        ball.velocityY = 10
    }
}

function resetBricks() {
    brickGroup.destroyEach()
    for (var i = 60; i < 770; i = i + 60){
        brick = createSprite(i,100,50,20)
        brick.shapeColor = "red"
        brick.velocityY=0.2
        brickGroup.add(brick)
    }

    for (var i = 60; i < 770; i = i + 60){
        brick = createSprite(i,125,50,20)
        brick.shapeColor = "orange"
        brick.velocityY=0.2
        brickGroup.add(brick)
    }

    for (var i = 60; i < 770; i = i + 60){
        brick = createSprite(i,150,50,20)
        brick.shapeColor = "yellow"
        brick.velocityY=0.2
        brickGroup.add(brick)
    }

    for (var i = 60; i < 770; i = i + 60){
        brick = createSprite(i,175,50,20)
        brick.shapeColor = "green"
        brick.velocityY=0.2
        brickGroup.add(brick)
    }
}