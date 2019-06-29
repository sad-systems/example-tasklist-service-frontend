import React from "react";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";

import config from "./configs/main";
import theme from "./configs/theme";

const client = new ApolloClient({
    uri: config.graphql_endpoint,
});

function App() {

  const initState = {
      isAdmin:  false,
      token:    "",
      formData: {},
      formOpen: false,
  };
  const [ state, setState ] = React.useState(initState);
  const changeState = obj => setState({ ...state, ...obj });

  const handleLogin = token => {
      changeState({token: token, isAdmin: !!token});
  };

  const handleEdit = task => {
      changeState({formData: task, formOpen: true});
  };

  const handleNewTask = () => {
      changeState({formData: {}, formOpen: true});
  };

  const handleSubmited = id => {
      changeState({formOpen: false});
      client.resetStore(); //<--- Clear GraphQL cache
  };

  const handleCanceled = () => {
      changeState({formOpen: false});
  };

  const handleFormChange = (name, value) => {
      changeState({ formData: { ...state.formData, [name]: value } });
  };

  return (
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <div align="center">
                   <Header isAdmin={state.isAdmin} onLogin={ handleLogin }/>
                   <Table isAdmin={state.isAdmin} onEdit={ handleEdit }/>
                   <Container align="right">
                       <Button  variant="contained" color="primary" onClick={ handleNewTask }>New task</Button>
                   </Container>
                   <Form
                       open={state.formOpen}
                       isAdmin={state.isAdmin}
                       token={state.token}
                       task={state.formData}
                       onSubmited={handleSubmited}
                       onCanceled={handleCanceled}
                       onChange={handleFormChange}
                   />
                </div>
            </ThemeProvider>
        </ApolloProvider>
  );
}

export default App;
