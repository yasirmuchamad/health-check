
import * as userService from "../services/user.service.js";

// export const validateUser = [
//     body("name").notEmpty().withMessage("Name is Required"),
//     body("email").notEmpty().withMessage("Valid email required"),
//     body("role").notEmpty().withMessage("Role is Required"),
//     body("password").notEmpty().withMessage("password is required"),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({errors:errors.array() });
//         }
//         next();
//     },
// ];

export const validateUser = (req, res, next) => {
    const {name, role, email, password} = req.body;

    if (!name || !role || !email || !password){
        return res.status(400).json({message:"Field required"});
    }
    next();
}

export const getUsers = async(req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

export const getUserById = async(req, res) => {
    try {
        const id = Number(req.params.id);

        const user = await userService.getUserById(id);

        if (!user){
            return res.status(404).json({message:"User not found"});
        }
        res.json(user);
    }catch (err){
        res.status(500).json({message:err.message})
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, role, email, password } = req.body;

        if(!name || !role || !email || !password){
            return res.status(400).json({
                message:"name and role are required"
            });
        }
        const user = await userService.createUser({name, role, email, password});
            res.status(201).json(user);
            console.log("Data masuk kontroller")
        } catch (err){
            res.status(500).json({message:err.message});
        }
    };

   export const updateUser = async(req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.json(user);
    } catch (err){
        res.status(500).json({message:err.message});
    }
   };

export const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id);
        await userService.deleteUser(id);

        res.json({message:"User deleted successfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};



