import * as React from 'react';
import PositionedSnackbar from "../../../helpers/notify-msg";
import ObjectStorage from "../../../helpers/ObjectStorage";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

type MyProps = {
};

type MyState = {
    files: any;
    open: boolean;
    can_close: boolean;
    errorMessage: string;
};

export default class UploadFiles extends React.Component<MyProps, MyState> {

    objectStorage: any;

    state: MyState = {
        files: null,
        open: false,
        can_close: true,
        errorMessage: "",
    };

    constructor(props: MyProps) {
        super(props);
        this.objectStorage = new ObjectStorage();
    }
    
    notify = () => {
        this.setState({
            open: false || !this.state.can_close,
        });
        this.setCanClose(true);
    };

    setCanClose = (lock: boolean) => {
        this.setState({
            can_close: lock,
        });
    }

    setErrorMessage(message: string) {
        this.setState({
            open: true,
            errorMessage: message
        });
    }

    uploadFiles = (e: any) => {
        const new_files = e.target.files;
    
        this.setState({
          files: new_files,
        });

        this.setErrorMessage("Files in cache");
    }

    uploadFilesBlob = () => {
        const files = this.state.files;
    
        this.setCanClose(false);
        this.setErrorMessage("Loading...");
        this.objectStorage.uploadFiles(files, (response: any) => {
            this.setCanClose(true);
            let url = response[0]._response.request.url;
            url = url.slice(0, url.indexOf("?"));
            let title = files[0].name;
            
            const body = {
                url: url,
                title: title,
            };
            
            this.setErrorMessage("Files uploaded");
            console.log(body);
            // axios.post(urlAPI + 'documents/notify', body).then((response) => {
            //     //document.getElementById("message_to_user").innerHTML = "Server received the file successfully";
            //     //console.log(response);
            // });
            
            
            console.log(url);
            console.log(title);
        });
      }

      render() {
        return (
            <>
            <h2>Welcome to DocumentAnalyzer!</h2>
            <Card>
                <br/>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Upload files
                    </Typography>
                    <Typography color="textSecondary">
                        This action will start the analysis
                    </Typography>
                </CardContent>
                <CardActions>
                    <input type="file" multiple onChange={this.uploadFiles} />
                    <button onClick={this.uploadFilesBlob}>Upload files</button>
                    <PositionedSnackbar message={this.state.errorMessage} open_msg={this.state.open} close={this.notify} />
                </CardActions>
                <br/>
            </Card>
            </>
        );
      }

}