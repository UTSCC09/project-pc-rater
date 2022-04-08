import React from 'react';
import Alert from 'react-bootstrap/Alert';

const SuccessMessage = (props) => {
    const {successMessage, setShowSuccess} = props;
    return (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
            <p className='text-success'>
                {successMessage}
            </p>
        </Alert>
    );
}

export default SuccessMessage;