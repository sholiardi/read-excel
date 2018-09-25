import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import SimpleTable from './SimpleTable';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

class TextFields extends React.Component {
  state = {
    selectedFile: null,
    tableData: []
  }

  fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  uploadHandler = () => {
    const formData = new FormData()
    formData.append('file', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('http://192.168.3.6:8080/upload', formData).then(res => {

      var array = res.data;
      var data = [];

      for (var i = 0; i < array.length; i++) {
        data.push(createData(array[i][0], array[i][1], array[i][2], array[i][3], array[i][4]));
      }

      this.setState({ tableData: data});
      
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <TextField
          id="standard-name"
          name="upload"
          label="File"
          className={classes.textField}
          onChange={this.fileChangedHandler}
          margin="normal"
          type="file"
        />
        <Button onClick={this.uploadHandler} variant="contained" color="primary" className={classes.button}>
          Upload
        </Button>

        <SimpleTable data={this.state.tableData} />
      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);