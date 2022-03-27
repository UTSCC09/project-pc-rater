import React, { useState, useEffect, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorMessage = (props) => {
    const {errorMessage, setShowError} = props;
    return (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            <div className='text-danger'>
                {errorMessage}
            </div>
        </Alert>
    );
}

export default ErrorMessage;