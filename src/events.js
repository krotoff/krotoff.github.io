
document.body.onmouseover = document.body.onmouseout = document.body.onclick = handler;

const ships = document.getElementsByClassName('ship');
const containers = document.getElementsByClassName('tablecell');
let shipForDrop = null;

for(const container of containers) {
    if (container.id.includes('right')) {
        container.addEventListener("dragover", dragover);
        container.addEventListener("dragenter", dragenter);
        container.addEventListener("drop", drop);
    }
}

for (const ship of ships) {
    ship.addEventListener('mousedown', onMouseDown);
}

function onMouseDown(e) {
    shipForDrop = e.target;
}

function dragover(e) {
    e.preventDefault();
}

function dragenter(e) {
    e.preventDefault();
}

function drop() {
    this.append(shipForDrop);
    shipForDrop = null;
}

function handler(event) {

    const target = event.target;

    if (target.id.includes('left')) {

        if (!(target.className.includes('hit')||target.className.includes('miss'))  && target.tagName.toLowerCase() === 'td') {

            switch(event.type) {
                case 'mouseover':
                    target.style.background = 'darkgrey';
                    break;
                case 'click':
                    target.style.background = '';
                    target.className += ' miss';
                    break;
                case 'mouseout':
                    target.style.background = '';
                    break;
                default:
                    break;
            }
        }
    } else {

    }
}