let foodStock, foodS;
class Food {
    constructor() {
        this.milkImg = loadImage('Assets/milk.png');
        // referring to foodStock in database
        foodS = database.ref('Food');
        // reading the value of stock from database
        foodS.on("value", function (data) {
            foodStock = data.val();
        });
    }
    updateFoodStock(x) {
        if (x <= 0)
            x = 0;
        else
            x--;
        database.ref('/').update({
            Food: x
        });
    }
    addFood(y) {
        if (y != 20) {
            y++;
            database.ref('/').update({
                Food: y
            });
        }
    }
    display() {
        let x = 55,
            y = 850;
        if (foodStock && foodStock != 0) {
            for (let i = 1; i <= foodStock; i++) {
                imageMode(CENTER);
                image(this.milkImg, x, y, 50, 120);
                if (i % 10 == 0) {
                    x = 0;
                    y += 80;
                }
                x += 55;
            }
        }
    }
}