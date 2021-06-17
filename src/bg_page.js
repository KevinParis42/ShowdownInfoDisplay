chrome.runtime.onMessage.addListener(
    function(url, sender, onSuccess) {
        fetch(url, {method: "GET"})
            .then(response => response.text())
            .then(responseText => onSuccess(responseText))

        return true;  // Will respond asynchronously.
    }
);
