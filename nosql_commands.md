# Evaluation 
- Réaliser les commandes permettant de répondre aux filtres demandés sur la base restaurant envoyée

# Requêtes
1.	Créez une base restaurants, puis une collection new_york. Utilisez mongoDBCompass pour importer les données dans la collection (voir slides)

2.	Sur cette base réalisées les opérations suivantes (ces opérations peuvent être faites en cli) : 
- Affichez tous les documents de la collection new_york
- Comptez le nombre de documents présents dans la collection new_york
- Affichez les documents ayant un restaurant_id >= 3015000
- Comptez le nombre de documents récupérés par la requête précédente
- Récupérez le premier document qui contient un grade de type A, avec un score supérieur à 10 (Regardez dans mongoDBCompass pour comprendre l’arborescence)
- Ajoutez (avec $push) au document récupéré précédemment, un nouveau grade de type B et un score de 10 (la date, mettez ce que vous voulez)
- Incrémenter de 5 le score du premier grade du restaurant ayant pour ‘borough’ : « Brooklyn » et pour ‘cuisine’ : « Hamburgers »
- Affichez les 10 premiers restaurants par ordre alphabétique de ‘name’
- Trouvez le (ou les) restaurant(s) ayant pour address.coord.coordinates les valeurs :
    - 0 : 73.98513559999999
    - 1 : 40.7676919
- Recherchez les restaurants address.zipcode >= 10500 (afficher UNIQUEMENT ‘name’, ‘cuisine’, ‘restaurant_id’)
- Ajoutez une prime à tous les restaurants ayant un seul grade dans le tableau de grades. 
- (Bonus) Créez une vue avec permettant d’afficher les adresses de tous les restaurants n’ayant qu’un seul grade.
