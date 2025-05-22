const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Dados duplicados',
      details: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido'
    });
  }

  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

module.exports = errorHandler; 