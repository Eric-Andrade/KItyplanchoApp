import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { colors } from '../util/constants';

const kpLogoSize = 90;
const avatarRadius = kpLogoSize / 2;

const Root = styled(Touchable).attrs({
    feedback: 'none'
})`
    flex: 1;
    alignItems: center;
`;
const T = styled.Text`
    color: ${colors.PINK200};
    fontSize: 20;
    textAlign: left;
    fontFamily: sspRegular;
    fontWeight: 200;
`;
const LogoContainer = styled.View`
    height: 95;
    width: 95;
    borderRadius: 45;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${props => props.theme.WHITE};
`;
const Logo = styled.Image`
    height: ${kpLogoSize};
    width: ${kpLogoSize};
    borderRadius: ${avatarRadius};
`;

class HowScreen extends Component {
    state = {  }
    render() {
        return (
            <Root>
                <LogoContainer>
                    <Logo source={require('../../assets/logokity.png')}/>
                </LogoContainer>
                <T>KityPlancho Ayuda</T>
            </Root>
        );
    }
}

export default HowScreen;