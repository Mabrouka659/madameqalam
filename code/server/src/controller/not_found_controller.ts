import express, { type Request, type Response } from "express";

class NotFoundController{
    public index = (req: Request, res: Response) => {
        /*
            code status HTTP
            json: données affichées
        */
        res.status(404).json({
			status: 404,
			message: "Not found",
		});
    }
}

export default NotFoundController