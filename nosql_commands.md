# Evaluation 
- Réaliser les commandes permettant de répondre aux filtres demandés sur la base restaurant envoyée

# Requêtes
1.	Créez une base restaurants, puis une collection new_york. Utilisez mongoDBCompass pour importer les données dans la collection (voir slides)

2.	Sur cette base réalisées les opérations suivantes (ces opérations peuvent être faites en cli) : (mongosh -> use restaurants)
# Affichez tous les documents de la collection new_york sur mongodb
db.new_york.find()

# Comptez le nombre de documents présents dans la collection new_york
db.new_york.countDocuments()

# Affichez les documents ayant un restaurant_id >= 3015000
db.new_york.find({restaurant_id: {$gte: "3015000"}})

# Comptez le nombre de documents récupérés par la requête précédente
db.new_york.countDocuments({restaurant_id: {$gte: "3015000"}})

# Récupérez le premier document qui contient un grade de type A, avec un score supérieur à 10
db.new_york.findOne({"grades": {$elemMatch: {grade: "A", score: {$gt: 10}}}})

# Ajoutez (avec $push) au document récupéré précédemment, un nouveau grade de type B et un score de 10
let doc = db.new_york.findOne({"grades": {$elemMatch: {grade: "A", score: {$gt: 10}}}})
db.new_york.updateOne({_id: doc._id}, {$push: {grades: {grade: "B", score: 10, date: new Date()}}})
# Check avec db.new_york.findOne({"grades": {$elemMatch: {grade: "A", score: {$gt: 10}}}})

# Incrémenter de 5 le score du premier grade du restaurant ayant pour ‘borough’ : « Brooklyn » et pour ‘cuisine’ : « Hamburgers »
db.new_york.updateOne({borough: "Brooklyn", cuisine: "Hamburgers"}, {$inc: {"grades.0.score": 5}})
# Check avec db.new_york.findOne({borough: "Brooklyn", cuisine: "Hamburgers"})

# Affichez les 10 premiers restaurants par ordre alphabétique de ‘name’
db.new_york.find().sort({name: 1}).limit(10)

# Trouvez le (ou les) restaurant(s) ayant pour address.coord.coordinates les valeurs :
# - 0 : 73.98513559999999
# - 1 : 40.7676919
db.new_york.find({"address.coord": [ 73.98513559999999, 40.7676919 ]})

# Recherchez les restaurants address.zipcode >= 10500 (afficher UNIQUEMENT ‘name’, ‘cuisine’, ‘restaurant_id’)
db.new_york.find({"address.zipcode": {$gte: "10500"}}, {name: 1, cuisine: 1, restaurant_id: 1})

# Ajoutez une prime à tous les restaurants ayant un seul grade dans le tableau de grades.
db.new_york.updateMany({grades: {$size: 1}}, {$set: {bonus: true}})