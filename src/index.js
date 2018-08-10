let isShipInCell = new Array(10);
for (let i = 0; i < 10; i++) {
    isShipInCell[i] = new Array(10);
}

for (let i = 0; i < 10; i++) {

    for (let j = 0; j < 10; j++) {

        const fieldcell = document.createElement('div');
        fieldcell.classList.add('fieldcell');
        fieldcell.id = 'left-' + j + '-' + i;
        document.getElementById('left').appendChild(fieldcell);

        const rightFieldCell = document.createElement('div');
        rightFieldCell.classList.add('fieldcell');
        rightFieldCell.id = 'right-' + j + '-' + i;
        document.getElementById('right').appendChild(rightFieldCell);

        isShipInCell[j][i] = false;
    }
}

const transparentBattlefield = document.createElement('div');
transparentBattlefield.classList.add('transparent-battlefield');
document.getElementById('right').appendChild(transparentBattlefield);

const ships = document.getElementsByClassName('ship');
let shipForDrop = null;
let shipCoordsWithDrag = { x: 0, y: 0 };

for (const ship of ships) {
    ship.addEventListener('mousedown', onMouseDown);
}

transparentBattlefield.addEventListener("dragover", dragover);
transparentBattlefield.addEventListener("dragenter", dragenter);
transparentBattlefield.addEventListener("drop", drop);

document.body.onclick = document.body.onmouseover = document.body.onmouseout = handler;

function handler(event) {

    const target = event.target;

    switch(event.type) {
        case 'mouseover':
            if (target.id.includes('left') && !target.className.includes('miss') && !target.className.includes('hit') ) {
                target.style.background = 'darkgrey';
            }
            break;
        case 'click':
            switch (target.className) {
                case 'rotate-button':
                    rotateShip(target);
                    break;
                case 'fieldcell':
                    const cellInfo = event.target.id.split('-');
                    if (cellInfo[0] === 'left') {
                        if (target.style.background === 'darkgrey') {
                            target.style.background = '';
                        }
                        target.className = isShipInCell[cellInfo[1]][cellInfo[2]] ? 'fieldcell hit' : 'fieldcell miss';
                    }
                    break;
                default:
                    break;
            }
            break;
        case 'mouseout':
            target.style.background = '';
            break;
        default:
            break;
    }
}

function rotateShip(target) {
    if (target.parentElement.className.includes('hor')) {
        target.parentElement.className = target.parentElement.className.replace('hor', 'ver');
    } else {
        target.parentElement.className = target.parentElement.className.replace('ver', 'hor');
    }
}

function onMouseDown(e) {
    shipForDrop = e.target.className.includes('ship') ? e.target : e.target.parentElement;
    const shipCoords = shipForDrop.getBoundingClientRect();

    shipCoordsWithDrag.x = e.pageX - shipCoords.x;
    shipCoordsWithDrag.y = e.pageY - shipCoords.y;
}

function dragover(e) {
    e.preventDefault();
}

function dragenter(e) {
    e.preventDefault();
}

function drop(e) {
    const newCoords = calculateNewCoords(e);
    console.log(newCoords);

    if (checkCoordsToDrop(newCoords.x, newCoords.y) && checkNoShipsAround(newCoords.x, newCoords.y)) {
        this.append(shipForDrop);
        shipForDrop.style.position = 'absolute';
        shipForDrop.style.left = newCoords.x;
        shipForDrop.style.top = newCoords.y;
        shipForDrop.draggable = false;

        const button = shipForDrop.getElementsByClassName('rotate-button')[0];
        if (button) {
            shipForDrop.removeChild(button);
        }
    }

    shipForDrop = null;
}

function calculateNewCoords(e) {
    const item = document.getElementsByClassName('transparent-battlefield')[0];
    const fieldCoords = item.getBoundingClientRect();

    const newItemX = calculatePositionOnField(e.clientX - shipCoordsWithDrag.x, fieldCoords.left);
    const newItemY = calculatePositionOnField(e.clientY - shipCoordsWithDrag.y, fieldCoords.top);

    return { x: newItemX, y: newItemY };

    function calculatePositionOnField(itemCoord, fieldCoord) {
        let newCoord = itemCoord - fieldCoord;
        newCoord = newCoord % 40 > 20 ? (newCoord - newCoord % 40 + 40) : (newCoord - newCoord % 40);
        return newCoord;
    }
}

function checkCoordsToDrop(x, y) {
    if (x >= 0 & x <= 360 & y >= 0 && y <= 360) {
        if (shipForDrop.className.includes('submarine')) {
            return true;
        }
        if (shipForDrop.className.includes('ver')) {
            if (shipForDrop.className.includes('destroyer') && y <= 320) {
                return true;
            } else if (shipForDrop.className.includes('cruiser') && y <= 280) {
                return true;
            } else if (shipForDrop.className.includes('battleship') && y <= 240) {
                return true;
            }
        } else if (shipForDrop.className.includes('hor')) {
            if (shipForDrop.className.includes('destroyer') && x <= 320) {
                return true;
            } else if (shipForDrop.className.includes('cruiser') && x <= 280) {
                return true;
            } else if (shipForDrop.className.includes('battleship') && x <= 240) {
                return true;
            }
        }
    }
    return false;
}

function checkNoShipsAround(x, y) {
    const isHor = shipForDrop.className.includes('hor');
    const tableCoord = { x: x / 40, y: y / 40 };
    if (shipForDrop.className.includes('submarine')) {
        return checkNoShips(tableCoord.x - 1, tableCoord.y - 1, tableCoord.x + 1, tableCoord.y + 1);
    } else if (shipForDrop.className.includes('destroyer')) {
        if (isHor) {
            return checkNoShips(tableCoord.x - 1, tableCoord.y - 1, tableCoord.x + 2, tableCoord.y + 1);
        } else {
            return checkNoShips(tableCoord.x - 1, tableCoord.y - 1, tableCoord.x + 1, tableCoord.y + 2);
        }
    } else if (shipForDrop.className.includes('cruiser')) {
        if (isHor) {
            return checkNoShips(tableCoord.x - 1, tableCoord.y - 1, tableCoord.x + 3, tableCoord.y + 1);
        } else {
            return checkNoShips(tableCoord.x - 1, tableCoord.y - 1, tableCoord.x + 1, tableCoord.y + 3);
        }
    } else if (shipForDrop.className.includes('battleship')) {
        if (isHor) {
            return checkNoShips(tableCoord.x - 1, tableCoord.y - 1, tableCoord.x + 4, tableCoord.y + 1);
        } else {
            return checkNoShips(tableCoord.x - 1, tableCoord.y - 1, tableCoord.x + 1, tableCoord.y + 4);
        }
    }

    function checkNoShips(minX, minY, maxX, maxY) {
        let result = true;
        const newMinX = minX < 0 ? 0 : minX;
        const newMinY = minY < 0 ? 0 : minY;
        const newMaxX = maxX > 9 ? 9 : maxX;
        const newMaxY = maxY > 9 ? 9 : maxY;

        for (let i = newMinX; i <= newMaxX; i++) {
            if (isShipInCell[i][newMinY] || isShipInCell[i][newMaxY]) {
                result = false;
                break;
            }
        }

        for (let i = newMinY; i <= newMaxY; i++) {
            if (isShipInCell[newMinX][i] || isShipInCell[newMaxX][i]) {
                result = false;
                break;
            }
        }

        if (result) {
            fillTableWithCoord(minX, minY, maxX, maxY);
        }

        return result;

        function fillTableWithCoord(minX, minY, maxX, maxY) {
            for (let i = minX + 1; i < maxX; i++) {
                for (let j = minY + 1; j < maxY; j++) {
                    isShipInCell[i][j] = true;
                }
            }
        }
    }
}