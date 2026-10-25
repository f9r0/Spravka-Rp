window.API = 'https://spravka-api.onrender.com';

window.postFetch = async function(route, data, submitBtn) {
    try {
        if (submitBtn) submitBtn.disabled = true;

        const response = await fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(result.error || `HTTP error: ${response.status}`);
        }

        return result;

    } catch(error) {
        console.log('Network error: ', error);
        throw error;
    } finally {
        if (submitBtn) submitBtn.disabled = false;
    }
}

window.getFetch = async function(route) {
    try {
        const response = await fetch(route);

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(result.error || `HTTP error: ${response.status}`);
        }

        return result;

    } catch(error) {
        console.log('Network error: ', error);
        throw error;
    }
}

window.isLink = function(text) {
    try {
        const value = text.trim();
        const url = new URL(
            /^https?:\/\//i.test(value) ? value : `https://${value}`
        );

        return url.hostname.includes(".") &&
               !url.hostname.startsWith(".") &&
               !url.hostname.endsWith(".");
    } catch {
        return false;
    }
}