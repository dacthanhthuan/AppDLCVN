import React, { useEffect, useState } from "react"
import { Image, Modal, View, Text } from "react-native"
import styles from "./styles"

const ModalEnableFingerprint = ({ visible, onRequestClose, second }) => {
    const [isSecond, setIsSecond] = useState(second);

    useEffect(() => {
        if (isSecond > 0) {
            const timer = setTimeout(() => {
                setIsSecond(prevSeconds => prevSeconds - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isSecond]);

    return (
        <Modal
            visible={visible}
            onRequestClose={onRequestClose}
            transparent
            animationType='slide'
            hardwareAccelerated>
            <View style={styles.container}>
                <View style={styles.centeredView}>
                    <Image style={styles.icon} source={require('../../assets/Home/success.png')} />
                    <Text style={styles.modalTitle}>Kích hoạt đăng nhập bằng vân tay thành công</Text>
                    <Text style={styles.modalDescription}>Thông báo tự động đóng sau <Text style={{ color: '#0571ED' }}>({isSecond})</Text> giây</Text>
                </View>
            </View>
        </Modal>
    )
}

export default React.memo(ModalEnableFingerprint)