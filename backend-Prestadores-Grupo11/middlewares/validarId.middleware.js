module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'El ID debe ser un número positivo.' });
  }

  next();
};
