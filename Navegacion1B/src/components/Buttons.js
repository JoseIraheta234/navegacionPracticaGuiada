import { TouchableOpacity , Text , StyleSheet } from 'react-native'




const Buttons = ({ text , action}) => {
    return (
         <TouchableOpacity onPress={action} style={styles.boton}>
            <Text style={styles.texto}>
                {text}
            </Text>
         </TouchableOpacity>
      
    );
};

const styles = StyleSheet.create({
    boton:{
        padding: 10,
        backgroundColor: "#917552ff"
    },
    texto:{
        fontSize: 15,
        textAlign: 'center',
        fontWeight:'semibold',
        color: "#dda35cff"
    }
})

export default Buttons;