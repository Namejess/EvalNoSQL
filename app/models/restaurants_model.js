/**
 * @Author: Jessy DROUIN
 * @Date:   06-Nov-2023
 * @Project: Evaluation NoSQL
 */

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            },
            borough: String,
            cuisine: String,
            restaurant_id: String,
            address: {
                building: String,
                coord: [Number],
                street: String,
                zipcode: String
            },
            grades: [{
                date: Date,
                grade: String,
                score: Number
            }]
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Restaurant = mongoose.model("Restaurant", schema);
    return Restaurant;
};