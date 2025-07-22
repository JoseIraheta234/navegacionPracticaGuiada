import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import Buttons from "../components/Buttons";

const EditUser = ({ route, navigation }) => {
  const { user } = route.params;
  
  const [nombre, setNombre] = useState(user.nombre);
  const [edad, setEdad] = useState(user.edad.toString());
  const [correo, setCorreo] = useState(user.correo);
  const [loading, setLoading] = useState(false);

  const handleActualizar = async () => {
    if (!nombre || !edad || !correo) {
      Alert.alert("Error", "Por favor, completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://retoolapi.dev/zZhXYF/movil/${user.id}`, {
        method: "PUT",
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
        Alert.alert("Éxito", "Usuario actualizado correctamente", [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]);
      } else {
        Alert.alert("Error", "No se pudo actualizar el usuario");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un error al actualizar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <Text style={styles.subtitle}>
        Modifica la información de {user.nombre}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#A1866F"
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        placeholderTextColor="#A1866F"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        placeholderTextColor="#A1866F"
      />

      <View style={styles.buttonContainer}>
        <Buttons 
          text={loading ? "Actualizando..." : "Actualizar"} 
          action={handleActualizar} 
        />
        
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#EAD8C0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#5C3D2E",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#5C3D2E",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#5C3D2E",
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: "#FFF",
    color: "#000",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#A1866F",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginTop: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cancelButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default EditUser;