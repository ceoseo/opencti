import React from 'react';
import MuiTextField from '@material-ui/core/TextField';
import { fieldToTextField } from 'formik-material-ui';

const TextField = props => (
  <MuiTextField
    {...fieldToTextField(props)}
    onChange={(event) => {
      const { value } = event.target;
      props.form.setFieldValue(
        props.field.name,
        value,
      );
      if (typeof props.onChange === 'function') {
        props.onChange(value);
      }
    }}
  />
);

export default TextField;
