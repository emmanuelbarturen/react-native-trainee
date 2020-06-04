import React, {useState} from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import {Container, Content, Header, Title, CardItem, Input, Body, Button} from 'native-base'

const App: () => React$Node = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let doLogin = async () => {
        await fetch('http://192.168.1.5/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": password})
        }).then(res => res.json())
            .then(restData => {
                if (restData.token_type == 'Bearer') {
                    alert('Conectado!');
                }
                console.log('respuesta del enpoint login', restData)
            })
    }

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <Container>
                <Content>
                    <Header>
                        <Title>
                            Login
                        </Title>
                    </Header>
                    <CardItem>
                        <Text style={styles.heading}>Login Laravel</Text>
                    </CardItem>
                    <CardItem>
                        <Input style={styles.input} placeholder="Email" value={email}
                               onChangeText={(value) => setEmail(value)}/>
                    </CardItem>
                    <CardItem>
                        <Input style={styles.input} placeholder="Password" value={password}
                               onChangeText={(value) => setPassword(value)}/>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button primary block onPress={doLogin}>
                                <Text style={styles.btn}>Login</Text>
                            </Button>
                        </Body>

                    </CardItem>
                </Content>
            </Container>
        </>
    );
};

const styles = StyleSheet.create({
    heading: {
        textAlign: 'center',
        flex: 1,
        fontSize: 20
    },
    input: {
        borderWidth: 1, borderColor: 'blue'
    },
    btn: {
        color: '#ffff',

    }
});

export default App;
