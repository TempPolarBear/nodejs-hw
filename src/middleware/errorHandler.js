const errorHandler = (err, req, res, _next) => {
  console.error(err);

  const status =
    err.status ??
    (err.name === 'ValidationError' || err.name === 'CastError' ? 400 : 500);

  res.status(status).json({
    message: err.message,
  });
};

export default errorHandler;