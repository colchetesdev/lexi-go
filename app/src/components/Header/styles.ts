import {StyleSheet} from "react-native"

export const styles = StyleSheet.create({
     
    container: {
        display: "flex",
        justifyContent: "space-around",
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff"
    }
})