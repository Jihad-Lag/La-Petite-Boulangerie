document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche l'envoi du formulaire

    // Afficher l'animation de chargement
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Simuler un délai de traitement (2 secondes)
    setTimeout(() => {
        // Cacher l'animation de chargement
        document.body.removeChild(loadingOverlay);

        // Validation des champs
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        // Simuler une connexion réussie
        alert('Connexion réussie !');
        window.location.href = 'accueil.html'; // Redirection après connexion
    }, 2000); // Délai de 2 secondes pour la simulation
});