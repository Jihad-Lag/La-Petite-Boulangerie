/* --- Created_By_Amine_Balla --- */

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    setTimeout(() => {

        document.body.removeChild(loadingOverlay);


        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        alert('Connexion réussie !');
        window.location.href = 'accueil.html';
    }, 2000);
});