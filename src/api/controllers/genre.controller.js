import { Genre } from "../models/index.js";

const genreControllers = {
    // [Get]/genre
    index : async (req, res, next) => {
        try {
            const genres = await Genre.find({});
            res.status(200).json(genres);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // [Get]/genre/create
    create : async (req, res, next) => {
        try {
            const newGenre = await new Genre(req.body);
            const saveGenre = newGenre.save();
            res.status(201).json(saveGenre);
        } catch (error) {
            res.status(422).json(error.message);
        }
    },
}
export default genreControllers;
