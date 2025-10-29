import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = (err && (err.statusCode || err.status)) ?? 500;
  const payload = {
    message: err?.message ?? "Internal Server Error",
    // opcional: detalles útiles en dev
    // stack: process.env.NODE_ENV !== "production" ? err?.stack : undefined,
  };
  res.status(status).json(payload);
};