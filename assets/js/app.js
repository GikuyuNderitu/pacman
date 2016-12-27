'use strict'
const PacWorld = function(){
	this.world = [
		[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]
	];

	this.pacman = {
		x: 20,
		y: 20
	}
	this.printWorld= function(){

	}

	this.setY = function(y){
		this.pacman.y += y
	}

	this.setX = function(x){
		this.pacman.x += x
	}

	this.draw_pacman = function(){
		let p = this.pacman
		$('#pacman').css({top: p.y+"px", left: p.x+"px"})
	}
	this.draw_world = function(){
		let world = this.world;
		let output='';
		for(let i=0; i<world.length; i++){
			output +='\n<div class="row">'
			for(let j=0; j<world[i].length; j++){
				if(world[i][j] === 4)
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
}
$(function(){
	const pacmanInstance = new PacWorld()
	pacmanInstance.draw_world()
	pacmanInstance.draw_pacman()

	$(document).on("keydown",function(e){
		if(e.key === 'ArrowDown')
	})
})
