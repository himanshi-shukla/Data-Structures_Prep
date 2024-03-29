window.onload = function () {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const colors = ["blue", "green", "orange", "red", "#2266FF"];
    let isMouseDown = false;

    document.body.appendChild(canvas);

    canvas.width = 600;
    canvas.height = 750;

    // styles -------------------------
    document.body.style.background = "#000000";
    canvas.style.background = "#111111";
    canvas.style.display = "block";
    canvas.style.margin = "0 auto";
    // --------------------------------

    // center the Canvas on y axis
    canvas.style.marginTop = `${((window.innerHeight / 2) - (canvas.height / 2))}px`;

    const createChain = function (n, radius = 10) {
        const _nodes = [];

        for (let i = 0; i < n; i++) {
            _nodes.push({
                x: 100 + (i * (radius * 2)),
                y: canvas.height / 2,
                radius: radius,
                color: colors[parseInt(Math.random() * colors.length)], // get a random color
                head: null,
            });

            // assign head for each node, except the root node
            if (_nodes[i - 1]) _nodes[i - 1].head = _nodes[i];
        }

        return _nodes;
    }

    const update = function () {
        for (let i = 0; i < nodes.length - 1; i++) {
            const node = nodes[i];

            let dx = node.head.x - node.x;
            let dy = node.head.y - node.y;
            const dst = Math.sqrt(dx * dx + dy * dy);
            const sumRadii = node.radius + node.head.radius;

            if (dst > sumRadii * 1.5) {
                dx /= dst; // get Unit Vector x component (heading)
                dy /= dst; // get Unit Vector y component (heading)
                node.x += dx * (dst * 0.2); // update x position of each node
                node.y += dy * (dst * 0.2); // update y position of each node
            }
        }
    }

    const draw = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);

        nodes.forEach(node => {
            context.beginPath();
            context.fillStyle = node.color;
            context.arc(node.x, node.y, node.radius, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        })
    };

    const tick = function () {
        update(); draw();
        requestAnimationFrame(tick);
    };

    canvas.onmousedown = function () { isMouseDown = true; };

    canvas.onmouseup = function () { isMouseDown = false; };

    canvas.onmousemove = function (e) {
        if (isMouseDown) {
            const rootNode = nodes[nodes.length - 1]; // get the root node
            rootNode.x = e.offsetX;
            rootNode.y = e.offsetY;
        }
    };

    const nodes = createChain(20); // you can also pass radius as a second param

    tick();
}