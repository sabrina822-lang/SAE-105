//Le code ne s’exécute que quand le HTML est complètement chargé
document.addEventListener("DOMContentLoaded", function () {
    "use strict"; //Mode script pour empêche certaines erreurs

    /* --- GESTION DES IMAGES DYNAMIQUES (DATA.JS) --- */

    if (typeof data !== 'undefined') { //Vérifie que le tableau data venant de data.js existe bien
        const listeImages = document.querySelector(".liste-images");
        //Sélectionne la <div class="liste-images"> dans le HTML (c'est l'nedroit où on va injecter le contenu)
        if (listeImages) {//Vérifie que la div est bien trouvée
            let htmlContent = "";//Créer une variable vide pour stocker le HTML

            data.forEach(function (element) {//Parcourir chaque élément du tableau data
                ////Générer le HTML avec les données
                htmlContent += ` 
                    <section class="bloc-image"> 
                        <h2>${element.image}</h2>
                        <img src="${element.urlImage}" class="image-cliquable" alt="Image de jeu vidéo">
                        <p>${element.descriptionImage}</p>
                        <p><strong>Source :</strong> ${element.source}</p>
                    </section>`;
            });

            listeImages.innerHTML = htmlContent;//Tout le HTML créé est enfin affiché dans le site
        }
    }

    /* --- GESTION DE LA POPUP --- */

    //Sélection des éléments HTML
    const imgs_clic = document.querySelectorAll(".image-cliquable");//Récupère toutes les images cliquables
    const fenetre_modale = document.querySelector(".popup");//Récupère la popup (la fenêtre qui s’ouvre).
    const img_popup = document.querySelector(".popup img");//Récupère l’image à l’intérieur de la popup.
    const croix_fermeture = document.querySelector(".close-fenetre");//Récupère la croix pour fermer la popup.

    if (fenetre_modale && img_popup) {//Le code s’exécute seulement si la popup et l’image existent
        imgs_clic.forEach(function (img_clic) {//On parcourt chaque image cliquable une par une.
            img_clic.addEventListener("click", function () {//On écoute le clic sur une image.
                img_popup.setAttribute("src", img_clic.getAttribute("src"));//L’image cliquée est copiée dans la popup.
                fenetre_modale.classList.remove("popup-invisible");
                fenetre_modale.classList.add("popup-visible");
                //On affiche la popup (via le CSS).
            });
        });

        // Fermeture via la croix
        if (croix_fermeture) {
            croix_fermeture.addEventListener("click", function () {//Quand on clique sur la croix…
                fenetre_modale.classList.remove("popup-visible");
                fenetre_modale.classList.add("popup-invisible");
                //La popup disparaît.
            });
        }

        fenetre_modale.addEventListener("click", function (event) {//On écoute les clics sur la zone sombre de la popup.
            if (event.target === fenetre_modale) {//Si on clique en dehors de l’image (sur le fond).
                fenetre_modale.classList.remove("popup-visible");
                fenetre_modale.classList.add("popup-invisible");
                //La popup se ferme.
            }
        });
    }

    /* --- GESTION DU FORMULAIRE --- */

    const formulaire = document.querySelector("#formulaire-jeu");//Récupère le formulaire avec l'id "formulaire-jeu"
    const champNom = document.querySelector("#nom");// Récupère le champ "nom"
    const champEmail = document.querySelector("#email");// Récupère le champ "email"
    const champDescription = document.querySelector("#commentaire");// Récupère le champ "commentaire" (description)
    const champImage = document.querySelector("#image");// Récupère le champ "image"
    const champPlateforme = document.querySelector("#plateforme");// Récupère le champ "plateforme"
    const affichage = document.querySelector("#affichage");// Récupère la zone d'affichage de l'aperçu

    //Affichage en temps réel
    function miseAJourAffichage() {
        if (!affichage) return;// Si l'élément "affichage" n'existe pas, on arrête la fonction
        
    // On remplit dynamiquement le HTML de la zone d'aperçu
        affichage.innerHTML = `
            <h3>Aperçu de la proposition</h3>
            <p><strong>Nom :</strong> ${champNom ? champNom.value : ''}</p>
            <p><strong>Email :</strong> ${champEmail ? champEmail.value : ''}</p>
            <p><strong>Description :</strong> ${champDescription ? champDescription.value : ''}</p>
        `;
    }

    // Quand on tape dans le champ nom → mise à jour de l'aperçu
    if (champNom) champNom.addEventListener("input", miseAJourAffichage);
    if (champEmail) champEmail.addEventListener("input", miseAJourAffichage);
    if (champDescription) champDescription.addEventListener("input", miseAJourAffichage);

    //Envoi du formulaire
    if (formulaire) {
        formulaire.addEventListener("submit", function (event) {
            event.preventDefault(); // Empêche le rechargement de la page
                
            // Récupère le genre sélectionné (radio coché)
            const genreSelectionne = document.querySelector('input[name="genre"]:checked');
            const genre = genreSelectionne ? genreSelectionne.value : "Non précisé";
              // Si un genre est sélectionné on prend sa valeur, sinon on met "Non précisé"

            // Création d'un objet contenant toutes les données du formulaire
            const donnees = {
                // Nom (ou chaîne vide si le champ n'existe pas)
                nom: champNom ? champNom.value : '',
                email: champEmail ? champEmail.value : '',
                genre: genre,
                plateforme: champPlateforme ? champPlateforme.value : '',
                image: champImage ? champImage.value : '',
                description: champDescription ? champDescription.value : ''
            };
            
            console.log("Données envoyées :", donnees); // Affiche les données dans la console (pour debug)
            alert("Proposition envoyée avec succès !"); // Message de confirmation pour l'utilisateur
        });
    }

    /* --- GESTION DU CAROUSEL (BOUTONS) --- */
    const carousel = document.querySelector(".carousel");//Récupère le carrousel
    const btnPrev = document.querySelector(".carousel-btn.prev");//Récupère le bouton « précédent »
    const btnNext = document.querySelector(".carousel-btn.next");//Récupère le bouton « suivant »

    if (carousel && btnPrev && btnNext) {//Vérifie que le carrousel et les deux boutons existent
        const scrollAmount = 720;// Quand on clique sur un bouton, le carrousel bouge de 1 slide (700px largeur + 20px margin-right)

        btnPrev.addEventListener("click", () => { // code exécuté au clic
            carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
            //le carrousel se déplace vers la gauche avec une animation fluide
        });

        btnNext.addEventListener("click", () => { 
            carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        // le carrousel se déplace vers la droite avec une animation fluide
        });
    }
});

