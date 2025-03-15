document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche l'envoi du formulaire

    // Afficher l'animation de chargement
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'flex';

    // Simuler un délai de traitement (2 secondes)
    setTimeout(() => {
        // Cacher l'animation de chargement
        loadingOverlay.style.display = 'none';

        // Validation des champs
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.getElementById('gender').value;

        if (!username || !email || !password || !confirmPassword || !birthdate || !gender) {
            alert('Veuillez remplir tous les champs.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }

        // Simuler une inscription réussie
        alert('Inscription réussie !');
        window.location.href = 'connexion.html'; // Redirection après inscription
    }, 2000); // Délai de 2 secondes pour la simulation
});

// Validation en temps réel pour la confirmation du mot de passe
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

confirmPasswordInput.addEventListener('input', function () {
    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.setCustomValidity('Les mots de passe ne correspondent pas.');
    } else {
        confirmPasswordInput.setCustomValidity('');
    }
});