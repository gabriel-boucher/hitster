import { Request, Response } from "express";

export const errorHandler = (req: Request, res: Response, err: any) => {
    console.error(`Error in ${req.originalUrl}`, err.message);
    res.status(500).json({ error: err.message });
};