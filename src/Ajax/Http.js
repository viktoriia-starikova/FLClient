export function get(url, callback, parameters = null, errorCallback = null) {
    NProgress.start();
    $.ajax({
        url: url,
        data: parameters,
        type: "GET",
        success: response => {
            NProgress.done();
            callback(response);
        },
        error: response => {
            NProgress.done();
            errorCallback(response);
        }
    });
};

export function post(url, callback = null, data = null, errorCallback = null) {
    NProgress.start();
    $.ajax({
        url: url,
        data: data,
        type: "POST",
        success: response => {
            NProgress.done();
            callback(response);
        },
        error: response => {
            NProgress.done();
            errorCallback(response);
        }
    });
};

export function postFiles(url, callback = null, data = null, errorCallback = null) {
    NProgress.start();
    $.ajax({
        url: url,
        data: data,
        processData: false,
        contentType: false,
        type: "POST",
        success: response => {
            NProgress.done();
            callback(response);
        },
        error: response => {
            NProgress.done();
            errorCallback(response);
        }
    });
};

export function put(url, callback, data = null) {
    NProgress.start();
    $.ajax({
        url: url,
        data: data,
        type: "PUT",
        success: response => {
            NProgress.done();
            callback(response);
        },
        error: response => {
            NProgress.done();
        }
    });
};