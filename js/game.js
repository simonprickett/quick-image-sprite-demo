'use strict';

const game = {
	tilePositions: [ '1', '2', '3', '4', '5', '6', '7', '8', 'blank'],
	validMoves: [
		/* 0 */ '13',
		/* 1 */ '024',
		/* 2 */ '15',
		/* 3 */ '046',
		/* 4 */ '1357',
		/* 5 */ '248',
		/* 6 */ '37',
		/* 7 */ '468',
		/* 8 */ '57'
	],
	numMoves: 0,

	initialize: function() {
		// TODO any initialization logic.
	},

	shufflePuzzle: function() {
		// Shuffle the array...
		for (let n = game.tilePositions.length - 1; n > 0; n--) {
			let m = Math.floor(Math.random() * (n + 1));
			let temp = game.tilePositions[n];

			game.tilePositions[n] = game.tilePositions[m];
			game.tilePositions[m] = temp;
		}

		// Now change the classes to match the newly shuffled positions
		for (let n = 0; n < 9; n++) {
			document.getElementById(`cell${n}`).className = `cell piece${game.tilePositions[n]}`;
		}

	},

	newGame: function() {
		// Shuffle the pieces.
		game.shufflePuzzle();

		// Reset the move counter.
		game.numMoves = 0;

		// Add click handlers to each 
		for (let n = 0; n < 9; n++) {
			document.getElementById(`cell${n}`).onclick = game.cellClicked;
		}
	},

	gameOver: function() {
		// TODO

		// Remove click handlers from each cell
	},

	cellClicked: function(event) {
		const elemClass = this.className;
			  
		// The blank piece does nothing, the others do something.
		if (elemClass.indexOf('pieceblank') == -1) {
			// This is a puzzle piece, can it be moved?  It can if it 
			// is next to the blank piece

			// Work out which cell position this is in (contained in id minus initial 'cell')
			// Need this as an integer to key into array
			const elemCellPosition = parseInt(this.id.substring(4));

			// Work out where the blank cell is, leave this as a string
			const blankCell = document.getElementsByClassName('pieceblank')[0],
				  blankCellPosition = blankCell.id.substring(4);

			if (game.validMoves[elemCellPosition].indexOf(blankCellPosition) === -1) {
				// Blank cell is not in a position that the clicked cell can move to
				// TODO add an error sound or animation!
			} else {
				// This is a valid move, so swap the clicked tile with the blank tile.
				const clickedPuzzlePiece = this.className.substring(10);

				this.className = 'cell pieceblank';
				blankCell.className = `cell piece${clickedPuzzlePiece}`;
			}
		} else {
			// The blank piece was clicked...
			// Do nothing, maybe an animation or noise in future?
		}
	}
};

window.onload = function() {
	game.initialize();
	game.newGame();
}