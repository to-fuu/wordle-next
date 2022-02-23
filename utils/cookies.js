export function SaveAuthCookie(user) {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1800;
    now.setTime(expireTime);
    document.cookie = `wordle-user=${user};expires='+now.toUTCString()+';path=/`;
}
export function DeleteAuthCookie(token) {
    document.cookie = `wordle-user=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function GetAuthCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; wordle-user=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function SaveActionCookie() {
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1800;
    now.setTime(expireTime);
    document.cookie = `wordle-action=unlm;expires='+now.toUTCString()+';path=/`;
}
export function DeleteActionCookie(token) {
    document.cookie = `wordle-action=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function GetActionCookie() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; wordle-action=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}