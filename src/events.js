
document.body.onmouseover = document.body.onmouseout = document.body.onclick = handler;

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