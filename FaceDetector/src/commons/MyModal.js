

    <Modal 
        ref={"modal1"}
        backdropOpacity={0.4}
        backdropColor="black"
        isOpen={this.state.isOpen} 
        onClosed={() => this.setState({isOpen: false})} 
        style={styles.modal} 
        position={"bottom"} 
        // backdropContent={<Text>dsa</Text>}
        animationDuration={500}
        backButtonClose
    >
        <Box center  bg='lightblue' dir='row' style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 200}}  >
            <Text style={{textDecorationLine:'underline'}}>Môn học:</Text>
            <Picker
                selectedValue={this.state.obj}
                style={{ height: 50, width: 100}}
                mode="dropdown" //dropdown dialog
                onValueChange={(itemValue, itemIndex) => this.setState({obj: itemValue})}>
                <Picker.Item label="Nhập môn CNTT" value="nhapmon" />
                <Picker.Item label="Big Data" value="bigdata" />
                <Picker.Item label="Machine learning" value="machine" />
            </Picker>
        </Box>
    </Modal>