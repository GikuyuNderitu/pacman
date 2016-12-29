'use strict'
const PacWorld = function(){
	this.world = [
		[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,1,1,4,4,4,4,4,4,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,1,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,4],
		[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
	];

	this.pacman = {
		x: 1,
		y: 1
	}

	this.score = 10

	this.cherry = {
		x: this.world[5].length-2,
		y: 5
	}

	//Getters and Setters
	this.getWorld=function(){
		return this.world
	}

	this.setWorld=function(row, col, val){
		this.world[row][col] = val;
	}

	this.getPPos= function(){
		return this.pacman
	}

	this.setY = function(y){
		this.pacman.y += y
	}

	this.setX = function(x){
		this.pacman.x += x;
	}

	this.getCPos = function() {
		return this.cherry
	}

	this.getScore = function(){
		return this.score;
	}

	this.setScore = function(value){
		this.score += value;
	}

	this.draw_cherry = function(){
		let c = this.cherry
		$('#cherry').css({top: (c.y*20)+"px", left: (c.x*20)+"px"})
	}

	this.draw_pacman = function(){
		let p = this.pacman
		$('#pacman').css({top: (p.y*20)+"px", left: (p.x*20)+"px"})
	}
	this.draw_world = function(){
		let world = this.world;
		let output='';
		for(let i=0; i<world.length; i++){
				output +='\n<div class="row">'
			for(let j=0; j<world[i].length; j++){
				if(world[i][j] === 4 )
					output+='<div class="wall"></div>'
				else if(world[i][j] === 1)
					output+='<div class="coin"></div>'
				else if(world[i][j] === 0)
					output+='<div class="empty"></div>'
			}
			output+='\n</div>\n'
		}

		$('#world').html(output)
	}

	this.draw_score = function(){
		$('#score').html(this.score)
	}

	this.removeFruit = function(fruit){
		switch(fruit){
			case 'cherry':
				$('#cherry').css('display', 'none')
				break
		}
	}
}
$(function(){
	const pacmanInstance = new PacWorld()
	pacmanInstance.draw_world()
	pacmanInstance.draw_pacman()
	pacmanInstance.draw_cherry()

	$(document).on("keydown",function(e){
		let p = $('#pacman')
		let pac_curpos = pacmanInstance.getPPos();
		let ch_curpos = pacmanInstance.getCPos();
		let world = pacmanInstance.getWorld();

		if(e.key === 'ArrowDown' && world[pac_curpos.y+1][pac_curpos.x]!==4){
			pacmanInstance.setY(1);
			pacmanInstance.draw_pacman();
			p.removeClass();
			p.addClass('look-down');
		}
		else if(e.key === 'ArrowUp' && world[pac_curpos.y-1][pac_curpos.x]!==4){
			pacmanInstance.setY(-1);
			pacmanInstance.draw_pacman();
			p.removeClass();
			p.addClass('look-up');
		}
		else if(e.key === 'ArrowRight' && world[pac_curpos.y][pac_curpos.x+1]!==4){
			pacmanInstance.setX(1);
			pacmanInstance.draw_pacman();
			p.removeClass();
		}
		else if(e.key === 'ArrowLeft' && world[pac_curpos.y][pac_curpos.x-1]!==4){
			pacmanInstance.setX(-1);
			pacmanInstance.draw_pacman();
			p.removeClass();
			p.addClass('look-left');
		}

		pac_curpos = pacmanInstance.getPPos();

		if(world[pac_curpos.y][pac_curpos.x] === 1){
			pacmanInstance.setScore(10);
			pacmanInstance.setWorld(pac_curpos.y, pac_curpos.x, 0)
			pacmanInstance.draw_world();
			pacmanInstance.draw_score();
			console.log(world[ch_curpos.y][ch_curpos.x]+'\n'+world[pac_curpos.y][pac_curpos.x]);
		}

		if(pac_curpos.y === ch_curpos.y && pac_curpos.x === ch_curpos.x){
			pacmanInstance.setScore(50);
			pacmanInstance.draw_score();
			pacmanInstance.removeFruit('cherry');
		}
	})
})
