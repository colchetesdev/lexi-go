import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
     
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        backgroundColor: "#ffffff30",
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        borderBottomWidth: 1,
        borderColor: "#fff3f323"
        
    },
    textContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontFamily: "MontserratBold",
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginLeft: 8,
    },
    button:{
    },
    buttonText:{
        fontFamily: "MontserratBold",
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 8,
    },
    buttonTextActive: {
        color: "#FFF3F3",
    }
})
