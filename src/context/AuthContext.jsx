import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Usuario admin por defecto
const ADMIN_USER = {
  username: 'admin',
  password: 'admin',
  name: 'Administrador',
  isAdmin: true
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sazonUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const getRegisteredUsers = () => {
    const users = localStorage.getItem('sazonUsers');
    return users ? JSON.parse(users) : [];
  };

  const saveRegisteredUsers = (users) => {
    localStorage.setItem('sazonUsers', JSON.stringify(users));
  };

  const login = (username, password) => {
    // Verificar admin
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      const adminData = {
        id: 1,
        name: ADMIN_USER.name,
        username: ADMIN_USER.username,
        isAdmin: true
      };
      setUser(adminData);
      localStorage.setItem('sazonUser', JSON.stringify(adminData));
      return { success: true, user: adminData };
    }

    // Buscar en usuarios registrados
    const users = getRegisteredUsers();
    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        username: foundUser.username,
        isAdmin: false
      };
      setUser(userData);
      localStorage.setItem('sazonUser', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    return { success: false, error: 'Usuario o contraseña incorrectos' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sazonUser');
  };

  const register = (userData) => {
    const users = getRegisteredUsers();

    // Verificar si el username ya existe
    if (users.some(u => u.username === userData.username)) {
      return { success: false, error: 'El usuario ya existe' };
    }

    // Verificar si intenta usar admin
    if (userData.username.toLowerCase() === 'admin') {
      return { success: false, error: 'Este nombre de usuario no esta disponible' };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      username: userData.username,
      password: userData.password,
      isAdmin: false
    };

    users.push(newUser);
    saveRegisteredUsers(users);

    // Auto login despues de registrar
    const userSession = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      isAdmin: false
    };
    setUser(userSession);
    localStorage.setItem('sazonUser', JSON.stringify(userSession));

    return { success: true, user: userSession };
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
