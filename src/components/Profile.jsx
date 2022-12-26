import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { startPutUserAccount } from '../actions';

const Profile = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const initialValues = {
    occupation: ""
  };

  const handleOccupationSubmit = (values, {resetForm}) => {
    const userData = {
        occupation: values.occupation
    }
    console.log(userData)
    dispatch(startPutUserAccount(userData))
    resetForm(initialValues);
  }

  return (
    <div className='profile-container'>
        
        <div className="profile-details-grid">
          <div className="profile-details-column-1">
            Username
          </div>
          <div className="profile-details-column-2">
            {user.username}
          </div>
        </div>
        
        <div className="profile-details-grid">
          <div className="profile-details-column-1">
            Email
          </div>
          <div className="profile-details-column-2">
            {user.email}
          </div>
        </div>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
            occupation: Yup.string()
            .required("Occupation is required")
        })}
        onSubmit={handleOccupationSubmit}
    >
        <Form className='profile-details-grid'>
            <div className="profile-details-column-1">
                <label htmlFor="occupation">{"Occupation"}</label>
            </div>
            <div>
                <Field name="occupation"
                    type="text"
                    placeholder={user.occupation}
                    id="occupation"
                />
                <div className='min-height'>
                    <ErrorMessage component="span" name="occupation" className="error-message" />
                </div>
            </div>
            <div>
                <button type="submit"> Update </button>
            </div>
        </Form>
    </Formik>


    </div>
  );
};

export default Profile;
