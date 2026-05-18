import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
     
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 64,
        backgroundColor: "#ffffff30",
        boxShadow: [ 
            {
                offsetX: 0,
                offsetY: 1,
                blurRadius: 12,
                color: 'rgba(255, 255, 255, 0.25)',
                inset: true
            },
            {
                offsetX: 0,
                offsetY: 4,
                blurRadius: 10,
                color: 'rgba(0, 0, 0, 0.1)',
                inset: false 
            }
        ],
        borderBottomWidth: 1,
        borderColor: "#fff3f323"
        
    },
    textContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 12
    },
    title: {
        fontFamily: "MontserratBold",
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        marginHorizontal: 8
    },
    button:{
        marginHorizontal: 12
    },
    buttonText:{
        fontFamily: "MontserratBold",
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 8
    }
})