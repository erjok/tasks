import express from "express";

/**
 * @type {express.RequestHandler}
 */
export default function (req, res, next) {
    next();
}