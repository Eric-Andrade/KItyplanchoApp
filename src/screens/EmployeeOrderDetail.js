import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { colors } from '../util/constants';

const Root = styled(Touchable).attrs({
    feedback: 'none'
})`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;
const T = styled.Text`
    color: ${colors.GRAY600};
    fontSize: 16;
    textAlign: left;
`;
const T2 = styled.Text`
    color: ${colors.GRAY600};
    fontSize: 16;
    textAlign: left;
`;

class EmployeeOrderDetail extends Component {
    state = {  }
    render() {
        return (
            <Root>
                <T>EmployeeOrderDetail</T>
                <T2 style={{fontFamily: 'sspRegural'}}>EmployeeOrderDetail con sspRegular</T2>
            </Root>
        );
    }
}

export default EmployeeOrderDetail;