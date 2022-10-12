import { Genre } from "../models/index.js";

const genreControllers = {
    // [Get]/genre
    index : async (req, res, next) => {
        try {
            const genres = await Genre.find({}).populate('cars');
            res.status(200).json(genres);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // [Get]/genre/create
    create : async (req, res, next) => {
        try {
            const newGenre = await  Genre.insertOne(req.body);
            const saveGenre = newGenre.save();
            res.status(201).json(saveGenre);
        } catch (error) {
            res.status(422).json(error.message);
        }
    },
    // [Get]/genre/:id
    show : async (req, res, next) => {
        try {
            const genre = await Genre.findById({_id:req.params.id}).populate('cars');;
            res.status(201).json(genre);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    // [delete]/genre/:id
    delete : async (req, res, next) => {
        try {
            await Genre.findByIdAndDelete({_id:req.params.id});
            res.status(201).json("Delete successfully");
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
    //// [update]genre/:id/edit
    update : async (req, res, next) => {
        try {
           const updateGenre =  await Genre.findOneAndUpdate({_id:req.params.id},req.body,{
                new: true
              });
            res.status(201).json(updateGenre);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },
}
export default genreControllers;
