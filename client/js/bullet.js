Bullet = function (game,x,y,weapon,angle) {
    Phaser.Sprite.call(this, game, x, y);
    this.checkWorldBounds=true;
    this.outOfBoundsKill=true;
    this.alive = true;
    this.game.state.callbackContext.bullets.add(this);

    this.resetProperties(x,y,weapon,angle);
};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;
Bullet.prototype.resetProperties = function(x,y,weapon,angle) {
    this.loadTexture('bullet1');
    this.scale.set(0.5);
    this.anchor.setTo(0.5);
    this.damage = 10;
    this.angle = angle;
    this.reset(x,y);
    this.game.physics.arcade.enable(this);
    this.game.physics.arcade.velocityFromAngle(angle, weapon.bulletSpeed, this.body.velocity);
};

function SingleBulletGun (game) {
    this.game = game;
    this.bulletSpeed=2000;
    this.nextFire = 0;
    this.fireRate = 100;
    this.damage = 10;
    this.speed=10;
    this.distanceFromPlayer = 50;
}

SingleBulletGun.prototype = {
    fire: function(source) {
        if (this.game.time.time < this.nextFire) {
            return;
        }
        var angle = source.sprite.angle-90;
        var bulletx = (Math.cos(angle * Math.PI / 180.0) * this.distanceFromPlayer) + source.sprite.x;
        var bullety = (Math.sin(angle * Math.PI / 180.0) * this.distanceFromPlayer) + source.sprite.y;

        var bullet=new Bullet(this.game,bulletx,bullety,this,angle);
        this.nextFire = this.game.time.time + this.fireRate;
    }
};