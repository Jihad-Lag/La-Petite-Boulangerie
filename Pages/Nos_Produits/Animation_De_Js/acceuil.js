// Cibler toutes les images
const images = document.querySelectorAll('.image');

// Fonction pour ajouter la classe 'show' à une image avec un délai progressif
function showImageOnScroll() {
    images.forEach((image, index) => {
        const imageTop = image.getBoundingClientRect().top;
        const imageBottom = image.getBoundingClientRect().bottom;

        // Vérifier si l'image est visible dans la fenêtre du navigateur
        if (imageTop < window.innerHeight && imageBottom >= 0) {
            // Ajouter la classe 'show' et appliquer un délai
            setTimeout(() => {
                image.classList.add('show');
            }, index * 100); // Crée un délai progressif pour chaque image
        } else {
            // Retirer la classe 'show' pour cacher l'image
            image.classList.remove('show');
        }
    });
}
// Fonction pour détecter la direction du scroll
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    // Si on fait défiler vers le bas
    if (currentScrollY > lastScrollY) {
        showImageOnScroll();  // Afficher les images lors du scroll vers le bas
    } else {
        showImageOnScroll();  // Afficher également lors du scroll vers le haut
    }
    
    lastScrollY = currentScrollY;
});

 // Ajouter la classe 'show' aux cartes au chargement de la page
 window.addEventListener('load', function() {
    const cards = document.querySelectorAll('.image');
    cards.forEach((image, index) => {
        setTimeout(() => {
            image.classList.add('show');
        }, index * 300); // Délais entre l'animation des cartes
    });
});



document.addEventListener("DOMContentLoaded", function () {
    // Charger le panier depuis le localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    // Sélectionner toutes les images et les traiter
    document.querySelectorAll(".image").forEach(image => {
        let name = image.getAttribute("data-name");
        let tag = image.getAttribute("data-tag");
        let price = parseInt(image.getAttribute("data-price")); // Convertir en nombre

        // Créer un conteneur pour le texte
        let textContainer = document.createElement("div");
        textContainer.classList.add("text-container");
        textContainer.innerHTML = `
            <span class="tag">${tag}</span>
            <h3 class="product-name">${name}</h3>
            <p class="price">${price} DH / Unité</p>
        `;

        // Créer la barre de quantité
        let quantityWrapper = document.createElement("div");
        quantityWrapper.classList.add("quantity-wrapper");
        quantityWrapper.innerHTML = `
            <button class="minus">-</button>
            <input type="number" value="0" min="0" class="quantity">
            <button class="plus">+</button>
            <p class="total-price">Total: 0 DH</p>
        `;

        // Ajouter les éléments à la carte
        image.appendChild(textContainer);
        image.appendChild(quantityWrapper);

        // Sélection des éléments
        let minusBtn = quantityWrapper.querySelector(".minus");
        let plusBtn = quantityWrapper.querySelector(".plus");
        let input = quantityWrapper.querySelector(".quantity");
        let totalPrice = quantityWrapper.querySelector(".total-price");

        // Charger la quantité depuis le panier
        if (cart[name]) {
            input.value = cart[name].quantity;
            updateTotal();
        }

        // Fonction pour mettre à jour le total de la carte
        function updateTotal() {
            let quantity = parseInt(input.value);
            let itemTotal = quantity * price;
            totalPrice.textContent = `Total: ${itemTotal} DH`;
            updateCartItem(name, quantity, price); // Mettre à jour le panier
        }

        // Écouteurs d'événements pour ajuster la quantité
        minusBtn.addEventListener("click", function () {
            if (input.value > 0) {
                input.value = parseInt(input.value) - 1;
                updateTotal();
            }
        });

        plusBtn.addEventListener("click", function () {
            input.value = parseInt(input.value) + 1;
            updateTotal();
        });

        // Mettre à jour le panier à chaque changement
        input.addEventListener("change", function () {
            let quantity = parseInt(input.value);
            if (quantity < 0) input.value = 0; // Empêcher les valeurs négatives
            updateTotal();
        });
    });

    // Fonction pour mettre à jour un item dans le panier
    function updateCartItem(name, quantity, price) {
        if (quantity === 0) {
            delete cart[name];
        } else {
            cart[name] = { quantity: quantity, price: price };
        }
        updateCart();
    }

    // Fonction pour mettre à jour l'affichage du panier
    function updateCart() {
        let cartItems = document.getElementById("cart-items");
        let cartTotal = document.getElementById("cart-total");
        let cartBar = document.getElementById("cart-bar"); // Sélection du panier
        cartItems.innerHTML = "";

        let total = 0;
        let itemCount = 0; // Nouveau compteur d'articles

        for (let item in cart) {
            let itemTotal = cart[item].quantity * cart[item].price;
            total += itemTotal;
            itemCount += cart[item].quantity; // Ajoute le nombre total d'articles

            let li = document.createElement("li");
            li.innerHTML = `
                ${item} - ${cart[item].quantity} x ${cart[item].price} DH = ${itemTotal} DH
                <button class="remove-item" data-name="${item}">X</button>
            `;
            cartItems.appendChild(li);
        }
        cartTotal.textContent = `Total: ${total} DH`;

        // Afficher/Masquer le panier en fonction du nombre d'articles
        if (itemCount > 0) {
            cartBar.classList.add("show");
        } else {
            cartBar.classList.remove("show");
        }

        // Sauvegarder le panier dans le localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Ajouter des écouteurs d'événements pour les boutons "X"
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let itemName = button.getAttribute("data-name");
                removeItemFromCart(itemName); // Supprimer l'article du panier
            });
        });
    }

    // Fonction pour supprimer un article du panier
    function removeItemFromCart(name) {
        if (cart[name]) {
            delete cart[name]; // Supprimer l'article du panier

            // Mettre à jour la quantité dans l'interface utilisateur de l'article
            document.querySelectorAll(".image").forEach(image => {
                let itemName = image.getAttribute("data-name");
                if (itemName === name) {
                    let input = image.querySelector(".quantity");
                    input.value = 0; // Réinitialiser la quantité à 0
                    let totalPrice = image.querySelector(".total-price");
                    totalPrice.textContent = `Total: 0 DH`; // Réinitialiser le total
                }
            });

            updateCart(); // Mettre à jour l'affichage du panier
        }
    }

    // Gestion du bouton "Commander"
    document.getElementById("checkout").addEventListener("click", function () {
        if (Object.keys(cart).length > 0) {
            // Afficher le formulaire de commande
            document.getElementById("commander-form").style.display = "block";
        } else {
            alert("Votre panier est vide !");
        }
    });

    // Gestion du bouton "X" pour fermer le formulaire
    document.getElementById("close-form").addEventListener("click", function () {
        document.getElementById("commander-form").style.display = "none"; // Cacher le formulaire
    });

    // Gestion de la soumission du formulaire
    document.getElementById("commande-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Empêcher la soumission par défaut

        // Récupérer les valeurs du formulaire
        const nom = document.getElementById("nom").value;
        const adresse = document.getElementById("adresse").value;
        const telephone = document.getElementById("telephone").value;
        const email = document.getElementById("email").value;

        // Valider les informations (exemple simple)
        if (nom && adresse && telephone && email) {
            // Traiter la commande (exemple : afficher un message de confirmation)
            alert(`Commande confirmée !\nNom: ${nom}\nAdresse: ${adresse}\nTéléphone: ${telephone}\nEmail: ${email}`);

            // Réinitialiser le panier
            cart = {};
            updateCart(); // Utilisez updateCart à la place
            localStorage.removeItem("cart");
            document.getElementById("cart-bar").classList.remove("show");

            // Cacher le formulaire
            document.getElementById("commander-form").style.display = "none";
        } else {
            alert("Veuillez remplir tous les champs du formulaire.");
        }
    });

    // Initialiser l'affichage du panier au chargement de la page
    updateCart();
});




window.onscroll = function() {myFunction()};

var categoryNav = document.querySelector(".category-nav");
var sticky = categoryNav.offsetTop;

function myFunction() {
    if (window.pageYOffset >= sticky) {
        categoryNav.classList.add("sticky");
    } else {
        categoryNav.classList.remove("sticky");
    }
}



