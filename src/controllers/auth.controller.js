import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js'; // tu modelo de usuario (Mongo, SQL, etc.)


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) return res.status(409).json({ message: "Usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Usuario registrado", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Error interno", error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Validar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Credenciales inválidas' });

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, admin: user.admin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Devolver token + datos del usuario (sin password)
    const userData = {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      shippingAddress: user.shippingAddress,
      admin: user.admin
    };

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: userData
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ message: 'Error interno', error: err.message });
  }
};


