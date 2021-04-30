import * as React from 'react';
import { Link } from 'react-router-dom';
import PositionedSnackbar from "../../../helpers/notify-msg";
import Button from '@material-ui/core/Button';
import  { Redirect } from 'react-router-dom' 

type MyProps = {
    message: string;
};

type MyState = {
    login_data: boolean; 
    open: boolean;
    errorMessage: string;
};

export default  class LogIn extends React.Component<MyProps, MyState> {
    state: MyState = {
      login_data: false,
      open: true,
      errorMessage: "",
    };
    
    notify = () => {
        this.setState({
            open: !this.state.open,
            login_data: true
        })
    };

    setErrorMessage(message: string) {
        this.setState({
          errorMessage: message
        });
    }

    validateInputs(email: string, password: string) {
        if(!email || !password) {
          this.setErrorMessage("Por favor ingresar la información solicitada")
          return false;
        }
      
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)) {
          this.setErrorMessage("El formato del email es inválido")
          return false;
        }
    
        return true;
      }

      onSubmit(e: any) {
        e.preventDefault();
    
        // Redirection to the files page
        
        return <Redirect to='/files'  />
        
        
        // const form = e.target.elements;
        // const email = form.email.value;
        // const password = form.password.value;
    
        // // Validation of the input fields
        // if(!this.validateInputs(email, password)) return; 
        
        // // Login request to the api
        // AuthService.loginRequest(email, password).then(
        //   (response) => {
        //     // The token is stored
        //     AuthService.storeToken(response.data);
    
        //     // Redirection to the files page
        //     this.props.history.push({
        //       pathname: '/files',
        //       state: { detail: this.state }
        //     })
        //   },
        //   () => {
        //     this.setErrorMessage("Correo electrónico o contraseña incorrectos")
        //   }
        // );
      }

    render() {
        if(this.state.login_data){
            return <Redirect to='/files'  />
        }
        return (
            <div>

                <Button onClick={this.notify}>Top-Right</Button>

                {this.props.message} {this.state.login_data}

                <Link to='/files'>Goto Page Two</Link>
                <PositionedSnackbar message={this.state.errorMessage} open_msg={this.state.open} close={this.notify} />
            </div>
        );
    }
  }