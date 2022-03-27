import React, { useState, useEffect, useRef } from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorMessage = (props) => {
    const {isDismissible, errorMessage, setShowError} = props;
    return (
        <>
            {(isDismissible === 'dismissble') ?
                <Alert className='mt-2' variant="danger" onClose={() => setShowError(false)} dismissible>
                    <div className='text-danger'>
                        {errorMessage}
                    </div>
                </Alert> :
                <Alert className='mt-2' variant="danger" onClose={() => setShowError(false)}>
                    <div className='text-danger'>
                        {errorMessage}
                    </div>
                </Alert>
            }
        </>
    );
}

export default ErrorMessage;