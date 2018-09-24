import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
});

class TextFields extends React.Component {
  state = {selectedFile: null}

  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  uploadHandler = () => {
    const formData = new FormData()
    formData.append('file', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('http://192.168.3.6:8080/upload', formData).then(data => {
      console.log(data);
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <TextField
          id="standard-name"
          name="upload"
          label="Name"
          className={classes.textField}
          onChange={this.fileChangedHandler}
          margin="normal"
          type="file"
        />
        <Button onClick={this.uploadHandler} variant="contained" color="primary" className={classes.button}>
          Upload
        </Button>
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);