//=========================SET
try {
    const credentials = await Keychain.setGenericPassword(
      'token',
      'TuLuong283',
      { accessControl: this.state.accessControl }
    );
    if(credentials){
      this.setState({ status: 'Credentials saved!' });
      console.log('Status: ', this.state.status);
    }
} catch (err) {
    this.setState({ status: 'Could not save credentials, ' + err });
    console.log("Status: ", this.state.status);
}



//=========================GET
try {
    const credentials = await Keychain.getGenericPassword();
    
    if (credentials) {
      this.setState({ ...credentials, status: 'Credentials loaded!' });
      console.log("Status: ", this.state.status);
      console.log("credentials: ", credentials);
      NavigationService.navigate('Main')
    } else {
      this.setState({ status: 'No credentials stored.' });
      console.log("Status: ", this.state.status);
      NavigationService.navigate('Auth')
    }
  } catch (err) {
    this.setState({ status: 'Could not load credentials. ' + err });
    console.log("Status: ", this.state.status);
  }





//=========================RESET
try {
    const response = await Keychain.resetGenericPassword();
    if(response){
      this.setState({status: 'Credentials Reset!'});
      console.log("Status: ", this.state.status);
    }

  } catch (err) {
    this.setState({ status: 'Could not reset credentials, ' + err });
    console.log("Status: ", this.state.status);
  }