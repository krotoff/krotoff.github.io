class FieldCell {    constructor(config) {        this.config = {            height: 0,            width: 0,            x: 0,            y: 0,        };        if (config) {            this.config = { ...this.config, ...config };        }        this.html = document.createElement('div');        this.html.classList.add('fieldcell');        this.html.style.width = String(this.config.width + 'px');        this.html.style.height = String(this.config.height + 'px');    }}class LeftFieldCell extends FieldCell {    constructor(config) {        super(config);        this.html.id = 'left-' + this.config.x + '-' + this.config.y;    }}class RightFieldCell extends FieldCell {    constructor(config) {        super(config);        this.html.id = 'right-' + this.config.x + '-' + this.config.y;    }}class Battlefield {    constructor(config) {        this.config = {            cellHeight: 0,            cellWidth: 0,            cellCountHorizontal: 10,            cellCountVertical: 10,        };        if (config) {            this.config = { ...this.config, ...config };        }        this.html = document.createElement('div');        this.html.classList.add('field');        this.html.style.width = this.config.cellWidth * this.config.cellCountHorizontal;        this.html.style.height = this.config.cellHeight * this.config.cellCountVertical;    }}class LeftBattlefield extends Battlefield {    constructor(config) {        super(config);        for (let i = 0; i < 10; i++) {            for (let j = 0; j < 10; j++) {                const fieldCell = new LeftFieldCell({                    height: this.config.cellHeight,                    width: this.config.cellWidth,                    x: i,                    y: j,                });                this.html.appendChild(fieldCell.html);            }        }    }}class RightBattlefield extends Battlefield {    constructor(config) {        super(config);        for (let i = 0; i < 10; i++) {            for (let j = 0; j < 10; j++) {                const fieldCell = new RightFieldCell({                    height: this.config.cellHeight,                    width: this.config.cellWidth,                    x: i,                    y: j,                });                this.html.appendChild(fieldCell.html);            }        }    }}class Ship {    constructor(config) {        this.config = {            x: 0,            y: 0,            cellWidth: 0,            cellHeight: 0,            onField: false,            isHorizontal: true,        };        if (config) {            this.config = { ...this.config, ...config };        }        this.html = document.createElement('div');        this.html.classList.add('ship');        this.html.style.width = this.config.cellWidth * this.config.cellCountHorizontal;        this.html.style.height = this.config.cellHeight * this.config.cellCountVertical;    }}class Battleship extends Ship {    constructor(config) {        super(config);        this.setSize(this.config.isHorizontal, this.config.cellHeight, this.config.cellWidth);    };    setSize(isHorizontal, cellHeight, cellWidth) {        this.html.style.width = isHorizontal ? cellWidth * 4 : cellWidth;        this.html.style.height = isHorizontal ? cellHeight : cellHeight * 4;    };    setPosition() {    }    rotate() {        this.config.isHorizontal = !this.config.isHorizontal;        this.setSize(this.config.isHorizontal, this.config.cellHeight, this.config.cellWidth);    };}class Destroyer extends Ship {}class Cruiser extends Ship {}class Submarine extends Ship {}class ShipCell {    constructor(config) {        this.config = {            cellWidth: 0,            cellHeight: 0,            id: '',        };        if (config) {            this.config = { ...this.config, ...config };        }        this.html = document.createElement('div');        this.html.classList.add('shipcell');        this.html.id = this.config.id;        this.html.style.width = this.config.cellWidth * 7;        this.html.style.height = this.config.cellHeight * 7;    }}main();function main() {    const config = {        cellHeight: 40,        cellWidth: 40,        cellCountHorizontal: 10,        cellCountVertical: 10,    };    const descID = ['bscell', 'dscell', 'crcell', 'sbcell',];    const leftBattlefield = new LeftBattlefield(config);    const rightBattlefield = new RightBattlefield(config);    let shipCells = [];    for (let i = 0; i < 4; i++) {        shipCells[i] = new ShipCell({cellWidth: config.cellWidth, cellHeight: config.cellHeight, id: descID[i]});        document.getElementById('main_footer').appendChild(shipCells[i].html);    }    document.getElementById('main').appendChild(leftBattlefield.html);    document.getElementById('main').appendChild(rightBattlefield.html);}