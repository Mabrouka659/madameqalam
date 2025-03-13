import { NextFunction } from "express";

class ImagefileMiddleware{
    
    public process = (req: Request, res: Response, next: NextFunction) => {
        console.log("image file middleware");


        //passer au middleware suivant 
        next();
    }



}
export default ImagefileMiddleware;