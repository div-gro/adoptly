document.addEventListener('DOMContentLoaded', function() {

    if (!sessionStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';
    }
});

document.getElementById('logoutLink').addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
});