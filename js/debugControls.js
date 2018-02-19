window.addEventListener('load', () => {
    let screenSize = '720';

    document.querySelector("#resizeButton").addEventListener('click', () => {
        let container = document.querySelector('#appContainer');
        let canvas = document.querySelector('#canvas');

        if (screenSize === '720') {
            container.classList.remove('mode-720p');
            container.classList.add('mode-1080p');

            canvas.width = 1920;
            canvas.height = 1080;

            screenSize = '1080';
        } else {
            container.classList.remove('mode-1080p');
            container.classList.add('mode-720p');

            canvas.width = 1280;
            canvas.height = 720;

            screenSize = '720';
        }

        window.renderer.recalculate();
    });

    document.querySelector('#hourButton').addEventListener('click', () => {
        window.renderer.clock.hour12 = !window.renderer.clock.hour12;
    })
});