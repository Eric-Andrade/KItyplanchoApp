import React, { Component } from 'react';
import styled from 'styled-components/native';
import { FlatList, Alert, Platform, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import Touchable from '@appandflow/touchable';
import { colors, variables } from '../../util/constants';
import { LoadingScreen } from '../../commons/LoadingScreen'
import { getAllServiciosActivos } from '../redux/actions';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import CarouselBanner from '../../components/CarouselBanner';
import Slider from '../../components/Slider';
import items from '../../components/Banners';

const itemWidth = Dimensions.get('window').width;

const Root = styled.View`
    flex: 1;
`;
const TopContainer = styled.View`
    flex: 0.75;
`;
const BottomContainer = styled.View`
    flex: 1;
    flexDirection: row;
    justifyContent: center;
    marginHorizontal: 15
`;
const T = styled.Text`
    color: ${colors.GRAY600};
    fontSize: 16;
    textAlign: left;
    fontFamily: sspRegular
`;
const Title = styled.View`
    alignItems: center;
    padding: 10px;
    width: 100%;
    backgroundColor: ${props => props.theme.WHITE};
    shadowColor: ${props => props.theme.GRAY777};
    shadowOffset: 0px 2px;
    shadowRadius: 2;
    shadowOpacity: 0.1;
    elevation: 2;
`;
const TitleText = styled.Text`
    color: ${colors.GRAY900};
    fontSize: ${Platform.OS === 'ios' ? 18 : 16};
    fontFamily: sspRegular
`;
const Touch = styled(Touchable).attrs({
    feedback: 'opacity',
    hitSlot: { top: 15, bottom: 15, right: 15, left: 15 }
}) `
`;

@connect(state => ({
    allserviciosactivos: state.services.allserviciosactivos
}),
    { getAllServiciosActivos })

class ServicesScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items,
            columns: 2
        }
    }

    componentDidMount() {
        this.props.getAllServiciosActivos();
    }

    _onPress(SERVNOMBRE) {
        Alert.alert(`Has clickado a ${SERVNOMBRE}`)
    }

    render() {
        const { navigate } = this.props.navigation;

        const {
            allserviciosactivos: {
                isFetched,
                data,
                error
            }
    } = this.props;
        if (!isFetched) {
            return <LoadingScreen size="large" color={colors.PRIMARY} />
        } else if (error.on) {
            return (
                <Root>
                    <T>{error.on}</T>
                </Root>
            )
        }

        return (
            <Root>
                <StatusBar
                    backgroundColor="#E72B73"
                    barStyle="dark-content"/>
                <TopContainer>
                    <Slider />
                    {/* <CarouselBanner items={this.state.items} /> */}
                </TopContainer>
                <Title>
                    <TitleText>Servicios de {variables.COMPANYNAME}</TitleText>
                </Title>
                <BottomContainer>
                    <FlatList
                        numColumns={this.state.columns}
                        data={data}
                        renderItem={
                            ({ item: allserviciosactivos }) => (
                                <Touch onPress={() => navigate('ServicesPScreen', { name: allserviciosactivos.SERVNOMBRE })}>
                                    <ServiceCard itemWidth={ (itemWidth - 10 * this.state.columns) / this.state.columns } allserviciosactivos={allserviciosactivos} />
                                </Touch>
                            )
                        }
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        automaticallyAdjustContentInsets={false}
                    />
                </BottomContainer>
            </Root>
        );
    }
}

export default ServicesScreen;