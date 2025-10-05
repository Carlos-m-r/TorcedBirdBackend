import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js'; // tu modelo de usuario (Mongo, SQL, etc.)

// Registrar usuario (opcional si quieres crear con password)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar campos obligatorios antes de crear
    if (!email || !password || !name ) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(409).json({ message: "Usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      age
    });

    res.status(201).json({ message: "Usuario registrado", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error interno", error: err.message });
  }
};


// Login
export const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ mail });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Comparar password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Credenciales inválidas' });

    // Generar JWT
    const token = jwt.sign(
      { id: user._id, nombre: user.nombre, mail: user.mail },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error interno', error: err.message });
  }
};
