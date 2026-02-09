export const validationUser = (req, res, next) => {
    const {name, email, role, password} = req.body;
    if (!name || !email || !role || !password){
        return res.status(400).json({
            message: "name and role are required",
        });
    }
    next();
};