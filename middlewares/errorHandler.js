module.exports = function errorHandler(error, req, res, next) {

    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message: error.errors[0].message });
            break;

        case "AlreadyFriend":
            res.status(400).json({ message: "Users already Friend!" });
            break;

        case "JsonWebTokenError":
        case "Unauthenticated":
            res.status(401).json({ message: error.message ?? "Unauthenticated" });
            break;
        
        case "Forbidden":
            res.status(403).json({ message: error.message ?? "Unauthorized" });
            break;
    

        default:
            res.status(500).json({ message: "Internal Server Error" });
            break;
    }

}