import React from 'react';
import { connect } from 'react-redux';

interface SProps {
    data: any;
}

interface IProps extends SProps {
    id: number;
    name: number;
}

function A(props: IProps) {
    // props.id
    return (
        <div>
            1
        </div>
    )
}

export default connect((state: SProps) => {
    return {
        data: state.data
    }
})(A);