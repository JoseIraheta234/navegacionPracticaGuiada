import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CardUser = ({ user, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.userInfo}>
        <Text style={styles.cardTitle}>{user.nombre}</Text>
        <Text style={styles.cardText}>Edad: {user.edad}</Text>
        <Text style={styles.cardText}>Correo: {user.correo}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(user)}>
          <Ionicons name="pencil" size={18} color="#FFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(user.id)}>
          <Ionicons name="trash" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5C3D2E",
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: "#3B2C24",
    marginBottom: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#917552",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  deleteButton: {
    backgroundColor: "#D2691E",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
});

export default CardUser;