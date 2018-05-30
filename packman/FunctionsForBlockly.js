numOfGhost=3;
client_board = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function getWalls(){
    var allWalls=[];
    for (var row = 0; row < client_board.length; row++)
    {
        for (var col=0; col < client_board[row].length; col++)
        {
            if(client_board[row][col]==1)
            {
                cell=[row,col];
                allWalls.push(cell);
            }
        }
    }
    return allWalls;
}

function createBlockWallBTs(numOfGhost){
    var allWalls = getWalls();
    for (var i = 0; i < allWalls.length ; i++){
        var wall = allWalls[i];
        for (var g_id = 0; g_id< numOfGhost; g_id++) {
            addSquareBThreads(g_id, wall[0], wall[1]);
        }
    }
}

createBlockWallBTs(numOfGhost);

function addSquareBThreads(g_id,row, col) {

    // Detects cells
    bp.registerBThread("Create_block_wall(" +g_id+ ","+ row + "," + col + ")", function() {
        while (true) {
            bp.sync({ block:[ move_ghost(g_id,row, col) ] });
        }
    });
}

function move_ghost_i(g_id){
    bp.registerBThread("move_ghost(" +g_id + ")", function() {
        while (true) {
            bp.sync({ waitFor:[ update_ghosts_location ] });
            var moves = getAllPossibleMoves(g_id);
            var sortdMoves = sortMovesWithMD(moves);
            bp.sync({ request:[ sortdMoves ] });
        }
    });
}

function getAllPossibleMoves(g_id){
    var ghost = ghosts[g_id];
    var locations = [];
    locations.push( {x: ghost.x-1, y: ghost.y} );
    locations.push( {x: ghost.x+1, y: ghost.y} );
    locations.push( {x: ghost.x, y: ghost.y-1} );
    locations.push( {x: ghost.x, y: ghost.y+1} );

    return locations;
}

function sortMovesWithMD(locations) {

    locations.sort(function(a, b){
        var ManhattanA = Math.sqrt(Math.pow(a.x - pacman.i,2)+ Math.pow(a.y - pacman.j,2));
        var ManhattanB = Math.sqrt(Math.pow(b.x - pacman.i,2)+ Math.pow(b.y - pacman.j,2));

        if(ManhattanA < ManhattanB) return -1;
        if(ManhattanA > ManhattanB) return 1;
        return 0;
        });

    return locations;
}

