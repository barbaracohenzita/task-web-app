document.addEventListener('DOMContentLoaded', function() {
    const blockList = document.querySelector('#block-list');
    const whitelist = document.querySelector('#whitelist');
    const addBlockButton = document.querySelector('#add-block-button');
    const addWhitelistButton = document.querySelector('#add-whitelist-button');
    const blockInput = document.querySelector('#block-input');
    const whitelistInput = document.querySelector('#whitelist-input');
    const startBlockButton = document.querySelector('#start-block-button');
    const stopBlockButton = document.querySelector('#stop-block-button');
    const blockTimer = document.querySelector('#block-timer');

    let blockedSites = [];
    let allowedSites = [];
    let blockInterval;
    let blockTime = 25 * 60;
    let isBlocking = false;

    addBlockButton.addEventListener('click', function() {
        const site = blockInput.value;
        if (site && !blockedSites.includes(site)) {
            blockedSites.push(site);
            renderBlockList();
            blockInput.value = '';
        }
    });

    addWhitelistButton.addEventListener('click', function() {
        const site = whitelistInput.value;
        if (site && !allowedSites.includes(site)) {
            allowedSites.push(site);
            renderWhitelist();
            whitelistInput.value = '';
        }
    });

    startBlockButton.addEventListener('click', function() {
        if (!isBlocking) {
            isBlocking = true;
            blockInterval = setInterval(() => {
                if (blockTime > 0) {
                    blockTime--;
                    updateBlockTimer();
                } else {
                    clearInterval(blockInterval);
                    isBlocking = false;
                    unblockSites();
                    showNotification('Blocking session completed!');
                }
            }, 1000);
            blockSites();
        }
    });

    stopBlockButton.addEventListener('click', function() {
        if (isBlocking) {
            clearInterval(blockInterval);
            isBlocking = false;
            unblockSites();
            updateBlockTimer();
        }
    });

    function blockSites() {
        blockedSites.forEach(site => {
            if (!allowedSites.includes(site)) {
                // Block the site
                console.log(`Blocking site: ${site}`);
            }
        });
    }

    function unblockSites() {
        blockedSites.forEach(site => {
            // Unblock the site
            console.log(`Unblocking site: ${site}`);
        });
    }

    function renderBlockList() {
        blockList.innerHTML = '';
        blockedSites.forEach(site => {
            const listItem = document.createElement('li');
            listItem.textContent = site;
            blockList.appendChild(listItem);
        });
    }

    function renderWhitelist() {
        whitelist.innerHTML = '';
        allowedSites.forEach(site => {
            const listItem = document.createElement('li');
            listItem.textContent = site;
            whitelist.appendChild(listItem);
        });
    }

    function updateBlockTimer() {
        const minutes = Math.floor(blockTime / 60);
        const seconds = blockTime % 60;
        blockTimer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    updateBlockTimer();
});
