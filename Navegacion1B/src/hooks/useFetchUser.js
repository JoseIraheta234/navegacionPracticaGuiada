import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useFetchUser = () => {
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  
  // Estados para edición
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  // Estados para la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener usuarios desde la API
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil");
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar nuevo usuario en la API
  const handleGuardar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch("https://retoolapi.dev/zZhXYF/movil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          edad: parseInt(edad),
          correo,
        }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Usuario guardado correctamente");
        setNombre("");
        setEdad("");
        setCorreo("");
        fetchUsuarios();
      } else {
        Alert.alert("Error", "No se pudo guardar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al enviar los datos");
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (userId, callback) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este usuario?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${userId}`, {
                method: "DELETE",
              });

              if (response.ok) {
                Alert.alert("Éxito", "Usuario eliminado correctamente");
                if (callback) callback(); // Actualizar lista
              } else {
                Alert.alert("Error", "No se pudo eliminar el usuario");
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Ocurrió un error al eliminar el usuario");
            }
          },
        },
      ]
    );
  };

  // Preparar formulario para editar
  const editarUsuario = (user) => {
    setNombre(user.nombre);
    setEdad(user.edad.toString());
    setCorreo(user.correo);
    setIsEditing(true);
    setEditingUserId(user.id);
  };

  // Limpiar formulario
  const resetForm = () => {
    setNombre("");
    setEdad("");
    setCorreo("");
    setIsEditing(false);
    setEditingUserId(null);
  };

  // Ejecutar al cargar componente
  useEffect(() => {
    fetchUsuarios();
    console.log("actualizando en useEffect");
  }, []);

  return {
    nombre,
    setNombre,
    edad,
    setEdad,
    correo,
    setCorreo,
    handleGuardar,
    eliminarUsuario,
    editarUsuario,
    resetForm,
    usuarios,
    loading,
    fetchUsuarios,
    isEditing,
    editingUserId,
  };
};

export default useFetchUser;