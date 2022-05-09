class Boid{
    
    /*생성자에서는 위치, 속도, 가속도를 생성 이를 점으로 그림 */
    constructor(){
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(0.5,1.5));
        this.acceleration = createVector();
    }   
    /* 정렬 일정범위 안에 있는 점들의 속도의 평균을구해 같게하기 위함 */
    align(boids){
        let perception = 100;   //반지름
        let steering = createVector();
        let total = 0;
        for(let other of boids){
            let d = dist(
                this.position.x,
                this.position.y,
                other.position.x,
                other.position.y
            );
            if(other != this && d < perception){
                steering.add(other.velocity); //other 는 boids 의 각각을 의미하고 그것들의 속도의 평균을 구함
                total++;
            }
        }
        if(total > 0){
            steering.div(total);
            steering.sub(this.velocity);
        }
        return steering;
    }

    flock(boids){
        let alignment = this.align(boids);
        this.acceleration = alignment;
    }    

    
    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
    }

    show(){
        strokeWeight(8);
        stroke('white');
        point(this.position.x, this.position.y);
        
    }
}

